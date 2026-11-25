import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Done-for-you marketing for home services",
    title: "Get found on Google. Get more reviews. Get more calls.",
    subtitle: "Websites, SEO, Google Business Profile, reviews and CRM for home-service businesses.",
  });
}
