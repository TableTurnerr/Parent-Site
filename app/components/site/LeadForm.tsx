"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";

const TRADES = ["HVAC", "Roofing", "Plumbing", "Electrical", "Other home service"];

/**
 * Shared lead form for /signup (trial) and /contact (demo). Client-side success
 * state for now — wire to Supabase/Resend later. Not yet a real backend submit.
 */
export default function LeadForm({ variant }: { variant: "trial" | "contact" }) {
  const [done, setDone] = useState(false);
  const isTrial = variant === "trial";

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
    <form
      className="card p-7 md:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
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
            placeholder="Tell us a bit about your business and what you're looking for."
            className="mt-2 w-full resize-none rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary focus:bg-white"
          />
        </div>
      )}

      <button type="submit" className="btn btn-primary mt-6 w-full">
        {isTrial ? "Start my free trial" : "Book my demo"}
      </button>
      <p className="mt-3 text-center text-xs text-muted">
        {isTrial
          ? "14-day free trial · no credit card required · cancel anytime"
          : "We'll never share your details. No spam, ever."}
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
