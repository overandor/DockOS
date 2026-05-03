import { NextRequest, NextResponse } from "next/server";
import { conversations, messages } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    const userConversations = conversations
      .filter(c => c.participantIds.includes(userId))
      .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());

    return NextResponse.json(userConversations);
  } catch (error) {
    console.error("[v0] Error fetching conversations:", error);
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { participantId } = await req.json();
    if (!participantId) {
      return NextResponse.json({ error: "participantId required" }, { status: 400 });
    }

    const conversationId = `conv-${Date.now()}`;
    const newConversation = {
      id: conversationId,
      participantIds: ["user-current", participantId] as [string, string],
      lastMessageAt: new Date().toISOString(),
      unreadCount: 0,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(newConversation, { status: 201 });
  } catch (error) {
    console.error("[v0] Error creating conversation:", error);
    return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 });
  }
}
