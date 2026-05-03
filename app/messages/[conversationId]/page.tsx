import ConversationList from "@/components/ConversationList";
import MessageThread from "@/components/MessageThread";
import { allUsers, conversations } from "@/lib/mock-data";

export default function MessageThreadPage({ params }: { params: { conversationId: string } }) {
  const conversation = conversations.find(c => c.id === params.conversationId);
  
  if (!conversation) {
    return (
      <div className="neo-card rounded-2xl p-8 text-center">
        <p className="text-primary font-semibold">Conversation not found</p>
      </div>
    );
  }

  const otherUserId = conversation.participantIds[0] === "user-current" 
    ? conversation.participantIds[1] 
    : conversation.participantIds[0];
  
  const otherUser = allUsers.find(u => u.id === otherUserId);

  return (
    <div className="grid gap-6 lg:grid-cols-3 h-full">
      <div className="lg:col-span-1">
        <h1 className="text-3xl font-bold text-primary mb-4">Messages</h1>
        <ConversationList currentUserId="user-current" selectedConversationId={params.conversationId} />
      </div>
      <div className="lg:col-span-2 space-y-4">
        <div className="neo-card rounded-2xl p-4">
          <h2 className="text-xl font-bold text-primary">{otherUser?.name || "Unknown"}</h2>
          <p className="text-sm text-textMuted">
            {otherUser?.role} • {otherUser?.verified && "Verified"} • Rating: {otherUser?.rating}
          </p>
        </div>
        <MessageThread
          conversationId={params.conversationId}
          participantName={otherUser?.name || "User"}
          currentUserId="user-current"
        />
      </div>
    </div>
  );
}
