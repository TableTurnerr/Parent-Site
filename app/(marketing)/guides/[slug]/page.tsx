import { BookCallBand } from "@/app/components/growth/ContactCtas";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toolsForPage } from "@/app/lib/growth/tools";
import JsonLd from "@/app/components/site/JsonLd";
import { AuditBand, Crumbs, FaqSection, ToolCallout, GuideCards, Html, InlineHtml, SectionHead, TradeChips, faqSchemaItems } from "@/app/components/growth/Growth";
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/app/lib/schema";
import { getGuide, guides, plain, relatedGuides, services, slugify, topics, withToc } from "@/app/lib/growth";

const base = "https://www.tableturnerr.com";
const fmt = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  const updated = g.article.updated ?? g.article.date;
  return {
    // Guide titles are already 50-60 characters; the root "| TableTurnerr" template would push them past what Google shows.
    title: { absolute: g.title },
    description: g.description,
    alternates: { canonical: `${base}${g.path}` },
    openGraph: { title: g.title, description: g.description, url: `${base}${g.path}`, type: "article", publishedTime: g.article.date, modifiedTime: updated },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const { html, toc } = withToc(g.content);
  const primary = topics[g.topics[0]];
  const updated = g.article.updated ?? g.article.date;
  const pillarLabel = primary.pillar === "/marketing" ? "marketing plans by trade" : services.find((s) => s.path === primary.pillar)?.short ?? "our services";
  const related = relatedGuides(g);
  const crumbLabel = plain(g.h1).split(":")[0].replace(/\?$/, "");

  return (
    <>
      <JsonLd
        data={[
          { ...generateArticleSchema({ title: plain(g.title), description: g.description, url: `${base}${g.path}`, datePublished: g.article.date, dateModified: updated }), wordCount: plain(html).split(" ").length },
          generateFAQSchema(faqSchemaItems(g.faq)),
          generateBreadcrumbSchema([
            { name: "Home", url: base },
            { name: "Guides", url: `${base}/guides` },
            { name: crumbLabel, url: `${base}${g.path}` },
          ]),
        ]}
      />
      <article>
        <section className="hero-wash relative overflow-hidden pt-36 md:pt-44">
          <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
          <div className="container-tt relative max-w-3xl pb-8">
            <Crumbs items={[["/", "Home"], ["/guides", "Guides"], [g.path, crumbLabel]]} />
            <Link href={`/guides#${slugify(primary.name)}`} className="eyebrow">{g.eyebrow ?? primary.name}</Link>
            <InlineHtml as="h1" html={g.h1} className="display mt-6 text-ink" />
            <InlineHtml as="p" html={g.lede} className="lead mt-6" />
            <p className="mt-6 text-sm text-muted">
              By the <Link href="/about" className="font-semibold text-primary">TableTurnerr team</Link> · <time dateTime={updated}>Updated {fmt(updated)}</time> · {g.readMinutes} min read
            </p>
          </div>
        </section>
        <section className="pb-16">
          <div className="container-tt max-w-3xl">
            {toc.length >= 4 && (
              <nav aria-label="On this page" className="card mb-10 p-6">
                <p className="font-bold text-ink">On this page</p>
                <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm">
                  {toc.map(([id, t]) => <li key={id}><a href={`#${id}`} className="text-primary hover:underline" dangerouslySetInnerHTML={{ __html: t }} /></li>)}
                </ol>
              </nav>
            )}
            <Html html={html} />
            <p className="mt-10 text-sm text-muted">
              Part of our guides on <Link href={`/guides#${slugify(primary.name)}`} className="font-semibold text-primary">{primary.name.toLowerCase()}</Link>. Want it done for you? See <Link href={primary.pillar} className="font-semibold text-primary">{pillarLabel}</Link>.
            </p>
          </div>
        </section>
      </article>
      <ToolCallout items={toolsForPage(g.path)} />
      <BookCallBand title={g.ctaTitle} />
      <FaqSection faq={g.faq} heading="Quick answers" />
      <AuditBand />
      {related.length > 0 && (
        <section className="section">
          <div className="container-tt">
            <SectionHead title="Keep reading" />
            <GuideCards list={related} />
          </div>
        </section>
      )}
      <section className="section bg-surface">
        <div className="container-tt">
          <SectionHead title="Marketing plans by trade" />
          <TradeChips />
        </div>
      </section>
    </>
  );
}
