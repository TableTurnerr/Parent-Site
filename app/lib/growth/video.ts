// The TableTurnerr explainer video (VSL) on YouTube. Title, description, date, length and chapters were taken
// from the video's public YouTube page on 2026-11-20 so the VideoObject schema matches what viewers see.
export const VSL = {
  id: "EFEoChpgXSs",
  title: "How TableTurnerr Helps Local Businesses Get Better Customers (and What It Costs)",
  description:
    "Two businesses in your town do the same work. One has 200 reviews, shows up first on Google and gets the best clients at his price. The other gets the price shoppers. This video shows how to be the first one: getting more 5-star reviews, one inbox for calls, texts and messages, automations like review requests and missed-call text-back, staying active online, what's in your free audit report, and what it costs.",
  uploadDate: "2026-11-17T12:12:10-08:00",
  durationIso: "PT6M8S",
  durationLabel: "6 min",
  /** Chapters as listed in the YouTube description: [start seconds, label]. */
  chapters: [
    [0, "Intro"],
    [23, "Getting more 5-star reviews"],
    [86, "One inbox for all your calls, texts and messages"],
    [120, "Automations: review requests, missed-call text-back, holiday campaigns"],
    [159, "Staying active online: Google, Facebook, Instagram, TikTok"],
    [181, "Becoming the obvious choice in your area"],
    [251, "Your free audit report"],
    [311, "Pricing"],
    [334, "Next steps"],
  ] as [number, string][],
  lengthSeconds: 368,
};

export const vslThumb = `https://i.ytimg.com/vi/${VSL.id}/maxresdefault.jpg`;
export const vslWatchUrl = `https://www.youtube.com/watch?v=${VSL.id}`;
export const vslEmbedUrl = `https://www.youtube-nocookie.com/embed/${VSL.id}`;

export const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/** VideoObject JSON-LD, with chapters as Clips so Google can show "key moments". */
export function vslSchema() {
  const { chapters } = VSL;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: VSL.title,
    description: VSL.description,
    thumbnailUrl: [vslThumb, `https://i.ytimg.com/vi/${VSL.id}/hqdefault.jpg`],
    uploadDate: VSL.uploadDate,
    duration: VSL.durationIso,
    embedUrl: `https://www.youtube.com/embed/${VSL.id}`,
    url: vslWatchUrl,
    publisher: { "@type": "Organization", name: "TableTurnerr", url: "https://www.tableturnerr.com" },
    hasPart: chapters.map(([start, name], i) => ({
      "@type": "Clip",
      name,
      startOffset: start,
      endOffset: chapters[i + 1]?.[0] ?? VSL.lengthSeconds,
      url: `${vslWatchUrl}&t=${start}s`,
    })),
  };
}

// Client podcast with Adrian Alvarez of Presidential Roofing, and a short cut from it. Titles, dates and lengths
// were taken from the public YouTube pages on 2026-11-23.
export const PODCAST = {
  id: "-mXFO9ErT40",
  title: "How this 2M+ Roofer Gets All His Work From Referrals (No Door Knocking) | Presidential Roofing",
  description:
    "Adrian Alvarez runs Presidential Roofing in Syracuse, Utah, and gets all his work from referrals: no cold calling, no door knocking, no storm chasing. We talk about treating every client like a VIP, hiring through people he trusts, referral groups, storm chasers and warranties, the quality details that earn referrals, and going from 27 Google reviews to #1 on Google.",
  uploadDate: "2026-11-19T20:15:31-08:00",
  durationIso: "PT24M58S",
  durationLabel: "25 min",
};
export const podcastWatchUrl = `https://www.youtube.com/watch?v=${PODCAST.id}`;

export interface Short {
  id: string;
  title: string;
  description: string;
  uploadDate: string;
  durationIso: string;
  durationLabel: string;
  /** Plain-text summary of what is said, shown under the player so search and AI tools can read it. */
  summary?: string[];
}

