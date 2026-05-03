import ConversationList from "@/components/ConversationList";

export default function MessagesPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-3 h-full">
      <div className="lg:col-span-1">
        <h1 className="text-3xl font-bold text-primary mb-4">Messages</h1>
        <ConversationList currentUserId="user-current" />
      </div>
      <div className="lg:col-span-2">
        <div className="neo-card rounded-2xl p-8 h-full flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl text-primary font-semibold mb-2">Select a conversation</p>
            <p className="text-textMuted">Choose a conversation from the list to start messaging</p>
          </div>
        </div>
      </div>
    </div>
  );
}
