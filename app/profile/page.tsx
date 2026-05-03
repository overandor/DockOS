"use client";

import { useProtectedRoute } from "@/lib/useAuth";

export default function ProfilePage() {
  const { user, isLoading } = useProtectedRoute();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textMuted">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Profile</h1>
        <p className="text-textMuted">Manage your account settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="neo-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-textMuted mb-1">User ID</label>
              <p className="text-text font-mono text-sm">{user.userId}</p>
            </div>
            <div>
              <label className="block text-sm text-textMuted mb-1">Email</label>
              <p className="text-text">{user.email}</p>
            </div>
            {user.walletAddress && (
              <div>
                <label className="block text-sm text-textMuted mb-1">Wallet Address</label>
                <p className="text-text font-mono text-sm">{user.walletAddress.substring(0, 6)}...{user.walletAddress.substring(user.walletAddress.length - 4)}</p>
              </div>
            )}
            <div>
              <label className="block text-sm text-textMuted mb-1">Role</label>
              <p className="text-text capitalize">{user.role}</p>
            </div>
            <div>
              <label className="block text-sm text-textMuted mb-1">Verification Status</label>
              <p className={user.verified ? "text-success" : "text-warning"}>{user.verified ? "Verified" : "Pending"}</p>
            </div>
          </div>
        </div>

        <div className="neo-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Security</h2>
          <div className="space-y-4">
            <button className="neo-button w-full rounded-lg px-4 py-3 text-primary font-medium text-left">
              Change Password
            </button>
            {!user.walletAddress && (
              <button className="neo-button w-full rounded-lg px-4 py-3 text-primary font-medium text-left">
                Link Wallet
              </button>
            )}
            <button className="neo-button w-full rounded-lg px-4 py-3 text-primary font-medium text-left">
              Two-Factor Authentication
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
