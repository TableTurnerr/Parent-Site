import Link from "next/link";
import { Check, X, ArrowRight, Scale } from "lucide-react";
import Accordion from "@/app/components/site/Accordion";
import JsonLd from "@/app/components/site/JsonLd";
import CrossLinks from "@/app/components/site/CrossLinks";
import { generateFAQSchema, generateBreadcrumbSchema, generateServiceSchema } from "@/app/lib/schema";
import { DoneForYouBand } from "@/app/components/growth/Growth";
import { ALL_ALTERNATIVES, type Alternative, type Cell } from "@/app/lib/alternatives";
import { AGENCY_OPTIONS, OTHER_OPTIONS, type OtherOption } from "@/app/lib/alternatives-others";
import { PRICE_TEXT } from "@/app/lib/pricing";

// "Short answer" picks for review-software pages. A pick naming the page's own competitor drops that name.
const REVIEW_PICKS: [string, string[]][] = [
  ["Already pay for Jobber, Housecall Pro or ServiceTitan? Try the review requests built into it first", ["Jobber Reviews", "Housecall Pro", "ServiceTitan Reputation"]],
  ["Want a low-cost tool you'll run yourself", ["NiceJob", "GatherUp", "Grade.us"]],
  ["Multi-location company with a marketing team to run a big platform", ["Birdeye", "Podium", "Reputation"]],
  ["Want reviews, replies and missed-call text-back done for you, month to month", ["TableTurnerr"]],
];

function CompareCell({ v }: { v: Cell }) {
  if (v === true) return <Check className="mx-auto h-5 w-5 text-success" />;
  if (v === false) return <X className="mx-auto h-5 w-5 text-muted/50" />;
  if (v === "partial")
    return <span className="text-xs font-semibold text-muted">Some</span>;
  return <span className="text-xs font-medium text-ink-soft">{v}</span>;
}

