import WalletConnect from "@/components/WalletConnect";
import Link from "next/link";

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="neo-card rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Connect Wallet</h1>
            <p className="text-textMuted">Sign in with your Web3 wallet</p>
          </div>

          <WalletConnect />

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-textMuted">Or use email</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link href="/auth/login" className="neo-button w-full rounded-lg px-4 py-3 font-semibold text-primary text-center">
              Sign In
            </Link>
            <Link href="/auth/signup" className="neo-button w-full rounded-lg px-4 py-3 font-semibold text-primary text-center">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
