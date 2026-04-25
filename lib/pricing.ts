import { PaymentLedger } from "./types";

export function calculatePrice(minutes: number, pricePerMinute: number, computeEnabled: boolean): PaymentLedger {
  const basePrice = minutes * pricePerMinute;
  const computeCredit = computeEnabled ? basePrice * 0.3 : 0;
  const finalPrice = basePrice - computeCredit;
  return {
    bookingId: "draft",
    basePrice: Number(basePrice.toFixed(2)),
    computeCredit: Number(computeCredit.toFixed(2)),
    finalPrice: Number(finalPrice.toFixed(2)),
    currency: "USD"
  };
}
