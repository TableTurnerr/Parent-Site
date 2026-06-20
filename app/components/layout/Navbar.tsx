"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Button from "@/app/components/ui/Button";
import { NAV_LINKS, INDUSTRY_LINKS } from "@/app/lib/constants";

function ChevronIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Navbar({
  variant = "default",
  rightSlot,
}: {
  variant?: "default" | "static";
  rightSlot?: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (variant === "static") return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  const isStatic = variant === "static";
  const isShrunk = !isStatic && scrolled;
  // Pages whose hero is a dark, full-bleed image: while at the top (before the
  // nav shrinks into the cream pill) it sits over that dark hero and must render
  // light. The homepage + med spa heroes are light, so they use dark nav text.
  const heroIsDark =
    pathname === "/" || pathname === "/restaurants" || pathname === "/medspa";
  const overDark = !isStatic && heroIsDark && !scrolled;
  const industriesActive = INDUSTRY_LINKS.some(
    (i) => pathname === i.href || pathname.startsWith(`${i.href}/`)
  );

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isShrunk ? "top-3 sm:top-4 px-3 sm:px-4 md:px-6" : "top-0 px-0"
      } ${isStatic ? "bg-[#F7F3ED] border-b border-border" : ""}`}
    >
      <nav
        className={`mx-auto ${isStatic ? "" : "transition-all duration-500 ease-in-out"} ${
          isShrunk
            ? "max-w-5xl bg-cream/90 backdrop-blur-md border border-border rounded-full shadow-sm"
            : "max-w-7xl bg-transparent"
        }`}
      >
        <div
          className={`flex items-center justify-between ${isStatic ? "" : "transition-all duration-500 ease-in-out"} ${
            isShrunk
              ? "h-14 md:h-16 pl-4 sm:pl-6 md:pl-8 pr-3 sm:pr-4 md:pr-3"
              : "h-16 md:h-20 px-4 sm:px-6 md:px-8"
          }`}
        >
          {/* Invisible spacer to balance hamburger width on mobile — centers the logo */}
          <div className="w-10 md:hidden" aria-hidden="true" />

          {/* Logo */}
          <Link
            href="/"
            className={`font-display text-xl md:text-2xl font-bold transition-colors duration-300 md:flex-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 ${
              overDark ? "text-cream" : "text-charcoal"
            }`}
          >
            TableTurnerr
          </Link>

          {/* Center: Plain nav links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {/* Industries dropdown — surfaces the two niche landing pages */}
            <div className="relative group">
              <button
                type="button"
                aria-haspopup="true"
                className={`nav-link inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                  industriesActive
                    ? overDark
                      ? "text-cream"
                      : "text-charcoal"
                    : overDark
                      ? "text-cream/75 hover:text-cream"
                      : "text-warm-gray hover:text-charcoal"
                }`}
              >
                Industries
                <ChevronIcon />
              </button>
              {/* pt-3 bridges the gap so the panel stays open while moving the cursor */}
              <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="w-64 rounded-2xl border border-border bg-cream p-2 shadow-lg">
                  {INDUSTRY_LINKS.map((industry) => {
                    const isActive =
                      pathname === industry.href ||
                      pathname.startsWith(`${industry.href}/`);
                    return (
                      <Link
                        key={industry.href}
                        href={industry.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`block rounded-xl px-4 py-3 transition-colors ${
                          isActive ? "bg-cream-dark" : "hover:bg-cream-dark"
                        }`}
                      >
                        <span className="block text-sm font-semibold text-charcoal">
                          {industry.label}
                        </span>
                        <span className="mt-0.5 block text-xs text-warm-gray">
                          {industry.blurb}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`nav-link text-sm font-medium transition-colors ${
                    overDark
                      ? isActive
                        ? "text-cream"
                        : "text-cream/75 hover:text-cream"
                      : isActive
                        ? "text-charcoal"
                        : "text-warm-gray hover:text-charcoal"
                  }`}
                >
                  {link.label}
                  <span className="nav-link__line" />
                </Link>
              );
            })}
          </div>

          {/* Right: CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              href="/contact"
              variant={overDark ? "primary-light" : "primary"}
              className="flow-btn--nav py-2.5 px-6 text-xs"
            >
              Talk to Us
            </Button>
            {rightSlot}
          </div>

          <MobileMenu overDark={overDark} />
        </div>
      </nav>
    </header>
  );
}
