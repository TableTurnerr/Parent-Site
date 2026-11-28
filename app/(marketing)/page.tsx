import { ClientWall, HeroProof, HomeResult } from "@/app/components/growth/Proof";
import { BookCallBand, CallNowBand } from "@/app/components/growth/ContactCtas";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MessageSquareText, Repeat2, Bot,
  Wrench, Home, Droplets, Zap, Check, ArrowRight, Plug,
  BadgeCheck, EyeOff,
} from "lucide-react";
import PlainImage from "@/app/components/site/PlainImage";
import Reveal from "@/app/components/site/Reveal";
import ShortPlayer from "@/app/components/growth/ShortPlayer";
import { HERO_SHORT, clientShortSchema } from "@/app/lib/growth/video";
import Accordion from "@/app/components/site/Accordion";
import JsonLd from "@/app/components/site/JsonLd";
import { generateFAQSchema, generateServiceSchema } from "@/app/lib/schema";
import ProductBento from "@/app/components/site/ProductBento";
import { CustomPricingBar, PlanCards, PricingNote } from "@/app/components/growth/PricingTiers";
import { HomeDoneForYou } from "@/app/components/growth/HomeSections";
import AiAnsweringDemo from "@/app/components/growth/AiAnsweringDemo";
import HowItWorksFlow, { type FlowStep } from "@/app/components/growth/HowItWorksFlow";
import { growthSite } from "@/app/lib/growth";

export const metadata: Metadata = {
  // Absolute title so the root "%s | TableTurnerr" template doesn't double-brand
  // the homepage. Keyword-first so the crawler reads the target phrase first.
  title: { absolute: "Home-Service Marketing Agency, SEO & Reviews | TableTurnerr" },
  description:
    "Done-for-you marketing for home-service businesses: websites and SEO, Google profile, reviews, CRM, automations and seasonal campaigns. Get a free Maps audit.",
  alternates: { canonical: "https://www.tableturnerr.com" },
};

