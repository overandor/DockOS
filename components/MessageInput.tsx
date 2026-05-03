"use client";

import { useState, useRef, useEffect } from "react";

interface MessageInputProps {
  onSendMessage: (message: string) => Promise<void>;
  loading?: boolean;
}

export default function MessageInput({ onSendMessage, loading = false }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!message.trim() || isSending) return;

    setIsSending(true);
    try {
      await onSendMessage(message);
      setMessage("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="neo-card rounded-2xl p-4">
      <div className="flex gap-3">
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message... (Shift+Enter for new line)"
          className="neo-input flex-1 rounded-xl resize-none p-3 outline-none text-sm"
          rows={2}
          disabled={isSending || loading}
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() || isSending || loading}
          className="neo-button self-end rounded-xl px-4 py-2 text-primary font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isSending ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
