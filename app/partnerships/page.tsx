import PartnershipCard from "@/components/PartnershipCard";

const cards = [
  ["Docker Runtime Layer", "Designed for integration with Docker-compatible container workflows."],
  ["Render Edge Deployment Layer", "Designed for Render-style deployment and edge workload routing."],
  ["Airbnb Host Inventory Layer", "Compatible with host inventory models like Airbnb."],
  ["DockGrid Compute Marketplace", "DockGrid turns opted-in laptops into temporary edge nodes."],
  ["Couchify Consumer App", "Partnership-ready architecture for private docks and ComputePay."]
];

export default function PartnershipsPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Partnership-ready ecosystem</h1>
      <div className="grid gap-4 md:grid-cols-2">{cards.map(([title, description]) => <PartnershipCard key={title} title={title} description={description} />)}</div>
    </div>
  );
}
