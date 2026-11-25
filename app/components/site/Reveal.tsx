"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Lightweight scroll-reveal wrapper: fades + lifts content into view once (styles: .tt-reveal in globals.css).
 * Content stays visible with reduced motion or without JavaScript. `delay` (seconds) staggers siblings.
 */
export default function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setShown(true);
      io.disconnect();
    }, { rootMargin: "-80px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`tt-reveal ${shown ? "is-in" : ""} ${className}`} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}
