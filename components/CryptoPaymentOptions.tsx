import { useState } from "react";

interface CryptoPaymentProps {
  cryptoAmount?: number;
  currency?: string;
  onCryptoSelect?: (currency: string) => void;
}

export default function CryptoPaymentOptions({ cryptoAmount, currency, onCryptoSelect }: CryptoPaymentProps) {
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);

  const cryptos = [
    { symbol: "ETH", name: "Ethereum", icon: "Ξ", description: "Fast and reliable" },
    { symbol: "BTC", name: "Bitcoin", icon: "₿", description: "Most secure" },
    { symbol: "SOL", name: "Solana", icon: "◎", description: "Ultra-fast" },
    { symbol: "USDC", name: "USDC Stablecoin", icon: "$", description: "No volatility" }
  ];

  const handleSelectCrypto = (symbol: string) => {
    setSelectedCrypto(symbol);
    onCryptoSelect?.(symbol);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-primary">Cryptocurrency Payment</p>
      <div className="grid grid-cols-2 gap-2">
        {cryptos.map((crypto) => (
          <button
            key={crypto.symbol}
            onClick={() => handleSelectCrypto(crypto.symbol)}
            className={`neo-card rounded-xl p-3 text-left transition ${
              selectedCrypto === crypto.symbol 
                ? "ring-2 ring-primary" 
                : "hover:ring-1 hover:ring-primary/50"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold text-primary">{crypto.icon}</span>
              <span className="font-medium text-text text-sm">{crypto.symbol}</span>
            </div>
            <p className="text-xs text-textMuted">{crypto.description}</p>
            {cryptoAmount && currency === crypto.symbol && (
              <p className="mt-2 text-xs font-semibold text-primary">
                {cryptoAmount.toFixed(8)} {crypto.symbol}
              </p>
            )}
          </button>
        ))}
      </div>
      {selectedCrypto && (
        <div className="neo-card rounded-lg p-3 bg-accent">
          <p className="text-xs text-text">
            <span className="font-semibold text-primary">Wallet connection required:</span> Connect your Web3 wallet to proceed with {selectedCrypto} payment
          </p>
        </div>
      )}
    </div>
  );
}
