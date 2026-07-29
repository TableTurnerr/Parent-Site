import type { Metadata } from "next";
import Script from "next/script";
import { Check, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Start Your Free Trial",
  description:
    "Start your 14-day free trial of TableTurnerr review automation. No credit card required. Built for HVAC, roofing, plumbing and electrical pros.",
  alternates: { canonical: "https://www.tableturnerr.com/signup" },
};

const POINTS = [
  "First new reviews within 24 hours of launch",
  "Reviews across Google, Facebook, Yelp & Angi",
  "Connects to Jobber, Housecall Pro, ServiceTitan & more",
  "Technician leaderboards and map-pack rank tracking",
  "No contracts, cancel anytime",
];

export default function SignupPage() {
  return (
    <section className="hero-wash relative overflow-hidden pt-36 pb-20 md:pt-44">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <div className="container-tt relative">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(34rem,1.14fr)] lg:gap-14 xl:gap-20">
          <div className="max-w-xl lg:sticky lg:top-32 lg:pb-8">
            <span className="eyebrow">Start free trial</span>
            <h1 className="display-2 mt-6 text-ink">
              Start collecting 5-star reviews this week
            </h1>
            <p className="lead mt-5 max-w-lg">
              Connect your CRM, launch review reactivation, and watch the reviews
              and the calls roll in. Free for 14 days, no credit card required.
            </p>
            <ul className="mt-8 space-y-3.5">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-ink-soft">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-[0.97rem] leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex items-center gap-3 rounded-2xl border border-line bg-white p-4">
              <span className="stars text-base" aria-hidden>★★★★★</span>
              <p className="text-sm text-ink-soft">
                <span className="font-semibold text-ink">30% off your first 3 months</span>{" "}
                with code <span className="font-mono font-bold text-primary">LAUNCH30</span>
                <span className="ml-1 inline-flex items-center gap-1 text-star"><Star className="h-3 w-3 fill-current" /></span>
              </p>
            </div>
          </div>

          <div className="card overflow-hidden bg-white shadow-[0_28px_70px_-42px_rgba(22,26,51,0.38)]">
            <div className="border-b border-line bg-white px-6 py-5 sm:px-8">
              <p className="text-sm font-semibold text-ink">Tell us about your business</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Complete the short questionnaire to start your free trial.
              </p>
            </div>
            <div className="bg-white">
              <iframe
                src="https://portalapi.tableturnerr.com/widget/form/IcHd4grlbI6g7iLvlc1g?contact_id={{contact.id}}"
                className="block h-[2807px] w-full border-0"
                id="inline-IcHd4grlbI6g7iLvlc1g"
                data-layout='{"id":"INLINE"}'
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
              data-form-name="1. ⭐Client Website Content Questionnaire✅"
                data-height="2807"
                data-layout-iframe-id="inline-IcHd4grlbI6g7iLvlc1g"
                data-form-id="IcHd4grlbI6g7iLvlc1g"
                title="Client Website Content Questionnaire"
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
