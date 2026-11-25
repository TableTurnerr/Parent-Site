import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Done-for-you marketing",
    title: "Everything it takes to win the call on Google",
    subtitle: "Google profile, reviews, local SEO, websites and missed-call text-back.",
  });
}
