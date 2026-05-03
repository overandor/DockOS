import Link from "next/link";

const sections = [
  { title: "Private Docks", text: "Couchify lets guests book private spaces by the minute.", icon: "🏠" },
  { title: "Host Away Premium Spaces", text: "Turn idle space into live infrastructure.", icon: "🌐" },
  { title: "ComputePay", text: "Pay with compute.", icon: "⚡" },
  { title: "DockGrid", text: "DockGrid turns opted-in laptops into temporary edge nodes.", icon: "🔗" },
  { title: "Partnership-ready ecosystem", text: "Designed for integration with modern infra and host inventory models.", icon: "🤝" }
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="neo-card rounded-3xl p-8">
        <p className="mb-2 text-sm uppercase tracking-wide text-primary">DockOS powers scheduling, sessions, pricing, and rules.</p>
        <h1 className="text-4xl font-bold text-primary">Private space by the minute.</h1>
        <p className="mt-3 max-w-2xl text-text">Dock into private spaces between home, work, and the city. Dock anywhere. Rest privately.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/explore" className="neo-button rounded-xl px-6 py-3 text-primary font-medium hover:text-primaryLight">Explore Spaces</Link>
          <Link href="/host" className="neo-button rounded-xl px-6 py-3 text-primary font-medium hover:text-primaryLight">Become a Host</Link>
          <Link href="/compute" className="rounded-xl bg-sunset/20 border border-sunset px-6 py-3 text-sunset font-medium hover:bg-sunset/30 transition">Claim Compute Node</Link>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <article key={section.title} className="neo-card rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{section.icon}</span>
              <div>
                <h2 className="font-semibold text-primary">{section.title}</h2>
                <p className="mt-2 text-sm text-text">{section.text}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
