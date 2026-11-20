// Homepage sections for the done-for-you (agency) side of the business. They sit right below the hero/VSL,
// stats and integrations strip; the hero itself never changes.
import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { AUDIT_PATH, getGuide, growthSite, results, services, trades, type Guide } from "@/app/lib/growth";

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

const FEATURED_GUIDES = ["how-to-rank-higher-on-google-maps", "how-many-google-reviews-to-rank", "contractor-seo-cost"];

/** Free audit, done-for-you services, marketing plans by trade and a few guides. */
export function HomeDoneForYou() {
  const featured = FEATURED_GUIDES.map(getGuide).filter((g): g is Guide => Boolean(g));
  return (
    <section data-analytics-section="done_for_you" className="section">
      <div className="container-tt">
        <div className="max-w-2xl">
          <span className="eyebrow">Done for you</span>
          <h2 className="display-2 mt-5 text-ink">An online marketing agency for home-service businesses</h2>
          <p className="lead mt-4">
            Most owners don&apos;t want another dashboard. We do the work on our own software: your Google Business
            Profile, reviews, local SEO, website and missed calls, plus making sure AI assistants like ChatGPT can find
            you. Month to month, and you talk to an owner, not a rep.
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
            {services.map((s) => (
              <Link key={s.slug} href={s.path} className="card card-hover group flex flex-col p-6">
                <span className="font-bold text-ink">{s.short}</span>
                <span className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">{s.description}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
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
          </div>
        </div>
      </div>
    </section>
  );
}
