import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Start Your Free Trial",
  description:
    "Start your 14-day free trial of TableTurnerr review automation. No credit card required. Built for HVAC, roofing, plumbing and electrical pros.",
  alternates: { canonical: "https://www.tableturnerr.com/signup" },
};

export default function SignupPage() {
  return (
    <section className="hero-wash relative overflow-hidden pt-36 pb-20 md:pt-44">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <div className="container-tt relative">
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <div className="mx-auto max-w-3xl text-center lg:pb-8">
            <span className="eyebrow">Start free trial</span>
            <h1 className="display-2 mt-6 text-ink">
              Start collecting 5-star reviews this week
            </h1>
            <p className="lead mx-auto mt-5 max-w-2xl">
              The conversation is completely free. Discuss anything about your
              business, whether you work with us or not, and get practical advice
              and reports. If we can help directly, we&apos;ll set you up with a
              14-day free trial.
            </p>
          </div>

          <div className="card overflow-hidden bg-white shadow-[0_28px_70px_-42px_rgba(22,26,51,0.38)]">
            <div className="border-b border-line bg-white px-6 py-5 text-center sm:px-8">
              <p className="text-sm font-semibold text-ink">Book a meeting</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Choose a time that works for you and tell us a little about your business.
              </p>
            </div>
            <div className="bg-white">
              <iframe
                src="https://portalapi.tableturnerr.com/widget/booking/7XjGkrWZli9ej3gQme8H"
                allow="payment"
                className="block w-full overflow-hidden border-0"
                id="7XjGkrWZli9ej3gQme8H_1791336244784"
                scrolling="no"
                title="Book a TableTurnerr appointment"
              />
            </div>
          </div>
        </div>
      </div>
      <Script
        src="https://portalapi.tableturnerr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </section>
  );
}
