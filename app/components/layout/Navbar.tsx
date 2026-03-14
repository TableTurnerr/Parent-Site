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
        scrolled ? "bg-cream/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="w-full">
        <Container>
          <div className="flex items-center justify-between h-16 md:h-20">
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
                  className="text-sm font-medium text-warm-gray hover:text-charcoal transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right: CTA */}
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center rounded-full bg-charcoal text-cream px-6 py-2.5 text-sm font-medium hover:bg-charcoal-light transition-colors"
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
