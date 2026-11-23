// "Businesses powered by TableTurnerr": real clients with their logos (app/lib/growth/clients.ts PORTFOLIO).
// A click on a client goes to their website (most of which we built) or, for Presidential Roofing, our case study.
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check, Play } from "lucide-react";
import JsonLd from "@/app/components/site/JsonLd";
import ShortPlayer from "@/app/components/growth/ShortPlayer";
import ScrollRow from "@/app/components/growth/ScrollRow";
import { PODCAST, clientShortSchema, podcastWatchUrl } from "@/app/lib/growth/video";
import { PORTFOLIO, type PortfolioClient } from "@/app/lib/growth/clients";
import { growthSite, results } from "@/app/lib/growth";

const STATES = new Set(PORTFOLIO.map((c) => c.place.split(", ").pop()));

function initials(name: string) {
  return name.replace(/&/g, " ").split(/\s+/).filter((w) => /^[A-Z]/.test(w) && !/^(LLC|Inc\.?)$/.test(w)).slice(0, 2).map((w) => w[0]).join("");
}

function Mark({ c, className }: { c: PortfolioClient; className: string }) {
  return (
    <span className={`relative flex items-center justify-center overflow-hidden rounded-xl ring-1 ring-black/5 ${c.darkLogo ? "bg-[#11142b]" : "bg-[#fff]"} ${className}`}>
      {c.logo ? (
        <Image src={c.logo} alt={`${c.name} logo`} fill sizes="200px" className="object-contain p-2.5" />
      ) : (
        <span aria-hidden className="grid h-12 w-12 place-items-center rounded-full bg-night text-base font-bold tracking-wide text-white">{initials(c.name)}</span>
      )}
    </span>
  );
}

function ClientLink({ c, className, children }: { c: PortfolioClient; className: string; children: ReactNode }) {
  if (!c.href) return <div className={className}>{children}</div>;
  if (c.href.startsWith("/")) return <Link href={c.href} className={`${className} card-hover group`}>{children}</Link>;
  return (
    <a href={c.href} target="_blank" rel="noopener" className={`${className} card-hover group`} aria-label={`${c.name}: visit their website (opens in a new tab)`}>
      {children}
    </a>
  );
}

/** Full logo wall with names, trades and what we do. Home, /results (#clients) and /about. */
export function ClientWall({ title = "Businesses powered by TableTurnerr", surface = false }: { title?: string; surface?: boolean }) {
  return (
    <section id="clients" className={`section scroll-mt-24 ${surface ? "bg-surface" : ""}`} data-analytics-section="client_wall">
      <div className="container-tt">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Our clients</span>
          <h2 className="display-2 mt-5 text-ink">{title}</h2>
          <p className="lead mt-4">
            We&apos;ve served {growthSite.businessesServed} businesses since we started. Here are some of the owner-run
            home-service businesses and local restaurants we work with, in {STATES.size} states. Click a logo to see their website.
          </p>
        </div>
        <div className="mt-12">
        <ScrollRow label="Clients">
          {PORTFOLIO.map((c) => (
            <li key={c.name} className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[23%] xl:w-[18.5%]">
              <ClientLink c={c} className="card flex h-full flex-col p-4">
                <Mark c={c} className="h-24 w-full" />
                <span className="mt-4 text-[0.95rem] font-bold leading-snug text-ink">{c.name}</span>
                <span className="mt-1 text-xs text-muted">{c.trade} · {c.place}</span>
                <span className="mt-3 flex flex-1 items-end justify-between gap-2 text-xs font-semibold text-primary">
                  <span>{c.tag}</span>
                  {c.href && (c.href.startsWith("/")
                    ? <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    : <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />)}
                </span>
              </ClientLink>
            </li>
          ))}
        </ScrollRow>
        </div>
      </div>
    </section>
  );
}

