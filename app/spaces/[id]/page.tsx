import AvailabilityTimeline from "@/components/AvailabilityTimeline";
import BookingPanel from "@/components/BookingPanel";
import ComputePayPanel from "@/components/ComputePayPanel";
import LLMRecommendationBox from "@/components/LLMRecommendationBox";
import SpaceQAChat from "@/components/SpaceQAChat";
import { getSpace } from "@/lib/dockos";
import { getListingRecommendation } from "@/lib/hf-llm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SpaceDetailPage({ params }: { params: { id: string } }) {
  const space = await getSpace(params.id);
  if (!space) return notFound();
  const recommendation = await getListingRecommendation(space);

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-4">
        <div className="h-64 rounded-3xl neo-card p-5">
          <h1 className="text-2xl font-bold text-primary mb-2">{space.title}</h1>
          <p className="text-sm text-text">{space.description}</p>
        </div>
        <div className="neo-card rounded-2xl p-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="font-semibold text-primary">Rules</h3>
              <p className="text-sm text-textMuted">Host: <span className="text-primary">{space.host.name}</span> ⭐ {space.host.rating}</p>
            </div>
            <Link
              href="/messages/conv-new"
              onClick={() => {
                // This would normally open a new conversation creation dialog
                // For now, we'll navigate to messages
              }}
              className="neo-button rounded-lg px-3 py-2 text-sm text-primary font-medium whitespace-nowrap"
            >
              Message Host
            </Link>
          </div>
          <ul className="list-inside list-disc text-sm text-text space-y-1">{space.rules.notes.map((n) => <li key={n}>{n}</li>)}</ul>
        </div>
        <AvailabilityTimeline windows={space.availability} />
        <LLMRecommendationBox recommendation={recommendation} />
        <SpaceQAChat space={space} />
      </div>
      <div className="space-y-4">
        <BookingPanel pricePerMinute={space.pricePerMinute} spaceId={space.id} />
        <ComputePayPanel />
      </div>
    </div>
  );
}
