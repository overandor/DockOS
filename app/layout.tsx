import type { Metadata } from "next";
import "./globals.css";
import Logo from "@/components/Logo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Couchify · Powered by DockOS",
  description: "Private space by the minute."
};

const nav = ["explore", "host", "compute", "partnerships", "profile", "messages", "safety"];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-10 border-b border-softgray/70 bg-bg/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Logo />
            <nav className="hidden gap-4 md:flex">
              {nav.map((item) => <Link key={item} href={`/${item}`} className="text-sm capitalize text-gray-600 hover:text-harbor">{item}</Link>)}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-gray-500">Powered by DockOS.</footer>
      </body>
    </html>
  );
}
