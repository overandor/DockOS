import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="neo-card rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Welcome back</h1>
            <p className="text-textMuted">Sign in to your DockOS account</p>
          </div>

          <AuthForm mode="login" />

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-textMuted">Or continue with</span>
            </div>
          </div>

          <Link href="/auth/wallet" className="neo-button mt-6 w-full rounded-lg px-4 py-3 font-semibold text-primary flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            Wallet Connect
          </Link>
        </div>

        <p className="text-center text-textMuted text-sm mt-6">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-primary hover:text-primaryLight font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
