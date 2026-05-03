"use client";

import { useMemo, useState } from "react";
import { calculatePrice } from "@/lib/pricing";
import CryptoPaymentOptions from "./CryptoPaymentOptions";

type PaymentMethod = "usd" | "eth" | "btc" | "sol" | "usdc";

export default function BookingPanel({ pricePerMinute, spaceId }: { pricePerMinute: number; spaceId?: string }) {
  const [minutes, setMinutes] = useState(30);
  const [computeEnabled, setComputeEnabled] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("usd");
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);

  const currencyMap: Record<PaymentMethod, "USD" | "ETH" | "BTC" | "SOL" | "USDC"> = {
    usd: "USD",
    eth: "ETH",
    btc: "BTC",
    sol: "SOL",
    usdc: "USDC"
  };

  const ledger = useMemo(() => calculatePrice(minutes, pricePerMinute, computeEnabled, currencyMap[paymentMethod]), [minutes, pricePerMinute, computeEnabled, paymentMethod]);

  const handleRequestBooking = async () => {
    if (!spaceId) {
      setBookingStatus("error");
      return;
    }

    setLoading(true);
    setBookingStatus(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spaceId,
          minutes,
          paymentMethod,
          computeEnabled,
          userId: "user_123" // In production, get from auth
        })
      });

      if (!response.ok) throw new Error("Booking failed");

      const data = await response.json();
      setBookingStatus("success");
      console.log("[v0] Booking created:", data);
    } catch (error) {
      setBookingStatus("error");
      console.error("[v0] Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="neo-card rounded-2xl p-4">
      <h4 className="mb-3 font-semibold text-primary">Booking panel</h4>
      
      <label className="mb-2 block text-sm text-textMuted">Minutes</label>
      <input 
        type="range" 
        min={15} 
        max={180} 
        step={15} 
        value={minutes} 
        onChange={(e) => setMinutes(Number(e.target.value))} 
        className="w-full accent-primary" 
      />
      <p className="mt-2 text-sm text-text">{minutes} minutes selected</p>

      <label className="mt-3 flex items-center gap-2 text-sm text-text">
        <input 
          type="checkbox" 
          checked={computeEnabled} 
          onChange={(e) => setComputeEnabled(e.target.checked)} 
          className="accent-primary" 
        /> 
        Pay with compute
      </label>

      <div className="mt-4 space-y-1 text-sm text-text">
        <p>Cash price: <span className="text-primary">${ledger.basePrice.toFixed(2)}</span></p>
        <p>Compute discount: <span className="text-secondary">-${ledger.computeCredit.toFixed(2)}</span></p>
        <p className="font-semibold text-primary">Final price: {paymentMethod === "usd" ? `$${ledger.finalPrice.toFixed(2)}` : `${ledger.cryptoAmount?.toFixed(8)} ${ledger.currency}`}</p>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <label className="text-sm text-textMuted font-semibold">Payment Method</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["usd", "eth", "btc", "sol", "usdc"] as PaymentMethod[]).map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`neo-button rounded-lg px-3 py-2 text-xs font-medium transition ${
                  paymentMethod === method 
                    ? "ring-2 ring-primary" 
                    : "hover:ring-1 hover:ring-primary/50"
                }`}
              >
                {method.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {paymentMethod !== "usd" && (
          <CryptoPaymentOptions 
            cryptoAmount={ledger.cryptoAmount} 
            currency={ledger.currency}
            onCryptoSelect={(crypto) => setPaymentMethod(crypto.toLowerCase() as PaymentMethod)}
          />
        )}
      </div>

      {bookingStatus && (
        <div className={`mt-4 rounded-lg p-3 text-sm ${
          bookingStatus === "success" 
            ? "neo-card bg-accent text-primary" 
            : "neo-card bg-sunset/20 border border-sunset text-sunset"
        }`}>
          {bookingStatus === "success" 
            ? "✓ Booking request submitted! Check your messages for confirmation." 
            : "✗ Failed to create booking. Please try again."}
        </div>
      )}

      <button 
        onClick={handleRequestBooking}
        disabled={loading}
        className="neo-button mt-4 w-full rounded-xl text-primary font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? "Processing..." : "Request booking"}
      </button>
    </div>
  );
}
