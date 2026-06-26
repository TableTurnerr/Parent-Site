import type { Metadata } from "next";
import { Mail, MessageSquare, CalendarClock } from "lucide-react";
import LeadForm from "@/app/components/site/LeadForm";

export const metadata: Metadata = {
  title: "Contact & Demo",
  description:
    "Book a demo or talk to the TableTurnerr team about review automation for your home-services business.",
  alternates: { canonical: "https://www.tableturnerr.com/contact" },
};

const POINTS = [
  { icon: CalendarClock, t: "See it on your business", b: "We'll show you what review reactivation would pull from your past customers." },
  { icon: MessageSquare, t: "Ask anything", b: "Integrations, pricing, multi-location, switching from another tool, all fair game." },
  { icon: Mail, t: "No pressure", b: "It's a working session, not a hard sell. You'll leave knowing if we're a fit." },
];

export default function ContactPage() {
  return (
    <section className="hero-wash relative overflow-hidden pt-36 pb-20 md:pt-44">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <div className="container-tt relative">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:pt-6">
            <span className="eyebrow">Book a demo</span>
            <h1 className="display-2 mt-6 text-ink">Let&apos;s get your reviews growing</h1>
            <p className="lead mt-5 max-w-lg">
              Tell us about your business and we&apos;ll show you exactly how
              TableTurnerr would work for your trade. Most demos take 20 minutes.
            </p>
            <ul className="mt-9 space-y-6">
              {POINTS.map((p) => (
                <li key={p.t} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold text-ink">{p.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{p.b}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-9 text-sm text-ink-soft">
              Prefer email? Reach us at{" "}
              <a href="mailto:hello@tableturnerr.com" className="font-semibold text-primary">
                hello@tableturnerr.com
              </a>
            </p>
          </div>

          <LeadForm variant="contact" />
        </div>
      </div>
    </section>
  );
}
