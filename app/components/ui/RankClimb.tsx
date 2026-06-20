"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Signature hero animation for the SEO agency: a mock local-results panel where
 * the "Your Business" row climbs from the bottom to #1, the competitors sliding
 * down to make room. One tasteful, on-message motion — not wallpaper. Loops
 * with a hold at the top, and renders the finished #1 state for reduced motion.
 */
type Row = { id: string; name: string; rating: string; you?: boolean };

const ROWS: Row[] = [
  { id: "c1", name: "Maple & Vine Co.", rating: "4.2" },
  { id: "c2", name: "Corner Studio", rating: "4.0" },
  { id: "c3", name: "Brightside Local", rating: "3.9" },
  { id: "c4", name: "Northgate & Sons", rating: "4.1" },
  { id: "you", name: "Your Business", rating: "4.9", you: true },
];

const START = ROWS.map((r) => r.id);

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path d="m17 17-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 18s6-5.2 6-9.4A6 6 0 0 0 4 8.6C4 12.8 10 18 10 18Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="8.5" r="2" fill="currentColor" />
    </svg>
  );
}
function UpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 16V4m0 0-5 5m5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="m10 1.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7L4.6 17.6l1-5.8L1.4 7.7l5.8-.8z" />
    </svg>
  );
}

export default function RankClimb({ query = "best near me" }: { query?: string }) {
  const reduce = useReducedMotion();
  const finalOrder = useMemo(() => ["you", "c1", "c2", "c3", "c4"], []);
  const [order, setOrder] = useState<string[]>(reduce ? finalOrder : START);
  const byId = useMemo(() => Object.fromEntries(ROWS.map((r) => [r.id, r])), []);

  useEffect(() => {
    if (reduce) return;
    const youIdx = order.indexOf("you");
    let t: ReturnType<typeof setTimeout>;
    if (youIdx > 0) {
      // climb one position
      t = setTimeout(() => {
        setOrder((prev) => {
          const i = prev.indexOf("you");
          if (i <= 0) return prev;
          const next = [...prev];
          [next[i - 1], next[i]] = [next[i], next[i - 1]];
          return next;
        });
      }, youIdx === 1 ? 1100 : 850);
    } else {
      // reached #1 — hold, then reset and run again
      t = setTimeout(() => setOrder([...START]), 3000);
    }
    return () => clearTimeout(t);
  }, [order, reduce]);

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* soft accent glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-accent/15 blur-2xl"
      />
      <div className="rounded-[1.5rem] border border-border bg-white p-4 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.4)] sm:p-5">
        {/* search bar */}
        <div className="mb-4 flex items-center gap-2.5 rounded-full border border-border bg-cream/70 px-4 py-2.5 text-warm-gray">
          <SearchIcon />
          <span className="truncate text-sm">{query}</span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
            <PinIcon /> Maps
          </span>
        </div>

        {/* results */}
        <div className="flex flex-col gap-2">
          {order.map((id) => {
            const row = byId[id];
            const rank = order.indexOf(id) + 1;
            const atTop = row.you && rank === 1;
            const climbing = row.you && rank > 1;
            return (
              <motion.div
                key={id}
                layout
                transition={{ type: "spring", stiffness: 460, damping: 38 }}
                className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 ${
                  row.you
                    ? `border-accent/40 bg-accent/[0.07] ${atTop ? "rank-pulse" : ""}`
                    : "border-border bg-cream/40"
                }`}
              >
                {/* rank badge */}
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    atTop
                      ? "bg-accent text-white"
                      : row.you
                        ? "bg-accent/15 text-accent"
                        : "bg-charcoal/[0.06] text-warm-gray"
                  }`}
                >
                  {rank}
                </span>

                {/* name */}
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-sm ${
                      row.you ? "font-semibold text-charcoal" : "text-warm-gray"
                    }`}
                  >
                    {row.name}
                  </p>
                </div>

                {/* trailing: climbing arrow / rating / #1 */}
                {climbing ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold text-emerald-600">
                    <UpIcon />
                  </span>
                ) : atTop ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold text-white">
                    #1
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-warm-gray/70">
                    <span className="text-amber-400">
                      <StarIcon />
                    </span>
                    {row.rating}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* floating outcome chip */}
      <motion.div
        layout
        className="hero-float absolute -bottom-5 -right-3 hidden items-center gap-2 rounded-2xl border border-border bg-white px-3.5 py-2.5 shadow-lg sm:flex"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
          <UpIcon />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-charcoal">+38% calls</p>
          <p className="text-[11px] text-warm-gray">from local search</p>
        </div>
      </motion.div>
    </div>
  );
}
