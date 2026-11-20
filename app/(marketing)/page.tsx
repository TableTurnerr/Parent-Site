import Link from "next/link";
import type { Metadata } from "next";
import {
  MessageSquareText, Repeat2, Trophy, BarChart3, Bot, Globe2,
  Wrench, Home, Droplets, Zap, Check, ArrowRight, Plug,
  BadgeCheck, EyeOff,
} from "lucide-react";
import Image from "next/image";
import Reveal from "@/app/components/site/Reveal";
import VslPlayer from "@/app/components/site/VslPlayer";
import Accordion from "@/app/components/site/Accordion";
import JsonLd from "@/app/components/site/JsonLd";
import { generateFAQSchema, generateServiceSchema } from "@/app/lib/schema";
import { PLANS } from "@/app/lib/pricing";
import ProductBento from "@/app/components/site/ProductBento";
import { PricingNote, PricingTiers } from "@/app/components/growth/PricingTiers";
import { HomeCaseStudy, HomeDoneForYou } from "@/app/components/growth/HomeSections";
import { growthSite } from "@/app/lib/growth";

export const metadata: Metadata = {
  // Absolute title so the root "%s | TableTurnerr" template doesn't double-brand
  // the homepage. Keyword-first so the crawler reads the target phrase first.
  title: { absolute: "Home-Service Marketing Agency & Review Software | TableTurnerr" },
  description:
    "Done-for-you marketing for home-service businesses: websites and SEO, Google profile, reviews, CRM, automations and seasonal campaigns. Get a free Maps audit.",
  alternates: { canonical: "https://www.tableturnerr.com" },
};

/* ── Hero ───────────────────────────────────────────────── */
function Hero() {
  return (
    <section data-analytics-section="hero" className="hero-wash relative overflow-hidden pt-36 md:pt-44">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <div className="container-tt relative pb-16 md:pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <span className="eyebrow">Marketing agency for home-service businesses</span>
          <h1 className="display mt-6 text-ink">
            We run the marketing that keeps your{" "}
            <span className="text-primary">phone ringing</span>
          </h1>
          <p className="lead mx-auto mt-6 max-w-3xl">
            Website and SEO, Google Business Profile, reviews, a CRM with
            automations, and seasonal campaigns, all done for you by a small,
            owner-run team on our own software. For HVAC, roofing, plumbing,
            electrical and other home-service businesses.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/free-google-maps-audit" className="btn btn-primary">
              Get your free Google Maps audit <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={growthSite.bookingUrl} className="btn btn-ghost">
              Book a 15-minute call
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-soft">
            {["Done for you", "Month to month", "You talk to an owner"].map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-success" /> {t}
              </li>
            ))}
          </ul>

          <div className="relative mx-auto mt-12 max-w-5xl md:mt-14">
            <VslPlayer />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Stat strip ─────────────────────────────────────────── */
