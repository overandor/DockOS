"use client";

import { useMemo, useState } from "react";
import { calculatePrice } from "@/lib/pricing";

export default function BookingPanel({ pricePerMinute }: { pricePerMinute: number }) {
  const [minutes, setMinutes] = useState(30);
  const [computeEnabled, setComputeEnabled] = useState(true);
  const ledger = useMemo(() => calculatePrice(minutes, pricePerMinute, computeEnabled), [minutes, pricePerMinute, computeEnabled]);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-soft">
      <h4 className="mb-3 font-semibold text-navy">Booking panel</h4>
      <label className="mb-2 block text-sm text-gray-600">Minutes</label>
      <input type="range" min={15} max={180} step={15} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className="w-full" />
      <p className="mt-2 text-sm">{minutes} minutes selected</p>
      <label className="mt-3 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={computeEnabled} onChange={(e) => setComputeEnabled(e.target.checked)} /> Pay with compute
      </label>
      <div className="mt-3 space-y-1 text-sm">
        <p>Cash price: ${ledger.basePrice.toFixed(2)}</p>
        <p>Compute discount: -${ledger.computeCredit.toFixed(2)}</p>
        <p className="font-semibold text-harbor">Final price: ${ledger.finalPrice.toFixed(2)}</p>
      </div>
      <button className="mt-4 w-full rounded-xl bg-harbor px-4 py-2 text-white">Request booking</button>
    </div>
  );
}
