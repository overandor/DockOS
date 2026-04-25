import SpaceCard from "@/components/SpaceCard";
import { getExploreResults } from "@/lib/dockos";

const filters = ["Available Now", "Host Away", "Private Dock", "Couch", "Desk", "Quiet Room", "Compute Discount", "Wi-Fi", "Restroom"];

export default async function ExplorePage() {
  const spaces = await getExploreResults();
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Explore spaces</h1>
      <div className="mb-6 flex flex-wrap gap-2">{filters.map((f) => <span key={f} className="rounded-full bg-white px-3 py-1 text-xs shadow-soft">{f}</span>)}</div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{spaces.map((space) => <SpaceCard key={space.id} space={space} />)}</div>
    </div>
  );
}
