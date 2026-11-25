import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "About TableTurnerr",
    title: "A small, owner-run marketing team for home-service businesses",
    subtitle: "Meet the team, how we work and our rules.",
  });
}
