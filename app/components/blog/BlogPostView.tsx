import Link from "next/link";
import Image from "next/image";
import Container from "@/app/components/ui/Container";
import CTA from "@/app/components/sections/CTA";
import ReadingProgress from "@/app/components/blog/ReadingProgress";
import ArticleShare from "@/app/components/blog/ArticleShare";
import ArticleToc from "@/app/components/blog/ArticleToc";
import { SITE_CONFIG } from "@/app/lib/constants";
import { buildArticle, formatPostDate, type BlogPost, type BlogListItem } from "@/app/lib/blog";

/**
 * Shared renderer for a single blog post. Used by the public post page and by
 * the authenticated editor preview, so a draft preview looks exactly like the
 * live post. When isPreview is true a small badge marks it as not-yet-public.
 */
export default function BlogPostView({
  post,
  related,
  isPreview = false,
}: {
  post: BlogPost;
  related: BlogListItem[];
  isPreview?: boolean;
}) {
  const { html: articleHtml, toc } = buildArticle(post.content_html ?? "");
  const url = `${SITE_CONFIG.url}/blog/${post.slug}`;

  return (
    <>
      <ReadingProgress />

      {isPreview && (
        <div className="fixed bottom-4 left-1/2 z-[55] -translate-x-1/2 rounded-full bg-charcoal px-4 py-2 text-xs font-medium text-cream shadow-lg">
          Preview, not published yet. Save in the editor to refresh.
        </div>
      )}

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
                {post.published_at ? formatPostDate(post.published_at) : "Draft"}
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

          {/* Content + sticky sidebar */}
          <div className="mt-10 lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-8">
              {/* Mobile/tablet table of contents */}
              {toc.length >= 3 && (
                <nav
                  aria-label="On this page"
                  className="mb-10 rounded-[1.25rem] border border-border bg-cream-dark p-6 lg:hidden"
                >
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-warm-gray">
                    On this page
                  </p>
                  <ol className="space-y-2">
                    {toc.map((item, i) => (
                      <li key={item.id} className="flex gap-2 text-[0.95rem] leading-snug">
                        <span className="tabular-nums text-warm-gray-light">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <a
                          href={`#${item.id}`}
                          className="text-charcoal underline-offset-2 transition-colors hover:text-accent hover:underline"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              {post.content_html ? (
                <div
                  className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-charcoal prose-p:text-warm-gray prose-a:text-accent prose-strong:text-charcoal"
                  dangerouslySetInnerHTML={{ __html: articleHtml }}
                />
              ) : (
                <p className="text-warm-gray">{post.excerpt}</p>
              )}

              <ArticleShare url={url} title={post.title} />
            </div>

            {/* Desktop sticky sidebar */}
            <aside className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-28 space-y-8">
                {toc.length >= 2 && <ArticleToc items={toc} />}

                <div className="rounded-[1.25rem] border border-border bg-cream-dark p-6">
                  <p className="font-display text-lg font-semibold leading-snug text-charcoal">
                    Grow your business
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-warm-gray">
                    Want more customers from local search? Get a free consultation
                    and we will map out the plan.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center justify-center rounded-full bg-charcoal px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-charcoal-light"
                  >
                    Get a free consultation
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-cream-dark py-16 md:py-24">
          <Container>
            <h2 className="mb-8 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-[1.15] tracking-tight text-charcoal">
              Keep reading
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[1.25rem] border border-border bg-cream elevate-hover"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-cream-dark">
                    {r.featured_image ? (
                      <Image
                        src={r.featured_image}
                        alt={r.featured_image_alt ?? r.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-semibold leading-snug text-charcoal">
                      {r.title}
                    </h3>
                    {r.excerpt ? (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-warm-gray">
                        {r.excerpt}
                      </p>
                    ) : null}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                      Read more
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                        &rarr;
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTA />
    </>
  );
}
