"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WalletConnect() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletInfo, setWalletInfo] = useState<{ address: string; balance: string } | null>(null);
  const router = useRouter();

  const handleConnectWallet = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!window.ethereum) {
        setError("MetaMask is not installed. Please install it to continue.");
        setLoading(false);
        return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (!accounts || accounts.length === 0) {
        setError("Failed to connect wallet");
        setLoading(false);
        return;
      }

      const address = accounts[0];
      
      // Get balance
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      });

      const balanceInEth = (parseInt(balance, 16) / 1e18).toFixed(4);
      
      setWalletInfo({ address, balance: balanceInEth });

      // Create message for signing
      const message = `Sign this message to verify your wallet for DockOS\nWallet: ${address}\nTimestamp: ${new Date().toISOString()}`;

      // Request signature
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address]
      });

      // Send to backend for verification
      const response = await fetch("/api/wallet/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: address,
          signature,
          message
        })
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Wallet connection failed");
        return;
      }

      const data = await response.json();
      localStorage.setItem("auth-user", JSON.stringify(data.user));
      router.push("/explore");
    } catch (err: any) {
      console.error("[v0] Wallet error:", err);
      if (err.code === 4001) {
        setError("You rejected the wallet connection");
      } else {
        setError(err.message || "Failed to connect wallet");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="alert-error rounded-lg p-3">
          {error}
        </div>
      )}

      {walletInfo && (
        <div className="neo-card rounded-lg p-4">
          <p className="text-sm text-textMuted mb-2">Connected Wallet</p>
          <p className="text-primary font-mono">{walletInfo.address.substring(0, 6)}...{walletInfo.address.substring(address.length - 4)}</p>
          <p className="text-sm text-textMuted mt-2">{walletInfo.balance} ETH</p>
        </div>
      )}

      <button
        onClick={handleConnectWallet}
        disabled={loading || !!walletInfo}
        className="neo-button w-full rounded-lg px-4 py-3 font-semibold text-primary disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
        {loading ? "Connecting..." : "Connect MetaMask"}
      </button>
    </div>
  );
}
