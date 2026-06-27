"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { submitLead } from "@/app/(marketing)/contact/actions";

const TRADES = ["HVAC", "Roofing", "Plumbing", "Electrical", "Other home service"];

/**
 * Shared lead form for /signup (trial) and /contact (demo). Submits to the
 * existing `submitLead` server action, which writes to the `contact_leads`
 * table (visible in /admin/leads) via the RLS server client.
 */
export default function LeadForm({ variant }: { variant: "trial" | "contact" }) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isTrial = variant === "trial";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
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
    if (res.ok) setDone(true);
    else setError(res.error);
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
    <form className="card p-7 md:p-8" onSubmit={onSubmit}>
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
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      <button type="submit" disabled={loading} className="btn btn-primary mt-6 w-full disabled:opacity-70">
        {loading ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
        ) : isTrial ? (
          "Start my free trial"
        ) : (
          "Book my demo"
        )}
      </button>
      <p className="mt-3 text-center text-xs text-muted">
        {isTrial
          ? "14-day free trial · no credit card required · cancel anytime"
          : "We'll never share your details. No spam, ever."}
      </p>
      <p className="mt-3 text-center text-[0.6875rem] leading-relaxed text-muted">
        By submitting, you agree to be contacted by TableTurnerr by phone,
        email, or text at the details provided about your inquiry. Consent is not
        a condition of purchase; message &amp; data rates may apply, and you can
        reply STOP to opt out. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-ink">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="underline underline-offset-2 hover:text-ink">
          Terms
        </Link>
        .
      </p>
    </form>
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
