"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Conversation } from "@/lib/types";
import { allUsers } from "@/lib/mock-data";

interface ConversationListProps {
  currentUserId?: string;
  selectedConversationId?: string;
}

export default function ConversationList({
  currentUserId = "user-current",
  selectedConversationId
}: ConversationListProps) {
  const [convList, setConvList] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, [currentUserId]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/messages/conversations?userId=${currentUserId}`);
      if (res.ok) {
        const data = await res.json();
        setConvList(data);
      }
    } catch (error) {
      console.error("[v0] Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const getOtherParticipant = (participantIds: [string, string]) => {
    const otherId = participantIds[0] === currentUserId ? participantIds[1] : participantIds[0];
    return allUsers.find(u => u.id === otherId) || { id: otherId, name: "Unknown User", role: "guest" as const, verified: false, rating: 0 };
  };

  return (
    <div className="space-y-2">
      {loading ? (
        <div className="text-center py-8 text-textMuted">Loading conversations...</div>
      ) : convList.length === 0 ? (
        <div className="text-center py-8 text-textMuted">No conversations yet</div>
      ) : (
        convList.map((conv) => {
          const otherUser = getOtherParticipant(conv.participantIds);
          const isSelected = selectedConversationId === conv.id;
          
          return (
            <Link
              key={conv.id}
              href={`/messages/${conv.id}`}
              className={`neo-card block rounded-2xl p-4 transition hover:ring-1 hover:ring-primary ${
                isSelected ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-primary truncate">{otherUser.name}</p>
                    {conv.unreadCount > 0 && (
                      <span className="flex-shrink-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-sunset rounded-full">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text truncate mt-1">
                    {conv.lastMessage?.body || "No messages"}
                  </p>
                  <p className="text-xs text-textMuted mt-1">
                    {new Date(conv.lastMessageAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}
