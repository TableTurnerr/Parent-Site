"use client";
// Free-audit popup. Any click on a plain link to the audit page (nav button, CTAs, tool results) or an
// <OpenAuditButton> opens this instead: business name + phone, then the self-serve light audit tool.
// The audit page itself stays reachable by URL (search traffic), with its example report and its own start button.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Loader2, MapPin, X } from "lucide-react";
import { startInstantAudit } from "@/app/(marketing)/contact/actions";
import { ConsentCheckbox, CUSTOMER_CARE_DISCLOSURE } from "@/app/components/site/LeadForm";
import { capture } from "@/app/lib/analytics/client";
import { ANALYTICS_EVENTS } from "@/app/lib/analytics/events";

const AUDIT_PATH = "/free-google-maps-audit";
const OPEN_EVENT = "tt:open-audit";

export function openAuditGate() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function OpenAuditButton({ className = "btn btn-primary", children }: { className?: string; children: React.ReactNode }) {
  return <button type="button" className={className} onClick={openAuditGate}>{children}</button>;
}

export default function AuditGate() {
  const ref = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<"form" | "sending" | "manual">("form");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const open = () => {
      setError(null);
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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setState("sending");
    const fd = new FormData(e.currentTarget);
    fd.set("source_page_url", window.location.href);
    const res = await startInstantAudit(fd);
    if (!res.ok) {
      setState("form");
      setError(res.error);
      capture(ANALYTICS_EVENTS.contactFormError, { form_type: "instant_audit", error_category: "validation" });
      return;
    }
    capture(ANALYTICS_EVENTS.contactFormSubmitted, { form_type: "instant_audit", instant: Boolean(res.url) });
    if (res.url) window.location.assign(res.url);
    else setState("manual");
  }

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
        {state === "manual" ? (
          <div className="py-4 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/15 text-success"><Check className="h-6 w-6" /></span>
            <h2 id="audit-gate-title" className="mt-4 text-xl font-bold">Got it. We&apos;ll run your audit for you.</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              This month&apos;s instant audits are used up, so a person on our team will run yours and call or text you within one business day.
            </p>
            <Link href={`${AUDIT_PATH}#example-report`} className="btn btn-ghost mt-6" onClick={() => ref.current?.close()}>See an example report</Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} data-analytics-mask>
            <MapPin className="h-7 w-7 text-primary" aria-hidden />
            <h2 id="audit-gate-title" className="mt-3 pr-8 text-2xl font-bold">Run your free Google Maps audit</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              See where you rank across your service area and who&apos;s beating you, in a couple of minutes. Tell us who you are and we&apos;ll take you straight to it.
            </p>
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] h-0 w-0 opacity-0" />
            <div className="mt-5 grid gap-4">
              <div>
                <label htmlFor="ag-business" className="text-sm font-medium">Business name</label>
                <input id="ag-business" name="business_name" required maxLength={160} autoComplete="organization" placeholder="Smith Roofing" className="mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary" />
              </div>
              <div>
                <label htmlFor="ag-phone" className="text-sm font-medium">Phone</label>
                <input id="ag-phone" name="phone" type="tel" required maxLength={40} autoComplete="tel" placeholder="(555) 123-4567" className="mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary" />
              </div>
            </div>
            {error && <p role="alert" className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600">{error}</p>}
            <details className="mt-4 text-sm">
              <summary className="cursor-pointer text-ink-soft">Text message preferences (optional)</summary>
              <div className="mt-3"><ConsentCheckbox id="ag-sms" name="customer_care_sms_consent" disclosure={CUSTOMER_CARE_DISCLOSURE} /></div>
            </details>
            <button type="submit" disabled={state === "sending"} className="btn btn-primary mt-5 w-full disabled:opacity-70">
              {state === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Starting…</> : <>Start my free audit <ArrowRight className="h-4 w-4" /></>}
            </button>
            <p className="mt-3 text-center text-xs leading-relaxed text-muted">
              Free. By continuing you agree that TableTurnerr LLC may call you about your audit. We never share your number.{" "}
              <Link href={`${AUDIT_PATH}#example-report`} className="font-semibold text-primary" onClick={() => ref.current?.close()}>See an example report</Link>
            </p>
          </form>
        )}
      </div>
    </dialog>
  );
}
