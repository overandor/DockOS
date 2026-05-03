import { NextRequest, NextResponse } from "next/server";
import { answerSpaceQuestion } from "@/lib/hf-llm";
import { SPACES } from "@/lib/mock-data";

interface ChatRequest {
  question: string;
  spaceId: string;
  conversationHistory?: Array<{ role: string; content: string }>;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ChatRequest;
    const { question, spaceId, conversationHistory } = body;

    if (!question || !spaceId) {
      return NextResponse.json(
        { error: "Missing question or spaceId" },
        { status: 400 }
      );
    }

    const space = SPACES.find(s => s.id === spaceId);
    if (!space) {
      return NextResponse.json(
        { error: "Space not found" },
        { status: 404 }
      );
    }

    const contextString = conversationHistory
      ?.slice(-4)
      .map(m => `${m.role}: ${m.content}`)
      .join("\n");

    const answer = await answerSpaceQuestion(question, space, contextString);

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("[v0] Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
