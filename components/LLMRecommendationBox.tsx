export default function LLMRecommendationBox({ recommendation }: { recommendation: string }) {
  return (
    <div className="rounded-2xl border border-softgray bg-white p-4">
      <h4 className="font-semibold text-navy">LLM recommendation</h4>
      <p className="text-sm text-gray-700">{recommendation}</p>
    </div>
  );
}
