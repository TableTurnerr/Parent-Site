// Growth content: done-for-you marketing pages (/marketing, /services), guides (/guides), case studies (/results)
// and the free Google Maps audit. The copy lives in the .mjs files next to this one (plain data, easy to edit);
// this module types it and wires up the cross-links.
//
// Guides are served at /guides/<slug> because /blog is the Supabase-driven CMS blog. The source files were written
// for /blog/<slug>, so internal links are rewritten here (external URLs such as webfx.com/blog/... are untouched).
import { trades as trades1 } from "./trades.mjs";
import { trades2 } from "./trades2.mjs";
import { guides as guides1 } from "./guides.mjs";
import { guides2 } from "./guides2.mjs";
import { guides3 } from "./guides3.mjs";
import { guides4 } from "./guides4.mjs";
import { guides5 } from "./guides5.mjs";
import { guides6 } from "./guides6.mjs";
import { guides7 } from "./guides7.mjs";
import { services as servicesRaw } from "./services.mjs";
import { services2 } from "./services2.mjs";
import { services3 } from "./services3.mjs";
import { results as resultsRaw } from "./results.mjs";
import { combos as combos1 } from "./combos.mjs";
import { combos2 } from "./combos2.mjs";
import { combos3 } from "./combos3.mjs";
import { site as siteRaw } from "./config.mjs";
import { fillPriceTokens } from "../pricing";
import {
  SITE_UPDATED as SITE_UPDATED_RAW,
  topics as topicsRaw,
  guideTopics,
  serviceTopics as serviceTopicsRaw,
  tradeGuides as tradeGuidesRaw,
  defaultTradeGuides as defaultTradeGuidesRaw,
} from "./architecture.mjs";

export type Pair = [string, string];
export type Link3 = [string, string, string];

export interface Trade {
  slug: string; name: string; plural: string; path: string;
  title: string; description: string; h1: string; lede: string;
  problemHeading: string; problemIntro: string; problems: Pair[];
  searchIntro: string; searches: string[];
  planIntro: string; plan: Pair[];
  deepDive: string; ctaTitle: string; faq: Pair[]; related: Link3[];
}
export interface Service {
  slug: string; short: string; path: string; title: string; description: string;
  eyebrow: string; h1: string; lede: string; includedIntro: string; included: Pair[];
  steps: Pair[]; deepDive: string; faq: Pair[];
}
export interface Guide {
  slug: string; path: string; title: string; description: string; h1: string; lede: string;
  eyebrow?: string; readMinutes: number; article: { date: string; updated?: string };
  ctaTitle: string; content: string; faq: Pair[]; topics: string[];
}
export interface Result {
  slug: string; path: string; client: string; person: string; trade: string; location: string;
  tradePath: string; reviewsBefore: number; reviewsAfter: number; days: number; quote: string;
  whatWeDid: Pair[]; added: number; pct: number;
}
export interface Topic { name: string; pillar: string; intro: string }

/** Point internal "/blog/..." and "/blog#..." links at /guides. Only touches paths that start right after a quote. */
function toGuides(value: unknown): unknown {
  return JSON.parse(JSON.stringify(value).replace(/"\/blog(?=[\/#"])/g, '"/guides').replace(/\\"\/blog(?=[\/#])/g, '\\"/guides'));
}

/** Replace {{PRICE:key}} and {{DEMO}} tokens in every string, so prices live only in app/lib/pricing.ts. */
function withPrices<T>(value: T): T {
  if (typeof value === "string") return fillPriceTokens(value) as T;
  if (Array.isArray(value)) return value.map(withPrices) as T;
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withPrices(v)])) as T;
  return value;
}

export const SITE_UPDATED: string = SITE_UPDATED_RAW;
export interface Owner { name: string; role: string; photo: string; bio: string; links: { label: string; href: string }[] }
export const growthSite = siteRaw as {
  bookingUrl: string; auditFormEmbed: string; clientStates: string[]; indexNowKey: string; email: string;
  phoneE164: string; phoneDisplay: string; businessesServed: string;
  owners: Owner[]; profiles: Record<string, string>; trustpilotUrl: string;
};
/** True once every owner has a real name and bio (see config.mjs). */
export const ownersReady = growthSite.owners.every((o) => o.name && !o.name.startsWith("TODO") && o.bio);
/** "Washington, Oregon, ... and Hawaii" */
export const clientStatesText = growthSite.clientStates.join(", ").replace(/, ([^,]*)$/, " and $1");
export const topics = toGuides(topicsRaw) as Record<string, Topic>;
export const serviceTopics = serviceTopicsRaw as Record<string, string>;

