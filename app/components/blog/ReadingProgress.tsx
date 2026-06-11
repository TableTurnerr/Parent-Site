"use client";

import { useEffect, useState } from "react";

/**
 * Thin progress bar pinned to the very top of the viewport that fills as the
 * reader scrolls the page. Sits above the navbar (z-60). Purely decorative, so
 * it is aria-hidden, and it does not animate on its own (only on scroll), so
 * there is nothing to gate behind prefers-reduced-motion.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-1.5 w-full bg-charcoal/10"
      aria-hidden="true"
    >
      <div
        className="h-full bg-accent transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
