"use client";
// Limited-time popup: first 10 Google reviews free. The only place on the site that mentions the offer, and it renders
// nothing until it opens, so the offer isn't in the page HTML either. Opens once per visit, after the visitor has
// read a little (never straight on landing from search), stays away for 3 days if closed and for good once claimed,
// and stops by itself when the offer ends.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Check, Loader2, Phone, Star, X } from "lucide-react";
import { claimReviewOffer } from "@/app/(marketing)/contact/actions";
import { readConsent } from "@/app/components/analytics/AnalyticsProvider";
import { capture } from "@/app/lib/analytics/client";
import { ANALYTICS_EVENTS } from "@/app/lib/analytics/events";
import { REVIEW_OFFER_ENDS_AT, reviewOfferActive } from "@/app/lib/review-offer";

// Pages where the visitor is already mid-task (or reading legal text).
const HIDE_ON = ["/free-google-maps-audit", "/signup", "/login", "/contact", "/privacy", "/terms", "/blog/preview"];
const KEY = "tt-offer-10-reviews"; // "claimed", or the time it was last closed
const SHOWN_KEY = "tt-offer-shown"; // this visit; CallWidget reads it too
const SNOOZE_MS = 3 * 24 * 60 * 60 * 1000;
const DELAY_MS = 12000;
const MAX_WAIT_MS = 30000; // how long to wait for an unanswered privacy banner
const PROMO = { promotion: "first_10_reviews" };

const store = (s: () => Storage, key: string, value: string) => { try { s().setItem(key, value); } catch {} };

function allowed(): boolean {
  if (!reviewOfferActive()) return false;
  try {
    if (sessionStorage.getItem(SHOWN_KEY) === "1") return false;
    const saved = localStorage.getItem(KEY);
    return saved !== "claimed" && !(saved && Date.now() - Number(saved) < SNOOZE_MS);
  } catch {
    return true;
  }
}

/** Not now: another dialog is open, they're typing, or the tab is in the background. */
const busy = () =>
  document.hidden || !!document.querySelector("dialog[open]") || !!document.activeElement?.closest("input, textarea, select, iframe");

export default function OfferPopup() {
  const pathname = usePathname() ?? "/";
  const hidden = HIDE_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const ref = useRef<HTMLDialogElement>(null);
  const started = useRef(false);
  const [open, setOpen] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [state, setState] = useState<"form" | "sending" | "done">("form");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hidden || !allowed()) return;
    const start = Date.now();
    const t = window.setInterval(() => {
      const waited = Date.now() - start;
      if (waited < DELAY_MS || busy() || (!readConsent() && waited < MAX_WAIT_MS)) return;
      window.clearInterval(t);
      if (!allowed()) return;
      store(() => sessionStorage, SHOWN_KEY, "1");
      setDaysLeft(Math.ceil((REVIEW_OFFER_ENDS_AT - Date.now()) / 86400000));
      setOpen(true);
      capture(ANALYTICS_EVENTS.promotionViewed, { ...PROMO, trigger: "auto", page: window.location.pathname });
    }, 1000);
    return () => window.clearInterval(t);
  }, [hidden]);

  useEffect(() => {
    if (open && !ref.current?.open) ref.current?.showModal();
  }, [open]);

  function onClose() {
    if (state !== "done") {
      store(() => localStorage, KEY, String(Date.now()));
      capture(ANALYTICS_EVENTS.promotionClosed, PROMO);
    }
    setOpen(false);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("source_page_url", window.location.href);
    setError(null);
    setState("sending");
    const res = await claimReviewOffer(fd).catch(() => ({ ok: false as const, error: "That didn't go through. Please call us at (332) 333-1008 and mention the offer." }));
    if (!res.ok) {
      setState("form");
      setError(res.error);
      capture(ANALYTICS_EVENTS.contactFormError, { form_type: "review_offer", error_category: "submission_failed" });
      return;
    }
    store(() => localStorage, KEY, "claimed");
    setState("done");
    capture(ANALYTICS_EVENTS.promotionClaimCompleted, PROMO);
  }

  if (!open) return null;
  const field = "mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-ink outline-none transition-colors focus:border-primary";

  return (
    <dialog
      ref={ref}
      aria-labelledby="offer-title"
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(28rem,calc(100vw-2rem))] overflow-y-auto overflow-x-hidden rounded-[1.5rem] border border-line bg-bg p-0 text-ink shadow-2xl backdrop:bg-black/60"
    >
      <button type="button" onClick={() => ref.current?.close()} aria-label="Close" className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full text-white/80 hover:bg-white/10 hover:text-white">
        <X className="h-5 w-5" />
      </button>
      <div className="bg-night px-6 pb-6 pt-7 text-white md:px-8">
        <div className="flex gap-1 text-star" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-5 w-5 fill-current" />)}
        </div>
        <h2 id="offer-title" className="mt-3 pr-6 text-[1.75rem] font-bold leading-tight text-white">
          {state === "done" ? "You're in. We'll call you." : "Get your first 10 Google reviews free"}
        </h2>
        {state !== "done" && (
          <p className="mt-2 text-sm text-white/75">
            Ends December 15 · {daysLeft <= 1 ? "last day" : `${daysLeft} days left`}
          </p>
        )}
      </div>

      {state === "done" ? (
        <div className="px-6 py-7 text-center md:px-8" role="status">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/15 text-success"><Check className="h-6 w-6" /></span>
          <p className="mt-4 leading-relaxed text-ink-soft">An owner will call you to set up your 10 free reviews. Want to start now?</p>
          <a href="tel:+13323331008" className="btn btn-primary mt-5 w-full"><Phone className="h-4 w-4" aria-hidden /> Call (332) 333-1008</a>
          <button type="button" onClick={() => ref.current?.close()} className="mt-3 text-sm font-semibold text-ink-soft underline">Close</button>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          data-analytics-mask
          data-clarity-mask="true"
          className="px-6 pb-6 pt-5 md:px-8 md:pb-8"
          onFocus={() => {
            if (started.current) return;
            started.current = true;
            capture(ANALYTICS_EVENTS.promotionClaimStarted, PROMO);
          }}
        >
          <p className="text-sm leading-relaxed text-ink-soft">
            We ask your past customers for an honest review on Google. You don&apos;t pay for the first 10. Leave your number and an owner will call you.
          </p>
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] h-0 w-0 opacity-0" />
          <div className="mt-4 grid gap-3">
            <label className="text-sm font-medium">
              Business name
              <input name="business_name" required maxLength={160} autoComplete="organization" placeholder="Smith Plumbing" className={field} />
            </label>
            <label className="text-sm font-medium">
              Phone
              <input name="phone" type="tel" inputMode="tel" required maxLength={40} autoComplete="tel" placeholder="(555) 123-4567" className={field} />
            </label>
          </div>
          {error && <p role="alert" className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={state === "sending"} className="btn btn-primary mt-4 w-full disabled:opacity-70">
            {state === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Claim my 10 free reviews <ArrowRight className="h-4 w-4" /></>}
          </button>
          <p className="mt-3 text-center text-xs leading-relaxed text-muted">
            By submitting you agree TableTurnerr LLC may call you about this offer. Reviews come only from your real customers.{" "}
            <Link href="/privacy" className="font-semibold text-primary" onClick={() => ref.current?.close()}>Privacy</Link>
          </p>
        </form>
      )}
    </dialog>
  );
}
