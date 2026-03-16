"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Button from "@/app/components/ui/Button";
import { NAV_LINKS } from "@/app/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled ? "top-3 sm:top-4 px-3 sm:px-4 md:px-6" : "top-0 px-0"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ease-in-out ${
          scrolled
            ? "max-w-5xl bg-cream/90 backdrop-blur-md border border-border rounded-full shadow-sm"
            : "max-w-7xl bg-transparent"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 ease-in-out ${
            scrolled
              ? "h-14 md:h-16 pl-4 sm:pl-6 md:pl-8 pr-3 sm:pr-4 md:pr-3"
              : "h-16 md:h-20 px-4 sm:px-6 md:px-8"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl md:text-2xl font-bold text-charcoal"
          >
            TableTurnerr
          </Link>

          {/* Center: Plain nav links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-sm font-medium text-warm-gray hover:text-charcoal transition-colors"
              >
                {link.label}
                <span className="nav-link__line" />
              </Link>
            ))}
          </div>

          {/* Right: CTA */}
          <div className="hidden md:block">
            <Button href="/contact" variant="primary" className="flow-btn--nav py-2.5 px-6 text-xs">
              Talk to Us
            </Button>
          </div>

          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
