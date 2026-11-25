import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/site/JsonLd";
import { AuditBand, GrowthHero, NextSteps } from "@/app/components/growth/Growth";
import { generateBreadcrumbSchema } from "@/app/lib/schema";
import { slugify } from "@/app/lib/growth";
import { GLOSSARY } from "@/app/lib/growth/glossary";
import { pageTitle } from "@/app/lib/metadata";

const base = "https://www.tableturnerr.com";
const url = `${base}/glossary`;
const total = GLOSSARY.reduce((n, g) => n + g.terms.length, 0);
const description =
  "Plain-English definitions for contractors: map pack, A2P 10DLC, review gating, speed to lead, markup vs. margin, CRM, text-to-pay and more.";

export const metadata: Metadata = {
  title: pageTitle("Contractor Marketing Glossary in Plain English"),
  description,
  alternates: { canonical: url },
  openGraph: { title: "Contractor marketing glossary", description, url },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            name: "Contractor marketing glossary",
            url,
            hasDefinedTerm: GLOSSARY.flatMap((g) => g.terms).map(([name, d]) => ({ "@type": "DefinedTerm", name, description: d, url: `${url}#${slugify(name)}` })),
          },
          generateBreadcrumbSchema([{ name: "Home", url: base }, { name: "Glossary", url }]),
        ]}
      />
      <GrowthHero
        crumbs={[["/", "Home"], ["/glossary", "Glossary"]]}
        eyebrow="Glossary"
        h1="Marketing and software words, in plain English"
        lede={`${total} terms home-service owners run into when they buy marketing or software, each explained in a few lines.`}
        trust={false}
      >
        <ul className="mt-7 flex flex-wrap gap-2">
          {GLOSSARY.map((g) => (
            <li key={g.group}><a href={`#${slugify(g.group)}`} className="inline-block rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm font-medium text-ink-soft hover:border-primary hover:text-ink">{g.group}</a></li>
          ))}
        </ul>
      </GrowthHero>
      {GLOSSARY.map((g, i) => (
        <section key={g.group} id={slugify(g.group)} className={`scroll-mt-24 py-14 ${i % 2 ? "" : "bg-surface"}`}>
          <div className="container-tt max-w-4xl">
            <h2 className="display-2 text-ink">{g.group}</h2>
            <dl className="mt-8 divide-y divide-line">
              {g.terms.map(([term, def, href, label]) => (
                <div key={term} id={slugify(term)} className="scroll-mt-24 py-6 md:grid md:grid-cols-3 md:gap-8">
                  <dt className="text-lg font-bold text-ink">{term}</dt>
                  <dd className="mt-2 leading-relaxed text-ink-soft md:col-span-2 md:mt-0">
                    {def}
                    {href && <> <Link href={href} className="font-semibold text-primary">{label}</Link></>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ))}
      <AuditBand />
      <NextSteps
        items={[
          ["/guides", "Guides for owners", "The longer answers, written for home-service companies."],
          ["/tools", "Free tools", "Calculators, templates and a review QR code maker."],
          ["/services/everything-we-set-up", "Everything we set up", "The full list of what we do for clients."],
        ]}
      />
    </>
  );
}