export const trades: Trade[] = withPrices(toGuides([...trades1, ...trades2])) as Trade[];
export const services: Service[] = withPrices(toGuides([...servicesRaw, ...services2, ...services3])) as Service[];
export const guides: Guide[] = (withPrices(toGuides([...guides7, ...guides6, ...guides4, ...guides5, ...guides1, ...guides2, ...guides3])) as Omit<Guide, "topics">[]).map((g: Omit<Guide, "topics">) => ({
  ...g,
  topics: (guideTopics as Record<string, string[]>)[g.slug] ?? ["trades"],
})) as Guide[];
export const results: Result[] = toGuides(resultsRaw) as Result[];

export const getTrade = (slug: string) => trades.find((t) => t.slug === slug);
export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
export const getResult = (slug: string) => results.find((r) => r.slug === slug);

export const guidesInTopic = (topic: string, except?: string) =>
  guides.filter((g) => g.topics.includes(topic) && g.slug !== except);

export function guidesForTrade(slug: string): Guide[] {
  const list = (tradeGuidesRaw as Record<string, string[]>)[slug] ?? (defaultTradeGuidesRaw as string[]);
  return list.map(getGuide).filter((g): g is Guide => Boolean(g));
}

/** The 3 services most relevant to a trade: those its `related` list names, then GBP / reviews / local SEO. */
export function servicesForTrade(t: Trade): Service[] {
  const want = [...t.related.map(([h]) => h), "/services/google-business-profile", "/services/review-generation", "/services/local-seo"];
  return [...new Set(want)].map((h) => services.find((s) => s.path === h)).filter((s): s is Service => Boolean(s)).slice(0, 3);
}

export function relatedGuides(g: Guide, n = 3): Guide[] {
  const seen = new Set<string>();
  const out: Guide[] = [];
  for (const t of g.topics) for (const x of guidesInTopic(t, g.slug)) if (!seen.has(x.slug)) { seen.add(x.slug); out.push(x); }
  return out.slice(0, n);
}

export const slugify = (s: string) =>
  s.replace(/<[^>]+>/g, "").toLowerCase().replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Give every <h2> an id (jump links can show in Google results) and return a table of contents. */
export function withToc(html: string): { html: string; toc: Pair[] } {
  const toc: Pair[] = [];
  const out = html.replace(/<h2>(.*?)<\/h2>/g, (_m, inner: string) => {
    const id = slugify(inner);
    toc.push([id, inner]);
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

export const plain = (s: string) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/\s+/g, " ").trim();

export const FSM = "Jobber, Housecall Pro, ServiceTitan and Workiz";
export const AUDIT_PATH = "/free-google-maps-audit";

/** Software industry slug (/industries/<slug>) to its done-for-you trade page (/marketing/<slug>), where one exists. */
const INDUSTRY_TO_TRADE: Record<string, string> = {
  hvac: "hvac", roofing: "roofing", plumbing: "plumbing", electrical: "electricians", handyman: "handyman",
  "garage-door-repair": "garage-door-repair", "pest-control": "pest-control", landscaping: "landscaping",
  "lawn-care": "landscaping", cleaning: "cleaning-services", painting: "painting", "pressure-washing": "pressure-washing",
};
export function tradeForIndustry(industrySlug: string): Trade | undefined {
  const slug = INDUSTRY_TO_TRADE[industrySlug];
  return slug ? getTrade(slug) : undefined;
}

/** Trade + service pages (/marketing/<trade>/<service>), see combos.mjs. */
export interface Combo {
  trade: string; service: string; path: string; title: string; description: string; h1: string; lede: string;
  why: string; tactics: Pair[]; faq: Pair[];
}
export const combos = withPrices([...combos1, ...combos2, ...combos3]) as Combo[];
export const getCombo = (trade: string, service: string) => combos.find((c) => c.trade === trade && c.service === service);
export const combosForTrade = (trade: string) => combos.filter((c) => c.trade === trade);
export const combosForService = (service: string) => combos.filter((c) => c.service === service);
