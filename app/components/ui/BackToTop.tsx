"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Floating back-to-top control. Appears once the page is scrolled a screen or
 * so. Hidden on small screens (md:flex) because mobile already has the sticky
 * CTA bar at the bottom, and two stacked controls would clutter the corner.
 * Respects prefers-reduced-motion: the smooth scroll falls back to an instant
 * jump via the global reduced-motion rule in globals.css.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-40 hidden h-11 w-11 items-center justify-center rounded-full bg-charcoal text-cream elevate transition-all duration-300 hover:bg-charcoal-light md:flex ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
