import type { Metadata } from "next";
import { Check, Star } from "lucide-react";
import LeadForm from "@/app/components/site/LeadForm";

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
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:pt-6">
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

          <LeadForm variant="trial" />
        </div>
      </div>
    </section>
  );
}
