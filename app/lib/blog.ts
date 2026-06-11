import { createClient, createAdminClient } from "@/app/lib/supabase/server";

/** A published post as shown in the public list (no body). */
export interface BlogListItem {
  slug: string;
  title: string;
  excerpt: string | null;
  featured_image: string | null;
  featured_image_alt: string | null;
  published_at: string | null;
  reading_time: number | null;
}

/** A single published post with its rendered body. */
export interface BlogPost extends BlogListItem {
  content_html: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[] | null;
  og_image: string | null;
  updated_at: string;
  author_name: string | null;
}

// Only posts that are published AND publicly visible should ever surface.
const PUBLIC_FILTER = { status: "published", visibility: "public" } as const;

/** All publicly visible posts, newest first. Returns [] on any error. */
export async function getPublishedPosts(): Promise<BlogListItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "slug, title, excerpt, featured_image, featured_image_alt, published_at, reading_time"
    )
    .eq("status", PUBLIC_FILTER.status)
    .eq("visibility", PUBLIC_FILTER.visibility)
    .order("published_at", { ascending: false });

  if (error || !data) return [];
  return data as BlogListItem[];
}

/** Slugs of all public posts — for sitemap + static params. [] on error. */
export async function getPublishedPostSlugs(): Promise<
  { slug: string; updated_at: string }[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("status", PUBLIC_FILTER.status)
    .eq("visibility", PUBLIC_FILTER.visibility);

  if (error || !data) return [];
  return data as { slug: string; updated_at: string }[];
}

/** A single public post by slug, or null if not found / not public. */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      `slug, title, excerpt, featured_image, featured_image_alt, published_at,
       reading_time, content_html, meta_title, meta_description, meta_keywords,
       og_image, updated_at,
       author:profiles!blog_posts_author_id_fkey(full_name)`
    )
    .eq("slug", slug)
    .eq("status", PUBLIC_FILTER.status)
    .eq("visibility", PUBLIC_FILTER.visibility)
    .single();

  if (error || !data) return null;

  const author = Array.isArray(data.author) ? data.author[0] : data.author;
  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    featured_image: data.featured_image,
    featured_image_alt: data.featured_image_alt,
    published_at: data.published_at,
    reading_time: data.reading_time,
    content_html: data.content_html,
    meta_title: data.meta_title,
    meta_description: data.meta_description,
    meta_keywords: data.meta_keywords,
    og_image: data.og_image,
    updated_at: data.updated_at,
    author_name: author?.full_name ?? null,
  };
}

/**
 * A single post by id, regardless of status/visibility, for the authenticated
 * editor preview. Uses the service-role client so drafts and scheduled posts are
 * visible. CALLERS MUST gate this behind an authenticated team check, never call
 * it from a public, unauthenticated path.
 */
export async function getPostById(id: string): Promise<BlogPost | null> {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      `slug, title, excerpt, featured_image, featured_image_alt, published_at,
       reading_time, content_html, meta_title, meta_description, meta_keywords,
       og_image, updated_at,
       author:profiles!blog_posts_author_id_fkey(full_name)`
    )
    .eq("id", id)
    .single();

  if (error || !data) return null;

  const author = Array.isArray(data.author) ? data.author[0] : data.author;
  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    featured_image: data.featured_image,
    featured_image_alt: data.featured_image_alt,
    published_at: data.published_at,
    reading_time: data.reading_time,
    content_html: data.content_html,
    meta_title: data.meta_title,
    meta_description: data.meta_description,
    meta_keywords: data.meta_keywords,
    og_image: data.og_image,
    updated_at: data.updated_at,
    author_name: author?.full_name ?? null,
  };
}

export interface TocItem {
  id: string;
  text: string;
}

/**
 * Adds stable id attributes to the article's H2 headings and returns a table of
 * contents built from them. Runs server-side on the stored HTML so the anchors
 * work without client JS and the TOC is crawlable. Headings that already have an
 * id are left untouched.
 */
export function buildArticle(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();

  const slugify = (s: string): string =>
    s
      .replace(/<[^>]+>/g, "")
      .toLowerCase()
      .replace(/&[a-z]+;/gi, " ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "section";

  const out = html.replace(
    /<h2([^>]*)>([\s\S]*?)<\/h2>/gi,
    (match, attrs: string, inner: string) => {
      if (/\bid=/.test(attrs)) return match; // respect an existing id
      const text = inner.replace(/<[^>]+>/g, "").trim();
      if (!text) return match;
      let id = slugify(text);
      let n = 2;
      const base = id;
      while (used.has(id)) id = `${base}-${n++}`;
      used.add(id);
      toc.push({ id, text });
      return `<h2${attrs} id="${id}">${inner}</h2>`;
    }
  );

  return { html: out, toc };
}

export function formatPostDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
