"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { conversations } from "@/lib/mock-data";

export default function MessagesNav() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
    setUnreadCount(totalUnread);
  }, []);

  return (
    <Link href="/messages" className="relative">
      <span className="text-textMuted hover:text-primary transition-colors">messages</span>
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-sunset rounded-full">
          {unreadCount}
        </span>
      )}
    </Link>
  );
}
