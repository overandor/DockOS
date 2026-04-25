import AvailabilityTimeline from "@/components/AvailabilityTimeline";
import BookingPanel from "@/components/BookingPanel";
import ComputePayPanel from "@/components/ComputePayPanel";
import LLMRecommendationBox from "@/components/LLMRecommendationBox";
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
        <div className="h-64 rounded-3xl bg-gradient-to-br from-blue-100 to-orange-100 p-5 shadow-soft">
          <h1 className="text-2xl font-bold">{space.title}</h1>
          <p className="text-sm text-gray-700">{space.description}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-soft">
          <h3 className="font-semibold">Rules</h3>
          <ul className="list-inside list-disc text-sm text-gray-600">{space.rules.notes.map((n) => <li key={n}>{n}</li>)}</ul>
          <p className="mt-2 text-sm">Host: {space.host.name} ⭐ {space.host.rating}</p>
        </div>
        <AvailabilityTimeline windows={space.availability} />
        <LLMRecommendationBox recommendation={recommendation} />
      </div>
      <div className="space-y-4">
        <BookingPanel pricePerMinute={space.pricePerMinute} />
        <ComputePayPanel />
      </div>
    </div>
  );
}
