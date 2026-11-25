"use client";
// Free-audit popup. Any click on a plain link to the audit page (nav button, CTAs, tool results) or an
// <OpenAuditButton> opens this instead: our GoHighLevel form, then (once it's submitted) the self-serve light audit tool.
// The audit page itself stays reachable by URL (search traffic), with its example report and its own start button.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Loader2, MapPin, X } from "lucide-react";
import { startInstantAudit } from "@/app/(marketing)/contact/actions";
import { capture } from "@/app/lib/analytics/client";
import { ANALYTICS_EVENTS } from "@/app/lib/analytics/events";

const AUDIT_PATH = "/free-google-maps-audit";
const OPEN_EVENT = "tt:open-audit";
const FORM_ORIGIN = "https://portalapi.tableturnerr.com";
const FORM_URL = `${FORM_ORIGIN}/widget/form/HCKpJORvNtjWDsLCXFKu`;
const AUDIT_TOOL_URL = "https://audit.seo.tableturnerr.com/light-audit/search";

export function openAuditGate() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function OpenAuditButton({ className = "btn btn-primary", children }: { className?: string; children: React.ReactNode }) {
  return <button type="button" className={className} onClick={openAuditGate}>{children}</button>;
}

export default function AuditGate() {
  const ref = useRef<HTMLDialogElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const contact = useRef<Record<string, unknown>>({});
  const sent = useRef(false);
  const [opened, setOpened] = useState(false); // the content and form load on first open, not with every page
  const [ready, setReady] = useState(false); // GHL's form has drawn itself (it can take several seconds)
  const [state, setState] = useState<"form" | "sending" | "manual">("form");

  useEffect(() => {
    const open = () => {
      setOpened(true);
      setState((s) => (s === "sending" ? s : "form"));
      if (!ref.current?.open) ref.current?.showModal();
      capture(ANALYTICS_EVENTS.contactFormStarted, { form_type: "instant_audit" });
    };
    // Plain left-clicks on links to the audit page (not #example-report and other in-page anchors).
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== AUDIT_PATH || url.hash) return;
      e.preventDefault();
      open();
    };
    window.addEventListener(OPEN_EVENT, open);
    document.addEventListener("click", onClick, true);
    if (window.location.hash === "#start-audit") open();
    return () => {
      window.removeEventListener(OPEN_EVENT, open);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  // GHL's form tells the parent page when it has been submitted: first the contact's details ("_ud"), then a message
  // keyed "embedded_iframe_…" that is only sent after GHL accepted the submission.
  useEffect(() => {
    const onMessage = async (e: MessageEvent) => {
      if (e.origin !== FORM_ORIGIN || !frame.current || e.source !== frame.current.contentWindow || !Array.isArray(e.data)) return;
      const [action, key, value] = e.data as unknown[];
      if (action === "iframeLoaded") setReady(true);
      if (action !== "set-sticky-contacts" || typeof key !== "string") return;
      if (key === "_ud") {
        try { contact.current = JSON.parse(String(value)) ?? {}; } catch { contact.current = {}; }
        return;
      }
      if (!key.startsWith("embedded_iframe_") || sent.current) return;
      sent.current = true;
      setState("sending");
      capture(ANALYTICS_EVENTS.contactFormSubmitted, { form_type: "instant_audit" });
      const fd = new FormData();
      const c = contact.current;
      // In this form "first name" is the business with its city, and "last name" the person.
      fd.set("business_name", String(c.first_name ?? c.company_name ?? ""));
      fd.set("name", String(c.last_name ?? ""));
      fd.set("phone", String(c.phone ?? ""));
      fd.set("source_page_url", window.location.href);
      // GHL already has the lead, so our own bookkeeping never holds the visitor up.
      const res = await Promise.race([
        startInstantAudit(fd).catch(() => null),
        new Promise<null>((resolve) => window.setTimeout(() => resolve(null), 4000)),
      ]);
      if (res && res.ok && !res.url) setState("manual");
      else window.location.assign(AUDIT_TOOL_URL);
    };
    // Coming back from the audit tool with the browser's Back button: don't leave "Opening your audit…" on screen.
    const onShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      sent.current = false;
      setState("form");
      ref.current?.close();
    };
    window.addEventListener("message", onMessage);
    window.addEventListener("pageshow", onShow);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("pageshow", onShow);
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="audit-gate-title"
      className="m-auto w-[min(32rem,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto overflow-x-hidden rounded-[1.5rem] border border-line bg-bg p-0 text-ink shadow-2xl backdrop:bg-black/60"
      onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}
    >
      <div className="relative p-6 md:p-8">
        <button type="button" onClick={() => ref.current?.close()} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-surface hover:text-ink" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        {!opened ? null : state === "manual" ? (
          <div className="py-4 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/15 text-success"><Check className="h-6 w-6" /></span>
            <h2 id="audit-gate-title" className="mt-4 text-xl font-bold">Got it. We&apos;ll run your audit for you.</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              This month&apos;s instant audits are used up, so a person on our team will run yours and call or text you within one business day.
            </p>
            <Link href={`${AUDIT_PATH}#example-report`} className="btn btn-ghost mt-6" onClick={() => ref.current?.close()}>See an example report</Link>
          </div>
        ) : (
          <div>
            <MapPin className="h-7 w-7 text-primary" aria-hidden />
            <h2 id="audit-gate-title" className="mt-3 pr-8 text-2xl font-bold">Run your free Google Maps audit</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              See where you rank across your service area and who&apos;s beating you. Submit the form and we&apos;ll take you straight to it.
            </p>
            {/* Tall enough for the whole form, so only the popup scrolls. */}
            <div className="relative -mx-3 mt-4 h-[64.5rem] overflow-hidden rounded-xl bg-white sm:mx-0 sm:h-[50rem]">
              <iframe
                ref={frame}
                id="audit-gate-form"
                src={FORM_URL}
                title="Free Google Maps audit form"
                className="absolute inset-0 h-full w-full border-0"
                data-clarity-mask="true"
              />
              {!ready && (
                <p role="status" className="pointer-events-none absolute inset-x-0 top-16 flex items-center justify-center gap-2 text-sm font-semibold text-[#161a33]">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading the form…
                </p>
              )}
              {state === "sending" && (
                <p role="status" className="absolute inset-0 flex items-center justify-center gap-2 bg-white text-sm font-semibold text-[#161a33]">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Opening your audit…
                </p>
              )}
            </div>
            <p className="mt-3 text-center text-xs leading-relaxed text-muted">
              Form not loading? Call <a href="tel:+13323331008" className="font-semibold text-primary">(332) 333-1008</a>.{" "}
              <Link href={`${AUDIT_PATH}#example-report`} className="font-semibold text-primary" onClick={() => ref.current?.close()}>See an example report</Link>
            </p>
          </div>
        )}
      </div>
    </dialog>
  );
}
