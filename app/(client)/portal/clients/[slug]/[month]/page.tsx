import { createClient } from "@/app/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ReportRendererBody } from "@/components/report/report-renderer";
import { isClientReport, type ClientReport } from "@/lib/report-schema";

const MONTH_RE = /^\d{4}-\d{2}$/;

export default async function PortalReportPage({
  params,
}: {
  params: Promise<{ slug: string; month: string }>;
}) {
  const { slug, month } = await params;
  if (!MONTH_RE.test(month)) notFound();

  const monthDate = `${month}-01`;
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("clients")
    .select("id, name, slug")
    .eq("slug", slug)
    .single();

  if (!client) notFound();

  const { data: report } = await supabase
    .from("client_reports")
    .select("client_content_json, grader_data, status, report_month")
    .eq("client_id", client.id)
    .eq("report_month", monthDate)
    .eq("status", "published")
    .single();

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

  return (
    <div className="report-portal-embed">
      <div className="mx-auto max-w-[1080px] px-4 pt-6 lg:px-8 lg:pt-8">
        <Link href={`/portal/clients/${slug}`} className="text-xs text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]">
          ← All months for {client.name}
        </Link>
      </div>
      <ReportRendererBody report={json} />
    </div>
  );
}
