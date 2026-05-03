import { PaymentLedger } from "./types";

// Mock crypto rates (in production, fetch from live API)
const CRYPTO_RATES: Record<string, number> = {
  ETH: 3500,
  BTC: 68000,
  SOL: 180,
  USDC: 1
};

export function calculatePrice(minutes: number, pricePerMinute: number, computeEnabled: boolean, currency: "USD" | "ETH" | "BTC" | "SOL" | "USDC" = "USD"): PaymentLedger {
  const basePrice = minutes * pricePerMinute;
  const computeCredit = computeEnabled ? basePrice * 0.3 : 0;
  const finalPrice = basePrice - computeCredit;
  
  if (currency === "USD") {
    return {
      bookingId: "draft",
      basePrice: Number(basePrice.toFixed(2)),
      computeCredit: Number(computeCredit.toFixed(2)),
      finalPrice: Number(finalPrice.toFixed(2)),
      currency: "USD"
    };
  }

  // Convert to crypto
  const rate = CRYPTO_RATES[currency] || 1;
  const cryptoAmount = finalPrice / rate;
  
  return {
    bookingId: "draft",
    basePrice: Number(basePrice.toFixed(2)),
    computeCredit: Number(computeCredit.toFixed(2)),
    finalPrice: Number(finalPrice.toFixed(2)),
    currency,
    cryptoAmount: Number(cryptoAmount.toFixed(8)),
    cryptoRate: rate
  };
}
