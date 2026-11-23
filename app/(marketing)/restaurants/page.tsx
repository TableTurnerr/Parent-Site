import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/site/JsonLd";
import {
  AuditBand, CardGrid, ClientProof, FaqSection, Glance, GrowthHero, NextSteps, SectionHead, faqSchemaItems,
} from "@/app/components/growth/Growth";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/app/lib/schema";
import { AUDIT_PATH, type Pair } from "@/app/lib/growth";
import { TEXAS_CLIENTS } from "@/app/lib/growth/clients";

// One honest page for restaurant owners. TableTurnerr started in restaurant marketing and still works with a few
// independent restaurants (see clients.ts); the old restaurant-era URLs (/services/restaurant-*, /restaurants,
// /locations/restaurants/*) 301 here instead of to the homepage, so those searchers land on something relevant.
const base = "https://www.tableturnerr.com";
const path = "/restaurants";
const title = "Restaurant Marketing: Websites, Google Profile & Reviews";
const description =
  "Websites, Google Business Profile and review growth for independent restaurants, bakeries and cafés, done for you. Texas clients in Richardson and Dallas.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${base}${path}` },
  openGraph: { title: `${title} | TableTurnerr`, description, url: `${base}${path}` },
};

const WHAT: Pair[] = [
  ["A website that sells the food", "Fast on a phone, with your menu as real text Google can read, photos, hours, directions and a clear way to order or call. We build it and keep it running."],
  ["Google Business Profile", "The right categories, current hours (including holidays), menu link, photos and posts, so you show up when people nearby search for what you serve."],
  ["More reviews, answered", "A simple way for happy guests to leave a Google review, and a reply to every review, good or bad."],
  ["Local search", "Pages and profile details that match how people search: dish, cuisine and neighborhood, not just your name."],
];

const faq: Pair[] = [
  ["Do you still work with restaurants?", "Yes, with a small number of independent restaurants, bakeries and cafés. Most of our work today is with home-service businesses, so we take on restaurants where we're a good fit."],
  ["Do you handle online ordering or delivery apps?", "We're not a POS or ordering system. We build your site and point it at the ordering system you already use."],
  ["Do I need a contract?", "No. Month to month."],
  ["How do I start?", "Request the free Google Maps audit. We'll show you where you rank for your main searches and what to fix first."],
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          generateServiceSchema({ name: "Restaurant marketing", description, url: `${base}${path}` }),
          generateFAQSchema(faqSchemaItems(faq)),
          generateBreadcrumbSchema([{ name: "Home", url: base }, { name: "Restaurants", url: `${base}${path}` }]),
        ]}
      />
      <GrowthHero
        crumbs={[["/", "Home"], [path, "Restaurants"]]}
        eyebrow="Restaurants, bakeries & cafés"
        h1="Marketing for independent restaurants, done for you"
        lede="Most of our clients are home-service businesses, but we also build and run websites, Google profiles and review systems for a few independent restaurants, bakeries and cafés. Same approach: done for you, month to month, and you talk to an owner."
      />
      <Glance
        rows={[
          ["Who it's for", "Independent restaurants, bakeries and cafés with a physical location."],
          ["What we do", "Website, Google Business Profile, reviews and local search."],
          ["What we don't do", "POS, online ordering or delivery apps. We connect your site to the ones you use."],
          ["Where", "Texas clients in Richardson and Dallas; we work anywhere in the US."],
          ["Terms", "Month to month."],
          ["First step", <span key="a">A <Link href={AUDIT_PATH} className="font-semibold text-primary">free Google Maps audit</Link>.</span>],
        ]}
      />
      <ClientProof clients={TEXAS_CLIENTS} title="Restaurants we work with" />
      <section className="section pt-0">
        <div className="container-tt">
          <Link href="/results/seasons-taiwanese-eatery" className="card card-hover flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-primary">Case study · Honolulu</span>
              <span className="mt-1 block text-lg font-bold text-ink">How Seasons Taiwanese Eatery brought in 500+ customers</span>
            </span>
            <span className="text-sm font-semibold text-primary">Watch and read →</span>
          </Link>
        </div>
      </section>
      <section className="section bg-surface">
        <div className="container-tt">
          <SectionHead title="What we do for restaurants" />
          <CardGrid items={WHAT} cols={2} />
        </div>
      </section>
      <AuditBand title="See where your restaurant shows up on Google Maps" />
      <FaqSection faq={faq} />
      <NextSteps
        items={[
          ["/services/google-business-profile", "Google Business Profile management", "How we set up and keep a profile active."],
          ["/guides/how-to-rank-higher-on-google-maps", "How to rank higher on Google Maps", "The same ranking factors apply to restaurants."],
          ["/about", "About TableTurnerr", "A small, owner-run team."],
        ]}
      />
    </>
  );
}
