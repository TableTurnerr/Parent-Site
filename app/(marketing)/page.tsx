import Link from "next/link";
import type { Metadata } from "next";
import {
  MessageSquareText, Repeat2, Trophy, BarChart3, Bot, Globe2,
  Wrench, Home, Droplets, Zap, Check, ArrowRight, ShieldCheck, Plug,
  X, Quote, BadgeCheck, EyeOff,
} from "lucide-react";
import Image from "next/image";
import MapPackClimb from "@/app/components/site/MapPackClimb";
import Reveal from "@/app/components/site/Reveal";
import Accordion from "@/app/components/site/Accordion";
import JsonLd from "@/app/components/site/JsonLd";
import { generateFAQSchema, generateServiceSchema } from "@/app/lib/schema";

export const metadata: Metadata = {
  title: "TableTurnerr — Review Automation for Home Services",
  description:
    "Turn every finished job into 5-star reviews and more booked work. Review automation built for HVAC, roofing, plumbing & electrical pros. Multi-platform, technician leaderboards, map-pack rank tracking. Start a free trial.",
};

/* ── Hero ───────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero-wash relative overflow-hidden pt-36 md:pt-44">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <div className="container-tt relative pb-16 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          <div>
            <span className="eyebrow">Review automation for home services</span>
            <h1 className="display mt-6 text-ink">
              Turn finished jobs into{" "}
              <span className="text-primary">5-star reviews</span> and more
              booked work.
            </h1>
            <p className="lead mt-6 max-w-xl">
              TableTurnerr automatically asks every customer for a review the
              moment the job is done, across Google, Facebook, Yelp and Angi, so
              you climb the map pack and get chosen first. Built for HVAC,
              roofing, plumbing and electrical pros.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="btn btn-primary">
                Start free trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/#how" className="btn btn-ghost">
                See how it works
              </Link>
            </div>

            <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
              {["14-day free trial", "No contracts", "Setup in 15 minutes"].map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-6">
            <MapPackClimb />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Stat strip ─────────────────────────────────────────── */
