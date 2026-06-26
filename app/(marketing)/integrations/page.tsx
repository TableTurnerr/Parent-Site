import Link from "next/link";
import type { Metadata } from "next";
import { Plug, ArrowRight, ArrowUpRight } from "lucide-react";
import { INTEGRATIONS } from "@/app/lib/integrations";

export const metadata: Metadata = {
  title: "Integrations — Connect Your CRM",
  description:
    "TableTurnerr connects to the tools home-services pros already use — Jobber, Housecall Pro, ServiceTitan, Workiz and QuickBooks — to turn completed jobs into 5-star reviews automatically.",
  alternates: { canonical: "https://www.tableturnerr.com/integrations" },
};

const ITEMS = Object.values(INTEGRATIONS);

export default function IntegrationsIndex() {
  return (
    <>
      <section className="hero-wash relative overflow-hidden pt-36 pb-14 md:pt-44 md:pb-20">
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
        <div className="container-tt relative">
          <div className="max-w-3xl">
            <span className="eyebrow">Integrations</span>
            <h1 className="display mt-6 text-ink">Works with the tools you already run on</h1>
            <p className="lead mt-6 max-w-2xl">
              Connect your field-service software in about a minute. TableTurnerr watches for
              completed jobs and turns each one into a 5-star review request, automatically —
              no exports, no manual lists.
            </p>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-tt">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ITEMS.map((it) => (
              <Link
                key={it.slug}
                href={`/integrations/${it.slug}`}
                className="card card-hover group flex h-full flex-col p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Plug className="h-5 w-5" />
                </span>
                <div className="mt-5 flex items-center gap-2">
                  <h2 className="text-lg font-bold text-ink">{it.name}</h2>
                  <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">{it.category}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{it.tagline}.</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  See the {it.name} integration <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}

            <div className="card flex h-full flex-col justify-center p-7">
              <h2 className="text-lg font-bold text-ink">Something else?</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                We connect to thousands more tools through Zapier — and if you only invoice,
                QuickBooks works too. Tell us what you run on.
              </p>
              <Link href="/contact" className="btn btn-ghost mt-5 w-fit">
                Ask about your tool <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