/* ── Hero ───────────────────────────────────────────────── */
// What a client gets, shown as chips above the fold so the page reads "agency", not "review tool".
const HERO_SERVICES = ["Websites & SEO", "Google Business Profile", "Reviews", "CRM & automations", "Seasonal campaigns", "AI answering"];
function Hero() {
  return (
    <section data-analytics-section="hero" className="hero-wash relative overflow-hidden pt-36 md:pt-44">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <div className="container-tt relative pb-16 md:pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <HeroProof />
          <h1 className="display mt-6 text-ink">
            We get home-service businesses{" "}
            <span className="text-primary">more calls from Google</span>
          </h1>
          <p className="lead mx-auto mt-6 max-w-3xl">
            We build your website, run your Google profile, bring in reviews and
            follow up with every lead, so homeowners find you first and pick you
            over the competition. Done for you, month to month.
          </p>

          <ul aria-label="What we run for you" className="mx-auto mt-7 flex max-w-4xl flex-wrap justify-center gap-2">
            {HERO_SERVICES.map((s) => (
              <li key={s} className="rounded-full border border-line bg-bg/70 px-3.5 py-1.5 text-sm font-medium text-ink-soft backdrop-blur">
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/free-google-maps-audit" className="btn btn-primary">
              Get your free Google Maps audit <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={growthSite.bookingUrl} className="btn btn-ghost">
              Book a 15-minute call
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-soft">
            {[`${growthSite.businessesServed} businesses served`, "Month to month, no contracts", "You talk to an owner, not a rep"].map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-success" /> {t}
              </li>
            ))}
          </ul>

          {/* Real client, real result: Adrian (Presidential Roofing, Utah) in his own words. */}
          <div className="relative mx-auto mt-12 max-w-[20rem] md:mt-14">
            <JsonLd data={clientShortSchema(HERO_SHORT)} />
            <ShortPlayer video={HERO_SHORT} summary />
            <p className="mt-4 text-sm text-ink-soft">
              <span className="font-semibold text-ink">Adrian, Presidential Roofing (Utah)</span>: from 27 reviews in 4.5 years to the first roofer on Google in his area
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Stat strip ─────────────────────────────────────────── */
const STATS = [
  { v: `${growthSite.businessesServed}`, l: "businesses served since we started" },
  { v: "27 → 43", l: "Google reviews in 20 days for a Utah roofer" },
  { v: `${growthSite.clientStates.length}`, l: "states where we have clients today" },
  { v: "0", l: "long-term contracts. Month to month" },
];
function Stats() {
  return (
    <section data-analytics-section="results_metrics" className="pb-6 pt-2 md:pb-10">
      <div className="container-tt">
        <dl className="grid grid-cols-2 overflow-hidden rounded-[1.5rem] border border-line bg-surface md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.l}
              className={`flex flex-col items-center justify-center px-4 py-7 text-center md:px-6 md:py-9 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
            >
              <dt className="order-2 mt-2 max-w-[13rem] text-sm leading-snug text-ink-soft">{s.l}</dt>
              <dd className="order-1 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ── Problem ────────────────────────────────────────────── */
const PROBLEMS = [
  { t: "Homeowners can't find you", b: "A thin Google profile, a website that doesn't rank and too few recent reviews, so the louder competitor gets the call." },
  { t: "Leads slip through the cracks", b: "Calls go to voicemail while you're on a job, estimates never get a follow-up, and nobody tracks where leads went." },
  { t: "Past customers forget you", b: "No tune-up reminders, no seasonal offers, no reason to call you back, so repeat work goes to whoever reached them first." },
];
function Problem() {
  return (
    <section data-analytics-section="marketing_gap" className="section bg-surface">
      <div className="container-tt">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Where jobs get lost</span>
          <h2 className="display-2 mt-5 text-ink">Great work isn&apos;t enough if nobody finds you, and nobody follows up</h2>
        </div>
        <Reveal className="mt-12 grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((p) => (
            <div key={p.t} className="card p-7">
              <h3 className="text-lg font-bold text-ink">{p.t}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{p.b}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── Features (our wedge vs ReviewHarvest) ──────────────── */
// Kept as source copy for feature pages; homepage uses the richer interactive bento below.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FEATURES = [
  { icon: Repeat2, t: "Review Reactivation", b: "Launch with a polite blast to your entire past-customer list. Most shops get a wave of fresh reviews in the first week." },
  { icon: Bot, t: "AI requests & replies", b: "Personalized, name-on-the-photo requests by text and email, plus AI that replies to every review for you." },
  { icon: MessageSquareText, t: "Widgets & auto social posts", b: "Show your best reviews on your site and turn every 5-star into a branded Facebook and Instagram post automatically." },
];
function Features() {
  return <ProductBento />;
}

/* ── How it works ───────────────────────────────────────── */
const STEPS: [FlowStep, FlowStep, FlowStep] = [
  { t: "Free Google Maps audit", b: "We map where you rank across your service area, compare you with your top competitors and show you what's missing." },
  { t: "We fix and set up", b: "You might not need a new website, or SEO, or reviews. We only quote what will move the needle, and set it all up for you." },
  { t: "We run it every month", b: "Content, reviews, campaigns and follow-ups keep running. You get a plain-English report on rankings, reviews and calls." },
];
function How() {
  return (
    <section id="how" data-analytics-section="how_it_works" className="section bg-night text-white">
      <div className="container-tt">
        <div className="max-w-2xl">
          <span className="eyebrow border-white/15 bg-white/5 text-white">How working with us works</span>
          <h2 className="display-2 mt-5 text-white">Audit first. Then we do the work, every month.</h2>
        </div>
        <Reveal className="mt-12">
          <HowItWorksFlow steps={STEPS} tone="dark" />
        </Reveal>
        <div id="integrations" className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/55">
          <span className="inline-flex items-center gap-2 font-medium text-white/80"><Plug className="h-4 w-4 text-primary" /> Connects with</span>
          {["Jobber (official integration)", "Housecall Pro (on its integrations plan)", "ServiceTitan, Workiz, QuickBooks and more through Zapier or Make", "No software? We import your customer list"].map((i) => (
            <span key={i}>{i}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Industries ─────────────────────────────────────────── */
const INDUSTRIES = [
  { icon: Wrench, t: "HVAC", href: "/marketing/hvac", img: "/images/trades/hvac-review-automation.webp" },
  { icon: Home, t: "Roofing", href: "/marketing/roofing", img: "/images/trades/roofing-review-automation.webp" },
  { icon: Droplets, t: "Plumbing", href: "/marketing/plumbing", img: "/images/trades/plumbing-review-automation.webp" },
  { icon: Zap, t: "Electrical", href: "/marketing/electricians", img: "/images/trades/electrical-review-automation.webp" },
];
function Industries() {
  return (
    <section id="industries" data-analytics-section="industries" className="section">
      <div className="container-tt">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Made for your industry</span>
          <h2 className="display-2 mt-5 text-ink">Marketing plans written for your trade</h2>
          <p className="lead mt-4">Homeowners search differently for a roofer than for a plumber. Each plan starts from how your customers actually look for you.</p>
        </div>
        <Reveal className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
          {INDUSTRIES.map((t) => (
            <Link
              key={t.t}
              href={t.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-line shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <PlainImage
                src={t.img}
                alt={`${t.t} marketing`}
                width={400}
                height={500}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* scrim so the image blends into the label */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/5"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md">
                  <t.icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold text-white">{t.t}</h3>
                <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-white/85 transition-colors group-hover:text-white">
                  See the {t.t} plan{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
        <div className="mt-9 text-center">
          <Link href="/marketing" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            See all 17 trades <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Compliance / no gating ─────────────────────────────── */
const COMPLIANCE = [
  { icon: EyeOff, t: "No review gating", b: "We never filter or hide unhappy customers behind a private form. Everyone gets asked, and every review goes live." },
  { icon: BadgeCheck, t: "FTC & Google compliant", b: "Review gating is banned by both. We keep you firmly on the right side of the rules, so your profile never gets penalized." },
  { icon: MessageSquareText, t: "A2P-registered SMS", b: "Texts send from registered numbers that honor opt-outs, so your messages land and your number stays trusted." },
];
function Compliance() {
  return (
    <section className="section bg-night text-white">
      <div className="container-tt">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow border-white/15 bg-white/5 text-white">Honest by design</span>
          <h2 className="display-2 mt-5 text-white">We never hide your bad reviews</h2>
          <p className="lead mt-4 text-white/70">
            Some tools quietly route unhappy customers to a private form. Google and the FTC ban
            that, and it wrecks the trust reviews are supposed to build. We ask every customer and
            let every review stand, the honest way that actually wins more work.
          </p>
        </div>
        <Reveal className="mt-12 grid gap-5 md:grid-cols-3">
          {COMPLIANCE.map((c) => (
            <div key={c.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-star">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-white">{c.t}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/65">{c.b}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── AI answering ───────────────────────────────────────── */
function AiAnswering() {
  return (
    <section id="ai-answering" data-analytics-section="ai_answering" className="section">
      <div className="container-tt">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">AI answering service</span>
          <h2 className="display-2 mt-5 text-ink">Every call answered, even at 9 PM</h2>
          <p className="lead mt-4">
            Your AI receptionist answers in your business name, books the job and texts you a summary. Pick your trade to see
            a sample call, or call the demo line and ask it anything.
          </p>
        </div>
        <div className="mt-12"><AiAnsweringDemo /></div>
        <p className="mt-6 text-center text-sm text-ink-soft">
          <Link href="/services/ai-answering-service" className="font-semibold text-primary hover:underline">How the AI answering service works</Link>
        </p>
      </div>
    </section>
  );
}

/* ── Pricing ────────────────────────────────────────────── */
function Pricing() {
  return (
    <section id="pricing" data-analytics-section="pricing" className="section bg-surface">
      <div className="container-tt">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Pricing</span>
          <h2 className="display-2 mt-5 text-ink">Five simple packages.</h2>
          <p className="lead mt-4">
            Each one includes everything in the one before it, from $97/mo. No contracts.
          </p>
        </div>
        <Reveal className="mt-12">
          <PlanCards />
        </Reveal>
        <PricingNote />
        <CustomPricingBar />
        <p className="mt-4 text-center text-sm text-ink-soft">
          <Link href="/pricing" className="font-semibold text-primary hover:underline">
            See full pricing details
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ── FAQ ────────────────────────────────────────────────── */
const FAQS = [
  { q: "Is TableTurnerr software or a marketing agency?", a: "A marketing agency first. We're a done-for-you team for home-service businesses, and we built our own software to do the work: websites and SEO, Google Business Profile, reviews, CRM and automations, seasonal campaigns and missed-call text-back. The software is included, so there's nothing extra to buy." },
  { q: "What does the free Google Maps audit include?", a: "A ranking heatmap across your service area, your top 5 competitors' ratings and review counts next to yours, whether AI assistants like ChatGPT recommend you, a homepage check, and what to fix first. We walk you through it on a short call and you keep the report." },
  { q: "How fast will I see new reviews?", a: "Usually as soon as the past-customer campaign goes out. For example, Presidential Roofing in Utah went from 27 to 43 Google reviews in 20 days, and new jobs keep the reviews coming after that." },
  { q: "Which platforms do you collect reviews on?", a: "Google. It's where most people look before they call a local company, and it's what moves you up the map pack, so every request we send goes to your Google review page. We don't run review requests for Facebook, Yelp or Angi." },
  { q: "Does it work with my software?", a: "Yes. Jobber has an official integration, Housecall Pro connects on its plan that allows integrations, and any other software (ServiceTitan, Workiz, QuickBooks and more) connects through Zapier or Make. No software? We import your customer list." },
  { q: "How much does it cost?", a: "Five packages, each with everything in the one before it: Reviews $97, Starter $297, Growth $597 (adds 24/7 AI answering, 150 min), Complete $797 and Partner $1,797 a month. Need something different? Call us for custom pricing. No contracts, and 2 months free if you pay yearly. Book a call or call us for an exact price." },
  { q: "Do I need a contract?", a: "No. Move up or down whenever you need: drop a plan in the slow season and step back up when it gets busy. No penalties." },
  { q: "Can my techs ask for reviews in person?", a: "Yes. Every package includes custom NFC review cards: a tech taps the card on the customer's phone and your Google review page opens, so the ask can happen before they leave the job." },
];
function FAQ() {
  return (
    <section className="section">
      <div className="container-tt grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="eyebrow">FAQ</span>
          <h2 className="display-2 mt-5 text-ink">Questions, answered</h2>
          <p className="lead mt-4">Still unsure? <Link href="/contact" className="font-semibold text-primary">Talk to us</Link>.</p>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={FAQS} />
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA ──────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="section">
      <div className="container-tt">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-night px-7 py-14 text-center md:px-16 md:py-20">
          <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-2xl">
            <div className="stars mb-5 text-2xl" aria-hidden>★★★★★</div>
            <h2 className="display-2 text-white">See exactly why competitors get the call</h2>
            <p className="lead mt-4 text-white/70">
              Get a free Google Maps audit: where you rank across your service
              area, how you compare to the top competitors near you, and what to
              fix first. Owner to owner, and you keep the report.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/free-google-maps-audit" className="btn btn-light">
                Get your free audit <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={growthSite.bookingUrl} className="btn btn-outline-light">
                Book a 15-minute call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Trust marquee ──────────────────────────────────────── */
// Logos from each company's own site icon (public/images/tools). Links go to our integration page where one exists.
const TRUST: { name: string; logo: string; href?: string }[] = [
  { name: "Jobber", logo: "jobber", href: "/integrations/jobber" },
  { name: "Housecall Pro", logo: "housecall-pro", href: "/integrations/housecall-pro" },
  { name: "ServiceTitan", logo: "servicetitan", href: "/integrations/servicetitan" },
  { name: "Workiz", logo: "workiz", href: "/integrations/workiz" },
  { name: "QuickBooks", logo: "quickbooks", href: "/integrations/quickbooks" },
  { name: "Zapier", logo: "zapier" },
  { name: "Google", logo: "google" },
];
function TrustChip({ t, hidden = false }: { t: (typeof TRUST)[number]; hidden?: boolean }) {
  const inner = (
    <>
      <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-[#fff] ring-1 ring-black/5">
        <PlainImage src={`/images/tools/${t.logo}.webp`} alt={`${t.name} logo`} width={32} height={32} className="h-full w-full object-contain p-0.5" />
      </span>
      <span className="whitespace-nowrap text-sm font-semibold text-ink-soft">{t.name}</span>
    </>
  );
  const cls = "flex items-center gap-2.5 rounded-full border border-line bg-bg py-1.5 pl-1.5 pr-4 transition-colors hover:border-primary";
  return t.href
    ? <Link href={t.href} className={cls} tabIndex={hidden ? -1 : undefined}>{inner}</Link>
    : <span className={cls}>{inner}</span>;
}
function TrustMarquee() {
  return (
    <section className="border-b border-line py-8" data-analytics-section="tools_strip">
      <p className="container-tt text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        Works with the tools you already run your business on
      </p>
      <div className="tt-marquee-wrap mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:overflow-x-auto">
        <ul className="tt-marquee flex w-max gap-3 pr-3">
          {[...TRUST, ...TRUST].map((t, i) => (
            <li key={`${t.name}-${i}`} aria-hidden={i >= TRUST.length || undefined}>
              <TrustChip t={t} hidden={i >= TRUST.length} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Testimonials — DISABLED (placeholder/fabricated reviews; restore when real customer quotes exist) ──
const TESTIMONIALS = [
  { quote: "We went from 60-something Google reviews to over 200 in three months. The phone rings more, plain and simple.", name: "Mike R.", role: "Owner, HVAC", loc: "Round Rock, TX" },
  { quote: "The technician leaderboard turned reviews into a competition. My crew actually asks customers now.", name: "Dana P.", role: "Operations, Roofing", loc: "Dallas, TX" },
  { quote: "Set it up in an afternoon, connected Housecall Pro, and reviews just started showing up. Easiest tool we use.", name: "Carlos M.", role: "Owner, Plumbing", loc: "Phoenix, AZ" },
];
function Testimonials() {
  return (
    <section className="section">
      <div className="container-tt">
        <div className="max-w-2xl">
          <span className="eyebrow">From the field</span>
          <h2 className="display-2 mt-5 text-ink">Trusted by home-services pros</h2>
        </div>
        <Reveal className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card flex h-full flex-col p-7">
              <Quote className="h-6 w-6 text-primary/30" aria-hidden />
              <div className="stars mt-3 text-sm" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote className="mt-3 flex-1 text-[0.97rem] leading-relaxed text-ink-soft">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-line pt-4 text-sm">
                <span className="font-bold text-ink">{t.name}</span>
                <span className="block text-muted">{t.role} · {t.loc}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
*/

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          generateServiceSchema({
            name: "Done-for-you marketing for home-service businesses",
            description:
              "Websites and local SEO, Google Business Profile management, Google review generation, CRM and automations, seasonal campaigns and missed-call text-back, run for you on TableTurnerr's own software. Month to month.",
            url: "https://www.tableturnerr.com",
          }),
          generateServiceSchema({
            name: "Review Automation for Home Services",
            description:
              "Ask every customer for a Google review after every finished job, with follow-ups, replies and NFC review cards. Built for HVAC, roofing, plumbing and electrical pros.",
            url: "https://www.tableturnerr.com/features",
          }),
          generateFAQSchema(FAQS.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Hero />
      <Stats />
      <ClientWall />
      <TrustMarquee />
      {/* Problem, then the full done-for-you program + free audit, then proof, then the software story. */}
      <Problem />
      <HomeDoneForYou />
      <HomeResult />
      <BookCallBand />
      <Features />
      <How />
      <Industries />
      <Compliance />
      <AiAnswering />
      <Pricing />
      <CallNowBand />
      <FAQ />
      <FinalCTA />
    </>
  );
}
