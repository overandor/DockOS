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

export async function generateListingTitle(description: string, amenities: string[]): Promise<string> {
  if (!HF_URL) {
    return "Modern Private Dock with Premium Amenities";
  }

  try {
    const res = await fetch(HF_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "generate_title",
        description,
        amenities
      })
    });
    if (!res.ok) throw new Error("HF space unavailable");
    const data = await res.json() as { title?: string };
    return data.title ?? "Premium Private Dock";
  } catch {
    return "Premium Private Dock";
  }
}

export async function generateListingDescription(title: string, amenities: string[], location: string): Promise<string> {
  if (!HF_URL) {
    return `Welcome to this premium dock space located in ${location}. This listing offers exceptional comfort with amenities including ${amenities.join(", ")}. Perfect for remote work and productive computing sessions.`;
  }

  try {
    const res = await fetch(HF_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "generate_description",
        title,
        amenities,
        location
      })
    });
    if (!res.ok) throw new Error("HF space unavailable");
    const data = await res.json() as { description?: string };
    return data.description ?? `Welcome to ${title}. A wonderful space in ${location}.`;
  } catch {
    return `Welcome to ${title}. A wonderful space in ${location}.`;
  }
}

export async function generateAmenities(theme: string, spaceType: string): Promise<string[]> {
  if (!HF_URL) {
    return ["High-speed WiFi", "Quiet workspace", "Ergonomic seating", "Natural lighting", "Climate control"];
  }

  try {
    const res = await fetch(HF_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "generate_amenities",
        theme,
        spaceType
      })
    });
    if (!res.ok) throw new Error("HF space unavailable");
    const data = await res.json() as { amenities?: string[] };
    return data.amenities ?? ["High-speed WiFi", "Quiet workspace", "Ergonomic seating"];
  } catch {
    return ["High-speed WiFi", "Quiet workspace", "Ergonomic seating"];
  }
}

export async function generateRules(amenities: string[], hostStyle: string): Promise<string[]> {
  if (!HF_URL) {
    return ["No smoking", "Quiet hours 10 PM - 8 AM", "No loud music or parties", "Respect shared spaces"];
  }

  try {
    const res = await fetch(HF_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "generate_rules",
        amenities,
        hostStyle
      })
    });
    if (!res.ok) throw new Error("HF space unavailable");
    const data = await res.json() as { rules?: string[] };
    return data.rules ?? ["No smoking", "Quiet hours 10 PM - 8 AM", "Respect shared spaces"];
  } catch {
    return ["No smoking", "Quiet hours 10 PM - 8 AM", "Respect shared spaces"];
  }
}

export async function answerSpaceQuestion(question: string, space: SpaceUnit, conversationContext?: string): Promise<string> {
  if (!HF_URL) {
    return `This is a great question about our ${space.title}! Based on our space details, I can tell you that we offer amenities including ${space.amenities.join(", ")}. Feel free to ask more!`;
  }

  try {
    const res = await fetch(HF_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "answer_question",
        question,
        spaceInfo: {
          title: space.title,
          amenities: space.amenities,
          rules: space.rules,
          location: space.location,
          pricePerMinute: space.pricePerMinute
        },
        context: conversationContext
      })
    });
    if (!res.ok) throw new Error("HF space unavailable");
    const data = await res.json() as { answer?: string };
    return data.answer ?? `Thanks for asking about our space! We'd be happy to help.`;
  } catch {
    return `Thanks for asking about our space! We'd be happy to help.`;
  }
}

export async function rankSearchResults(query: string, spaces: SpaceUnit[]): Promise<SpaceUnit[]> {
  if (!HF_URL) {
    return spaces;
  }

  try {
    const res = await fetch(HF_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "rank_search",
        query,
        spaces: spaces.map(s => ({
          id: s.id,
          title: s.title,
          amenities: s.amenities,
          location: s.location,
          rules: s.rules
        }))
      })
    });
    if (!res.ok) throw new Error("HF space unavailable");
    const data = await res.json() as { rankedIds?: string[] };
    
    if (data.rankedIds) {
      const rankMap = new Map(data.rankedIds.map((id, idx) => [id, idx]));
      return spaces.sort((a, b) => {
        const rankA = rankMap.get(a.id) ?? spaces.length;
        const rankB = rankMap.get(b.id) ?? spaces.length;
        return rankA - rankB;
      });
    }
    return spaces;
  } catch {
    return spaces;
  }
}
