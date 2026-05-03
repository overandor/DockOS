import SpaceCard from "@/components/SpaceCard";
import { getExploreResults } from "@/lib/dockos";

const filters = ["Available Now", "Host Away", "Private Dock", "Couch", "Desk", "Quiet Room", "Compute Discount", "Wi-Fi", "Restroom"];

export default async function ExplorePage() {
  const spaces = await getExploreResults();
  return (
    <div>
      <div className="mb-6">
        <h1 className="mb-4 text-3xl font-bold text-primary">Explore spaces</h1>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search with natural language... e.g. 'quiet place near downtown'"
            className="neo-input w-full rounded-2xl px-4 py-3 outline-none"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">🔍</span>
        </div>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <span key={f} className="neo-card rounded-full px-3 py-1 text-xs text-text cursor-pointer hover:bg-primary/30 transition">
            {f}
          </span>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{spaces.map((space) => <SpaceCard key={space.id} space={space} />)}</div>
    </div>
  );
}
