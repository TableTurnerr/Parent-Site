import { permanentRedirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ trade: string }>;
}) {
  const { trade } = await params;
  permanentRedirect(`/industries/${trade}`);
}
