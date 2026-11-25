import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/app/components/ui/Container";
import { SITE_CONFIG } from "@/app/lib/constants";
import { createPageMetadata } from "@/app/lib/metadata";
import { generateBreadcrumbSchema } from "@/app/lib/schema";
import { getPublishedPosts, formatPostDate } from "@/app/lib/blog";
import { AuditBand, GrowthHero, GuideCards, SectionHead } from "@/app/components/growth/Growth";
import { guides } from "@/app/lib/growth";

// Revalidate hourly so newly published posts appear without a redeploy.
export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  title: "Contractor Marketing Blog: Reviews & CRM",
  description:
    "Articles for home-service owners: get more Google reviews, choose a CRM or invoicing software, follow up on estimates and show up on Google Maps.",
  path: "/blog",
  keywords: ["contractor marketing blog", "get more google reviews", "crm for contractors", "local SEO tips"],
});

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Blog", url: `${SITE_CONFIG.url}/blog` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <GrowthHero
        crumbs={[["/", "Home"], ["/blog", "Blog"]]}
        eyebrow="The TableTurnerr blog"
        h1="More reviews, more calls, fewer lost jobs"
        lede="Practical articles for home-service owners on Google reviews, CRM and invoicing software, follow-up and showing up on Google Maps."
        trust={false}
      />

      {posts.length > 0 && (
      <section className="bg-cream py-16 md:py-24">
        <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-[1.25rem] border border-border bg-cream-dark overflow-hidden hover:border-charcoal/30 hover:shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-300"
                >
                  {post.featured_image && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.featured_image}
                        alt={post.featured_image_alt ?? post.title}
                        fill
                        priority={i === 0}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-warm-gray-light mb-3">
                      <time dateTime={post.published_at ?? undefined}>
                        {formatPostDate(post.published_at)}
                      </time>
                      {post.reading_time ? (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{post.reading_time} min read</span>
                        </>
                      ) : null}
                    </div>
                    <h2 className="font-display font-semibold text-xl leading-snug text-charcoal mb-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-warm-gray text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
        </Container>
      </section>
      )}

      <section className="section bg-surface">
        <div className="container-tt">
          <SectionHead title="Latest articles" intro="Step by step, with messages you can copy." />
          <GuideCards list={guides.slice(0, 12)} />
          <p className="mt-8"><Link href="/guides" className="font-semibold text-primary">See all {guides.length} guides</Link></p>
        </div>
      </section>
      <AuditBand />
    </>
  );
}