const STATS = [
  { v: "Every job", l: "automatically asks the customer for a review" },
  { v: "≤24h", l: "to your first new reviews" },
  { v: "4", l: "review platforms, not just Google" },
  { v: "15 min", l: "to connect your CRM and launch" },
];
function Stats() {
  return (
    <section className="border-y border-line bg-white">
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
  { t: "Your best jobs leave no proof", b: "You do great work all week, but only a handful of customers ever leave a review, so it never shows online." },
  { t: "Asking is awkward and gets forgotten", b: "Your techs are busy. Chasing customers for reviews after a job falls off the list every single time." },
  { t: "The competition ranks above you", b: "Whoever has the most recent 5-star reviews wins the map pack and the call, even when your work is better." },
];
function Problem() {
  return (
    <section className="section bg-surface">
      <div className="container-tt">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">The reviews gap</span>
          <h2 className="display-2 mt-5 text-ink">Great work that nobody can see isn&apos;t winning you jobs</h2>
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
const FEATURES = [
  { icon: Repeat2, t: "Review Reactivation", b: "Launch with a polite blast to your entire past-customer list. Most shops get a wave of fresh reviews in the first week." },
  { icon: Globe2, t: "Every platform, not just Google", b: "Route happy customers to Google, Facebook, Yelp and Angi, the places home-services buyers actually check." },
  { icon: Trophy, t: "Technician leaderboards", b: "Attribute reviews to the tech who did the job. Turn reviews into a friendly competition your crew actually enjoys." },
  { icon: BarChart3, t: "Map-pack rank tracking", b: "See your local-pack rank move week over week, not just a review count. Tie reviews to the jobs they win." },
  { icon: Bot, t: "AI requests & replies", b: "Personalized, name-on-the-photo requests by text and email, plus AI that replies to every review for you." },
  { icon: MessageSquareText, t: "Widgets & auto social posts", b: "Show your best reviews on your site and turn every 5-star into a branded Facebook and Instagram post automatically." },
];
function Features() {
  return (
    <section id="features" className="section">
      <div className="container-tt">
        <div className="max-w-2xl">
          <span className="eyebrow">Built for the trades</span>
          <h2 className="display-2 mt-5 text-ink">Everything you need to own your local market</h2>
          <p className="lead mt-4">Not a generic reputation tool with a home-services coat of paint. Built around how trades actually win work.</p>
        </div>
        <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.t} className="card card-hover p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.b}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── How it works ───────────────────────────────────────── */
const STEPS = [
  { n: "01", t: "Connect your CRM", b: "Link Jobber, Housecall Pro, ServiceTitan, Workiz or QuickBooks in a couple of clicks. We import your customers." },
  { n: "02", t: "Launch reactivation", b: "We message your past customers gradually and start requesting reviews from every new completed job automatically." },
  { n: "03", t: "Climb & get booked", b: "Reviews roll in across platforms, your map-pack rank rises, and more of the right calls start coming in." },
];
function How() {
  return (
    <section id="how" className="section bg-night text-white">
      <div className="container-tt">
        <div className="max-w-2xl">
          <span className="eyebrow border-white/15 bg-white/5 text-white">Set it once</span>
          <h2 className="display-2 mt-5 text-white">Live in 15 minutes. Working on autopilot after that.</h2>
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

/* ── Trades ─────────────────────────────────────────────── */
const TRADES = [
  { icon: Wrench, t: "HVAC", href: "/trades/hvac", img: "/images/trades/hvac-review-automation.webp" },
  { icon: Home, t: "Roofing", href: "/trades/roofing", img: "/images/trades/roofing-review-automation.webp" },
  { icon: Droplets, t: "Plumbing", href: "/trades/plumbing", img: "/images/trades/plumbing-review-automation.webp" },
  { icon: Zap, t: "Electrical", href: "/trades/electrical", img: "/images/trades/electrical-review-automation.webp" },
];
function Trades() {
  return (
    <section id="trades" className="section">
      <div className="container-tt">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Made for your trade</span>
          <h2 className="display-2 mt-5 text-ink">Big-ticket trades, big-ticket reviews</h2>
          <p className="lead mt-4">One bad month of reviews can cost a high-ticket trade real jobs. We focus where reviews matter most.</p>
        </div>
        <Reveal className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
          {TRADES.map((t) => (
            <Link
              key={t.t}
              href={t.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-line shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Image
                src={t.img}
                alt={`${t.t} review automation`}
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
                  See {t.t} reviews{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
        <div className="mt-9 text-center">
          <Link href="/trades" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            See all trades <ArrowRight className="h-4 w-4" />
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
          <span className="eyebrow">Personalized requests</span>
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
          <Link href="/signup" className="btn btn-primary mt-9">
            Start free trial <ArrowRight className="h-4 w-4" />
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
              <span className="stars text-sm" aria-hidden>★★★★★</span>
              <span className="text-xs font-semibold text-muted">Google review</span>
            </div>
            <p className="mt-1.5 text-sm leading-snug text-ink">
              &ldquo;They asked for my review by name. Felt personal, not automated.&rdquo;
            </p>
            <p className="mt-1.5 text-xs font-medium text-muted">— Jessica, homeowner</p>
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
const PLANS = [
  { name: "Starter", price: "$99", per: "/mo", note: "Up to 50 review requests/mo", popular: false,
    features: ["Google + Facebook reviews", "Review reactivation", "Automated text & email requests", "Review widgets", "Unlimited users"] },
  { name: "Growth", price: "$179", per: "/mo", note: "Up to 150 review requests/mo", popular: true,
    features: ["Everything in Starter", "Yelp + Angi routing", "Technician leaderboards", "AI requests & replies", "Auto social posts", "1-on-1 setup call"] },
  { name: "Pro", price: "$299", per: "/mo", note: "Up to 400 review requests/mo", popular: false,
    features: ["Everything in Growth", "Map-pack rank tracking", "Multi-location dashboard", "Monthly owner report", "Priority support"] },
];
function Pricing() {
  return (
    <section id="pricing" className="section bg-surface">
      <div className="container-tt">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Simple, honest pricing</span>
          <h2 className="display-2 mt-5 text-ink">Pick a plan. Cancel anytime.</h2>
          <p className="lead mt-4">14-day free trial. No setup fees, no contracts, no surprises.</p>
        </div>
        <Reveal className="mt-12 grid gap-6 lg:grid-cols-3">
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
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`btn mt-7 w-full ${p.popular ? "btn-primary" : "btn-ghost"}`}
              >
                Start free trial
              </Link>
            </div>
          ))}
        </Reveal>
        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-ink-soft">
          <ShieldCheck className="h-4 w-4 text-success" /> More reviews in 90 days or your next month is free.
        </p>
      </div>
    </section>
  );
}

/* ── FAQ ────────────────────────────────────────────────── */
const FAQS = [
  { q: "How fast will I see new reviews?", a: "Most shops see their first new reviews within 24 hours of launching review reactivation, with a steady stream from new jobs after that." },
  { q: "Which platforms do you collect reviews on?", a: "Google, Facebook, Yelp and Angi, the places home-services customers actually check before they call. Most tools only do Google." },
  { q: "Does it work with my software?", a: "Yes. We connect natively to Jobber, Housecall Pro, ServiceTitan, Workiz and QuickBooks, plus thousands more through Zapier." },
  { q: "Do I need a contract?", a: "No. Start with a 14-day free trial, no credit card required, and cancel anytime from your dashboard in a couple of clicks." },
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
            <h2 className="display-2 text-white">Start collecting reviews this week</h2>
            <p className="lead mt-4 text-white/70">
              Connect your CRM, launch reactivation, and watch the reviews and
              the calls roll in. Free for 14 days.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/signup" className="btn btn-light">
                Start free trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn btn-outline-light">
                Book a demo
              </Link>
            </div>
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

/* ── Comparison (our wedge vs typical review tools) ─────── */
const COMPARE = [
  { f: "Google reviews", us: true, them: true },
  { f: "Facebook, Yelp & Angi too", us: true, them: false },
  { f: "Technician leaderboards", us: true, them: false },
  { f: "Map-pack rank tracking", us: true, them: false },
  { f: "Review reactivation of past customers", us: true, them: "partial" as const },
  { f: "Built for big-ticket trades", us: true, them: false },
  { f: "Free review-score grader", us: true, them: false },
  { f: "No contracts, cancel anytime", us: true, them: false },
  { f: "90-day results guarantee", us: true, them: false },
];
function Cell({ v }: { v: boolean | "partial" }) {
  if (v === "partial")
    return <span className="text-xs font-semibold text-muted">Some</span>;
  return v ? (
    <Check className="mx-auto h-5 w-5 text-success" />
  ) : (
    <X className="mx-auto h-5 w-5 text-muted/50" />
  );
}
function Comparison() {
  return (
    <section className="section bg-surface">
      <div className="container-tt">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Why TableTurnerr</span>
          <h2 className="display-2 mt-5 text-ink">Most review tools stop at Google. We don&apos;t.</h2>
          <p className="lead mt-4">A side-by-side look at what you get with us versus a typical review tool.</p>
        </div>

        <Reveal className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-line bg-white">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-line bg-surface/60 px-5 py-4 text-sm font-semibold text-ink sm:gap-x-8 sm:px-7">
            <span>Feature</span>
            <span className="w-20 text-center text-primary sm:w-28">TableTurnerr</span>
            <span className="w-20 text-center text-muted sm:w-28">Other tools</span>
          </div>
          {COMPARE.map((row, i) => (
            <div
              key={row.f}
              className={`grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-5 py-3.5 text-sm sm:gap-x-8 sm:px-7 ${i % 2 ? "bg-surface/30" : ""}`}
            >
              <span className="text-ink-soft">{row.f}</span>
              <span className="w-20 sm:w-28"><Cell v={row.us} /></span>
              <span className="w-20 sm:w-28"><Cell v={row.them} /></span>
            </div>
          ))}
        </Reveal>

        <p className="mt-8 text-center text-sm text-ink-soft">
          See how we compare to{" "}
          <Link href="/alternatives/birdeye-alternative" className="font-semibold text-primary hover:underline">Birdeye</Link>,{" "}
          <Link href="/alternatives/podium-alternative" className="font-semibold text-primary hover:underline">Podium</Link>,{" "}
          <Link href="/alternatives/nicejob-alternative" className="font-semibold text-primary hover:underline">NiceJob</Link>{" "}
          and{" "}
          <Link href="/alternatives" className="font-semibold text-primary hover:underline">other review tools</Link>.
        </p>
      </div>
    </section>
  );
}

/* ── Testimonials (PLACEHOLDER — replace with real customer quotes) ── */
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

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          generateServiceSchema({
            name: "Review Automation for Home Services",
            description:
              "Turn every finished job into 5-star reviews across Google, Facebook, Yelp and Angi. Built for HVAC, roofing, plumbing and electrical pros.",
            url: "https://www.tableturnerr.com",
          }),
          generateFAQSchema(FAQS.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Hero />
      <Stats />
      <TrustMarquee />
      <Problem />
      <Features />
      <How />
      <Comparison />
      <Trades />
      <Personalized />
      <Compliance />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
