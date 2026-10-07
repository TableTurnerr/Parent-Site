import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/app/lib/og-image";
import { getIndustry } from "@/app/lib/industries";

export const alt = "TableTurnerr industry review management software";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const item = getIndustry(industry);
  return renderOgImage({ eyebrow: `${item?.name ?? "Home services"} · Review management`, title: item?.heroTitle ?? "Turn finished jobs into customer proof" });
}
