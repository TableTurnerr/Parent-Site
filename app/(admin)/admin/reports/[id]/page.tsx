"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  Check,
  Globe,
  ChevronDown,
} from "lucide-react";
import { createClient } from "@/app/lib/supabase/client";

type GraderData = {
  overallScore?: number;
  gradedAt?: string;
  categories?: Record<string, { score?: number; issues?: string[] }>;
  topRecommendations?: string[];
};

type Report = {
  id: string;
  client_name: string;
  client_slug: string;
  client_url: string;
  report_content_html: string | null;
  grader_data: GraderData | null;
  status: "draft" | "published" | "archived";
  created_at: string;
  published_at: string | null;
};

const categoryLabels: Record<string, string> = {
  seo: "SEO",
  mobile: "Mobile",
  social: "Social",
  local: "Local SEO",
  reviews: "Reviews",
  performance: "Performance",
  content: "Content",
};

const statusColors: Record<string, string> = {
  draft: "bg-amber-100 text-amber-700",
  published: "bg-green-100 text-green-700",
  archived: "bg-gray-100 text-gray-600",
};

const STATUSES: Array<"draft" | "published" | "archived"> = ["draft", "published", "archived"];

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const fetchReport = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("client_reports")
      .select("id, client_name, client_slug, client_url, report_content_html, grader_data, status, created_at, published_at")
      .eq("id", id)
      .single();

    if (!data) {
      router.push("/admin/reports");
      return;
    }
    setReport(data as Report);
    setLoading(false);
  }, [id, router]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const updateStatus = async (newStatus: "draft" | "published" | "archived") => {
    if (!report || updating) return;
    setUpdating(true);
    setStatusOpen(false);

    const res = await fetch(`/api/reports/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      const updated = await res.json();
      setReport((prev) => prev ? { ...prev, status: updated.status, published_at: updated.published_at } : prev);
    }
    setUpdating(false);
  };

  const copyLink = async () => {
    if (!report) return;
    const url = `https://tableturnerr.com/report/${report.client_slug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--color-charcoal)] border-t-transparent" />
      </div>
    );
  }

  if (!report) return null;

  const grader = report.grader_data;
  const score = grader?.overallScore ?? null;
  const scoreColor =
    score === null ? "text-[var(--color-warm-gray)]" :
    score >= 70 ? "text-green-600" :
    score >= 40 ? "text-amber-600" : "text-red-600";

  const shareUrl = `https://tableturnerr.com/report/${report.client_slug}`;
  const reportDate = report.published_at ?? report.created_at;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Link
            href="/admin/reports"
            className="mt-0.5 rounded-lg p-1.5 text-[var(--color-warm-gray)] transition-colors hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-charcoal)]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[var(--color-charcoal)] sm:text-2xl">
              {report.client_name}
            </h1>
            <a
              href={`https://${report.client_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-0.5 text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
            >
              <Globe className="h-3.5 w-3.5" />
              {report.client_url}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {/* Status dropdown */}
          <div className="relative">
            <button
              onClick={() => setStatusOpen((o) => !o)}
              disabled={updating}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium capitalize transition-opacity ${
                statusColors[report.status]
              } ${updating ? "opacity-50" : ""}`}
            >
              {updating ? "Updating..." : report.status}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {statusOpen && (
              <div className="absolute right-0 top-full z-20 mt-1 min-w-[130px] rounded-lg border border-[var(--color-border)] bg-white py-1 shadow-lg">
                {STATUSES.filter((s) => s !== report.status).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(s)}
                    className="flex w-full items-center px-3 py-2 text-sm capitalize text-[var(--color-charcoal)] hover:bg-[var(--color-cream)]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Copy share link */}
          {report.status === "published" && (
            <button
              onClick={copyLink}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-charcoal)] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-charcoal-light)]"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy link
                </>
              )}
            </button>
          )}

          {report.status === "published" && (
            <a
              href={`/report/${report.client_slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--color-charcoal)] transition-colors hover:bg-[var(--color-cream)]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Preview
            </a>
          )}
        </div>
      </div>

      {/* Share link banner (when published) */}
      {report.status === "published" && (
        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <Check className="h-4 w-4 shrink-0 text-green-600" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-green-800">Report is live</p>
            <p className="mt-0.5 truncate text-xs text-green-700">{shareUrl}</p>
          </div>
          <button
            onClick={copyLink}
            className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-100"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}

      {/* Grader score summary */}
      {grader && (
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[var(--color-charcoal)]">
                Owner.com Website Grade
              </h2>
              {grader.gradedAt && (
                <p className="mt-0.5 text-xs text-[var(--color-warm-gray)]">
                  Graded{" "}
                  {new Date(grader.gradedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
            {score !== null && (
              <div className="text-center">
                <span className={`text-4xl font-bold tabular-nums ${scoreColor}`}>
                  {score}
                </span>
                <span className="text-sm text-[var(--color-warm-gray)]">/100</span>
              </div>
            )}
          </div>

          {grader.categories && Object.keys(grader.categories).length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {Object.entries(grader.categories).map(([key, cat]) => {
                const catScore = cat.score ?? null;
                const catColor =
                  catScore === null ? "text-[var(--color-warm-gray)]" :
                  catScore >= 70 ? "text-green-600" :
                  catScore >= 40 ? "text-amber-600" : "text-red-600";
                return (
                  <div
                    key={key}
                    className="flex flex-col items-center rounded-lg bg-[var(--color-cream)] px-3 py-4 text-center"
                  >
                    <span className="text-xs font-medium text-[var(--color-warm-gray)]">
                      {categoryLabels[key] ?? key}
                    </span>
                    <span className={`mt-1 text-xl font-bold tabular-nums ${catColor}`}>
                      {catScore ?? "—"}
                    </span>
                    {cat.issues && cat.issues.length > 0 && (
                      <ul className="mt-2 space-y-0.5 text-left w-full">
                        {cat.issues.slice(0, 2).map((issue, i) => (
                          <li key={i} className="text-xs text-[var(--color-warm-gray)] line-clamp-1">
                            · {issue}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Report metadata */}
      <div className="flex flex-wrap gap-4 text-sm text-[var(--color-warm-gray)]">
        <span>
          Created:{" "}
          {new Date(report.created_at).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        {report.published_at && (
          <span>
            Published:{" "}
            {new Date(report.published_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        )}
      </div>

      {/* Full report preview */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white">
        <div className="border-b border-[var(--color-border)] px-6 py-4">
          <h2 className="text-sm font-semibold text-[var(--color-charcoal)]">
            Report Preview
          </h2>
        </div>
        <div className="px-6 py-8 overflow-x-auto">
          <article
            className="prose prose-neutral max-w-none
              prose-headings:font-bold prose-headings:text-[var(--color-charcoal)]
              prose-h1:text-xl prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-3
              prose-h3:text-base prose-h3:mt-5
              prose-p:text-[var(--color-warm-gray)] prose-p:leading-relaxed
              prose-table:text-sm
              prose-th:bg-[var(--color-cream-dark)] prose-th:font-semibold
              prose-li:text-[var(--color-warm-gray)]"
            dangerouslySetInnerHTML={{ __html: report.report_content_html ?? "" }}
          />
        </div>
      </div>
    </div>
  );
}
