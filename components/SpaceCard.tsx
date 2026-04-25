import Link from "next/link";
import { SpaceUnit } from "@/lib/types";
import HostAwayBadge from "./HostAwayBadge";
import PremiumDockBadge from "./PremiumDockBadge";

export default function SpaceCard({ space }: { space: SpaceUnit }) {
  return (
    <Link href={`/spaces/${space.id}`} className="rounded-3xl bg-surface p-5 shadow-soft transition hover:-translate-y-1">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-navy">{space.title}</h3>
        <p className="text-sm text-harbor">{space.distanceMiles} mi</p>
      </div>
      <div className="mb-3 flex gap-2">
        {space.hostAway && <HostAwayBadge />}
        {space.type === "Private Dock" && <PremiumDockBadge />}
        {space.computeDiscountAvailable && <span className="rounded-full bg-sunset/10 px-2 py-1 text-xs text-sunset">ComputePay</span>}
      </div>
      <p className="text-sm text-gray-600">{space.type} · {space.availableMinutes} min available</p>
      <p className="text-sm text-gray-600">${space.pricePerMinute.toFixed(2)}/min · ⭐ {space.rating}</p>
      <p className="mt-2 text-xs text-gray-500">Privacy: {space.privacyLevel}</p>
    </Link>
  );
}
