import { NextRequest, NextResponse } from "next/server";
import { messages } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  try {
    const conversationId = req.nextUrl.searchParams.get("conversationId");
    if (!conversationId) {
      return NextResponse.json({ error: "conversationId required" }, { status: 400 });
    }

    const threadMessages = messages
      .filter(m => m.conversationId === conversationId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    return NextResponse.json(threadMessages);
  } catch (error) {
    console.error("[v0] Error fetching messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { conversationId, fromUserId, toUserId, body } = await req.json();
    if (!conversationId || !fromUserId || !toUserId || !body) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      fromUserId,
      toUserId,
      body,
      createdAt: new Date().toISOString(),
      read: false
    };

    console.log("[v0] Message created:", newMessage);
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("[v0] Error sending message:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
