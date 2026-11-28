import type { Metadata } from "next";
import EmailLink from "@/app/components/site/EmailLink";
import { pageTitle } from "@/app/lib/metadata";
import Script from "next/script";
import { Mail, MessageSquare, CalendarClock, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_E164 } from "@/app/lib/site-nav";
import JsonLd from "@/app/components/site/JsonLd";
import { generateBreadcrumbSchema } from "@/app/lib/schema";

export const metadata: Metadata = {
  title: pageTitle("Contact TableTurnerr: Call, Email or Book a Call"),
  description:
    "Talk to an owner at TableTurnerr: call (332) 333-1008, email us or book a 15-minute call about marketing for your home-service business or restaurant.",
  alternates: { canonical: "https://www.tableturnerr.com/contact" },
};

const POINTS = [
  { icon: CalendarClock, t: "See it on your business", b: "We'll show you where you rank on Google Maps and what's holding you back." },
  { icon: MessageSquare, t: "Ask anything", b: "Pricing, websites, reviews, your Google profile, AI search, all fair game." },
  { icon: Mail, t: "No pressure", b: "It's a working session, not a hard sell. You'll leave knowing if we're a fit." },
];

export default function ContactPage() {
  return (
    <>
    <JsonLd
      data={[
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact TableTurnerr",
          url: "https://www.tableturnerr.com/contact",
          about: { "@id": "https://www.tableturnerr.com/#organization" },
        },
        generateBreadcrumbSchema([{ name: "Home", url: "https://www.tableturnerr.com" }, { name: "Contact", url: "https://www.tableturnerr.com/contact" }]),
      ]}
    />
    <section className="hero-wash relative overflow-hidden pt-36 pb-20 md:pt-44">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <div className="container-tt relative">
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <div className="mx-auto max-w-4xl text-center">
            <span className="eyebrow">Contact us</span>
            <h1 className="display-2 mt-6 text-ink">Let&apos;s get your business growing</h1>
            <p className="lead mx-auto mt-5 max-w-2xl">
              The conversation is completely free. Discuss anything about your
              business, whether you work with us or not, and get practical advice
              and reports. If we can help directly, we&apos;ll show you exactly
              what we&apos;d do and what it costs.
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
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href={`tel:${PHONE_E164}`} className="btn btn-primary" data-analytics-cta="contact_call">
                <Phone className="h-4 w-4" /> Call {PHONE_DISPLAY}
              </a>
              <a href={`sms:${PHONE_E164}`} className="btn btn-ghost" data-analytics-cta="contact_text">
                <MessageSquare className="h-4 w-4" /> Text us
              </a>
            </div>
            <p className="mt-3 text-sm text-ink-soft">You&apos;ll talk to an owner, not a call center.</p>
            <p className="mt-6 text-sm text-ink-soft">
              Prefer email? Reach us at{" "}
              <EmailLink className="font-semibold text-primary" />
            </p>
          </div>

          <div className="card overflow-hidden bg-white shadow-[0_28px_70px_-42px_rgba(22,26,51,0.38)]">
            <div className="border-b border-line bg-white px-6 py-5 text-center sm:px-8">
              <p className="text-sm font-semibold text-ink">Send us a message</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Tell us a little about your business and how we can help.
              </p>
            </div>
            <iframe
              src="https://portalapi.tableturnerr.com/widget/form/UJ4bQeq0WRkMgfhD5fzE"
              style={{ width: "100%", height: "100%", border: "none", borderRadius: "8px" }}
              className="block w-full overflow-hidden border-0"
              id="inline-UJ4bQeq0WRkMgfhD5fzE"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Contact Form"
              data-height="945"
              data-layout-iframe-id="inline-UJ4bQeq0WRkMgfhD5fzE"
              data-form-id="UJ4bQeq0WRkMgfhD5fzE"
              data-cookie-consent="true"
              data-cookie-consent-provider="auto"
              title="Contact Form"
            />
          </div>
        </div>
      </div>
      <Script
        src="https://portalapi.tableturnerr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </section>
    </>
  );
}