const STATS = [
  { v: "1 team", l: "for your website, SEO, Google profile, reviews, CRM and campaigns" },
  { v: "27→43", l: "Google reviews in 20 days for a Utah roofing client" },
  { v: "Free", l: "Google Maps audit before you spend anything" },
  { v: "0", l: "contracts. Month to month, every plan" },
];
function Stats() {
  return (
    <section data-analytics-section="results_metrics" className="border-y border-line bg-white">
      <div className="container-tt grid grid-cols-2 gap-8 py-10 md:grid-cols-4 md:py-12">
        {STATS.map((s) => (
          <div key={s.l} className="text-center md:text-left">
            <p className="font-display text-3xl font-bold text-ink md:text-4xl">{s.v}</p>
            <p className="mt-1.5 text-sm leading-snug text-ink-soft">{s.l}</p>
          </div>
        ))}
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
  { icon: Globe2, t: "Every platform, not just Google", b: "Route happy customers to Google, Facebook, Yelp and Angi, the places home-services buyers actually check." },
  { icon: Trophy, t: "Technician leaderboards", b: "Attribute reviews to the tech who did the job. Turn reviews into a friendly competition your crew actually enjoys." },
  { icon: BarChart3, t: "Map-pack rank tracking", b: "See your local-pack rank move week over week, not just a review count. Tie reviews to the jobs they win." },
  { icon: Bot, t: "AI requests & replies", b: "Personalized, name-on-the-photo requests by text and email, plus AI that replies to every review for you." },
  { icon: MessageSquareText, t: "Widgets & auto social posts", b: "Show your best reviews on your site and turn every 5-star into a branded Facebook and Instagram post automatically." },
];
function Features() {
  return <ProductBento />;
}

/* ── How it works ───────────────────────────────────────── */
const STEPS = [
  { n: "01", t: "Free Google Maps audit", b: "We map where you rank across your service area, compare you with your top competitors and show you what's missing." },
  { n: "02", t: "A plan built for your business", b: "You might not need a new website, or SEO, or reviews. We only quote what will move the needle, and set it all up for you." },
  { n: "03", t: "We run it every month", b: "Content, reviews, campaigns and follow-ups keep running. You get a plain-English report on rankings, reviews and calls." },
];
function How() {
  return (
    <section id="how" data-analytics-section="how_it_works" className="section bg-night text-white">
      <div className="container-tt">
        <div className="max-w-2xl">
          <span className="eyebrow border-white/15 bg-white/5 text-white">How working with us works</span>
          <h2 className="display-2 mt-5 text-white">Audit first. Then we do the work, every month.</h2>
        </div>
        <Reveal className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <p className="font-display text-sm font-bold text-primary">{s.n}</p>
              <h3 className="mt-4 text-xl font-bold text-white">{s.t}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/65">{s.b}</p>
            </div>
          ))}
        </Reveal>
        <div id="integrations" className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/55">
          <span className="inline-flex items-center gap-2 font-medium text-white/80"><Plug className="h-4 w-4 text-primary" /> Connects with</span>
          {["Jobber", "Housecall Pro", "ServiceTitan", "Workiz", "QuickBooks", "Zapier"].map((i) => (
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
              <Image
                src={t.img}
                alt={`${t.t} marketing`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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

/* ── Personalized reviews ───────────────────────────────── */
function Personalized() {
  return (
    <section className="section bg-surface">
      <div className="container-tt grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <span className="eyebrow">Reviews, done properly</span>
          <h2 className="display-2 mt-5 text-ink">Reviews that feel personal, because they are</h2>
          <p className="lead mt-4">
            Every request goes out with the customer&apos;s name on it. Your crew can even snap a
            quick photo holding a sign with their name, and we attach it to the ask. It lands like a
            thank-you, not a form, and personal asks are the ones that actually get answered.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              "Name-on-the-photo review requests",
              "Sent the moment the job wraps",
              "By text and email, with gentle reminders",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-ink-soft">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-[0.97rem] leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
          <Link href="/free-google-maps-audit" className="btn btn-primary mt-9">
            Get your free Google Maps audit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <Reveal className="relative mx-auto w-full max-w-md lg:mr-0">
          <div className="overflow-hidden rounded-[1.5rem] border border-line shadow-[0_30px_70px_-35px_rgba(10,19,38,0.45)]">
            <Image
              src="/images/personalized/jessica.webp"
              alt="A home-services crew holding a sign with their customer's name to make the review request personal"
              width={760}
              height={896}
              className="h-full w-full object-cover"
            />
          </div>
          {/* floating review card */}
          <div className="tt-float absolute -bottom-5 -left-3 w-[15rem] rounded-2xl border border-line bg-white p-4 shadow-lg sm:-left-6">
            <div className="flex items-center gap-2">
              <MessageSquareText className="h-4 w-4 text-primary" aria-hidden />
              <span className="text-xs font-semibold text-muted">Example review request</span>
            </div>
            <p className="mt-1.5 text-sm leading-snug text-ink">
              &ldquo;Hi Jessica, thanks for choosing us today! Would you mind sharing a quick Google review?&rdquo;
            </p>
          </div>
        </Reveal>
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

/* ── Pricing ────────────────────────────────────────────── */
function Pricing() {
  return (
    <section id="pricing" data-analytics-section="pricing" className="section bg-surface">
      <div className="container-tt">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Pricing</span>
          <h2 className="display-2 mt-5 text-ink">Priced around what your business needs</h2>
          <p className="lead mt-4">
            Three rough levels, then a custom quote after your free audit. Month to month.
          </p>
        </div>
        <Reveal className="mt-12">
          <PricingTiers />
        </Reveal>
        <PricingNote />
        {/* Self-serve software plans, kept below the done-for-you levels. */}
        <h3 className="mt-16 text-center text-lg font-bold text-ink">Prefer to run the software yourself?</h3>
        <Reveal className="mt-6 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`card relative flex flex-col p-7 ${p.popular ? "border-primary shadow-[0_30px_70px_-40px_rgba(54,64,143,0.5)] ring-1 ring-primary" : ""}`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-bold text-ink">{p.name}</h3>
              <p className="mt-3">
                <span className="font-display text-4xl font-bold text-ink">{p.price}</span>
                <span className="text-ink-soft">{p.per}</span>
              </p>
              <p className="mt-1 text-sm text-muted">{p.note}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{p.description}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-4 text-sm font-semibold leading-relaxed text-ink">
                <span className="text-primary">Goal: </span>{p.goal}
              </p>
              <Link
                href="/signup"
                className={`btn mt-7 w-full ${p.popular ? "btn-primary" : "btn-ghost"}`}
              >
                Start free trial
              </Link>
            </div>
          ))}
        </Reveal>
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
  { q: "Is TableTurnerr software or a marketing agency?", a: "A marketing agency first. We're a done-for-you team for home-service businesses, and we built our own software to do the work: websites and SEO, Google Business Profile, reviews, CRM and automations, seasonal campaigns and missed-call text-back. If you'd rather run the software yourself, you can." },
  { q: "What does the free Google Maps audit include?", a: "A ranking heatmap across your service area, your top 5 competitors' ratings and review counts next to yours, whether AI assistants like ChatGPT recommend you, a homepage check, and what to fix first. We walk you through it on a short call and you keep the report." },
  { q: "How fast will I see new reviews?", a: "Usually as soon as the past-customer campaign goes out. For example, Presidential Roofing in Utah went from 27 to 43 Google reviews in 20 days, and new jobs keep the reviews coming after that." },
  { q: "Which platforms do you collect reviews on?", a: "Google, Facebook, Yelp and Angi, the places home-services customers actually check before they call. Most tools only do Google." },
  { q: "Does it work with my software?", a: "Yes. We connect natively to Jobber, Housecall Pro, ServiceTitan, Workiz and QuickBooks, plus thousands more through Zapier." },
  { q: "How much does it cost?", a: "It's custom, based on what your business needs. Just reviews or just a website is around $100–300/mo. The full program (website and SEO, Google profile, reviews, CRM and automations, content and seasonal campaigns) is about $500/mo. Adding ads and more of our attention is about $750/mo. We set the price after the free audit." },
  { q: "Do I need a contract?", a: "No. Every plan is month to month. If you'd rather run the software yourself, there's a 14-day free trial, no credit card required." },
  { q: "Can my techs get credit for their reviews?", a: "Yes. Technician leaderboards attribute each review to the person who did the job, which is a great way to motivate your crew." },
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
            <p className="mt-6 text-sm text-white/60">
              Rather run it yourself? <Link href="/signup" className="font-semibold text-white underline">Start a 14-day free trial</Link> of the software.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Trust marquee ──────────────────────────────────────── */
const TRUST = ["Jobber", "Housecall Pro", "ServiceTitan", "Workiz", "QuickBooks", "Zapier", "Google", "Facebook", "Yelp", "Angi"];
function TrustMarquee() {
  return (
    <section className="border-b border-line bg-white py-8">
      <div className="container-tt">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Connects with the tools you already run your business on
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {TRUST.map((name) => (
            <span key={name} className="whitespace-nowrap text-lg font-bold text-ink/35">
              {name}
            </span>
          ))}
        </div>
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
              "Turn every finished job into 5-star reviews across Google, Facebook, Yelp and Angi. Built for HVAC, roofing, plumbing and electrical pros.",
            url: "https://www.tableturnerr.com/features",
          }),
          generateFAQSchema(FAQS.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Hero />
      <Stats />
      <TrustMarquee />
      {/* Problem, then the full done-for-you program + free audit, then proof, then the software story. */}
      <Problem />
      <HomeDoneForYou />
      <HomeCaseStudy />
      <Features />
      <How />
      <Industries />
      <Personalized />
      <Compliance />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
