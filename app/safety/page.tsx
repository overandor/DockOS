export default function SafetyPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Safety</h1>
      <div className="rounded-2xl bg-white p-5 shadow-soft">
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
          <li>Disputes and payout hold workflows.</li>
          <li>Compute consent logs and explicit opt-in records.</li>
          <li>Safety rules for private docks and conduct moderation.</li>
        </ul>
      </div>
    </div>
  );
}
