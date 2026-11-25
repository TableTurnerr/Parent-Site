"use client";
// One of our GoHighLevel forms inside a popup. It grows and shrinks with the form (GHL's forms ship the iframe-resizer
// script, so we speak its protocol instead of loading GHL's embed script), and says when the form was accepted.
// The fields themselves are styled in GHL (form > Styles > Custom CSS): a page can't restyle another site's frame.
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

const FORM_ORIGIN = "https://portalapi.tableturnerr.com";

/** In these forms GHL's "first name" is the business (with its city) and "last name" is the person. */
export type GhlContact = { business: string; name: string; phone: string };

export default function GhlForm({ formId, title, onSubmitted }: { formId: string; title: string; onSubmitted: (c: GhlContact) => void }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const done = useRef(onSubmitted);
  const contact = useRef<GhlContact>({ business: "", name: "", phone: "" });
  const [height, setHeight] = useState(0); // 0 until the form has drawn itself
  const id = `ghl-${formId}`;

  useEffect(() => {
    done.current = onSubmitted;
  }, [onSubmitted]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const win = frame.current?.contentWindow;
      if (e.origin !== FORM_ORIGIN || !win || e.source !== win) return;

      if (typeof e.data === "string") {
        const m = e.data.match(/^\[iFrameSizer\]([^:]+):(\d+)/);
        if (m && m[1] === id) setHeight(Math.min(Number(m[2]), 2000));
        return;
      }
      if (!Array.isArray(e.data)) return;
      const [action, key, value] = e.data as unknown[];
      if (action === "iframeLoaded") {
        win.postMessage(`[iFrameSizer]${id}:8:false:false:32:true:true:null:bodyOffset:null:null:0:false:parent:scroll`, FORM_ORIGIN);
      } else if (action === "fetch-query-params") {
        // Tells GHL which page (and campaign link) the lead came from.
        const params = Object.fromEntries(new URLSearchParams(window.location.search));
        win.postMessage(["query-params", params, window.location.href, document.referrer, id], FORM_ORIGIN);
      } else if (action === "set-sticky-contacts" && key === "_ud") {
        try {
          const c = JSON.parse(String(value)) ?? {};
          contact.current = { business: String(c.first_name ?? c.company_name ?? ""), name: String(c.last_name ?? ""), phone: String(c.phone ?? "") };
        } catch {}
      } else if (action === "set-sticky-contacts" && typeof key === "string" && key.startsWith("embedded_iframe_")) {
        // Only sent once GHL has accepted the submission.
        done.current(contact.current);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [id]);

  return (
    <div className="relative min-h-[26rem] overflow-hidden">
      {!height && (
        <div role="status" className="absolute inset-0 space-y-5 pt-3">
          {[0, 1, 2].map((i) => (
            <div key={i} aria-hidden className="space-y-2">
              <div className="h-3.5 w-32 animate-pulse rounded bg-[#e5e8f2]" />
              <div className="h-11 w-full animate-pulse rounded-lg bg-[#eef0f7]" />
            </div>
          ))}
          <p className="flex items-center justify-center gap-2 pt-2 text-sm font-semibold text-[#4a5170]">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading the form…
          </p>
        </div>
      )}
      {/* Wider than its box by the form's own 16px padding, so the fields line up with the text around them. */}
      <iframe
        ref={frame}
        id={id}
        name={id}
        src={`${FORM_ORIGIN}/widget/form/${formId}`}
        title={title}
        scrolling="no"
        className={`relative -mx-4 block w-[calc(100%+2rem)] max-w-none border-0 [color-scheme:light] ${height ? "opacity-100" : "h-[26rem] opacity-0"}`}
        style={height ? { height } : undefined}
        data-clarity-mask="true"
      />
    </div>
  );
}
