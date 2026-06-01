import { createClient } from "@/app/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ReportRenderer } from "@/components/report/report-renderer";
import { isClientReport, type ClientReport } from "@/lib/report-schema";

const MONTH_RE = /^\d{4}-\d{2}$/;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; month: string }>;
}): Promise<Metadata> {
  const { slug, month } = await params;
  if (!MONTH_RE.test(month)) return { title: "Report | TableTurnerr" };

  const supabase = await createClient();
  const { data } = await supabase
    .from("client_reports")
    .select("client_name, visibility")
    .eq("client_slug", slug)
    .eq("report_month", `${month}-01`)
    .eq("status", "published")
    .in("visibility", ["public", "unlisted"])
    .maybeSingle();

  if (!data) return { title: "Report | TableTurnerr" };

  const monthLabel = new Date(`${month}-01`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return {
    title: `${data.client_name} — ${monthLabel} Digital Presence Report | TableTurnerr`,
    robots: { index: false, follow: false },
  };
}

export default async function PublicReportPage({
  params,
}: {
  params: Promise<{ slug: string; month: string }>;
}) {
  const { slug, month } = await params;
  if (!MONTH_RE.test(month)) notFound();

  const supabase = await createClient();
  const { data: report } = await supabase
    .from("client_reports")
    .select("client_content_json, grader_data, published_at, created_at, visibility")
    .eq("client_slug", slug)
    .eq("report_month", `${month}-01`)
    .eq("status", "published")
    .in("visibility", ["public", "unlisted"])
    .maybeSingle();

  if (!report) notFound();

  const json = report.client_content_json as ClientReport | null;
  if (!json || !isClientReport(json)) notFound();

  return <ReportRenderer report={json} />;
}
