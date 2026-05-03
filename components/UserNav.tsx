"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type User = {
  userId: string;
  email: string;
  walletAddress?: string;
};

export default function UserNav() {
  const [user, setUser] = useState<User | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("auth-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("auth-user");
    router.push("/auth/login");
  };

  if (!user) {
    return (
      <div className="flex gap-3">
        <Link href="/auth/login" className="neo-button rounded-lg px-4 py-2 text-sm text-primary font-medium">
          Sign In
        </Link>
        <Link href="/auth/signup" className="neo-button rounded-lg px-4 py-2 text-sm text-primary font-medium">
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="neo-button rounded-lg px-4 py-2 text-sm text-primary font-medium flex items-center gap-2"
      >
        {user.walletAddress ? user.walletAddress.substring(0, 6) : user.email}
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 neo-card rounded-lg p-2 z-50">
          <Link href="/profile" className="block px-4 py-2 text-sm text-text hover:text-primary rounded">
            Profile
          </Link>
          <Link href="/messages" className="block px-4 py-2 text-sm text-text hover:text-primary rounded">
            Messages
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 rounded"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
