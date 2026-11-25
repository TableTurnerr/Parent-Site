"use client";
// Limited-time popup: first 10 Google reviews free, with our GoHighLevel form. The only place on the site that
// mentions the offer, and it renders nothing until it opens, so the offer isn't in the page HTML either. Opens once
// per visit, after the visitor has read a little (never straight on landing from search), stays away for 3 days if closed and for good once claimed,
// and stops by itself when the offer ends.
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Phone, Star, X } from "lucide-react";
import GhlForm, { type GhlContact } from "@/app/components/growth/GhlForm";
import { claimReviewOffer } from "@/app/(marketing)/contact/actions";
import { readConsent } from "@/app/components/analytics/AnalyticsProvider";
import { capture } from "@/app/lib/analytics/client";
import { ANALYTICS_EVENTS } from "@/app/lib/analytics/events";
import { REVIEW_OFFER_ENDS_AT, reviewOfferActive } from "@/app/lib/review-offer";

// Pages where the visitor is already mid-task (or reading legal text).
const HIDE_ON = ["/free-google-maps-audit", "/signup", "/login", "/contact", "/privacy", "/terms", "/blog/preview"];
const FORM_ID = "elaw6IcIP3jh90xjsPbC";
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
  const [open, setOpen] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [state, setState] = useState<"form" | "done">("form");

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

  // GHL already has the lead; this is our own copy and the email to the owners, so it never blocks the visitor.
  const onSubmitted = useCallback((c: GhlContact) => {
    const fd = new FormData();
    fd.set("business_name", c.business || c.name);
    fd.set("name", c.business ? c.name : "");
    fd.set("phone", c.phone);
    fd.set("source_page_url", window.location.href);
    void claimReviewOffer(fd).catch(() => null);
    store(() => localStorage, KEY, "claimed");
    setState("done");
    capture(ANALYTICS_EVENTS.promotionClaimCompleted, PROMO);
  }, []);

  if (!open) return null;

  return (
    <dialog
      ref={ref}
      aria-labelledby="offer-title"
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}
      className="m-auto max-h-[calc(100dvh-1.5rem)] w-[min(29rem,calc(100vw-1.5rem))] overflow-y-auto overflow-x-hidden rounded-[1.5rem] border-0 bg-[#fff] p-0 text-[#161a33] shadow-2xl [color-scheme:light] [scrollbar-color:#c3c8dc_transparent] [scrollbar-width:thin] backdrop:bg-black/60"
    >
      <button type="button" onClick={() => ref.current?.close()} aria-label="Close" className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full text-white/80 hover:bg-white/10 hover:text-white">
        <X className="h-5 w-5" />
      </button>
      <div className="bg-[#11142b] px-6 pb-5 pt-6 text-white md:px-8">
        <div className="flex gap-1 text-star" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-5 w-5 fill-current" />)}
        </div>
        <h2 id="offer-title" className="mt-2.5 pr-6 text-[1.5rem] font-bold leading-tight text-white">
          {state === "done" ? "You're in. We'll call you." : "Get your first 10 Google reviews free"}
        </h2>
        {state !== "done" && (
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            We ask your past customers for an honest review. You don&apos;t pay for the first 10.
            <strong className="mt-1 block font-semibold text-white">Ends December 15 · {daysLeft <= 1 ? "last day" : `${daysLeft} days left`}</strong>
          </p>
        )}
      </div>

      {state === "done" ? (
        <div className="px-6 py-7 text-center md:px-8" role="status">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#14733a]/15 text-[#14733a]"><Check className="h-6 w-6" /></span>
          <p className="mt-4 leading-relaxed text-[#4a5170]">An owner will call you to set up your 10 free reviews. Want to start now?</p>
          <a href="tel:+13323331008" className="btn mt-5 w-full bg-[#36408f] text-[#fff]"><Phone className="h-4 w-4" aria-hidden /> Call (332) 333-1008</a>
          <button type="button" onClick={() => ref.current?.close()} className="mt-3 text-sm font-semibold text-[#4a5170] underline">Close</button>
        </div>
      ) : (
        <div className="px-6 pb-5 pt-2 md:px-8">
          <GhlForm formId={FORM_ID} title="Claim your first 10 Google reviews free" onSubmitted={onSubmitted} />
          <p className="border-t border-[#d9dded] pt-4 text-center text-xs leading-relaxed text-[#5c637d]">
            TableTurnerr LLC will call you about this offer. Reviews come only from your real customers.{" "}
            <Link href="/privacy" className="font-semibold text-[#36408f]" onClick={() => ref.current?.close()}>Privacy</Link>
          </p>
        </div>
      )}
    </dialog>
  );
}
