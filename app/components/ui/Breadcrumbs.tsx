import Link from "next/link";
import { SITE_CONFIG } from "@/app/lib/constants";
import { generateBreadcrumbSchema } from "@/app/lib/schema";

export interface Crumb {
  label: string;
  /** Omit on the current (last) page. */
  href?: string;
}

/**
 * Shared breadcrumb trail. Renders an accessible <nav> with the standard
 * Home / … / Current pattern used across the site. Set `withSchema` to also
 * emit BreadcrumbList JSON-LD — leave it off on pages that already output their
 * own breadcrumb schema to avoid duplicate structured data.
 */
export default function Breadcrumbs({
  items,
  withSchema = false,
  onDark = false,
  className = "",
}: {
  items: Crumb[];
  withSchema?: boolean;
  /** Light text + separators for use on a dark hero background. */
  onDark?: boolean;
  className?: string;
}) {
  const schema = withSchema
    ? generateBreadcrumbSchema(
        items.map((c) => ({
          name: c.label,
          url: `${SITE_CONFIG.url}${c.href ?? ""}`,
        }))
      )
    : null;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <nav aria-label="Breadcrumb" className={className}>
        <ol
          className={`flex flex-wrap items-center gap-1.5 sm:gap-2 text-sm ${
            onDark ? "text-cream/60" : "text-warm-gray"
          }`}
        >
          {items.map((crumb, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={crumb.label} className="flex items-center gap-1.5 sm:gap-2">
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className={
                      onDark
                        ? "hover:text-cream transition-colors"
                        : "hover:text-charcoal transition-colors"
                    }
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={
                      isLast
                        ? onDark
                          ? "text-cream font-medium"
                          : "text-charcoal font-medium"
                        : ""
                    }
                    aria-current={isLast ? "page" : undefined}
                  >
                    {crumb.label}
                  </span>
                )}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className={onDark ? "text-cream/30" : "text-warm-gray-light"}
                  >
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
