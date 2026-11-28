// Cooling Comfort Inc. (Inglewood, CA): HVAC client. Owner-confirmed facts (2026-11-27): the Google Business Profile had
// been stuck unverified for months; after one free consultation call it was verified 3 days later. Add nothing beyond that
// unless the owner confirms it (e.g. what exactly was fixed on the call, or a quote from the client).
import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import JsonLd from "@/app/components/site/JsonLd";
import NfcCard from "@/app/components/growth/NfcCard";
import { CallNowBand } from "@/app/components/growth/ContactCtas";
import { AuditBand, Crumbs, NextSteps } from "@/app/components/growth/Growth";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/app/lib/schema";

const base = "https://www.tableturnerr.com";
const path = "/results/cooling-comfort";
const h1 = "How Cooling Comfort got its Google profile verified in 3 days after months of trying";
const description =
  "Cooling Comfort Inc., an HVAC company in Inglewood, CA, spent months trying to verify its Google Business Profile. After one free call with us, it was verified in 3 days.";

export const metadata: Metadata = {
  title: { absolute: "Cooling Comfort: Google Profile Verified in 3 Days" },
  description,
  alternates: { canonical: `${base}${path}` },
  openGraph: { title: h1, description, url: `${base}${path}`, type: "article" },
};

const STATS = [
  ["Stuck", "for months, unverified"],
  ["1", "free consultation call"],
  ["3 days", "until verified"],
];

// What we go through on every verification call. This is our standard checklist, not a claim about
// which item was the problem for Cooling Comfort.
const CHECKLIST: [string, string][] = [
  ["The name", "Exactly the name on the license, truck and invoices. Extra words like \"Best AC Repair Inglewood\" can hold up verification or get a profile suspended."],
  ["The address and service area", "A real address Google can check, hidden if customers don't visit, with service areas that match where the crews actually go. No P.O. boxes or virtual offices."],
  ["Phone, website and category", "A local number that rings the business, a website that shows the same name and number, and a primary category that matches the main work (for an HVAC shop, usually HVAC contractor)."],
  ["The verification method on offer", "Which option Google is showing (video, phone, text, email or mail), and what that option needs from you."],
  ["The video, if Google asks for one", "A plan for one continuous recording that shows where you are, your tools or branded vehicle, and something only the owner or manager would have."],
  ["Hands off while it's in review", "Edits to the name, address or category during review can restart the process, so we agree on what to leave alone until Google answers."],
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          generateArticleSchema({ title: h1, description, url: `${base}${path}`, datePublished: "2026-11-27" }),
          generateBreadcrumbSchema([{ name: "Home", url: base }, { name: "Results", url: `${base}/results` }, { name: "Cooling Comfort", url: `${base}${path}` }]),
        ]}
      />
      <section className="hero-wash relative overflow-hidden pt-36 md:pt-44">
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
        <div className="container-tt relative pb-14 md:pb-20">
          <Crumbs items={[["/", "Home"], ["/results", "Results"], [path, "Cooling Comfort"]]} />
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
          <div className="max-w-3xl">
            <span className="eyebrow">Case study · HVAC</span>
            <h1 className="display mt-6 text-ink">{h1}</h1>
            <p className="lead mt-6">
              Cooling Comfort Inc. is an HVAC company in Inglewood, California. For months, its Google Business Profile
              sat unverified. One free call with us, and three days later it was verified.
            </p>
          </div>
          <div className="mt-10 grid max-w-3xl grid-cols-3 gap-2.5 sm:gap-4">
            {STATS.map(([v, l]) => (
              <div key={l} className="card min-w-0 p-2.5 min-[375px]:p-3.5 sm:p-5">
                <p className="font-display text-xl font-bold text-ink min-[375px]:text-2xl sm:text-3xl md:text-4xl">{v}</p>
                <p className="mt-1 text-xs text-ink-soft sm:text-sm">{l}</p>
              </div>
            ))}
          </div>
          </div>
          <figure className="mx-auto w-full max-w-xs lg:col-span-4 lg:max-w-none">
            <NfcCard card="cooling-comfort" />
            <figcaption className="mt-5 text-center text-sm text-ink-soft">
              Cooling Comfort&apos;s tap-to-review card. A tap with a phone, or a scan of the QR code, opens their Google review page. Press it to flip.
            </figcaption>
          </figure>
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-tt growth-prose max-w-3xl">
          <h2>The problem</h2>
          <p>
            When a homeowner&apos;s AC quits, they search &quot;AC repair near me&quot; and call one of the companies on the
            map. A Google Business Profile that isn&apos;t verified is a profile the owner doesn&apos;t fully control, and it
            can&apos;t do that job properly. Cooling Comfort had been trying to get verified for months. Every attempt ended
            the same way: still not verified, and no clear reason why.
          </p>
          <p>
            That&apos;s common. Google&apos;s verification steps change, the option you&apos;re offered depends on your
            profile, and a small detail (a name that doesn&apos;t match, an address Google can&apos;t confirm, an edit made
            mid-review) can send you back to the start without much explanation.
          </p>

          <h2>What we did</h2>
          <p>
            We got on a free consultation call with Cooling Comfort and went through the profile and the verification steps
            together. These are the things we look at on every verification call:
          </p>
          <ul className="not-list">
            {CHECKLIST.map(([h, p]) => (
              <li key={h} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-success" /><span><strong>{h}.</strong> {p}</span></li>
            ))}
          </ul>

          <h2>The result</h2>
          <p>
            <strong>Three days after the call, Cooling Comfort&apos;s Google Business Profile was verified.</strong> After
            months of trying alone, it took one conversation and a few days. With the profile verified, the owner controls
            what Google shows: the services, the service area, photos, hours and replies to reviews.
          </p>

          <h2>Stuck on verification yourself?</h2>
          <p>
            Start with our step-by-step guide on{" "}
            <Link href="/guides/how-to-verify-google-business-profile">how to verify a Google Business Profile</Link>. If
            Google asked for a video, here&apos;s{" "}
            <Link href="/guides/google-business-profile-video-verification">what to film and how</Link>. If you&apos;ve been
            stuck for weeks, read{" "}
            <Link href="/guides/google-business-profile-verification-problems">why verification fails and how to fix it</Link>.
          </p>
          <p>
            Or skip the reading: call us at <a href="tel:+13323331008">(332) 333-1008</a> and we&apos;ll go through it with
            you on a free call, the same way we did with Cooling Comfort.
          </p>
        </div>
      </section>

      <CallNowBand title="Profile stuck unverified? Call us, the call is free" />
      <AuditBand title="Already verified? See how your profile stacks up" />
      <NextSteps
        items={[
          ["/services/google-business-profile", "Google Business Profile management", "We set it up, keep it accurate and post to it every month."],
          ["/results/presidential-roofing", "Presidential Roofing", "How a Utah roofer went from 27 to 43 Google reviews in 20 days."],
          ["/marketing/hvac", "HVAC marketing plan", "How homeowners search for HVAC companies, and what we'd do first."],
        ]}
      />
    </>
  );
}
