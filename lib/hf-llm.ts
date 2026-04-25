import { SpaceUnit } from "./types";

const HF_URL = process.env.NEXT_PUBLIC_HF_SPACE_URL;

export async function getListingRecommendation(space: SpaceUnit): Promise<string> {
  if (!HF_URL) {
    return "This is a strong private dock because it combines a quiet rule set, clear availability, and optional ComputePay discount.";
  }

  try {
    const res = await fetch(HF_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: space.title, amenities: space.amenities, rules: space.rules })
    });
    if (!res.ok) throw new Error("HF space unavailable");
    const data = await res.json() as { recommendation?: string };
    return data.recommendation ?? "This listing has solid private dock potential.";
  } catch {
    return "This is a strong private dock because it combines a quiet rule set, clear availability, and optional ComputePay discount.";
  }
}
