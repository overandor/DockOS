export default function PartnershipCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-soft">
      <h3 className="font-semibold text-navy">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}
