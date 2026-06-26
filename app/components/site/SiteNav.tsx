"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import PromoBar from "@/app/components/site/PromoBar";

const LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how" },
  { label: "Trades", href: "/#trades" },
  { label: "Pricing", href: "/#pricing" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Full bar at the very top, condensed once the user scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <PromoBar />
      <div className="container-tt">
        <nav
          className={`flex items-center justify-between rounded-full border border-line backdrop-blur-md transition-all duration-300 ease-out ${
            scrolled
              ? "mt-1.5 bg-white/95 px-4 py-2 shadow-[0_10px_30px_-12px_rgba(10,19,38,0.45)] md:px-4"
              : "mt-3 bg-white/80 px-5 py-3.5 shadow-[0_8px_30px_-20px_rgba(10,19,38,0.3)]"
          }`}
        >
          <Link href="/" className="flex items-center gap-2.5 pl-1 font-bold tracking-tight text-ink">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="TableTurnerr logo"
              className={`rounded-lg object-contain transition-all duration-300 ease-out ${
                scrolled ? "h-7 w-7" : "h-9 w-9"
              }`}
            />
            <span className={`transition-all duration-300 ease-out ${scrolled ? "text-base" : "text-lg"}`}>
              TableTurnerr
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Link href="/login" className="btn btn-ghost px-4 py-2 text-sm">
              Sign in
            </Link>
            <Link
              href="/signup"
              className={`btn btn-primary text-sm transition-all duration-300 ease-out ${
                scrolled ? "px-4 py-2" : "px-5 py-2.5"
              }`}
            >
              Start free trial
            </Link>
          </div>

          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <div className="mt-2 rounded-2xl border border-line bg-white p-4 shadow-lg md:hidden">
            <div className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-surface"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-line pt-3">
                <Link href="/login" className="btn btn-ghost w-full" onClick={() => setOpen(false)}>
                  Sign in
                </Link>
                <Link href="/signup" className="btn btn-primary w-full" onClick={() => setOpen(false)}>
                  Start free trial
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
