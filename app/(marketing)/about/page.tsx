import { ClientWall } from "@/app/components/growth/Proof";
import { softLower } from "@/app/lib/text";
import { CallNowBand } from "@/app/components/growth/ContactCtas";
import Link from "next/link";
import type { Metadata } from "next";
import EmailLink from "@/app/components/site/EmailLink";
import { pageTitle } from "@/app/lib/metadata";
import { Check } from "lucide-react";
import JsonLd from "@/app/components/site/JsonLd";
import {
  AuditBand, CardGrid, FaqSection, Glance, GrowthHero, NextSteps, SectionHead, VideoSection, faqSchemaItems,
} from "@/app/components/growth/Growth";
import { FOUNDERS, generateBreadcrumbSchema, generateFAQSchema } from "@/app/lib/schema";
import { AUDIT_PATH, FSM, clientStatesText, growthSite, ownersReady, results, services, SITE_UPDATED, trades, type Pair } from "@/app/lib/growth";

const base = "https://www.tableturnerr.com";
const title = "About TableTurnerr: Owner-Run Home-Service Marketing";
const description =
  "TableTurnerr is a small, owner-run marketing agency for home-service businesses, with its own software. Meet the team, how we work and our rules.";

export const metadata: Metadata = {
  title: pageTitle(title),
  description,
  alternates: { canonical: `${base}/about` },
  openGraph: { title, description, url: `${base}/about`, type: "website" },
};

// How we work: the same order every engagement follows. Each step is something we actually do (see the
// audit page, the services and the monthly client reports in /report).
const METHOD: Pair[] = [
  ["Audit before we pitch", "Every engagement starts with a free Google Maps audit: a ranking heatmap across your service area, your top 5 competitors' ratings and review counts, an AI-assistant check (ChatGPT, Claude, Gemini, Grok, Meta AI, Perplexity) and a homepage check. You see the gap before you spend anything."],
  ["Fix the foundation", "Google Business Profile first: the right primary and secondary categories, every service you offer, service areas, hours, photos and a steady stream of posts. It's the fastest lever for map-pack visibility."],
  ["Turn finished jobs into reviews", `Review requests go to every customer after every job, connected to ${FSM}, with a past-customer campaign to start. No gating, no incentives, nothing that puts your profile at risk.`],
  ["Make the website earn the call", "A page for each profitable service and the towns you serve, fast on a phone, with your reviews and click-to-call where people decide."],
  ["Catch every lead", "Missed-call text-back and an AI receptionist answer the homeowner who calls while you're on a roof, so the job doesn't go to the next name on the map."],
  ["Report in plain English", "A monthly report on reviews, rankings and calls, not vanity metrics. Month to month, so we earn the next month every month."],
];

const RULES = [
  ["No fake or bought reviews, no review gating", "Every customer is asked and every review goes live. Google and the FTC both ban the alternatives."],
  ["No keyword-stuffed business names", "It can get a profile suspended. We use categories, services and content instead."],
  ["No made-up numbers", "Results on this site come from clients' public Google profiles and are shared with their permission."],
  ["You stay the owner of your Google profile", "We're added as a manager. The profile, and every review on it, stays yours."],
];

const faq: Pair[] = [
  ["Is TableTurnerr software or an agency?", "Both, but you don't have to run anything. We're a small marketing company that does the work for you on our own software: Google profile, reviews, website, local SEO and call capture. Every package is done for you, month to month."],
  ["Who will I actually talk to?", "One of the owners. We don't hand you to a sales rep or an offshore account manager."],
  ["Which businesses do you work with?", `US home-service businesses: ${trades.slice(0, 8).map((t) => softLower(t.name)).join(", ")} and more. We have clients in ${clientStatesText}.`],
  ["Do you require a contract?", "No. Month to month."],
  ["What do I keep if I leave?", "If you cancel, you can buy your website from us for a one-time fee (ask us for the amount). Our CRM, the backend and the automations stay with us."],
  ["How do I start?", "Request a free Google Maps audit. We build the report, walk you through it on a short call and tell you honestly whether we can help."],
];

