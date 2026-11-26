// /pricing.md: the price list in plain Markdown, for AI assistants and anyone who wants it without the page.
import { pricingMarkdown } from "@/app/lib/pricing-text";
import { growthSite } from "@/app/lib/growth";

export const dynamic = "force-static";

export function GET() {
  return new Response(pricingMarkdown("https://www.tableturnerr.com", growthSite.phoneDisplay), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
