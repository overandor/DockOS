import AvailabilityTimeline from "@/components/AvailabilityTimeline";
import BookingPanel from "@/components/BookingPanel";
import ComputePayPanel from "@/components/ComputePayPanel";
import LLMRecommendationBox from "@/components/LLMRecommendationBox";
import SpaceQAChat from "@/components/SpaceQAChat";
import { getSpace } from "@/lib/dockos";
import { getListingRecommendation } from "@/lib/hf-llm";
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
          <h3 className="font-semibold text-primary mb-3">Rules</h3>
          <ul className="list-inside list-disc text-sm text-text space-y-1">{space.rules.notes.map((n) => <li key={n}>{n}</li>)}</ul>
          <p className="mt-4 text-sm text-textMuted">Host: <span className="text-primary">{space.host.name}</span> ⭐ {space.host.rating}</p>
        </div>
        <AvailabilityTimeline windows={space.availability} />
        <LLMRecommendationBox recommendation={recommendation} />
        <SpaceQAChat space={space} />
      </div>
      <div className="space-y-4">
        <BookingPanel pricePerMinute={space.pricePerMinute} />
        <ComputePayPanel />
      </div>
    </div>
  );
}
