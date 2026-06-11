"use client";

import { useState, type FormEvent } from "react";
import { submitLead } from "@/app/(marketing)/contact/actions";

type FormStatus = "idle" | "sending" | "sent" | "error";

const SERVICE_OPTIONS = [
  "Restaurant Website Design",
  "Restaurant SEO",
  "Restaurant Branding",
  "Google Ads Management",
  "Google Business Profile Optimization",
  "Full Growth Package",
  "Not sure yet",
] as const;

const inputClasses =
  "w-full bg-white border border-border rounded-xl px-4 py-3 text-charcoal placeholder:text-warm-gray-light focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors";
const labelClasses = "block text-sm font-medium text-charcoal mb-2";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const result = await submitLead(formData);

    if (result.ok) {
      setStatus("sent");
    } else {
      setErrorMsg(result.error);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-[1.25rem] border border-green-200 bg-green-50 p-8 md:p-10 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M20 6 9 17l-5-5"
              stroke="#16a34a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="font-display font-semibold text-lg text-charcoal mb-2">
          Message sent!
        </h3>
        <p className="text-warm-gray text-sm leading-relaxed">
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot — hidden from humans, catches bots. Do not remove. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className={labelClasses}>
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="you@restaurant.com"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Restaurant Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-restaurant" className={labelClasses}>
            Restaurant Name <span className="text-accent">*</span>
          </label>
          <input
            id="contact-restaurant"
            name="restaurant"
            type="text"
            required
            placeholder="Your restaurant's name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClasses}>
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Service Interest */}
      <div>
        <label htmlFor="contact-service" className={labelClasses}>
          Service Interest
        </label>
        <select
          id="contact-service"
          name="service"
          defaultValue=""
          className={inputClasses}
        >
          <option value="" disabled>
            Select a service...
          </option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelClasses}>
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder="Tell us about your restaurant and what you're looking for..."
          className={`${inputClasses} resize-y`}
        />
      </div>

      {/* Error message */}
      {status === "error" && errorMsg && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full sm:w-auto bg-charcoal text-cream rounded-full px-8 py-3.5 font-medium hover:bg-charcoal-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
        <p className="text-xs text-warm-gray-light">
          We reply within 24 hours. No spam, ever.
        </p>
      </div>
    </form>
  );
}
