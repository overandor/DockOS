"use client";

import { useEffect, useState, useRef } from "react";
import { Message } from "@/lib/types";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

interface MessageThreadProps {
  conversationId: string;
  participantName: string;
  currentUserId?: string;
}

export default function MessageThread({
  conversationId,
  participantName,
  currentUserId = "user-current"
}: MessageThreadProps) {
  const [threadMessages, setThreadMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [threadMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/messages/thread?conversationId=${conversationId}`);
      if (res.ok) {
        const data = await res.json();
        setThreadMessages(data);
        
        // Mark messages as read
        const unreadIds = data.filter((m: Message) => !m.read && m.toUserId === currentUserId).map((m: Message) => m.id);
        if (unreadIds.length > 0) {
          await fetch("/api/messages/read", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messageIds: unreadIds })
          });
        }
      }
    } catch (error) {
      console.error("[v0] Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    try {
      const res = await fetch("/api/messages/thread", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          fromUserId: currentUserId,
          toUserId: conversationId.includes(currentUserId) ? 
            (conversationId === "conv-1" ? "user-1" : conversationId === "conv-2" ? "user-2" : "user-3") 
            : "unknown",
          body: text
        })
      });

      if (res.ok) {
        const newMessage = await res.json();
        setThreadMessages([...threadMessages, newMessage]);
      }
    } catch (error) {
      console.error("[v0] Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-full neo-card rounded-2xl p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-textMuted">Loading messages...</p>
          </div>
        ) : threadMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-textMuted">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          threadMessages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isCurrentUser={msg.fromUserId === currentUserId}
              senderName={msg.fromUserId === currentUserId ? "You" : participantName}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={handleSendMessage} loading={loading} />
    </div>
  );
}
