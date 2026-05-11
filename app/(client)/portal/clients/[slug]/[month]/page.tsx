import { createClient } from "@/app/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ReportRendererBody } from "@/components/report/report-renderer";
import { isClientReport, type ClientReport } from "@/lib/report-schema";

const MONTH_RE = /^\d{4}-\d{2}$/;

export default async function PortalReportPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; month: string }>;
  searchParams: Promise<{ loc?: string }>;
}) {
  const { slug, month } = await params;
  const { loc } = await searchParams;
  if (!MONTH_RE.test(month)) notFound();

  const monthDate = `${month}-01`;
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("clients")
    .select("id, name, slug")
    .eq("slug", slug)
    .single();

  if (!client) notFound();

  let locationId: string | null = null;
  if (loc) {
    const { data: location } = await supabase
      .from("locations")
      .select("id")
      .eq("client_id", client.id)
      .eq("slug", loc)
      .single();
    if (!location) notFound();
    locationId = location.id;
  }

  let reportQuery = supabase
    .from("client_reports")
    .select("client_content_json, grader_data, status, report_month, locations ( is_primary )")
    .eq("client_id", client.id)
    .eq("report_month", monthDate)
    .eq("status", "published");

  if (locationId) {
    reportQuery = reportQuery.eq("location_id", locationId);
  }

  const { data: matches } = await reportQuery;
  const matchList = (matches ?? []) as Array<{
    client_content_json: unknown;
    grader_data: unknown;
    status: string;
    report_month: string;
    locations: { is_primary: boolean } | null;
  }>;
  const report =
    matchList.find((m) => m.locations?.is_primary === true) ?? matchList[0];
  if (!report) notFound();

  const json = report.client_content_json as ClientReport | null;
  if (!json || !isClientReport(json)) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-10 text-center">
          <p className="text-sm text-[var(--color-warm-gray)]">
            This report's content is being finalized. Please check back soon.
          </p>
          <Link href={`/portal/clients/${slug}`} className="mt-4 inline-block text-xs underline">
            Back to {client.name}
          </Link>
        </div>
      </div>
    );
  }

  const backLink = (
    <Link
      href={`/portal/clients/${slug}`}
      className="report-back-link"
    >
      ← All months for {client.name}
    </Link>
  );

  return (
    <div className="report-portal-embed">
      <ReportRendererBody report={json} leftSlot={backLink} />
    </div>
  );
}
