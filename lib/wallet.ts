import { ethers } from 'ethers';

export type WalletInfo = {
  address: string;
  balance: string;
  chainId: number;
};

export async function connectWallet(): Promise<WalletInfo | null> {
  try {
    if (!window.ethereum) {
      console.error('[v0] MetaMask not installed');
      return null;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    if (!accounts || accounts.length === 0) {
      return null;
    }

    const address = accounts[0];
    const balance = await provider.getBalance(address);
    const network = await provider.getNetwork();

    return {
      address,
      balance: ethers.formatEther(balance),
      chainId: Number(network.chainId)
    };
  } catch (error) {
    console.error('[v0] Wallet connection error:', error);
    return null;
  }
}

export async function signMessage(message: string, address: string): Promise<string | null> {
  try {
    if (!window.ethereum) {
      return null;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(address);
    const signature = await signer.signMessage(message);

    return signature;
  } catch (error) {
    console.error('[v0] Message signing error:', error);
    return null;
  }
}

export async function verifySignature(message: string, signature: string, address: string): Promise<boolean> {
  try {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === address.toLowerCase();
  } catch (error) {
    console.error('[v0] Signature verification error:', error);
    return false;
  }
}

export function formatAddress(address: string): string {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}