export default function AboutPage() {
  const r = results[0];
  const crumbs: Pair[] = [["/", "Home"], ["/about", "About"]];
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: title,
            description,
            url: `${base}/about`,
            about: { "@id": `${base}/#organization` },
            mainEntity: FOUNDERS,
            dateModified: SITE_UPDATED,
          },
          generateFAQSchema(faqSchemaItems(faq)),
          generateBreadcrumbSchema([{ name: "Home", url: base }, { name: "About", url: `${base}/about` }]),
        ]}
      />

      <GrowthHero
        crumbs={crumbs}
        eyebrow="About us"
        h1="A small, owner-run marketing team for home-service businesses"
        lede="We make roofers, plumbers, HVAC companies, electricians and other home-service businesses look like the best choice on Google, and we do the work for you. When you call, you talk to an owner: the same people who built the software and run your account."
      />

      <Glance
        heading="TableTurnerr at a glance"
        rows={[
          ["What we are", "A small, owner-run online marketing agency for US home-service businesses, with our own software behind the work."],
          ["What we do", <span key="s">{services.map((s, i) => <span key={s.slug}>{i > 0 && ", "}<Link href={s.path} className="font-semibold text-primary">{s.short}</Link></span>)}, plus visibility in AI assistants like ChatGPT.</span>],
          ["Who we work with", <span key="t">{trades.length} home-service trades including HVAC, plumbing, roofing, electrical, handyman and fencing. <Link href="/marketing" className="font-semibold text-primary">See all trades</Link>.</span>],
          ["Clients", `${growthSite.businessesServed} businesses served since we started.`],
          ["Where", `Clients in ${clientStatesText}. We work with businesses anywhere in the US.`],
          ["Reviews", <a key="tp" href={growthSite.trustpilotUrl} className="font-semibold text-primary" target="_blank" rel="noopener noreferrer">TableTurnerr on Trustpilot</a>],
          ["How we work", "Done for you, month to month, by the rules: no fake reviews, no review gating."],
          r ? ["Results", <Link key="r" href={r.path} className="font-semibold text-primary">{r.client}: {r.reviewsBefore} to {r.reviewsAfter} Google reviews in {r.days} days</Link>] : null,
          ["Contact", <span key="c"><a href={`tel:${growthSite.phoneE164}`} className="font-semibold text-primary">{growthSite.phoneDisplay}</a> · <EmailLink className="font-semibold text-primary" /> · <a href={growthSite.bookingUrl} className="font-semibold text-primary">book a 15-minute call</a></span>],
        ]}
      />

      <section className="section">
        <div className="container-tt grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="eyebrow">Why we exist</span>
            <h2 className="display-2 mt-5 text-ink">Great work shouldn&apos;t lose to a better-looking Google profile</h2>
          </div>
          <div className="space-y-4 text-ink-soft lg:col-span-7">
            <p className="text-lg leading-relaxed">
              We kept seeing the same thing: the best contractor in town, doing careful, honest work all week, losing jobs to a
              louder competitor with more recent reviews and a better Google profile.
            </p>
            <p className="leading-relaxed">
              Homeowners can&apos;t see the quality of your work before they call. They see the map, three businesses, the stars,
              the review count, and whether anyone picks up the phone. Whoever wins that snapshot wins the job.
            </p>
            <p className="leading-relaxed">
              So we built the software and the process to fix it, and we run it for you: your Google Business Profile, your
              reviews, your website, local SEO and the calls you&apos;d otherwise miss. Most owners we work with don&apos;t want
              another dashboard. They want the phone to ring with the right jobs.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-tt">
          <SectionHead
            eyebrow="How we work"
            title="The same six steps, in the same order, for every client"
            intro="Marketing for a home-service business isn't a mystery. It's a short list of things done properly and kept up every month."
          />
          <CardGrid items={METHOD} numbered />
          <p className="mt-8 text-sm text-ink-soft">
            Want to see step one on your own business? <Link href={AUDIT_PATH} className="font-semibold text-primary">Get the free Google Maps audit</Link>, or read how we think about it in our <Link href="/guides" className="font-semibold text-primary">guides for owners</Link>.
          </p>
        </div>
      </section>

      <VideoSection
        eyebrow="Hear it from the owner"
        title="What we do for local businesses, in 6 minutes"
        intro="The same walkthrough we give on calls: reviews, one inbox for calls and texts, automations like missed-call text-back, staying active online, the free audit report and what it costs."
      />

      <section className="section bg-surface">
        <div className="container-tt grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="eyebrow">Our rules</span>
            <h2 className="display-2 mt-5 text-ink">Nothing that puts your Google profile at risk</h2>
            <p className="lead mt-4">Shortcuts in local marketing tend to end in a suspended profile. We don&apos;t take them.</p>
          </div>
          <ul className="space-y-5 lg:col-span-7">
            {RULES.map(([h, p]) => (
              <li key={h} className="flex gap-3">
                <Check className="mt-1 h-5 w-5 shrink-0 text-success" />
                <div><p className="font-bold text-ink">{h}</p><p className="mt-1 text-sm leading-relaxed text-ink-soft">{p}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {ownersReady && (
        <section className="section">
          <div className="container-tt">
            <SectionHead eyebrow="The team" title="Who you'll work with" />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {growthSite.owners.map((o) => (
                <div key={o.name} className="card flex flex-col gap-5 p-6 sm:flex-row sm:p-7">
                  {o.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={o.photo} alt={`${o.name}, ${o.role} of TableTurnerr`} width={96} height={96} className="h-24 w-24 shrink-0 rounded-full object-cover" />
                  ) : (
                    <span aria-hidden className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-primary-soft font-display text-2xl font-bold text-primary">
                      {o.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                    </span>
                  )}
                  <div>
                    <p className="text-lg font-bold text-ink">{o.name}</p>
                    <p className="text-sm text-muted">{o.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{o.bio}</p>
                    {o.links.length > 0 && <p className="mt-3 flex gap-4 text-sm">
                      {o.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener me" className="font-semibold text-primary hover:underline">{l.label}</a>
                      ))}
                    </p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ClientWall surface />
      <AuditBand title="Talk to an owner, starting with a free audit" />
      <FaqSection faq={faq} />
      <CallNowBand />
      <NextSteps
        items={[
          ["/services", "What we do", "Google Business Profile, reviews, local SEO, websites and missed-call text-back, done for you."],
          ["/marketing", "Marketing plans by trade", `How homeowners search for ${trades.length} trades, and what we'd do first for each.`],
          ["/guides", "Guides for owners", "Straight answers on Google Maps rankings, reviews and getting more calls."],
        ]}
      />
    </>
  );
}
