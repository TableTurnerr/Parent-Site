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
