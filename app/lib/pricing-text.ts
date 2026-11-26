// Plain-text price list shared by /pricing.md and /llms-full.txt, built from app/lib/pricing.ts.
import {
  AI_MINUTE_RATE, DEMO_PHONE_DISPLAY, PLANS, PRICES_CHECKED, PRICING_FAQS, PRICING_TERMS, planById, yearlyPrice,
} from "./pricing";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export function pricingMarkdown(base = "https://www.tableturnerr.com", phone = ""): string {
  const nm = planById("growth");
  return [
    "# TableTurnerr pricing",
    "",
    `Done-for-you marketing, CRM and AI answering for US home-service businesses. Prices in USD, updated ${PRICES_CHECKED}.`,
    "Five packages. Each includes everything in the package before it. No contracts. Pay 12 months up front and get 2 months free.",
    `Exact pricing for your business: book a call at ${base}/pricing${phone ? ` or call ${phone}` : ""}. Packages are fixed. Need something different? Call or book a call for custom pricing.`,
    "",
    "## Packages (per month)",
    "",
    "| Package | Price | Yearly (2 months free) | AI answering minutes included | Adds |",
    "|---|---|---|---|---|",
    ...PLANS.map((p) => `| ${p.name} | ${usd(p.price)}/mo | ${usd(yearlyPrice(p))}/yr | ${p.aiMinutes || "none"} | ${p.adds.join("; ")} |`),
    "",
    `Extra AI answering minutes: $${AI_MINUTE_RATE.toFixed(2)} each, on every package that includes AI answering.`,
    "",
    "## Worked examples: AI answering",
    "",
    ...[100, 300, 600].map((m) => {
      const plan = nm.price + Math.max(0, m - nm.aiMinutes) * AI_MINUTE_RATE;
      return `- ${m} minutes a month: ${usd(Math.round(plan))}/mo on the ${nm.name} package with reviews, website, Google profile and CRM included.`;
    }),
    "",
    `Live demo of the AI receptionist: call ${DEMO_PHONE_DISPLAY} and ask it anything.`,
    "",
    "## Terms",
    "",
    ...PRICING_TERMS.map(([h, p]) => `- ${h}: ${p}`),
    "",
    "## Questions",
    "",
    ...PRICING_FAQS.map((f) => `**${f.q}**\n${f.a}\n`),
  ].join("\n");
}
