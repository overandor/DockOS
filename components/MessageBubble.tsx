import { Message } from "@/lib/types";

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  senderName: string;
}

export default function MessageBubble({ message, isCurrentUser, senderName }: MessageBubbleProps) {
  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl ${
          isCurrentUser
            ? "neo-card bg-gradient-to-br from-primary/20 to-primaryLight/10 border border-primary/30"
            : "neo-card bg-gradient-to-br from-card to-surface border border-border/50"
        }`}
      >
        {!isCurrentUser && <p className="text-xs text-textMuted font-semibold mb-1">{senderName}</p>}
        <p className="text-sm text-text">{message.body}</p>
        <p className={`text-xs mt-1 ${isCurrentUser ? "text-primary/60" : "text-textMuted/60"}`}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          {isCurrentUser && message.read && " ✓✓"}
        </p>
      </div>
    </div>
  );
}
