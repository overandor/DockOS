import ComputeNodeCard from "@/components/ComputeNodeCard";
import { getComputeJobs } from "@/lib/dockos";

export default async function ComputePage() {
  const jobs = await getComputeJobs();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">DockGrid compute</h1>
      <div className="rounded-2xl bg-white p-5 shadow-soft">
        <button className="rounded-xl bg-harbor px-4 py-2 text-white">Claim Compute Node</button>
        <p className="mt-2 text-sm">Explicit opt-in only · no hidden compute · no mining · no arbitrary unsafe code · simulated jobs only in MVP.</p>
        <div className="mt-4 rounded-xl bg-bg p-4">
          <p className="font-medium">Opt-in consent modal (MVP)</p>
          <p className="text-sm text-gray-600">By opting in you authorize temporary safe-mode workloads.</p>
        </div>
      </div>
      <section className="grid gap-3 md:grid-cols-2">{jobs.map((j) => <ComputeNodeCard key={j.id} job={j} />)}</section>
      <section className="rounded-2xl bg-white p-5 shadow-soft">
        <h2 className="font-semibold">Active compute session</h2>
        <p className="text-sm">Earnings meter: $5.40 today</p>
        <button className="mt-3 rounded-lg bg-sunset px-3 py-2 text-sm text-white">Instant stop</button>
      </section>
    </div>
  );
}
