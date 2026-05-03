"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type AuthFormProps = {
  mode: "login" | "signup";
  onSubmit?: (data: { email: string; password: string }) => Promise<void>;
};

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "signup" && password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || `${mode === "login" ? "Login" : "Signup"} failed`);
        return;
      }

      const data = await response.json();
      localStorage.setItem("auth-user", JSON.stringify(data.user));
      router.push("/explore");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("[v0] Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="alert-error rounded-lg p-3">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm text-textMuted mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="neo-input w-full rounded-lg px-4 py-3"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-textMuted mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="neo-input w-full rounded-lg px-4 py-3"
          required
        />
      </div>

      {mode === "signup" && (
        <div>
          <label className="block text-sm text-textMuted mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="neo-input w-full rounded-lg px-4 py-3"
            required
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="neo-button w-full rounded-lg px-4 py-3 font-semibold text-primary disabled:opacity-50"
      >
        {loading ? "Processing..." : mode === "login" ? "Sign In" : "Create Account"}
      </button>

      <div className="text-center text-sm text-textMuted">
        {mode === "login" ? (
          <>
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:text-primaryLight">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:text-primaryLight">
              Sign in
            </Link>
          </>
        )}
      </div>
    </form>
  );
}
