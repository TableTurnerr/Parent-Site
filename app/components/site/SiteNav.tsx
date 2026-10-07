"use client";

import Link from "next/link";
import { Logo } from "@/app/components/ui/Logo";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggleButton from "@/app/components/ui/ThemeToggleButton";
import { useMarketingTheme } from "@/app/components/site/MarketingThemeProvider";

const LINKS = [
  { label: "Features", href: "/features" },
  { label: "How it works", href: "/#how" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useMarketingTheme();

  // Simple bar flush to the top; condense its padding + lift a shadow on scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Simple header, stuck to the top with no gap */}
      <div
        className={`border-b backdrop-blur-md transition-all duration-300 ease-out ${
          scrolled
            ? "border-line bg-white/95 shadow-[0_8px_24px_-16px_rgba(10,19,38,0.45)]"
            : "border-line/70 bg-white/85"
        }`}
      >
        <div className="container-tt">
          <nav
            className={`flex items-center justify-between transition-all duration-300 ease-out ${
              scrolled ? "py-2.5" : "py-3.5"
            }`}
          >
            <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-ink">
              <Logo
                aria-hidden="true"
                className={`text-ink transition-all duration-300 ease-out ${
                  scrolled ? "h-7" : "h-8"
                } w-auto`}
              />
              <span className="text-lg">TableTurnerr</span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-2.5 md:flex">
              <ThemeToggleButton theme={theme} onToggle={toggle} />
              <a href="https://portal.tableturnerr.com/" className="btn btn-ghost px-4 py-2 text-sm">
                Sign in
              </a>
              <Link href="/signup" className="btn btn-primary px-5 py-2 text-sm">
                Start free trial
              </Link>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggleButton theme={theme} onToggle={toggle} />
              <button
                type="button"
                aria-label="Menu"
                onClick={() => setOpen((o) => !o)}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>

          {open && (
            <div className="border-t border-line pb-4 md:hidden">
              <div className="flex flex-col gap-1 pt-3">
                {LINKS.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-soft hover:bg-surface"
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="mt-2 flex flex-col gap-2 border-t border-line pt-3">
                  <a href="https://portal.tableturnerr.com/" className="btn btn-ghost w-full" onClick={() => setOpen(false)}>
                    Sign in
                  </a>
                  <Link href="/signup" className="btn btn-primary w-full" onClick={() => setOpen(false)}>
                    Start free trial
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
