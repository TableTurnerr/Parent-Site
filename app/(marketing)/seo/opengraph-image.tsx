import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "SEO and AEO",
    title: "Get found on Google and recommended by AI",
    subtitle: "Local SEO and AI search for home-service businesses, done for you.",
  });
}
