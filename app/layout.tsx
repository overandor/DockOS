import type { Metadata } from "next";
import "./globals.css";
import Logo from "@/components/Logo";
import MessagesNav from "@/components/MessagesNav";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Couchify · Powered by DockOS",
  description: "Private space by the minute."
};

const nav = ["explore", "host", "compute", "partnerships", "profile", "safety"];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-text">
        <header className="sticky top-0 z-10 border-b border-border bg-surface/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Logo />
            <nav className="hidden gap-4 md:flex">
              {nav.map((item) => <Link key={item} href={`/${item}`} className="text-sm capitalize text-textMuted hover:text-primary transition-colors">{item}</Link>)}
              <MessagesNav />
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-textMuted">Powered by DockOS.</footer>
      </body>
    </html>
  );
}
