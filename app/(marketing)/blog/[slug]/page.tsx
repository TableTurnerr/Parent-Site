import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostView from "@/app/components/blog/BlogPostView";
import { SITE_CONFIG } from "@/app/lib/constants";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/app/lib/schema";
import { getPostBySlug, getPublishedPosts } from "@/app/lib/blog";

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
    post.meta_description ?? post.excerpt ?? `${post.title}, from the TableTurnerr blog.`;
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

  const related = (await getPublishedPosts())
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

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
      <BlogPostView post={post} related={related} />
    </>
  );
}
