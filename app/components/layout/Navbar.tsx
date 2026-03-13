"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import MobileMenu from "./MobileMenu";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="w-full">
        <Container>
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className={`font-display text-2xl font-bold transition-colors ${
                scrolled ? "text-charcoal" : "text-cream"
              }`}
            >
              TableTurnerr
            </Link>

            {/* Center: Pill Nav */}
            <div
              className={`hidden md:flex items-center gap-1 rounded-full shadow-sm border px-2 py-1.5 transition-all ${
                scrolled
                  ? "bg-white border-border"
                  : "bg-white/10 backdrop-blur-sm border-white/20"
              }`}
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                    scrolled
                      ? "text-charcoal hover:text-accent hover:bg-cream-dark"
                      : "text-cream/90 hover:text-cream hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right: CTA */}
            <Link
              href="/contact"
              className={`hidden md:inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                scrolled
                  ? "bg-charcoal text-cream hover:bg-charcoal-light"
                  : "bg-cream text-charcoal hover:bg-white"
              }`}
            >
              Get a Quote
            </Link>

            <MobileMenu />
          </div>
        </Container>
      </nav>
    </header>
  );
}
