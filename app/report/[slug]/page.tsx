import { createClient } from "@/app/lib/supabase/server";
import { notFound, redirect } from "next/navigation";

/**
 * Canonical alias: redirects /report/[slug] → /report/[slug]/[latest-month].
 * The actual report renderer lives at /report/[slug]/[month].
 */
export default async function PublicReportLatestRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: latest } = await supabase
    .from("client_reports")
    .select("report_month")
    .eq("client_slug", slug)
    .eq("status", "published")
    .in("visibility", ["public", "unlisted"])
    .order("report_month", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!latest) notFound();

  redirect(`/report/${slug}/${latest.report_month.slice(0, 7)}`);
}
