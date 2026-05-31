import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/app/components/ui/Container";
import CTA from "@/app/components/sections/CTA";
import { SITE_CONFIG } from "@/app/lib/constants";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/app/lib/schema";
import { getPostBySlug, formatPostDate } from "@/app/lib/blog";

// Revalidate hourly; unknown slugs render on demand then cache.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Article not found", robots: { index: false, follow: true } };
  }

  const title = post.meta_title ?? post.title;
  const description =
    post.meta_description ?? post.excerpt ?? `${post.title} — TableTurnerr blog.`;
  const url = `${SITE_CONFIG.url}/blog/${post.slug}`;
  const ogImage = post.og_image ?? post.featured_image ?? undefined;

  return {
    title,
    description,
    ...(post.meta_keywords && post.meta_keywords.length > 0
      ? { keywords: post.meta_keywords }
      : {}),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      ...(post.published_at ? { publishedTime: post.published_at } : {}),
      modifiedTime: post.updated_at,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const url = `${SITE_CONFIG.url}/blog/${post.slug}`;
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.meta_description ?? post.excerpt ?? post.title,
    url,
    image: post.og_image ?? post.featured_image ?? undefined,
    datePublished: post.published_at ?? undefined,
    dateModified: post.updated_at,
    authorName: post.author_name ?? undefined,
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Blog", url: `${SITE_CONFIG.url}/blog` },
    { name: post.title, url },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleSchema, breadcrumbSchema]),
        }}
      />

      <article className="bg-cream pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24">
        <Container>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-warm-gray">
              <li>
                <Link href="/" className="hover:text-charcoal transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-warm-gray-light">/</li>
              <li>
                <Link href="/blog" className="hover:text-charcoal transition-colors">
                  Blog
                </Link>
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-warm-gray-light mb-4">
              <time dateTime={post.published_at ?? undefined}>
                {formatPostDate(post.published_at)}
              </time>
              {post.reading_time ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{post.reading_time} min read</span>
                </>
              ) : null}
              {post.author_name ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>By {post.author_name}</span>
                </>
              ) : null}
            </div>

            <h1 className="font-display font-bold text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-tight text-charcoal mb-8">
              {post.title}
            </h1>
          </div>

          {post.featured_image && (
            <div className="relative aspect-[16/9] rounded-[1.25rem] overflow-hidden mb-10 max-w-4xl">
              <Image
                src={post.featured_image}
                alt={post.featured_image_alt ?? post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 56rem"
                priority
              />
            </div>
          )}

          {post.content_html ? (
            <div
              className="prose prose-lg max-w-3xl prose-headings:font-display prose-headings:text-charcoal prose-p:text-warm-gray prose-a:text-accent prose-strong:text-charcoal"
              dangerouslySetInnerHTML={{ __html: post.content_html }}
            />
          ) : (
            <p className="text-warm-gray max-w-3xl">{post.excerpt}</p>
          )}
        </Container>
      </article>

      <CTA />
    </>
  );
}
