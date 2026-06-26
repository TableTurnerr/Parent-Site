"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Star, Phone, Globe, Search } from "lucide-react";

/**
 * Signature hero animation for TableTurnerr (review automation for home services):
 * a Google "map pack" card where Your Company climbs from #3 to #1 as its review
 * count ticks up and overtakes the competitors. Visualizes the actual product
 * outcome — more reviews -> top of the local pack -> more booked jobs. Loops with
 * a hold at #1; renders the finished #1 state for reduced motion.
 */
type Row = { id: string; name: string; reviews: number; rating: string; you?: boolean };
const COMPETITORS: Row[] = [
  { id: "a", name: "Citywide Comfort Co.", reviews: 128, rating: "4.6" },
  { id: "b", name: "Apex Home Services", reviews: 96, rating: "4.7" },
];
const YOU_START = 71;
const YOU_TOP = 158;
const STEP = 9;

export default function MapPackClimb({ query = "plumbers near me" }: { query?: string }) {
  const reduce = useReducedMotion();
  const [yourReviews, setYourReviews] = useState(reduce ? YOU_TOP : YOU_START);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    if (yourReviews < YOU_TOP) {
      t = setTimeout(() => {
        setYourReviews((r) => Math.min(YOU_TOP, r + STEP));
        setToast(true);
        setTimeout(() => setToast(false), 1600);
      }, 1300);
    } else {
      t = setTimeout(() => setYourReviews(YOU_START), 3200);
    }
    return () => clearTimeout(t);
  }, [yourReviews, reduce]);

  const rows = [
    ...COMPETITORS,
    { id: "you", name: "Your Company", reviews: yourReviews, rating: "4.9", you: true },
  ].sort((x, y) => y.reviews - x.reviews);

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* glow */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary/15 blur-3xl"
      />

      <div className="overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-[0_40px_90px_-50px_rgba(10,19,38,0.5)]">
        {/* search header */}
        <div className="flex items-center gap-2.5 border-b border-line bg-surface px-4 py-3">
          <Search className="h-4 w-4 text-muted" />
          <span className="text-sm font-medium text-ink-soft">{query}</span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            <MapPin className="h-3 w-3" /> Map
          </span>
        </div>

        {/* results */}
        <div className="flex flex-col gap-2 p-3">
          {rows.map((row) => {
            const rank = rows.indexOf(row) + 1;
            const atTop = row.you && rank === 1;
            return (
              <motion.div
                key={row.id}
                layout
                transition={{ type: "spring", stiffness: 460, damping: 38 }}
                className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 ${
                  row.you
                    ? `border-primary/40 bg-primary-soft ${atTop ? "tt-pulse" : ""}`
                    : "border-line bg-surface/60"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    atTop
                      ? "bg-primary text-white"
                      : row.you
                        ? "bg-primary/15 text-primary"
                        : "bg-ink/[0.06] text-ink-soft"
                  }`}
                >
                  {rank}
                </span>

                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-sm ${
                      row.you ? "font-bold text-ink" : "font-medium text-ink-soft"
                    }`}
                  >
                    {row.name}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted">
                    <span className="inline-flex items-center gap-0.5 font-semibold text-star">
                      <Star className="h-3 w-3 fill-current" /> {row.rating}
                    </span>
                    <motion.span key={row.reviews} className="text-ink-soft">
                      ({row.reviews})
                    </motion.span>
                    <span className="ml-1 inline-flex items-center gap-2 text-muted">
                      <Phone className="h-3 w-3" /> <Globe className="h-3 w-3" />
                    </span>
                  </p>
                </div>

                {atTop && (
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold text-white">
                    #1
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* floating new-review toast */}
      <motion.div
        className="tt-float absolute -right-3 -top-4 flex items-center gap-2.5 rounded-2xl border border-line bg-white px-3.5 py-2.5 shadow-xl"
        animate={{ opacity: toast || reduce ? 1 : 0.55, y: toast ? -2 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-star/15">
          <Star className="h-4 w-4 fill-star text-star" />
        </span>
        <div className="leading-tight">
          <p className="text-xs font-bold text-ink">New 5-star review</p>
          <p className="text-[11px] text-muted">just now · from a job</p>
        </div>
      </motion.div>

      {/* floating booked-job chip */}
      <div className="tt-float-slow absolute -bottom-5 -left-3 flex items-center gap-2 rounded-2xl border border-line bg-white px-3.5 py-2.5 shadow-lg">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success/15 text-success">
          <Phone className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-ink">+31% more calls</p>
          <p className="text-[11px] text-muted">from the map pack</p>
        </div>
      </div>
    </div>
  );
}
