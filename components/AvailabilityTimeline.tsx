import { AvailabilityWindow } from "@/lib/types";

export default function AvailabilityTimeline({ windows }: { windows: AvailabilityWindow[] }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-soft">
      <h4 className="mb-2 font-semibold text-navy">Availability timeline</h4>
      <div className="space-y-2">
        {windows.map((window) => (
          <div key={window.id} className="flex items-center justify-between rounded-xl bg-bg px-3 py-2 text-sm">
            <span>{window.start} - {window.end}</span>
            <span className="text-harbor">{window.availableMinutes} min open</span>
          </div>
        ))}
      </div>
    </div>
  );
}
