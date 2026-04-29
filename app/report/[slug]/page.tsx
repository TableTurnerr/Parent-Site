import { createClient } from "@/app/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

type GraderData = {
  overallScore?: number;
  categories?: Record<string, { score?: number; issues?: string[] }>;
  topRecommendations?: string[];
  gradedAt?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("client_reports")
    .select("client_name")
    .eq("client_slug", slug)
    .eq("status", "published")
    .single();

  if (!data) return { title: "Report | TableTurnerr" };

  return {
    title: `${data.client_name} — SEO Report | TableTurnerr`,
    robots: { index: false, follow: false },
  };
}

export default async function PublicReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: report } = await supabase
    .from("client_reports")
    .select("client_name, client_url, report_content_html, grader_data, published_at, created_at")
    .eq("client_slug", slug)
    .eq("status", "published")
    .single();

  if (!report) notFound();

  const grader = report.grader_data as GraderData | null;
  const reportDate = report.published_at ?? report.created_at;
  const score = grader?.overallScore ?? null;

  const scoreColor =
    score === null
      ? "#888"
      : score >= 70
      ? "#16a34a"
      : score >= 40
      ? "#d97706"
      : "#dc2626";

  const categoryLabels: Record<string, string> = {
    seo: "SEO",
    mobile: "Mobile",
    social: "Social Media",
    local: "Local SEO",
    reviews: "Reviews",
    performance: "Performance",
    content: "Content",
  };

  return (
    <div className="min-h-screen bg-[#f9f7f4]">
      {/* Branded header */}
      <header className="bg-[#1a1a1a] text-white">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link
                href="https://tableturnerr.com"
                target="_blank"
                className="text-sm font-semibold tracking-widest text-white/60 uppercase hover:text-white/80 transition-colors"
              >
                TableTurnerr
              </Link>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                {report.client_name}
              </h1>
              <p className="mt-1 text-sm text-white/60">
                Digital Presence Report &middot;{" "}
                {new Date(reportDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            {score !== null && (
              <div className="flex shrink-0 flex-col items-center rounded-xl bg-white/10 px-6 py-4 text-center">
                <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                  Website Grade
                </span>
                <span
                  className="mt-1 text-4xl font-bold tabular-nums"
                  style={{ color: scoreColor }}
                >
                  {score}
                </span>
                <span className="text-xs text-white/50">out of 100</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Grader category scores */}
      {grader?.categories && Object.keys(grader.categories).length > 0 && (
        <div className="border-b border-[#e5e1da] bg-white">
          <div className="mx-auto max-w-4xl px-6 py-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#888]">
              Score Breakdown &mdash; Powered by Owner.com Grader
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {Object.entries(grader.categories).map(([key, cat]) => {
                const catScore = cat.score ?? null;
                const catColor =
                  catScore === null
                    ? "#ccc"
                    : catScore >= 70
                    ? "#16a34a"
                    : catScore >= 40
                    ? "#d97706"
                    : "#dc2626";
                return (
                  <div
                    key={key}
                    className="flex flex-col items-center rounded-lg border border-[#e5e1da] bg-[#f9f7f4] px-3 py-4 text-center"
                  >
                    <span className="text-xs font-medium text-[#888]">
                      {categoryLabels[key] ?? key}
                    </span>
                    <span
                      className="mt-1 text-2xl font-bold tabular-nums"
                      style={{ color: catColor }}
                    >
                      {catScore ?? "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Report content */}
      <main className="mx-auto max-w-4xl px-6 py-10">
        <article
          className="prose prose-neutral max-w-none
            prose-headings:font-bold prose-headings:text-[#1a1a1a]
            prose-h1:text-2xl prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-base prose-h3:mt-6
            prose-p:text-[#444] prose-p:leading-relaxed
            prose-a:text-[#1a1a1a] prose-a:underline
            prose-strong:text-[#1a1a1a]
            prose-table:text-sm
            prose-th:bg-[#f0ede8] prose-th:font-semibold prose-th:text-[#1a1a1a]
            prose-td:text-[#444]
            prose-li:text-[#444]"
          dangerouslySetInnerHTML={{ __html: report.report_content_html ?? "" }}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e5e1da] bg-[#1a1a1a] text-white">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">TableTurnerr</p>
              <p className="mt-0.5 text-sm text-white/60">
                Digital marketing for local restaurants
              </p>
            </div>
            <div className="flex flex-col gap-1 text-sm text-white/60 sm:text-right">
              <a
                href="https://tableturnerr.com"
                target="_blank"
                className="hover:text-white transition-colors"
              >
                tableturnerr.com
              </a>
              <a
                href="tel:+18085599006"
                className="hover:text-white transition-colors"
              >
                +1 (808) 559-9006
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
