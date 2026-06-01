/**
 * Frontend content quality + SEO checks for the post editor. Pure functions,
 * no side effects. They read the post fields already held in editor state and
 * return pass/warn/fail signals so a writer can self-correct before publishing.
 */

export type CheckLevel = "pass" | "warn" | "fail";

export interface CheckResult {
  id: string;
  label: string;
  level: CheckLevel;
  detail: string;
}

export interface CheckInput {
  title: string;
  contentHtml: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  featuredImageAlt: string;
  featuredImage: string;
  metaKeywords: string;
}

/** Strip HTML tags to plain text for word counting / keyword checks. */
export function htmlToText(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function wordCount(html: string): number {
  const text = htmlToText(html);
  return text ? text.split(/\s+/).length : 0;
}

export function readingTime(html: string): number {
  return Math.max(1, Math.ceil(wordCount(html) / 200));
}

/** Count em-dashes and en-dashes (house rule: they read as AI-written). */
export function dashCount(...fields: string[]): number {
  return fields.reduce((n, f) => n + (f.match(/[—–]|&mdash;|&ndash;/g)?.length ?? 0), 0);
}

export function runChecks(input: CheckInput): CheckResult[] {
  const results: CheckResult[] = [];
  const text = htmlToText(input.contentHtml);
  const words = wordCount(input.contentHtml);
  const effectiveMetaTitle = input.metaTitle || input.title;

  // 1. Em-dash / en-dash sweep (house rule)
  const dashes = dashCount(input.title, input.contentHtml, input.excerpt, input.metaTitle, input.metaDescription);
  results.push({
    id: "dashes",
    label: "No long dashes",
    level: dashes === 0 ? "pass" : "fail",
    detail:
      dashes === 0
        ? "No em or en dashes found."
        : `${dashes} long dash${dashes > 1 ? "es" : ""} found. Replace with commas, colons, or parentheses.`,
  });

  // 2. Meta title length
  const mtLen = effectiveMetaTitle.length;
  results.push({
    id: "meta-title",
    label: "Meta title length",
    level: mtLen === 0 ? "fail" : mtLen > 60 ? "warn" : "pass",
    detail:
      mtLen === 0
        ? "Add a meta title (or it falls back to the post title)."
        : mtLen > 60
          ? `${mtLen}/60 characters. Google may truncate it.`
          : `${mtLen}/60 characters.`,
  });

  // 3. Meta description length
  const mdLen = input.metaDescription.length;
  results.push({
    id: "meta-desc",
    label: "Meta description",
    level: mdLen === 0 ? "fail" : mdLen < 70 || mdLen > 160 ? "warn" : "pass",
    detail:
      mdLen === 0
        ? "Add a meta description for search results."
        : mdLen > 160
          ? `${mdLen}/160 characters. It may get cut off.`
          : mdLen < 70
            ? `${mdLen}/160 characters. A little short; aim for 70 to 160.`
            : `${mdLen}/160 characters.`,
  });

  // 4. Excerpt present
  results.push({
    id: "excerpt",
    label: "Excerpt set",
    level: input.excerpt.trim() ? "pass" : "warn",
    detail: input.excerpt.trim() ? "Excerpt is set." : "Add an excerpt for the blog listing cards.",
  });

  // 5. Body length
  results.push({
    id: "length",
    label: "Post length",
    level: words === 0 ? "fail" : words < 300 ? "warn" : "pass",
    detail:
      words === 0
        ? "No body content yet."
        : words < 300
          ? `${words} words. Thin content; aim for 600+ to rank.`
          : `${words} words.`,
  });

  // 6. Has an H2
  const hasH2 = /<h2[\s>]/i.test(input.contentHtml);
  results.push({
    id: "h2",
    label: "Has a subheading",
    level: hasH2 ? "pass" : "warn",
    detail: hasH2 ? "Body uses H2 subheadings." : "Add H2 subheadings to structure the post.",
  });

  // 7. Has at least one internal link (to our own site / a relative path)
  const hasInternalLink = /<a[^>]+href=["'](\/(?!\/)|https?:\/\/(?:www\.)?tableturnerr\.com)/i.test(input.contentHtml);
  results.push({
    id: "internal-link",
    label: "Internal link",
    level: hasInternalLink ? "pass" : "warn",
    detail: hasInternalLink
      ? "Links to a service page or another post."
      : "Add at least one internal link (a service page or related post).",
  });

  // 8. All images have alt text
  const imgs = input.contentHtml.match(/<img[^>]*>/gi) ?? [];
  const imgsMissingAlt = imgs.filter((img) => !/alt=["'][^"']+["']/i.test(img)).length;
  results.push({
    id: "img-alt",
    label: "Image alt text",
    level: imgs.length === 0 ? "pass" : imgsMissingAlt > 0 ? "warn" : "pass",
    detail:
      imgs.length === 0
        ? "No inline images to check."
        : imgsMissingAlt > 0
          ? `${imgsMissingAlt} of ${imgs.length} images missing alt text.`
          : `All ${imgs.length} images have alt text.`,
  });

  // 9. Featured image + alt
  results.push({
    id: "featured",
    label: "Featured image",
    level: !input.featuredImage ? "warn" : !input.featuredImageAlt.trim() ? "warn" : "pass",
    detail: !input.featuredImage
      ? "Add a featured image (real photo, no AI product images)."
      : !input.featuredImageAlt.trim()
        ? "Featured image is missing alt text."
        : "Featured image and alt text set.",
  });

  // 10. Focus keyword in title + first paragraph (uses first meta keyword as the focus)
  const focus = input.metaKeywords.split(",")[0]?.trim().toLowerCase();
  if (focus) {
    const inTitle = effectiveMetaTitle.toLowerCase().includes(focus);
    const firstChunk = text.slice(0, 300).toLowerCase();
    const inIntro = firstChunk.includes(focus);
    const level: CheckLevel = inTitle && inIntro ? "pass" : inTitle || inIntro ? "warn" : "fail";
    results.push({
      id: "focus-keyword",
      label: "Focus keyword placement",
      level,
      detail:
        level === "pass"
          ? `"${focus}" appears in the title and intro.`
          : `Use "${focus}" in ${!inTitle ? "the title" : ""}${!inTitle && !inIntro ? " and " : ""}${!inIntro ? "the first paragraph" : ""}.`,
    });
  }

  return results;
}

export function checkScore(results: CheckResult[]): { pass: number; total: number } {
  return {
    pass: results.filter((r) => r.level === "pass").length,
    total: results.length,
  };
}
