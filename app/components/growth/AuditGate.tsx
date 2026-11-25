"use client";
// Free-audit popup. Any click on a plain link to the audit page (nav button, CTAs, tool results) or an
// <OpenAuditButton> opens this instead: our GoHighLevel form, then (once it's submitted) the self-serve light audit tool.
// The audit page itself stays reachable by URL (search traffic), with its example report and its own start button.
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Loader2, MapPin, X } from "lucide-react";
import GhlForm, { type GhlContact } from "@/app/components/growth/GhlForm";
import { startInstantAudit } from "@/app/(marketing)/contact/actions";
import { capture } from "@/app/lib/analytics/client";
import { ANALYTICS_EVENTS } from "@/app/lib/analytics/events";

const AUDIT_PATH = "/free-google-maps-audit";
const OPEN_EVENT = "tt:open-audit";
const FORM_ID = "HCKpJORvNtjWDsLCXFKu";
const AUDIT_TOOL_URL = "https://audit.seo.tableturnerr.com/light-audit/search";

export function openAuditGate() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function OpenAuditButton({ className = "btn btn-primary", children }: { className?: string; children: React.ReactNode }) {
  return <button type="button" className={className} onClick={openAuditGate}>{children}</button>;
}

export default function AuditGate() {
  const ref = useRef<HTMLDialogElement>(null);
  const sent = useRef(false);
  const [opened, setOpened] = useState(false); // the content and form load on first open, not with every page
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

  // GHL already has the lead, so our own bookkeeping never holds the visitor up.
  const onSubmitted = useCallback(async (c: GhlContact) => {
    if (sent.current) return;
    sent.current = true;
    setState("sending");
    capture(ANALYTICS_EVENTS.contactFormSubmitted, { form_type: "instant_audit" });
    const fd = new FormData();
    fd.set("business_name", c.business);
    fd.set("name", c.name);
    fd.set("phone", c.phone);
    fd.set("source_page_url", window.location.href);
    const res = await Promise.race([
      startInstantAudit(fd).catch(() => null),
      new Promise<null>((resolve) => window.setTimeout(() => resolve(null), 4000)),
    ]);
    if (res && res.ok && !res.url) setState("manual");
    else window.location.assign(AUDIT_TOOL_URL);
  }, []);

  useEffect(() => {
    // Coming back from the audit tool with the browser's Back button: don't leave "Opening your audit…" on screen.
    const onShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      sent.current = false;
      setState("form");
      ref.current?.close();
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  // White in both themes, so the form (always white) sits in it without a visible frame.
  return (
    <dialog
      ref={ref}
      aria-labelledby="audit-gate-title"
      className="m-auto w-[min(29rem,calc(100vw-1.5rem))] max-h-[calc(100dvh-1.5rem)] overflow-y-auto overflow-x-hidden rounded-[1.5rem] border-0 bg-[#fff] p-0 text-[#161a33] shadow-2xl [color-scheme:light] [scrollbar-color:#c3c8dc_transparent] [scrollbar-width:thin] backdrop:bg-black/60"
      onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}
    >
      <button type="button" onClick={() => ref.current?.close()} className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full text-white/80 hover:bg-white/10 hover:text-white" aria-label="Close">
        <X className="h-5 w-5" />
      </button>
      <div className="bg-[#11142b] px-6 pb-5 pt-6 text-white md:px-8">
        <h2 id="audit-gate-title" className="flex items-start gap-2.5 pr-8 text-[1.5rem] font-bold leading-tight text-white">
          <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-[#f4a100]" aria-hidden />
          {state === "manual" ? "Got it. We'll run your audit for you." : "See who's beating you on Google Maps"}
        </h2>
        {state !== "manual" && (
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            Free. Tell us your business and your audit opens right after.
          </p>
        )}
      </div>
      {!opened ? null : state === "manual" ? (
        <div className="px-6 py-7 text-center md:px-8">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#14733a]/15 text-[#14733a]"><Check className="h-6 w-6" /></span>
          <p className="mt-4 text-sm leading-relaxed text-[#4a5170]">
            This month&apos;s instant audits are used up, so a person on our team will run yours and call or text you within one business day.
          </p>
          <Link href={`${AUDIT_PATH}#example-report`} className="mt-5 inline-block font-semibold text-[#36408f] underline" onClick={() => ref.current?.close()}>See an example report</Link>
        </div>
      ) : (
        <div className="px-6 pb-5 pt-2 md:px-8">
          <div className="relative">
            <GhlForm formId={FORM_ID} title="Free Google Maps audit form" onSubmitted={onSubmitted} />
            {state === "sending" && (
              <p role="status" className="absolute inset-0 flex items-start justify-center gap-2 bg-[#fff] pt-24 text-sm font-semibold">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Opening your audit…
              </p>
            )}
          </div>
          <p className="border-t border-[#d9dded] pt-4 text-center text-xs leading-relaxed text-[#5c637d]">
            Form not loading? Call <a href="tel:+13323331008" className="font-semibold text-[#36408f]">(332) 333-1008</a>.{" "}
            <Link href={`${AUDIT_PATH}#example-report`} className="font-semibold text-[#36408f]" onClick={() => ref.current?.close()}>See an example report</Link>
          </p>
        </div>
      )}
    </dialog>
  );
}
