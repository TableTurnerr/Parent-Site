// Homepage sections for the done-for-you (agency) side of the business. They sit right below the hero/VSL,
// stats and integrations strip.
import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { AUDIT_PATH, getGuide, growthSite, results, trades, type Guide } from "@/app/lib/growth";
import { tools } from "@/app/lib/growth/tools";

/** Real client result (Presidential Roofing) with the numbers, linking to the case study. */
export function HomeCaseStudy() {
  const r = results[0];
  if (!r) return null;
  return (
    <section data-analytics-section="case_study" className="section bg-surface">
      <div className="container-tt grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <span className="eyebrow">Real result</span>
          <h2 className="display-2 mt-5 text-ink">
            {r.client}: {r.reviewsBefore} to {r.reviewsAfter} Google reviews in {r.days} days
          </h2>
          <p className="lead mt-4">
            A {r.trade.toLowerCase()} in {r.location} with good work and a thin Google profile. We set up review requests
            for past customers and after every new job. {r.added} new reviews later, they look like the company they are.
          </p>
          <Link href={r.path} className="mt-7 inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
            Read the case study <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4 lg:col-span-6">
          {[[String(r.reviewsBefore), "reviews before"], [String(r.reviewsAfter), `reviews after ${r.days} days`], [`+${r.pct}%`, "more reviews"]].map(([v, l]) => (
            <div key={l} className="card p-5 text-center md:p-7">
              <p className="font-display text-3xl font-bold text-ink md:text-5xl">{v}</p>
              <p className="mt-2 text-xs text-ink-soft md:text-sm">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Everything in the full program. Items with a page link to it; the rest are part of the Professional and Premier plans. */
const PROGRAM: { t: string; d: string; href?: string; note?: string }[] = [
  { t: "Websites built to rank", d: "Fast on a phone, a page for every service and town you cover, and click-to-call where people decide.", href: "/services/contractor-websites" },
  { t: "Local SEO", d: "Show up for the searches that bring jobs, in every town you serve, on Google and in AI assistants.", href: "/services/local-seo" },
  { t: "Google Business Profile", d: "Categories, services, photos and weekly posts, so you climb the map pack.", href: "/services/google-business-profile" },
  { t: "Google reviews", d: "A request after every job, a past-customer campaign, and a reply to every review.", href: "/services/review-generation" },
  { t: "CRM and automations", d: "Every lead, call, text and message in one place, with follow-ups and estimate reminders that run on their own.", href: "/features/crm-contact-import-and-lead-management" },
  { t: "Missed-call text-back and AI receptionist", d: "The homeowner who calls while you're on a job gets an answer, not voicemail.", href: "/services/missed-call-text-back" },
  { t: "Seasonal campaigns", d: "Tune-up reminders, holiday offers and win-back texts to past customers, so slow months stay busy.", note: "Included in the Professional plan" },
  { t: "Social content", d: "Regular posts on Google, Facebook, Instagram and TikTok, so you always look open for business.", note: "Included in the Professional plan" },
  { t: "Paid ads", d: "Google and Facebook ads on top, when you want to grow faster.", note: "Premier plan" },
];

const FEATURED_GUIDES = ["how-to-rank-higher-on-google-maps", "how-many-google-reviews-to-rank", "contractor-seo-cost"];

/** Free audit, done-for-you services, marketing plans by trade and a few guides. */
export function HomeDoneForYou() {
  const featured = FEATURED_GUIDES.map(getGuide).filter((g): g is Guide => Boolean(g));
  return (
    <section data-analytics-section="done_for_you" className="section">
      <div className="container-tt">
        <div className="max-w-2xl">
          <span className="eyebrow">Done for you</span>
          <h2 className="display-2 mt-5 text-ink">Your whole marketing department, run for you</h2>
          <p className="lead mt-4">
            Reviews are one piece. We run everything that gets a home-service business found, chosen and booked again:
            your website and SEO, Google profile, reviews, CRM and automations, seasonal campaigns and ads. It all runs on
            our own software, so nothing falls between five different vendors. Month to month, and you talk to an owner.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-night p-8 text-white md:p-10 lg:col-span-5">
            <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative">
              <MapPin className="h-7 w-7 text-star" aria-hidden />
              <h3 className="mt-4 text-2xl font-bold">Free Google Maps audit</h3>
              <ul className="mt-5 space-y-2.5 text-sm text-white/75">
                {["Where you rank across your whole service area", "Your top 5 competitors, side by side", "Whether ChatGPT and other AI assistants recommend you", "What to fix first"].map((t) => (
                  <li key={t} className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />{t}</li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link href={AUDIT_PATH} className="btn btn-light">Get my free audit <ArrowRight className="h-4 w-4" /></Link>
                <a href={growthSite.bookingUrl} className="btn btn-outline-light">Book a 15-minute call</a>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {PROGRAM.map((p) =>
              p.href ? (
                <Link key={p.t} href={p.href} className="card card-hover group flex flex-col p-6">
                  <span className="font-bold text-ink">{p.t}</span>
                  <span className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">{p.d}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              ) : (
                <div key={p.t} className="card flex flex-col p-6">
                  <span className="font-bold text-ink">{p.t}</span>
                  <span className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">{p.d}</span>
                  <Link href="/pricing" className="mt-4 text-sm font-medium text-muted hover:text-ink">{p.note}</Link>
                </div>
              ),
            )}
            <Link href="/services" className="card card-hover group flex flex-col justify-center p-6">
              <span className="font-bold text-ink">All services</span>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">See everything we do <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold text-ink">Marketing plans by trade</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {trades.map((t) => (
                <li key={t.slug}>
                  <Link href={t.path} className="inline-block rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:border-primary hover:text-ink">{t.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-ink">Guides for owners</h3>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {featured.map((g) => (
                <li key={g.slug}>
                  <Link href={g.path} className="group flex items-center justify-between gap-4 py-3.5 text-ink-soft hover:text-ink">
                    <span className="font-medium" dangerouslySetInnerHTML={{ __html: g.h1 }} />
                    <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/guides" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">All guides <ArrowRight className="h-4 w-4" /></Link>
            <h3 className="mt-10 text-xl font-bold text-ink">Free tools</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {tools.map((t) => (
                <li key={t.slug}>
                  <Link href={t.path} className="inline-block rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:border-primary hover:text-ink">{t.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