/** One row of client logos for service, trade and SEO pages. Links each logo out and to the full wall. */
export function ClientLogoStrip() {
  const withLogos = PORTFOLIO.filter((c) => c.logo && c.href);
  return (
    <section className="border-y border-line bg-surface py-8" data-analytics-section="client_logos">
      <div className="container-tt">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted">Businesses powered by TableTurnerr</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {withLogos.map((c) => (
            <li key={c.name}>
              <a href={c.href} target="_blank" rel="noopener" title={`${c.name} · ${c.place}`} aria-label={`${c.name} website (opens in a new tab)`} className="block transition-transform hover:-translate-y-0.5">
                <Mark c={c} className={c.wide ? "h-16 w-40" : "h-16 w-20 sm:w-24"} />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-center text-sm">
          <Link href="/results#clients" className="font-semibold text-primary hover:underline">See all {PORTFOLIO.length} clients and what we do for them</Link>
        </p>
      </div>
    </section>
  );
}

/** Client podcast: the 55-second short (plays in place) plus a link to the full episode on YouTube. */
export function ClientPodcast({ caseStudyLink = true }: { caseStudyLink?: boolean }) {
  return (
    <section className="section bg-surface" data-analytics-section="client_podcast">
      <JsonLd data={clientShortSchema()} />
      <div className="container-tt grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5"><ShortPlayer /></div>
        <div className="lg:col-span-7">
          <span className="eyebrow">Hear it from a client</span>
          <h2 className="display-2 mt-5 text-ink">How a Utah roofer got 15 Google reviews in 10 days, without asking a customer himself</h2>
          <p className="lead mt-4">
            Adrian Alvarez runs Presidential Roofing in Syracuse, Utah, and gets all of his work from referrals. On our
            podcast he talks about how he built the business, and what happened once his Google reviews started coming in.
          </p>
          <ul className="mt-6 grid gap-2.5 text-[0.97rem] text-ink-soft">
            {[
              "How he gets every job from referrals, with no door knocking or storm chasing",
              "Why storm chasers can leave homeowners without a warranty",
              "The small quality details that get him referred",
              "Going from 27 Google reviews in 4.5 years to the top of Google",
            ].map((t) => (
              <li key={t} className="flex gap-2.5"><Check className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden /> {t}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={podcastWatchUrl} target="_blank" rel="noopener" className="btn btn-primary">
              <Play className="h-4 w-4 fill-current" aria-hidden /> Watch the full episode ({PODCAST.durationLabel})
            </a>
            {caseStudyLink && <Link href="/results/presidential-roofing" className="btn btn-ghost">Read the case study</Link>}
          </div>
          <p className="mt-4 text-sm text-ink-soft">
            More client stories on <a href="https://www.youtube.com/@TableTurnerr/shorts" target="_blank" rel="noopener" className="font-semibold text-primary hover:underline">our YouTube channel</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Social-proof line above the homepage headline: a stack of client logos and the businesses-served count. */
export function HeroProof() {
  const faces = PORTFOLIO.filter((c) => c.logo && !c.wide).slice(0, 5);
  return (
    <a href="#clients" className="group inline-flex items-center gap-3 rounded-full border border-line bg-bg/70 py-1.5 pl-1.5 pr-4 backdrop-blur">
      <span className="flex -space-x-2.5" aria-hidden>
        {faces.map((c) => (
          <span key={c.name} className={`relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-bg ${c.darkLogo ? "bg-[#11142b]" : "bg-[#fff]"}`}>
            <Image src={c.logo!} alt="" fill sizes="32px" className="object-contain p-0.5" />
          </span>
        ))}
      </span>
      <span className="text-sm text-ink-soft">
        Trusted by <strong className="font-semibold text-ink">{growthSite.businessesServed} home-service businesses</strong> and restaurants
      </span>
    </a>
  );
}

/** Homepage: the Presidential Roofing result and the client short in one compact section. */
// The personalized review request that earned Presidential Roofing its reviews (photo from the owner). The section
// shows it once the file exists in public/; until then the layout simply has no photo column.
const REQUEST_PHOTO = "/images/results/presidential-review-request.webp";
const hasRequestPhoto = fs.existsSync(path.join(process.cwd(), "public", REQUEST_PHOTO));

/** A recreation of the review flow as it runs in the client's inbox (no real customer details): personal request
 *  with a photo from the job, the customer's reply, the review, and the reply on Google. */
function AutopilotThread() {
  return (
    <div className="rounded-2xl border border-line bg-bg p-4 shadow-[0_30px_70px_-40px_rgba(10,19,38,0.55)]">
      <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
        <span className="text-sm font-semibold text-ink">On autopilot, after every job</span>
        <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-[0.7rem] font-semibold text-success">Automatic</span>
      </div>
      <div className="mt-3 space-y-2.5 text-[0.8rem] leading-snug">
        <div className="ml-auto max-w-[88%] overflow-hidden rounded-2xl rounded-br-sm bg-primary/15 text-ink">
          {hasRequestPhoto && (
            <span className="relative block aspect-[1278/883]">
              <Image src={REQUEST_PHOTO} alt="Selfie of Adrian from Presidential Roofing on the customer's roof, captioned 'Hey Frank!'" fill sizes="20rem" className="object-cover" />
            </span>
          )}
          <p className="px-3 py-2">
            Hey Frank, this is Adrian with Presidential Roofing. Would you mind taking a second to leave us a 5 star review?
            Thanks for the support! Here&apos;s the link: <span className="text-primary underline">review link</span>
          </p>
        </div>
        <p className="max-w-[60%] rounded-2xl rounded-bl-sm bg-surface px-3 py-2 text-ink">Done.</p>
        <p className="mx-auto w-fit rounded-full border border-line px-3 py-1 text-[0.75rem] text-ink-soft">
          <span className="text-star">★★★★★</span> New 5-star Google review
        </p>
        <p className="ml-auto max-w-[88%] rounded-2xl rounded-br-sm bg-primary/15 px-3 py-2 text-ink">
          Thank you, Frank, for the kind review! We&apos;re glad you&apos;re happy with the new roof.
          <span className="mt-1 block text-[0.7rem] text-muted">Reply posted on Google</span>
        </p>
      </div>
    </div>
  );
}

export function HomeResult() {
  const r = results[0];
  if (!r) return null;
  return (
    <section className="bg-surface py-14 md:py-16" data-analytics-section="case_study">
      <JsonLd data={clientShortSchema()} />
      <div className="container-tt grid items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-4 lg:col-span-3"><ShortPlayer compact /></div>
        <div className="md:col-span-8 lg:col-span-5">
          <span className="eyebrow">Real result</span>
          <h2 className="mt-4 text-2xl font-bold text-ink md:text-4xl">
            How we took a Utah roofer from {r.reviewsBefore} to {r.reviewsAfter} Google reviews in {r.days} days
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Adrian at {r.client} never asked for reviews himself, so we did it for him: a request to past customers and one
            after every new job, paced so Google doesn&apos;t flag it. Hear him tell it in the clip.
          </p>
          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            {[[`${r.reviewsBefore} → ${r.reviewsAfter}`, "Google reviews"], [`+${r.pct}%`, "more reviews"], [`${r.days} days`, "start to finish"]].map(([v, l]) => (
              <div key={l}>
                <dd className="font-display text-3xl font-bold text-ink">{v}</dd>
                <dt className="text-sm text-ink-soft">{l}</dt>
              </div>
            ))}
          </dl>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={r.path} className="btn btn-primary">Read the case study <ArrowRight className="h-4 w-4" /></Link>
            <a href={podcastWatchUrl} target="_blank" rel="noopener" className="btn btn-ghost">
              <Play className="h-4 w-4 fill-current" aria-hidden /> Full podcast episode ({PODCAST.durationLabel})
            </a>
          </div>
        </div>
        <div className="md:col-span-12 lg:col-span-4"><AutopilotThread /></div>
      </div>
    </section>
  );
}
