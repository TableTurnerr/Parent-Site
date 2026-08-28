"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { submitLead } from "@/app/(marketing)/contact/actions";
import { capture } from "@/app/lib/analytics/client";
import { ANALYTICS_EVENTS } from "@/app/lib/analytics/events";

const TRADES = ["HVAC", "Roofing", "Plumbing", "Electrical", "Other home service"];

const CUSTOMER_CARE_DISCLOSURE = (
  <>
    By checking this box and submitting this form, I consent to receive recurring
    customer-care text messages from TableTurnerr LLC at the number provided,
    including messages about my inquiry, account, service updates, and support.
    Message frequency varies based on account activity and support requests.
    Message and data rates may apply. Reply HELP for help or STOP to opt out.
    Consent is not a condition of purchase. View our {" "}
    <Link href="/privacy" className="font-semibold text-primary underline underline-offset-2 hover:text-ink">
      Privacy Policy
    </Link>{" "}
    and {" "}
    <Link href="/terms#sms-terms" className="font-semibold text-primary underline underline-offset-2 hover:text-ink">
      SMS Terms
    </Link>
    .
  </>
);

const MARKETING_DISCLOSURE = (
  <>
    By checking this box and submitting this form, I consent to receive recurring
    customer-engagement and marketing text messages from TableTurnerr LLC at the
    number provided, including requests for honest feedback or reviews. Automated
    feedback sequences contain no more than 3 messages per service interaction.
    Message and data rates may apply. Reply HELP for help or STOP to opt out.
    Consent is not a condition of purchase. View our {" "}
    <Link href="/privacy" className="font-semibold text-primary underline underline-offset-2 hover:text-ink">
      Privacy Policy
    </Link>{" "}
    and {" "}
    <Link href="/terms#sms-terms" className="font-semibold text-primary underline underline-offset-2 hover:text-ink">
      SMS Terms
    </Link>
    .
  </>
);

/**
 * Shared lead form for /signup (trial) and /contact (demo). Submits to the
 * existing `submitLead` server action, which writes to the `contact_leads`
 * table (visible in /admin/leads) via the RLS server client.
 */
export default function LeadForm({ variant }: { variant: "trial" | "contact" }) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const isTrial = variant === "trial";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    fd.set("source_page_url", window.location.href);
    // Map our field names onto the action's expected fields.
    fd.set("business_name", String(fd.get("business") || ""));
    fd.set("service", String(fd.get("trade") || ""));
    if (isTrial) {
      fd.set(
        "message",
        `Free trial signup (LAUNCH30). Trade: ${fd.get("trade") || "n/a"}.`
      );
    }

    const res = await submitLead(fd);
    setLoading(false);
    if (res.ok) { capture(isTrial ? ANALYTICS_EVENTS.freeTrialCompleted : ANALYTICS_EVENTS.demoBookingCompleted, { form_type: variant }); setDone(true); }
    else { capture(ANALYTICS_EVENTS.contactFormError, { form_type: variant, error_category: "submission_failed" }); setError(res.error); }
  }

  if (done) {
    return (
      <div className="card p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-4 text-xl font-bold text-ink">
          {isTrial ? "You're all set!" : "Thanks, we'll be in touch"}
        </h3>
        <p className="mt-2 text-sm text-ink-soft">
          {isTrial
            ? "Check your inbox to finish setting up your 14-day free trial. Use code LAUNCH30 for 30% off your first 3 months."
            : "We'll reach out within one business day to book your demo."}
        </p>
        <Link href="/" className="btn btn-ghost mt-6">Back to home</Link>
      </div>
    );
  }

  return (
    <form className="card p-7 md:p-8" data-analytics-mask onFocus={() => { if (!started) { setStarted(true); capture(isTrial ? ANALYTICS_EVENTS.freeTrialStarted : ANALYTICS_EVENTS.demoBookingStarted, { form_type: variant }); capture(ANALYTICS_EVENTS.contactFormStarted, { form_type: variant }); } }} onSubmit={onSubmit}>
      {/* honeypot — hidden from real users, bots fill it */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" placeholder="Jordan Smith" required />
        <Field label="Business name" name="business" placeholder="Smith HVAC" required />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Work email" name="email" type="email" placeholder="you@business.com" required />
        <Field label="Phone" name="phone" type="tel" placeholder="(555) 123-4567" />
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium text-ink" htmlFor="trade">Your trade</label>
        <select
          id="trade"
          name="trade"
          className="mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary focus:bg-white"
          defaultValue=""
          required
        >
          <option value="" disabled>Select your trade</option>
          {TRADES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {!isTrial && (
        <div className="mt-4">
          <label className="text-sm font-medium text-ink" htmlFor="message">How can we help?</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Tell us a bit about your business and what you're looking for."
            className="mt-2 w-full resize-none rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary focus:bg-white"
          />
        </div>
      )}

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      <fieldset className="mt-6 space-y-4" aria-describedby="sms-consent-scope">
        <legend className="text-sm font-semibold text-ink">Optional SMS communication preferences</legend>
        <ConsentCheckbox
          id="customer-care-sms-consent"
          name="customer_care_sms_consent"
          disclosure={CUSTOMER_CARE_DISCLOSURE}
        />
        <ConsentCheckbox
          id="marketing-sms-consent"
          name="marketing_sms_consent"
          disclosure={MARKETING_DISCLOSURE}
        />
        <p id="sms-consent-scope" className="text-sm leading-relaxed text-ink-soft">
          These preferences apply only to communications from TABLETURNERR LLC;
          they do not authorize independent client businesses to send messages
          under their own brands.
        </p>
      </fieldset>

      <button type="submit" disabled={loading} className="btn btn-primary mt-6 w-full disabled:opacity-70">
        {loading ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
        ) : isTrial ? (
          "Start my free trial"
        ) : (
          "Book my demo"
        )}
      </button>
      <p className="mt-3 text-center text-sm leading-relaxed text-ink-soft">
        By submitting this form, you authorize TableTurnerr LLC to contact you by
        phone or email regarding your inquiry. SMS messages will be sent only for
        the categories you separately select above.
      </p>
      <p className="mt-3 text-center text-xs text-muted">
        {isTrial
          ? "14-day free trial · no credit card required · cancel anytime"
          : "We'll never share your details. No spam, ever."}
      </p>
    </form>
  );
}

function ConsentCheckbox({
  id,
  name,
  disclosure,
}: {
  id: string;
  name: string;
  disclosure: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          value="on"
          className="mt-1 h-5 w-5 shrink-0 rounded border-line text-primary accent-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-ink-soft">
          {disclosure}
        </label>
      </div>
    </div>
  );
}

function Field({
  label, name, placeholder, type = "text", required,
}: {
  label: string; name: string; placeholder: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-ink" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary focus:bg-white"
      />
    </div>
  );
}
