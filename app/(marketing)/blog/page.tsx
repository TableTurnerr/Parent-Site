import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import { SERVICES, SITE_CONFIG } from "@/app/lib/constants";
import { createPageMetadata } from "@/app/lib/metadata";
import { generateBreadcrumbSchema } from "@/app/lib/schema";
import { getPublishedPosts, formatPostDate } from "@/app/lib/blog";

// Revalidate hourly so newly published posts appear without a redeploy.
export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  title: "Marketing Blog for Local Businesses",
  description:
    "Marketing, local SEO, and Google Ads insights for local businesses. Practical tips and strategies to get found and win more customers.",
  path: "/blog",
  keywords: [
    "local business marketing blog",
    "local SEO tips",
    "small business marketing ideas",
    "how to market a local business",
  ],
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

      <section className="bg-cream pt-28 sm:pt-32 md:pt-36 pb-12 md:pb-16">
        <Container>
          <div className="max-w-2xl">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
              className="mb-6"
            />
            <p className="font-handwriting text-accent text-3xl md:text-4xl rotate-[-3deg] mb-3">
              fresh from the pass
            </p>
            <h1 className="display-xl text-charcoal mb-6">
              Local marketing insights
            </h1>
            <p className="text-warm-gray text-lg leading-relaxed">
              Practical advice on local SEO, Google Ads, and marketing, written
              to help local businesses grow online and win more customers.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-cream pb-20 md:pb-28">
        <Container>
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {posts.map((post) => (
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
          )}
        </Container>
      </section>
    </>
  );
}

function EmptyState() {
  return (
    <div className="max-w-2xl">
      <p className="text-warm-gray text-lg leading-relaxed mb-8">
        New articles are on the way. In the meantime, explore what we do or get a
        free consultation.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button href="/contact" variant="primary">
          Get a Free Consultation
        </Button>
        <Button href="/services" variant="secondary">
          View Our Services
        </Button>
      </div>
      <div className="mt-14">
        <h2 className="font-display font-semibold text-lg text-charcoal mb-5">
          Explore our services
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="block rounded-xl border border-border bg-cream-dark px-5 py-4 text-charcoal hover:border-charcoal/30 transition-colors"
              >
                {service.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
