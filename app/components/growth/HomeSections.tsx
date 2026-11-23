// Homepage sections for the done-for-you (agency) side of the business. They sit right below the hero/VSL,
// stats and integrations strip.
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollRow from "@/app/components/growth/ScrollRow";
import { results } from "@/app/lib/growth";

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
  { t: "Local SEO", d: "Show up for the searches that bring jobs, in every town you serve, on Google.", href: "/services/local-seo" },
  { t: "AI search (AEO)", d: "Get named when homeowners ask ChatGPT, Gemini or Google's AI answers who to hire.", href: "/services/ai-search-optimization" },
  { t: "Google Business Profile", d: "Categories, services, photos and weekly posts, so you climb the map pack.", href: "/services/google-business-profile" },
  { t: "Google reviews", d: "A request after every job, a past-customer campaign, and a reply to every review.", href: "/services/review-generation" },
  { t: "CRM and automations", d: "Every lead, call, text and message in one place, with follow-ups and estimate reminders that run on their own.", href: "/features/crm-contact-import-and-lead-management" },
  { t: "Missed-call text-back and AI receptionist", d: "The homeowner who calls while you're on a job gets an answer, not voicemail.", href: "/services/missed-call-text-back" },
  { t: "Seasonal campaigns", d: "Tune-up reminders, holiday offers and win-back texts to past customers, so slow months stay busy.", note: "Included in the Professional plan" },
  { t: "Social content", d: "Regular posts on Google, Facebook, Instagram and TikTok, so you always look open for business.", note: "Included in the Professional plan" },
  { t: "Paid ads", d: "Google and Facebook ads on top, when you want to grow faster.", note: "Premier plan" },
];

/** One thin row: what we run for you, scrolled sideways. Trades, guides and tools live in the header menus. */
export function HomeDoneForYou() {
  return (
    <section data-analytics-section="done_for_you" className="py-14 md:py-16">
      <div className="container-tt">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Done for you</span>
            <h2 className="mt-4 text-2xl font-bold text-ink md:text-3xl">Your whole marketing department, run for you</h2>
            <p className="mt-2 text-ink-soft">One owner-run team and one set of software, month to month. Scroll to see everything we run.</p>
          </div>
          <Link href="/services" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-7">
          <ScrollRow label="Services" compact>
            {PROGRAM.map((p) => {
              const inner = (
                <>
                  <span className="font-bold leading-snug text-ink">{p.t}</span>
                  <span className="mt-1.5 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">{p.d}</span>
                  <span className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${p.href ? "text-primary" : "text-muted"}`}>
                    {p.href ? <>Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></> : p.note}
                  </span>
                </>
              );
              return (
                <li key={p.t} className="w-[78%] shrink-0 snap-start sm:w-[44%] md:w-[31%] lg:w-[23.5%]">
                  {p.href
                    ? <Link href={p.href} className="card card-hover group flex h-full flex-col p-5">{inner}</Link>
                    : <Link href="/pricing" className="card card-hover group flex h-full flex-col p-5">{inner}</Link>}
                </li>
              );
            })}
          </ScrollRow>
        </div>
      </div>
    </section>
  );
}
