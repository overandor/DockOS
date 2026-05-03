export default function LLMRecommendationBox({ recommendation }: { recommendation: string }) {
  return (
    <div className="neo-card rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <div className="text-primary text-lg">✨</div>
        <div className="flex-1">
          <h4 className="font-semibold text-primary mb-2">AI Insight</h4>
          <p className="text-sm text-text leading-relaxed">{recommendation}</p>
        </div>
      </div>
    </div>
  );
}
