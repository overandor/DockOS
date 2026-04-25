import { ComputeJob } from "@/lib/types";

export default function ComputeNodeCard({ job }: { job: ComputeJob }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-soft">
      <h4 className="font-semibold text-navy">{job.name}</h4>
      <p className="text-sm text-gray-600">{job.estimatedMinutes} min · ${job.reward.toFixed(2)} reward</p>
      <p className="text-xs text-gray-500">Safe-mode simulated job</p>
    </div>
  );
}
