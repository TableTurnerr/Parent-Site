"use client";
// Floating "talk to us" widget (desktop and tablet; phones get a Call button in the sticky bar instead). A small
// chat-style card that nudges visitors to call the main line. It opens by itself once per browser session after the
// visitor has spent a little time on the page, and folds back into a round phone button when closed.
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageSquareText, Phone, X } from "lucide-react";
import { capture } from "@/app/lib/analytics/client";
import { ANALYTICS_EVENTS } from "@/app/lib/analytics/events";

// Local copies (client components must not import @/app/lib/growth, which pulls every page's content into the bundle).
const PHONE_E164 = "+13323331008";
const PHONE_DISPLAY = "(332) 333-1008";
const HIDE_ON = ["/free-google-maps-audit", "/signup", "/login", "/blog/preview"];
const SEEN_KEY = "tt-call-widget-seen";
const AUTO_OPEN_MS = 25000;

export default function CallWidget() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === "1"; } catch {}
    if (seen) return;
    const t = window.setTimeout(() => {
      // Don't stack this on a visitor who just got the offer popup.
      try { if (sessionStorage.getItem("tt-offer-shown") === "1") return; } catch {}
      if (window.innerWidth < 1024 || document.querySelector("dialog[open]")) return;
      setOpen(true);
      try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
      capture(ANALYTICS_EVENTS.promotionViewed, { promotion: "call_widget", trigger: "auto" });
    }, AUTO_OPEN_MS);
    return () => window.clearTimeout(t);
  }, []);

  if (HIDE_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;

  const toggle = (next: boolean) => {
    setOpen(next);
    try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
    capture(next ? ANALYTICS_EVENTS.promotionViewed : ANALYTICS_EVENTS.promotionClosed, { promotion: "call_widget", trigger: "click" });
  };
  const clicked = (channel: "call" | "text") =>
    capture(ANALYTICS_EVENTS.primaryCtaClicked, { cta: `call_widget_${channel}`, page: pathname });

  return (
    <div className="fixed bottom-5 right-5 z-40 hidden flex-col items-end gap-3 lg:flex" data-analytics-section="call_widget">
      {open && (
        <div role="dialog" aria-labelledby="call-widget-title" className="w-[22rem] overflow-hidden rounded-2xl border border-line bg-bg text-ink shadow-2xl">
          <div className="flex items-center gap-3 bg-night px-4 py-3.5 text-white">
            <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-sm font-bold">TT</span>
            <div className="min-w-0 flex-1">
              <p id="call-widget-title" className="text-sm font-semibold">TableTurnerr</p>
              <p className="text-xs text-white/70">Talk to an owner, not a sales rep</p>
            </div>
            <button type="button" onClick={() => toggle(false)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full text-white/80 hover:bg-white/10 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3 p-4">
            <p className="max-w-[90%] rounded-2xl rounded-tl-sm bg-surface px-4 py-3 text-sm leading-relaxed text-ink-soft">
              Hi 👋 Wondering why competitors get the calls, or what this would cost you?
            </p>
            <p className="max-w-[90%] rounded-2xl rounded-tl-sm bg-surface px-4 py-3 text-sm leading-relaxed text-ink-soft">
              Skip the forms. Call us now and get a straight answer in a few minutes.
            </p>
            <a href={`tel:${PHONE_E164}`} onClick={() => clicked("call")} className="btn btn-primary w-full">
              <Phone className="h-4 w-4" aria-hidden /> Call {PHONE_DISPLAY}
            </a>
            <a href={`sms:${PHONE_E164}`} onClick={() => clicked("text")} className="btn btn-ghost w-full !py-2.5 text-sm">
              <MessageSquareText className="h-4 w-4" aria-hidden /> Text us instead
            </a>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => toggle(!open)}
        aria-expanded={open}
        aria-label={open ? "Close the call widget" : `Call TableTurnerr at ${PHONE_DISPLAY}`}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-xl transition-transform hover:-translate-y-0.5"
      >
        {open ? <X className="h-5 w-5" aria-hidden /> : <Phone className="h-5 w-5" aria-hidden />}
        {open ? "Close" : "Talk to us now"}
      </button>
    </div>
  );
}
