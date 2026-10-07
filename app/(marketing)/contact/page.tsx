import type { Metadata } from "next";
import Script from "next/script";
import { Mail, MessageSquare, CalendarClock } from "lucide-react";

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
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <div className="mx-auto max-w-4xl text-center">
            <span className="eyebrow">Book a demo</span>
            <h1 className="display-2 mt-6 text-ink">Let&apos;s get your business growing</h1>
            <p className="lead mx-auto mt-5 max-w-2xl">
              The conversation is completely free. Discuss anything about your
              business, whether you work with us or not, and get practical advice
              and reports. If we can help directly, we&apos;ll set you up with a
              14-day free trial.
            </p>
            <ul className="mx-auto mt-9 grid max-w-5xl gap-8 text-center md:grid-cols-3">
              {POINTS.map((p) => (
                <li key={p.t} className="flex flex-col items-center gap-3">
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
              <a href="mailto:contact@tableturnerr.com" className="font-semibold text-primary">
                contact@tableturnerr.com
              </a>
            </p>
          </div>

          <div className="card overflow-hidden bg-white shadow-[0_28px_70px_-42px_rgba(22,26,51,0.38)]">
            <div className="border-b border-line bg-white px-6 py-5 text-center sm:px-8">
              <p className="text-sm font-semibold text-ink">Book a meeting</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Choose a time that works for you and tell us a little about your business.
              </p>
            </div>
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
      <Script
        src="https://portalapi.tableturnerr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </section>
  );
}
