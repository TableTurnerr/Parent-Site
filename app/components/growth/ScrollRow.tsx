"use client";
// Horizontal scroller with previous/next buttons. Touch and trackpad users can swipe; mouse users get the arrows.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ScrollRow({ label, children, compact = false }: { label: string; children: ReactNode; compact?: boolean }) {
  const ref = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };
  const btn = "grid h-11 w-11 place-items-center rounded-full border border-line bg-bg text-ink shadow-sm transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-35";

  return (
    <div>
      <ul
        ref={ref}
        aria-label={label}
        className={`-mx-4 flex snap-x snap-mandatory ${compact ? "gap-3" : "gap-4"} overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden`}
      >
        {children}
      </ul>
      <div className={`${compact ? "mt-4" : "mt-6"} flex justify-center gap-3`}>
        <button type="button" onClick={() => go(-1)} disabled={edge.start} className={btn} aria-label={`Previous ${label.toLowerCase()}`}><ChevronLeft className="h-5 w-5" /></button>
        <button type="button" onClick={() => go(1)} disabled={edge.end} className={btn} aria-label={`More ${label.toLowerCase()}`}><ChevronRight className="h-5 w-5" /></button>
      </div>
    </div>
  );
}
