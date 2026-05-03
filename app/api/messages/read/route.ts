import { NextRequest, NextResponse } from "next/server";
import { messages } from "@/lib/mock-data";

export async function PATCH(req: NextRequest) {
  try {
    const { messageIds } = await req.json();
    if (!messageIds || !Array.isArray(messageIds)) {
      return NextResponse.json({ error: "messageIds array required" }, { status: 400 });
    }

    console.log("[v0] Marking messages as read:", messageIds);
    
    return NextResponse.json({ success: true, updated: messageIds.length });
  } catch (error) {
    console.error("[v0] Error marking messages as read:", error);
    return NextResponse.json({ error: "Failed to mark messages as read" }, { status: 500 });
  }
}
