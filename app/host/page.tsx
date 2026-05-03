import { spaces } from "@/lib/mock-data";

export default function HostPage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Host dashboard</h1>
        <p className="text-textMuted">Powered by AI to help you list and manage spaces better</p>
      </div>
      <section className="grid gap-3 md:grid-cols-4">
        {[
          ["Revenue today", "$428.70"],
          ["Active sessions", "4"],
          ["Pending requests", "9"],
          ["Occupancy rate", "76%"]
        ].map(([k, v]) => <div key={k} className="neo-card rounded-2xl p-4"><p className="text-xs text-textMuted">{k}</p><p className="text-xl font-semibold text-primary">{v}</p></div>)}
      </section>
      <section className="neo-card rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-semibold text-primary mb-1">AI-Powered Listing Assistant</h2>
            <p className="text-sm text-text">Get AI suggestions for titles, descriptions, and amenities to fill up your listings and answer guest questions automatically.</p>
          </div>
          <span className="text-3xl flex-shrink-0">✨</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="neo-button rounded-lg px-4 py-2 text-primary font-medium text-sm hover:text-primaryLight">Generate Title</button>
          <button className="neo-button rounded-lg px-4 py-2 text-primary font-medium text-sm hover:text-primaryLight">Generate Description</button>
          <button className="neo-button rounded-lg px-4 py-2 text-primary font-medium text-sm hover:text-primaryLight">Suggest Amenities</button>
          <button className="neo-button rounded-lg px-4 py-2 text-primary font-medium text-sm hover:text-primaryLight">Generate Rules</button>
        </div>
      </section>
      <section className="grid gap-3 md:grid-cols-2">
        {spaces.map((s) => <div key={s.id} className="neo-card rounded-xl p-4"><p className="font-medium text-primary">{s.title}</p><p className="text-sm text-text mt-1">Compute-friendly: <span className={s.computeDiscountAvailable ? "text-sunset" : "text-textMuted"}>{s.computeDiscountAvailable ? "Yes" : "No"}</span></p></div>)}
      </section>
    </div>
  );
}
