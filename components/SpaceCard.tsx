import Link from "next/link";
import { SpaceUnit } from "@/lib/types";
import HostAwayBadge from "./HostAwayBadge";
import PremiumDockBadge from "./PremiumDockBadge";

export default function SpaceCard({ space }: { space: SpaceUnit }) {
  return (
    <Link href={`/spaces/${space.id}`} className="neo-card rounded-3xl p-5 transition hover:-translate-y-1">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-primary">{space.title}</h3>
        <p className="text-sm text-secondary">{space.distanceMiles} mi</p>
      </div>
      <div className="mb-3 flex gap-2">
        {space.hostAway && <HostAwayBadge />}
        {space.type === "Private Dock" && <PremiumDockBadge />}
        {space.computeDiscountAvailable && <span className="rounded-full bg-sunset/20 px-2 py-1 text-xs text-sunset">ComputePay</span>}
      </div>
      <p className="text-sm text-textMuted">{space.type} · {space.availableMinutes} min available</p>
      <p className="text-sm text-text">${space.pricePerMinute.toFixed(2)}/min · <span className="text-primary">⭐</span> {space.rating}</p>
      <p className="mt-2 text-xs text-textMuted">Privacy: {space.privacyLevel}</p>
    </Link>
  );
}
