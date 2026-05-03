"use client";

import { useMemo, useState } from "react";
import { calculatePrice } from "@/lib/pricing";

export default function BookingPanel({ pricePerMinute }: { pricePerMinute: number }) {
  const [minutes, setMinutes] = useState(30);
  const [computeEnabled, setComputeEnabled] = useState(true);
  const ledger = useMemo(() => calculatePrice(minutes, pricePerMinute, computeEnabled), [minutes, pricePerMinute, computeEnabled]);

  return (
    <div className="neo-card rounded-2xl p-4">
      <h4 className="mb-3 font-semibold text-primary">Booking panel</h4>
      <label className="mb-2 block text-sm text-textMuted">Minutes</label>
      <input type="range" min={15} max={180} step={15} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className="w-full accent-primary" />
      <p className="mt-2 text-sm text-text">{minutes} minutes selected</p>
      <label className="mt-3 flex items-center gap-2 text-sm text-text">
        <input type="checkbox" checked={computeEnabled} onChange={(e) => setComputeEnabled(e.target.checked)} className="accent-primary" /> Pay with compute
      </label>
      <div className="mt-3 space-y-1 text-sm text-text">
        <p>Cash price: <span className="text-primary">${ledger.basePrice.toFixed(2)}</span></p>
        <p>Compute discount: <span className="text-secondary">-${ledger.computeCredit.toFixed(2)}</span></p>
        <p className="font-semibold text-primary">Final price: ${ledger.finalPrice.toFixed(2)}</p>
      </div>
      <button className="neo-button mt-4 w-full rounded-xl text-primary font-medium">Request booking</button>
    </div>
  );
}
