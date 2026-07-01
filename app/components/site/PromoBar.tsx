"use client";

import { useEffect, useState } from "react";
import { Flame, ArrowRight } from "lucide-react";

/**
 * Hostinger-style urgency bar. On a visitor's first landing we stamp a deadline
 * 12 hours out in localStorage and count down to it live; if it's ever already
 * passed (or missing) we renew it to +12h, so a fresh visitor always sees ~12h
 * remaining and it never dead-ends. SSR renders a stable "12:00:00" placeholder
 * to avoid a hydration mismatch, then the client takes over on mount.
 */
const KEY = "tt_promo_deadline";
const WINDOW_MS = 12 * 60 * 60 * 1000;

function fmt(ms: number) {
  const t = Math.max(0, ms);
  const h = Math.floor(t / 3_600_000);
  const m = Math.floor((t % 3_600_000) / 60_000);
  const s = Math.floor((t % 60_000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function PromoBar() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const now = Date.now();
    let deadline = Number(localStorage.getItem(KEY));
    if (!deadline || deadline <= now) {
      deadline = now + WINDOW_MS;
      localStorage.setItem(KEY, String(deadline));
    }
    const tick = () => {
      let rem = deadline - Date.now();
      if (rem <= 0) {
        deadline = Date.now() + WINDOW_MS;
        localStorage.setItem(KEY, String(deadline));
        rem = WINDOW_MS;
      }
      setLeft(rem);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const display = left === null ? "12:00:00" : fmt(left);

  // Clicking the offer label opens the welcome/offer popup (any page).
  const openPopup = () => window.dispatchEvent(new Event("tt:open-welcome"));

  return (
    <button
      type="button"
      onClick={openPopup}
      aria-label="Claim 30% off — open offer"
      className="group block w-full cursor-pointer bg-night text-white transition-colors hover:bg-[#0d1326]"
    >
      <div className="container-tt flex items-center justify-center gap-x-3 gap-y-1 py-2 text-sm">
        <Flame className="h-4 w-4 shrink-0 text-star" aria-hidden />
        <span className="font-semibold">
          <span className="hidden sm:inline">Launch deal — </span>30% off your
          first 3 months
        </span>
        <span className="hidden text-white/50 sm:inline">·</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="hidden text-white/65 sm:inline">ends in</span>
          <span
            className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-sm font-bold tabular-nums tracking-wider text-white"
            suppressHydrationWarning
            aria-live="off"
          >
            {display}
          </span>
        </span>
        <span className="ml-1 hidden items-center gap-1 rounded-md bg-primary px-3 py-1 text-xs font-bold text-white transition-colors group-hover:bg-primary-hover sm:inline-flex">
          Claim deal <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </button>
  );
}
