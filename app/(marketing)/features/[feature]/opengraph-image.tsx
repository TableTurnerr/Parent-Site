import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/app/lib/og-image";
import { getFeature } from "@/app/lib/features";

export const alt = "TableTurnerr feature for home-service businesses";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ feature: string }> }) {
  const { feature } = await params;
  const item = getFeature(feature);
  return renderOgImage({ eyebrow: item?.fieldTask ? "FieldTask capability" : "TableTurnerr feature", title: item?.title ?? "Review automation for home services" });
}
