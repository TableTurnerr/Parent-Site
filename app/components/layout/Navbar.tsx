"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Button from "@/app/components/ui/Button";
import { NAV_LINKS } from "@/app/lib/constants";

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
  // The homepage has a full-screen dark hero; while at the top (not scrolled
  // into the cream pill) the nav sits over it and must render light.
  const overDark = !isStatic && pathname === "/" && !scrolled;

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
