// Seasons Taiwanese Eatery (Honolulu): a 2025 restaurant client, no longer active. Numbers are the ones we published
// with the client's videos at the time (YouTube descriptions, May and July 2025). Nothing here is newer than that.
import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import JsonLd from "@/app/components/site/JsonLd";
import ShortPlayer from "@/app/components/growth/ShortPlayer";
import { CallNowBand } from "@/app/components/growth/ContactCtas";
import { AuditBand, Crumbs, NextSteps } from "@/app/components/growth/Growth";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/app/lib/schema";
import { SEASONS_SHORTS, clientShortSchema } from "@/app/lib/growth/video";

const base = "https://www.tableturnerr.com";
const path = "/results/seasons-taiwanese-eatery";
const h1 = "How a family-run Honolulu restaurant brought in 500+ customers";
const description =
  "Seasons Taiwanese Eatery, a small family-run restaurant in Honolulu, brought in 500+ customers with a new search-optimized website, a Google review plan, outreach to 1,500+ locals and influencer content.";

export const metadata: Metadata = {
  title: { absolute: "Seasons Taiwanese Eatery: 500+ Customers for a Honolulu Restaurant" },
  description,
  alternates: { canonical: `${base}${path}` },
  openGraph: { title: h1, description, url: `${base}${path}`, type: "article" },
};

const STATS = [
  ["500+", "customers brought in"],
  ["1,500+", "locals reached directly"],
  ["2025", "Honolulu, Hawaii"],
];

const WHAT: [string, string][] = [
  ["A new website built for search", "Fast on a phone, with the menu, hours and location where people look, set up so Google can show it for nearby searches."],
  ["A plan for more Google reviews", "Simple ways for happy diners to leave a review, so the profile reflected how good the food was."],
  ["Direct outreach to 1,500+ locals", "Reaching people near the restaurant who had never tried it, and staying in touch with the ones who had."],
  ["Content shoots and influencer marketing", "Food content made on site and shared with local creators, so the restaurant showed up in feeds, not just in search."],
  ["Testing every week", "Trying new posts and offers, keeping what resonated with their audience and dropping what didn't."],
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          generateArticleSchema({ title: h1, description, url: `${base}${path}`, datePublished: "2026-11-23" }),
          generateBreadcrumbSchema([{ name: "Home", url: base }, { name: "Results", url: `${base}/results` }, { name: "Seasons Taiwanese Eatery", url: `${base}${path}` }]),
          ...SEASONS_SHORTS.map((s) => clientShortSchema(s)),
        ]}
      />
      <section className="hero-wash relative overflow-hidden pt-36 md:pt-44">
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
        <div className="container-tt relative pb-14 md:pb-20">
          <Crumbs items={[["/", "Home"], ["/results", "Results"], [path, "Seasons Taiwanese Eatery"]]} />
          <div className="max-w-3xl">
            <span className="eyebrow">Case study · Restaurant</span>
            <h1 className="display mt-6 text-ink">{h1}</h1>
            <p className="lead mt-6">
              Seasons Taiwanese Eatery is a small, family-run restaurant in Honolulu. The food was great. Not enough locals knew
              it was there. In 2025 we ran their digital marketing, and the videos below show what that looked like.
            </p>
          </div>
          <div className="mt-10 grid max-w-3xl grid-cols-3 gap-4">
            {STATS.map(([v, l]) => (
              <div key={l} className="card p-5">
                <p className="font-display text-3xl font-bold text-ink md:text-4xl">{v}</p>
                <p className="mt-1 text-sm text-ink-soft">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface" data-analytics-section="case_study">
        <div className="container-tt">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Watch</span>
            <h2 className="display-2 mt-5 text-ink">See the work</h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl gap-8 sm:grid-cols-2">
            {SEASONS_SHORTS.map((s) => <ShortPlayer key={s.id} video={s} summary />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-tt growth-prose max-w-3xl">
          <h2>The problem</h2>
          <p>
            Restaurants live on locals coming back and telling their friends. Seasons had loyal regulars, but people a few
            blocks away still hadn&apos;t heard of it, and there was no time between shifts to run a website, a Google profile
            and social media properly.
          </p>
          <h2>What we did</h2>
          <ul className="not-list">
            {WHAT.map(([h, p]) => (
              <li key={h} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-success" /><span><strong>{h}.</strong> {p}</span></li>
            ))}
          </ul>
          <h2>The result</h2>
          <p>
            Over the engagement, Seasons brought in <strong>500+ customers</strong> through the website, Google and social, and
            reached <strong>1,500+ locals</strong> directly. The same playbook works for any business that depends on people
            nearby: show up where they search, look trustworthy when they compare, and stay in touch after the first visit.
          </p>
          <p>
            Running a restaurant or café? See <Link href="/restaurants">our restaurant marketing</Link>.
          </p>
        </div>
      </section>

      <AuditBand title="Where would your business be with the same playbook?" />
      <CallNowBand title="Want results like this? Call us" />
      <NextSteps
        items={[
          ["/restaurants", "Restaurant marketing", "Website, Google profile, reviews and local search for restaurants."],
          ["/results/presidential-roofing", "Presidential Roofing", "How a Utah roofer went from 27 to 43 Google reviews in 20 days."],
          ["/results", "All client results", "Real numbers from real businesses."],
        ]}
      />
    </>
  );
}
