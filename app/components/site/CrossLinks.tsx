import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface CrossLink {
  href: string;
  label: string;
  sub?: string;
}

/**
 * Compact "keep exploring" grid that interlinks the marketing clusters
 * (trades, integrations, alternatives, locations). Dropped near the bottom of
 * each leaf page so the link graph is a dense mesh, not a hub-and-spoke with
 * dead-end leaves — every page passes equity to its siblings and neighbours.
 */
export default function CrossLinks({
  title = "Keep exploring",
  links,
}: {
  title?: string;
  links: CrossLink[];
}) {
  if (!links.length) return null;
  return (
    <section className="section bg-surface">
      <div className="container-tt">
        <h2 className="display-2 text-ink">{title}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="card card-hover group flex items-center justify-between gap-3 p-5"
            >
              <span>
                <span className="block font-semibold text-ink">{l.label}</span>
                {l.sub && (
                  <span className="mt-0.5 block text-sm text-ink-soft">{l.sub}</span>
                )}
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
