import { spaces } from "@/lib/mock-data";

export default function HostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Host dashboard</h1>
      <section className="grid gap-3 md:grid-cols-4">
        {[
          ["Revenue today", "$428.70"],
          ["Active sessions", "4"],
          ["Pending requests", "9"],
          ["Occupancy rate", "76%"]
        ].map(([k, v]) => <div key={k} className="rounded-2xl bg-white p-4 shadow-soft"><p className="text-xs text-gray-500">{k}</p><p className="text-xl font-semibold">{v}</p></div>)}
      </section>
      <section className="rounded-2xl bg-white p-5 shadow-soft">
        <h2 className="font-semibold">Host-away premium windows</h2>
        <p className="text-sm text-gray-600">Partnership-ready hosting windows and compute-friendly space controls.</p>
      </section>
      <section className="grid gap-3 md:grid-cols-2">
        {spaces.map((s) => <div key={s.id} className="rounded-xl bg-white p-4 shadow-soft"><p className="font-medium">{s.title}</p><p className="text-sm text-gray-600">Compute-friendly: {s.computeDiscountAvailable ? "Yes" : "No"}</p></div>)}
      </section>
    </div>
  );
}
