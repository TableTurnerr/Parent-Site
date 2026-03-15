import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";
import { SERVICES, FAQ_DATA, SITE_CONFIG } from "@/app/lib/constants";
import { SERVICE_PAGES } from "@/app/lib/service-data";
import {
  generateOrganizationSchema,
  generateBreadcrumbSchema,
} from "@/app/lib/schema";

interface SearchResult {
  title: string;
  description: string;
  url: string;
  type: "service" | "faq" | "page";
}

const STATIC_PAGES: SearchResult[] = [
  {
    title: "About TableTurnerr",
    description:
      "TableTurnerr is a restaurant marketing agency specializing in custom website design, SEO, Google Ads, and branding for independent restaurants.",
    url: "/about",
    type: "page",
  },
  {
    title: "Case Studies",
    description:
      "Real results from real restaurants. See how independent restaurants have grown with the right digital strategy and marketing partner.",
    url: "/case-studies",
    type: "page",
  },
  {
    title: "Contact Us",
    description:
      "Get in touch with TableTurnerr for a free consultation about your restaurant's website design, SEO, and digital marketing needs.",
    url: "/contact",
    type: "page",
  },
];

function searchContent(query: string): SearchResult[] {
  if (!query || query.trim().length === 0) return [];

  const q = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  // Search services
  for (const service of Object.values(SERVICE_PAGES)) {
    const searchableText = [
      service.title,
      service.description,
      service.headline,
      service.category,
      ...service.features.map((f) => `${f.title} ${f.description}`),
      ...service.keywords,
      ...service.faqs.map((f) => `${f.question} ${f.answer}`),
    ]
      .join(" ")
      .toLowerCase();

    if (searchableText.includes(q)) {
      results.push({
        title: service.title,
        description: service.description,
        url: `/services/${service.slug}`,
        type: "service",
      });
    }
  }

  // Search FAQs
  for (const faq of FAQ_DATA) {
    const searchableText = `${faq.question} ${faq.answer}`.toLowerCase();
    if (searchableText.includes(q)) {
      results.push({
        title: faq.question,
        description:
          faq.answer.length > 160
            ? faq.answer.slice(0, 160) + "..."
            : faq.answer,
        url: "/#faq",
        type: "faq",
      });
    }
  }

  // Search static pages
  for (const page of STATIC_PAGES) {
    if (
      page.title.toLowerCase().includes(q) ||
      page.description.toLowerCase().includes(q)
    ) {
      results.push(page);
    }
  }

  return results;
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const title = q ? `Results for "${q}"` : "Search";
  const description = q
    ? `Search results for "${q}" on TableTurnerr. Find restaurant marketing services, SEO strategies, website design, and more.`
    : "Search TableTurnerr for restaurant marketing services, SEO, website design, branding, and more.";

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${SITE_CONFIG.url}/search${q ? `?q=${encodeURIComponent(q)}` : ""}`,
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const results = searchContent(q ?? "");

  const organizationSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Search", url: `${SITE_CONFIG.url}/search` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, breadcrumbSchema]),
        }}
      />

      {/* Breadcrumb */}
      <section className="bg-cream pt-28 md:pt-32 pb-4">
        <Container>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-warm-gray">
              <li>
                <Link
                  href="/"
                  className="hover:text-charcoal transition-colors"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-warm-gray-light">
                /
              </li>
              <li className="text-charcoal font-medium" aria-current="page">
                Search
              </li>
            </ol>
          </nav>
        </Container>
      </section>

      {/* Search Content */}
      <section className="bg-cream py-12 md:py-20">
        <Container>
          <AnimatedElement variants={staggerContainer}>
            <AnimatedElement variants={fadeInUp}>
              <h1 className="font-display font-bold text-[clamp(2rem,4vw+0.5rem,3.75rem)] leading-[1.1] tracking-tight text-charcoal mb-4">
                <BlurText text={q ? `Results for "${q}"` : "Search"} />
              </h1>
            </AnimatedElement>

            {/* Search form */}
            <AnimatedElement variants={fadeInUp}>
              <form action="/search" method="GET" className="max-w-2xl mb-12">
                <div className="flex gap-3">
                  <input
                    type="search"
                    name="q"
                    defaultValue={q ?? ""}
                    placeholder="Search services, FAQs, and more..."
                    className="flex-1 bg-white border border-border rounded-xl px-5 py-3 text-charcoal placeholder:text-warm-gray-light focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal transition-all"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="bg-charcoal text-cream px-6 py-3 rounded-xl font-medium hover:bg-charcoal/90 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>
            </AnimatedElement>

            {/* Results count */}
            {q && (
              <AnimatedElement variants={fadeInUp}>
                <p className="text-warm-gray mb-8">
                  {results.length === 0
                    ? "No results found. Try a different search term."
                    : `${results.length} result${results.length !== 1 ? "s" : ""} found`}
                </p>
              </AnimatedElement>
            )}

            {/* Search results */}
            {results.length > 0 && (
              <AnimatedElement
                variants={staggerContainer}
                className="space-y-4"
              >
                {results.map((result) => (
                  <AnimatedElement
                    key={result.url + result.title}
                    variants={fadeInUp}
                  >
                    <Link
                      href={result.url}
                      className="block bg-white rounded-[1.25rem] p-6 md:p-8 border border-border/50 hover:border-border hover:shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all"
                    >
                      <span className="inline-block text-xs font-medium uppercase tracking-wider text-warm-gray-light mb-2">
                        {result.type}
                      </span>
                      <h2 className="font-display font-semibold text-lg text-charcoal mb-2">
                        {result.title}
                      </h2>
                      <p className="text-warm-gray text-base leading-relaxed line-clamp-2">
                        {result.description}
                      </p>
                    </Link>
                  </AnimatedElement>
                ))}
              </AnimatedElement>
            )}

            {/* Default state: show popular services */}
            {!q && (
              <AnimatedElement variants={staggerContainer} className="mt-8">
                <AnimatedElement variants={fadeInUp}>
                  <h2 className="font-display font-semibold text-xl text-charcoal mb-6">
                    Popular Services
                  </h2>
                </AnimatedElement>
                <AnimatedElement
                  variants={staggerContainer}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {SERVICES.map((service) => (
                    <AnimatedElement key={service.slug} variants={fadeInUp}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="block bg-white rounded-[1.25rem] p-6 border border-border/50 hover:border-border hover:shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all"
                      >
                        <h3 className="font-display font-semibold text-charcoal mb-2">
                          {service.title}
                        </h3>
                        <p className="text-warm-gray text-sm leading-relaxed line-clamp-2">
                          {service.description}
                        </p>
                      </Link>
                    </AnimatedElement>
                  ))}
                </AnimatedElement>
              </AnimatedElement>
            )}
          </AnimatedElement>
        </Container>
      </section>
    </>
  );
}
