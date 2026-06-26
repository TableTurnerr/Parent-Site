"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Star, Gift, Check } from "lucide-react";
import { submitLead } from "@/app/(marketing)/contact/actions";

/**
 * Welcome / launch-offer modal. Fires whenever the homepage mounts — a fresh
 * arrival or a return from another page — after a short delay, with a 90s
 * cooldown (sessionStorage) so rapid navigation / HMR doesn't spam it. Shares
 * the PromoBar's 12-hour deadline so the countdown stays consistent.
 */
const PROMO_KEY = "tt_promo_deadline";
const SEEN_KEY = "tt_welcome_ts";
const COOLDOWN = 90_000;
const WINDOW_MS = 12 * 60 * 60 * 1000;

function fmt(ms: number) {
  const t = Math.max(0, ms);
  const h = Math.floor(t / 3_600_000);
  const m = Math.floor((t % 3_600_000) / 60_000);
  const s = Math.floor((t % 60_000) / 1000);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(h)}:${p(m)}:${p(s)}`;
}

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  // decide whether to show
  useEffect(() => {
    const last = Number(sessionStorage.getItem(SEEN_KEY) || 0);
    if (Date.now() - last < COOLDOWN) return;
    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SEEN_KEY, String(Date.now()));
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  // countdown (shared deadline)
  useEffect(() => {
    if (!open) return;
    let deadline = Number(localStorage.getItem(PROMO_KEY));
    const now = Date.now();
    if (!deadline || deadline <= now) {
      deadline = now + WINDOW_MS;
      localStorage.setItem(PROMO_KEY, String(deadline));
    }
    const tick = () => setLeft(Math.max(0, deadline - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [open]);

  // esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop */}
          <motion.div
            className="absolute inset-0 bg-night/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Launch offer"
            className="relative w-full max-w-md overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white/80 text-ink-soft transition-colors hover:bg-surface"
            >
              <X className="h-4 w-4" />
            </button>

            {/* top band */}
            <div className="relative overflow-hidden bg-night px-7 pb-8 pt-9 text-center text-white">
              <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-70" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-star">
                  <Gift className="h-3.5 w-3.5" /> Launch offer
                </span>
                <div className="stars mt-4 text-xl" aria-hidden>★★★★★</div>
                <h2 className="mt-3 text-2xl font-bold text-white">
                  Claim 30% off your first 3 months
                </h2>
                <p className="mt-2 text-sm text-white/70">
                  Plus a free review-score check for your business.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm">
                  <span className="text-white/65">Ends in</span>
                  <span className="font-mono font-bold tabular-nums tracking-wider text-white" suppressHydrationWarning>
                    {left === null ? "12:00:00" : fmt(left)}
                  </span>
                </div>
              </div>
            </div>

            {/* body */}
            <div className="p-7">
              {done ? (
                <div className="text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
                    <Check className="h-6 w-6" />
                  </span>
                  <p className="mt-4 font-bold text-ink">You&apos;re in!</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Use code <span className="font-mono font-bold text-primary">LAUNCH30</span> when you start your trial.
                  </p>
                  <Link href="/signup" className="btn btn-primary mt-5 w-full" onClick={() => setOpen(false)}>
                    Start free trial
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!email.trim()) return;
                    const fd = new FormData();
                    fd.set("name", "Launch popup lead");
                    fd.set("email", email.trim());
                    fd.set(
                      "message",
                      "Requested the 30% LAUNCH30 launch deal via the homepage popup."
                    );
                    await submitLead(fd);
                    setDone(true);
                  }}
                >
                  <label htmlFor="welcome-email" className="text-sm font-medium text-ink">
                    Where should we send your deal?
                  </label>
                  <input
                    id="welcome-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@yourcompany.com"
                    className="mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary focus:bg-white"
                  />
                  <button type="submit" className="btn btn-primary mt-3 w-full">
                    Claim my 30% deal
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-3 w-full text-center text-xs text-muted transition-colors hover:text-ink-soft"
                  >
                    No thanks, I&apos;ll pay full price
                  </button>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted">
                    <Star className="h-3 w-3 fill-star text-star" /> No spam. Cancel anytime.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
