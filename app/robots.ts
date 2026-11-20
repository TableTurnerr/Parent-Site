import type { MetadataRoute } from "next";

// Search and AI-assistant crawlers we want reading the public site. Answer engines (ChatGPT, Perplexity,
// Claude, Gemini, Copilot) can only cite pages they're allowed to fetch.
const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "DuckAssistBot",
  "Meta-ExternalAgent",
  "MistralAI-User",
];

const PRIVATE = ["/api/", "/admin/", "/portal/", "/login"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // /_next/ is no longer blocked: Google needs the CSS/JS to render pages.
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      { userAgent: AI_AND_SEARCH_BOTS, allow: "/", disallow: PRIVATE },
    ],
    sitemap: "https://www.tableturnerr.com/sitemap.xml",
    host: "https://www.tableturnerr.com",
  };
}
