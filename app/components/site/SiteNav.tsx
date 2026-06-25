"use client";

import Link from "next/link";
import { useState } from "react";
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
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <PromoBar />
      <div className="container-tt">
        <nav className="mt-3 flex items-center justify-between rounded-full border border-line bg-white/85 px-4 py-2.5 shadow-[0_8px_30px_-18px_rgba(10,19,38,0.35)] backdrop-blur-md md:px-5">
          <Link href="/" className="flex items-center gap-2.5 pl-1 text-lg font-bold tracking-tight text-ink">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="TableTurnerr logo" className="h-8 w-8 rounded-lg object-contain" />
            TableTurnerr
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
            <Link href="/signup" className="btn btn-primary px-4 py-2 text-sm">
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