/** Adrian (Presidential Roofing) on getting 15 reviews in 10 days. Used on the case study page. */
export const CLIENT_SHORT: Short = {
  id: "NouwRzgB5uI",
  title: "How this Roofer got 15 reviews in 10 days",
  description:
    "How this roofer got 15 new reviews in 10 days. Adrian never asked for reviews himself, so we did it for him, and slowed it down so Google doesn't flag it.",
  uploadDate: "2026-11-20T08:05:51-08:00",
  durationIso: "PT55S",
  durationLabel: "0:55",
};

/** Adrian on going from 27 reviews in 4.5 years to the first roofer on Google in his area. Homepage hero.
 *  (The YouTube title says "#1 on YouTube"; its own description says Google, which is what he talks about.) */
export const HERO_SHORT: Short = {
  id: "fc-hVwQU8pY",
  title: "How this roofer from Syracuse, Utah got to #1 on Google",
  description:
    "27 reviews in 4.5 years. Now he's the first roofer that shows up in his area. Adrian from Presidential Roofing on what changed once his Google profile was handled for him.",
  uploadDate: "2026-11-19T20:45:55-08:00",
  durationIso: "PT63S",
  durationLabel: "1:03",
  summary: [
    "Adrian runs Presidential Roofing in Syracuse, Utah. In 4.5 years the business had collected 27 Google reviews.",
    "TableTurnerr asked his past customers for reviews and followed up, made his website SEO and AEO optimized, optimized his Google Business Profile, and posted content on his profile and social media.",
    "Today he is the first roofer that shows up on Google Maps and search in his area.",
  ],
};

export const shortThumbFor = (s: Short) => `https://i.ytimg.com/vi/${s.id}/oar2.jpg`;
export const shortEmbedFor = (s: Short) => `https://www.youtube-nocookie.com/embed/${s.id}`;
export const shortWatchFor = (s: Short) => `https://www.youtube.com/shorts/${s.id}`;
export const shortThumb = shortThumbFor(CLIENT_SHORT);
export const shortEmbedUrl = shortEmbedFor(CLIENT_SHORT);
export const shortWatchUrl = shortWatchFor(CLIENT_SHORT);

/** VideoObject JSON-LD for a short embedded on the page. */
export function clientShortSchema(s: Short = CLIENT_SHORT) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: s.title,
    description: s.description,
    thumbnailUrl: [shortThumbFor(s), `https://i.ytimg.com/vi/${s.id}/hqdefault.jpg`],
    uploadDate: s.uploadDate,
    duration: s.durationIso,
    embedUrl: `https://www.youtube.com/embed/${s.id}`,
    url: shortWatchFor(s),
    publisher: { "@type": "Organization", name: "TableTurnerr", url: "https://www.tableturnerr.com" },
  };
}


/** Seasons Taiwanese Eatery (Honolulu), a 2025 restaurant client. Both shorts are from the TableTurnerr channel. */
export const SEASONS_SHORTS: Short[] = [
  {
    id: "3W_OM_NEq9E",
    title: "The secret behind this Hawaiian restaurant's digital marketing",
    description:
      "The secret behind Seasons Taiwanese Eatery's digital marketing: testing every day what resonates with their audience, and staying connected with customers so the restaurant stays top of mind.",
    uploadDate: "2025-05-15T12:30:04-07:00",
    durationIso: "PT57S",
    durationLabel: "0:57",
    summary: [
      "The secret behind Seasons Taiwanese Eatery's digital marketing: a young, hardworking team testing something new every day.",
      "We kept what resonated with their audience, dropped what didn't, and stayed in touch with customers so the restaurant stayed top of mind.",
    ],
  },
  {
    id: "n_GDuz5cL9o",
    title: "Check out the marketing of this restaurant in Honolulu",
    description:
      "How a small family-run restaurant in Honolulu got 500+ customers: a new search-optimized website, a plan for more Google reviews, outreach to 1,500+ potential customers and influencer marketing.",
    uploadDate: "2025-07-10T18:18:59-07:00",
    durationIso: "PT62S",
    durationLabel: "1:02",
    summary: [
      "A small family-run restaurant in Honolulu brought in 500+ customers through digital marketing.",
      "The work: a new search-optimized website, a plan to get more Google reviews, outreach to 1,500+ potential customers, influencer marketing and content shoots.",
    ],
  },
];