export default function AlternativePage({ alt }: { alt: Alternative }) {
  const base = "https://www.tableturnerr.com";
  // Marketing-company pages (Scorpion, Hibu, Thryv) compare agencies, not review tools.
  const agency = alt.kind === "marketing-agency";
  const others = (agency ? AGENCY_OPTIONS : OTHER_OPTIONS).filter((o) => o.name.toLowerCase() !== alt.competitor.toLowerCase());
  // TableTurnerr is listed as one option among the others, first, with its price from app/lib/pricing.ts.
  const us: OtherOption = {
    name: "TableTurnerr",
    url: "/pricing",
    bestFor: agency
      ? "Owners who want their Google profile, reviews, website and follow-up run for them, month to month"
      : "Owners who want Google review requests, replies and missed-call text-back done for them",
    note: alt.ourAngle,
    pricing: `${PRICE_TEXT.plans[0].toUpperCase()}${PRICE_TEXT.plans.slice(1)}, no contract`,
  };
  const list = [us, ...others];
  const count = list.length;
  const picks = agency
    ? []
    : REVIEW_PICKS.map(([label, names]) => [label, names.filter((n) => n.toLowerCase() !== alt.competitor.toLowerCase())] as const).filter(([, n]) => n.length);
  return (
    <>
      <JsonLd
        data={[
          generateServiceSchema({
            name: agency ? "Done-for-you marketing for home-service businesses" : "Review automation for home services",
            description: alt.intro,
            url: `${base}/alternatives/${alt.slug}`,
          }),
          generateFAQSchema(alt.faqs.map((f) => ({ question: f.q, answer: f.a }))),
          generateBreadcrumbSchema([
            { name: "Home", url: base },
            { name: "Alternatives", url: `${base}/alternatives` },
            { name: `${alt.competitor} alternative`, url: `${base}/alternatives/${alt.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="hero-wash relative overflow-hidden pt-36 md:pt-44">
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
        <div className="container-tt relative pb-16 md:pb-24">
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span>/</span>
            <Link href="/alternatives" className="hover:text-ink">Alternatives</Link>
            <span>/</span>
            <span className="font-medium text-ink">{alt.competitor}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="eyebrow">{alt.category} · {alt.competitor} alternative</span>
            <h1 className="display mt-6 text-ink">{count} {alt.competitor} alternatives for {agency ? "contractors" : "home-service businesses"} (2026)</h1>
            <p className="lead mt-6">{alt.intro}</p>
            {picks.length ? (
              <div className="mt-7 rounded-2xl border border-line bg-white/80 p-5 text-sm text-ink-soft md:p-6">
                <p className="font-semibold text-ink">Short answer: which {alt.competitor} alternative fits you?</p>
                <ul className="mt-3 space-y-2">
                  {picks.map(([label, names]) => (
                    <li key={label} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{label}: <strong className="text-ink">{names.join(", ")}</strong>.</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3"><a href="#compare-alternatives" className="font-semibold text-primary">See all {count} compared, with prices</a></p>
              </div>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-google-maps-audit" className="btn btn-primary">
                Get your free audit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn btn-ghost">Book a 15-minute call</Link>
            </div>
            <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
              {(agency ? ["Month to month", "No contracts", "Done for you"] : ["Live the same day", "No contracts", "Done-for-you option"]).map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Other options: people searching "<competitor> alternatives" want a list, not only one pick. */}
      <section className="section bg-surface" id="compare-alternatives">
        <div className="container-tt">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Compared · prices checked Nov 2026</span>
            <h2 className="display-2 mt-5 text-ink">{count} {alt.competitor} alternatives, side by side</h2>
            <p className="lead mt-4">
              No single option fits every shop. These are the {agency ? "companies and options" : "tools"} home-service owners compare instead of {alt.competitor}, with who each is best for. We&apos;re one of them, and we say so.
              Prices are as published on each vendor&apos;s own site when we checked; confirm before you buy.
            </p>
          </div>
          {/* Phones: one card per tool, so the pricing never sits off-screen. Tablets and up: the table. */}
          <ul className="mx-auto mt-10 grid max-w-5xl gap-4 md:hidden">
            {list.map((o) => (
              <li key={o.name} className="rounded-2xl border border-line bg-white p-5">
                <a href={o.url} {...(o.url.startsWith("/") ? {} : { rel: "noopener nofollow", target: "_blank" })} className="text-lg font-bold text-ink hover:text-primary">{o.name}</a>
                <dl className="mt-3 grid gap-3 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Best for</dt>
                    <dd className="mt-1 text-ink-soft">{o.bestFor}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">What it does</dt>
                    <dd className="mt-1 text-ink-soft">{o.note}</dd>
                  </div>
                  <div className="rounded-xl bg-surface px-3 py-2.5">
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Pricing</dt>
                    <dd className="mt-1 font-medium text-ink">{o.pricing}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-10 hidden max-w-5xl overflow-x-auto rounded-2xl border border-line bg-white md:block">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-surface text-ink">
                <tr>
                  <th scope="col" className="p-4 font-semibold">{agency ? "Option" : "Tool"}</th>
                  <th scope="col" className="p-4 font-semibold">Best for</th>
                  <th scope="col" className="p-4 font-semibold">What it does</th>
                  <th scope="col" className="p-4 font-semibold">Pricing</th>
                </tr>
              </thead>
              <tbody>
                {list.map((o) => (
                  <tr key={o.name} className="border-t border-line align-top">
                    <th scope="row" className="p-4 font-semibold text-ink">
                      <a href={o.url} {...(o.url.startsWith("/") ? {} : { rel: "noopener nofollow", target: "_blank" })} className="hover:text-primary">{o.name}</a>
                    </th>
                    <td className="p-4 text-ink-soft">{o.bestFor}</td>
                    <td className="p-4 text-ink-soft">{o.note}</td>
                    <td className="p-4 text-ink-soft">{o.pricing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-ink-soft">
            {agency ? (
              <>Want the full side-by-side? Read <Link href="/guides/home-service-marketing-companies-compared" className="font-semibold text-primary">home service marketing companies: prices and contracts</Link>, and <Link href="/guides/how-to-leave-your-marketing-agency" className="font-semibold text-primary">how to leave your agency and keep your stuff</Link>.</>
            ) : (
              <>Want the full side-by-side? Read <Link href="/guides/best-review-management-software-for-contractors" className="font-semibold text-primary">the best review management software for contractors</Link>.</>
            )}
          </p>
        </div>
      </section>

      {/* The honest take */}
      <section className="section">
        <h2 className="container-tt display-2 mb-8 text-ink">{alt.tagline}</h2>
        <div className="container-tt grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-7 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Where {alt.competitor} fits
            </p>
            <p className="mt-4 text-ink-soft">{alt.fairTake}</p>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-primary-soft/40 p-7 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              Why shops pick TableTurnerr
            </p>
            <p className="mt-4 text-ink-soft">{alt.ourAngle}</p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section bg-surface">
        <div className="container-tt">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Side by side</span>
            <h2 className="display-2 mt-5 text-ink">
              TableTurnerr vs {alt.competitor}
            </h2>
            <p className="lead mt-4">
              {agency ? "How the two stack up for a home-service shop that wants more calls and customers." : "How the two stack up for a home-service shop that wants more reviews."}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-line bg-white">
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-3 border-b border-line bg-surface/60 px-4 py-4 text-sm font-semibold text-ink sm:gap-x-8 sm:px-7">
              <span>Feature</span>
              <span className="w-20 break-words text-center text-xs text-primary sm:w-28 sm:text-sm">TableTurnerr</span>
              <span className="w-20 break-words text-center text-xs text-muted sm:w-28 sm:text-sm">{alt.competitor}</span>
            </div>
            {alt.compare.map((row, i) => (
              <div
                key={row.f}
                className={`grid grid-cols-[1fr_auto_auto] items-center gap-x-3 px-4 py-3.5 text-sm sm:gap-x-8 sm:px-7 ${i % 2 ? "bg-surface/30" : ""}`}
              >
                <span className="text-ink-soft">{row.f}</span>
                <span className="w-20 text-center sm:w-28"><CompareCell v={row.us} /></span>
                <span className="w-20 text-center sm:w-28"><CompareCell v={row.them} /></span>
              </div>
            ))}
          </div>

          {/* Terms / pricing callout (structure, not dollar figures) */}
          <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-line bg-surface px-6 py-5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Scale className="h-4 w-4" />
            </span>
            <p className="text-sm leading-relaxed text-ink-soft">{alt.termsNote}</p>
          </div>
        </div>
      </section>

      {/* Why switch */}
      <section className="section">
        <div className="container-tt">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Why switch</span>
            <h2 className="display-2 mt-5 text-ink">
              What you gain moving to TableTurnerr
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {alt.reasons.map((r) => (
              <div key={r.t} className="rounded-2xl border border-line bg-white p-7">
                <h3 className="text-lg font-bold text-ink">{r.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{r.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {(alt.sources?.length || alt.related?.length) ? (
        <section className="section pt-0">
          <div className="container-tt mx-auto max-w-3xl text-sm text-ink-soft">
            {alt.related?.length ? (
              <>
                <h2 className="text-base font-bold text-ink">Related reading</h2>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {alt.related.map((r) => (
                    <li key={r.href}><Link href={r.href} className="font-semibold text-primary hover:underline">{r.label}</Link></li>
                  ))}
                </ul>
              </>
            ) : null}
            {alt.sources?.length ? (
              <>
                <h2 className="mt-8 text-base font-bold text-ink">Sources</h2>
                <ul className="mt-3 space-y-1.5">
                  {alt.sources.map((src) => (
                    <li key={src.url}><a href={src.url} rel="noopener nofollow" target="_blank" className="underline decoration-line underline-offset-2 hover:text-primary">{src.label}</a>, checked {src.checked}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="section">
        <div className="container-tt grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">FAQ</span>
            <h2 className="display-2 mt-5 text-ink">
              {alt.competitor} vs TableTurnerr
            </h2>
            <p className="lead mt-4">
              Still deciding? <Link href="/contact" className="font-semibold text-primary">Talk to us</Link>.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={alt.faqs} />
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <CrossLinks
        title={agency ? "Compare other options" : "Compare other tools"}
        links={[
          ...ALL_ALTERNATIVES.filter((a) => a.slug !== alt.slug).map((a) => ({
            href: `/alternatives/${a.slug}`,
            label: `vs ${a.competitor}`,
            sub: a.category,
          })),
          { href: "/industries", label: "Browse industries", sub: "Find the workflow for your home-service team" },
          { href: "/integrations", label: "Integrations", sub: "Connect your field-service CRM" },
        ]}
      />

      <DoneForYouBand tradePath="/marketing" label="Marketing plans by trade" />
      {/* CTA */}
      <section className="section">
        <div className="container-tt">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-night px-7 py-14 text-center md:px-16 md:py-20">
            <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative mx-auto max-w-2xl">
              <div className="stars mb-5 text-2xl" aria-hidden>★★★★★</div>
              <h2 className="display-2 text-white">
                See why shops switch from {alt.competitor}
              </h2>
              <p className="lead mt-4 text-white/70">
                We set it up and run it for you. Start with a free Google Maps audit.
                Month to month, no contracts.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/free-google-maps-audit" className="btn btn-light">Get your free audit <ArrowRight className="h-4 w-4" /></Link>
                <a href="https://portalapi.tableturnerr.com/widget/bookings/tableturnerr" className="btn btn-outline-light">Book a 15-minute call</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
