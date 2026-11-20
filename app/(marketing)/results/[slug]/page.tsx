import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import JsonLd from "@/app/components/site/JsonLd";
import { AuditBand, Crumbs } from "@/app/components/growth/Growth";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/app/lib/schema";
import { getResult, results, trades } from "@/app/lib/growth";

const base = "https://www.tableturnerr.com";

export function generateStaticParams() {
  return results.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = getResult((await params).slug);
  if (!r) return {};
  const description = `${r.client}, a ${r.trade.toLowerCase()} in ${r.location}, grew from ${r.reviewsBefore} to ${r.reviewsAfter} Google reviews in ${r.days} days with TableTurnerr review generation.`;
  return {
    title: { absolute: `${r.client}: ${r.reviewsBefore} to ${r.reviewsAfter} Google Reviews in ${r.days} Days` },
    description,
    alternates: { canonical: `${base}${r.path}` },
    openGraph: { title: `How ${r.client} went from ${r.reviewsBefore} to ${r.reviewsAfter} Google reviews in ${r.days} days`, description, url: `${base}${r.path}`, type: "article" },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const r = getResult((await params).slug);
  if (!r) notFound();
  const trade = trades.find((t) => t.path === r.tradePath);
  const h1 = `How ${r.client} went from ${r.reviewsBefore} to ${r.reviewsAfter} Google reviews in ${r.days} days`;

  return (
    <>
      <JsonLd
        data={[
          generateArticleSchema({ title: h1, description: `${r.client} grew from ${r.reviewsBefore} to ${r.reviewsAfter} Google reviews in ${r.days} days.`, url: `${base}${r.path}`, datePublished: "2026-11-16" }),
          generateBreadcrumbSchema([{ name: "Home", url: base }, { name: "Results", url: `${base}/results` }, { name: r.client, url: `${base}${r.path}` }]),
        ]}
      />
      <section className="hero-wash relative overflow-hidden pt-36 md:pt-44">
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
        <div className="container-tt relative pb-14 md:pb-20">
          <Crumbs items={[["/", "Home"], ["/results", "Results"], [r.path, r.client]]} />
          <div className="max-w-3xl">
            <span className="eyebrow">Case study · {r.trade}</span>
            <h1 className="display mt-6 text-ink">{h1}</h1>
            <p className="lead mt-6">{r.person} runs {r.client}, a {r.trade.toLowerCase()} in {r.location}. The work was good. The Google profile just didn&apos;t show it.</p>
          </div>
          <div className="mt-10 grid max-w-3xl grid-cols-3 gap-4">
            {[[String(r.reviewsBefore), "reviews when we started"], [String(r.reviewsAfter), `reviews ${r.days} days later`], [`+${r.pct}%`, "more reviews"]].map(([v, l]) => (
              <div key={l} className="card p-5">
                <p className="font-display text-3xl font-bold text-ink md:text-4xl">{v}</p>
                <p className="mt-1 text-sm text-ink-soft">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-surface">
        <div className="container-tt growth-prose max-w-3xl">
          <h2>The problem</h2>
          <p>Roofing is a trust purchase. Before homeowners let anyone on their roof, they compare the local roofers on Google: star rating, how many reviews, and how recent they are. With {r.reviewsBefore} reviews, {r.client} looked thinner than it deserved next to competitors, even with happy customers behind it. Like most roofers, the team was busy on jobs, and asking every customer for a review kept falling through the cracks.</p>
          <h2>What we did</h2>
          <ul className="not-list">
            {r.whatWeDid.map(([h, p]) => (
              <li key={h} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-success" /><span><strong>{h}.</strong> {p}</span></li>
            ))}
          </ul>
          <h2>The result</h2>
          <p>In {r.days} days, {r.client} went from <strong>{r.reviewsBefore} to {r.reviewsAfter} Google reviews</strong>, {r.added} new reviews, a {r.pct}% increase. Since roofs last decades, every new review has to come from a customer who just finished a job, and now that happens automatically.</p>
          {r.quote && (
            <blockquote className="callout"><p>&ldquo;{r.quote}&rdquo;</p><p className="text-sm">{r.person}, {r.client}</p></blockquote>
          )}
          <h2>Why it matters for a roofer</h2>
          <p>
            Recent reviews help on two fronts. They&apos;re one of the signals Google uses to decide who shows up in the map pack, and they&apos;re what homeowners read before deciding who to call for an inspection.{" "}
            {trade && <>See our full <Link href={trade.path}>roofing marketing plan</Link>.</>}
          </p>
        </div>
      </section>
      <AuditBand title={`Where would you be in ${r.days} days?`} text="Our free audit shows your review count and Maps ranking next to the top competitors in your area, and how many reviews it would take to pass them." />
    </>
  );
}
