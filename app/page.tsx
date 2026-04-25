import Link from "next/link";

const sections = [
  { title: "Private Docks", text: "Couchify lets guests book private spaces by the minute." },
  { title: "Host Away Premium Spaces", text: "Turn idle space into live infrastructure." },
  { title: "ComputePay", text: "Pay with compute." },
  { title: "DockGrid", text: "DockGrid turns opted-in laptops into temporary edge nodes." },
  { title: "Partnership-ready ecosystem", text: "Designed for integration with modern infra and host inventory models." }
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-br from-white to-blue-50 p-8 shadow-soft">
        <p className="mb-2 text-sm uppercase tracking-wide text-harbor">DockOS powers scheduling, sessions, pricing, and rules.</p>
        <h1 className="text-4xl font-bold text-navy">Private space by the minute.</h1>
        <p className="mt-3 max-w-2xl text-gray-600">Dock into private spaces between home, work, and the city. Dock anywhere. Rest privately.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/explore" className="rounded-xl bg-harbor px-4 py-2 text-white">Explore Spaces</Link>
          <Link href="/host" className="rounded-xl bg-white px-4 py-2 text-navy shadow-soft">Become a Host</Link>
          <Link href="/compute" className="rounded-xl bg-sunset px-4 py-2 text-white">Claim Compute Node</Link>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <article key={section.title} className="rounded-2xl bg-white p-5 shadow-soft">
            <h2 className="font-semibold text-navy">{section.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{section.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
