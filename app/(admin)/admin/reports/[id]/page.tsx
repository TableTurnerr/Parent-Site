"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  Check,
  Globe,
  ChevronDown,
  Eye,
  EyeOff,
  Sparkles,
  ChevronUp,
  Lock,
  RefreshCw,
  AlertTriangle,
  Users,
} from "lucide-react";
import { createClient } from "@/app/lib/supabase/client";
import { isClientReport, type ClientReport } from "@/lib/report-schema";
import { ReportEditor } from "@/app/components/admin/ReportEditor";
import ReportDetailSkeleton from "@/app/components/admin/ReportDetailSkeleton";

type GraderData = {
  overallScore?: number;
  gradedAt?: string;
  categories?: Record<string, { score?: number; issues?: string[] }>;
  topRecommendations?: string[];
};

type ReportStatus = "draft" | "published" | "archived";
type ReportVisibility = "public" | "unlisted" | "private" | "client_only";

type Report = {
  id: string;
  client_name: string;
  client_slug: string;
  client_url: string;
  client_content_md: string | null;
  client_content_html: string | null;
  client_content_json: ClientReport | null;
  internal_content_md: string | null;
  internal_content_html: string | null;
  internal_content_json: ClientReport | null;
  grader_data: GraderData | null;
  status: ReportStatus;
  visibility: ReportVisibility;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

type Variant = "client" | "internal";

const categoryLabels: Record<string, string> = {
  seo: "SEO",
  mobile: "Mobile",
  social: "Social",
  local: "Local SEO",
  reviews: "Reviews",
  performance: "Performance",
  content: "Content",
};

const statusColors: Record<ReportStatus, string> = {
  draft: "bg-amber-100 text-amber-700",
  published: "bg-green-100 text-green-700",
  archived: "bg-gray-100 text-gray-600",
};

const visibilityColors: Record<ReportVisibility, string> = {
  public: "bg-blue-100 text-blue-700",
  unlisted: "bg-slate-100 text-slate-700",
  private: "bg-rose-100 text-rose-700",
  client_only: "bg-violet-100 text-violet-700",
};

const visibilityLabels: Record<ReportVisibility, string> = {
  public: "public",
  unlisted: "unlisted",
  private: "private",
  client_only: "client only",
};

const visibilityDescriptions: Record<ReportVisibility, string> = {
  public: "Anyone with the link can view, and it's discoverable internally",
  unlisted: "Anyone with the direct link can view, but it isn't surfaced anywhere",
  private: "Hidden from the public — only team members can view it via /admin",
  client_only: "Only team members and clients with email-granted portal access can view",
};

const STATUSES: ReportStatus[] = ["draft", "published", "archived"];
const VISIBILITIES: ReportVisibility[] = ["public", "unlisted", "private", "client_only"];

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liveBannerVisible, setLiveBannerVisible] = useState(false);
  const liveBannerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flashLiveBanner = useCallback(() => {
    if (liveBannerTimeoutRef.current) clearTimeout(liveBannerTimeoutRef.current);
    setLiveBannerVisible(true);
    liveBannerTimeoutRef.current = setTimeout(() => {
      setLiveBannerVisible(false);
      liveBannerTimeoutRef.current = null;
    }, 5000);
  }, []);

  useEffect(() => {
    return () => {
      if (liveBannerTimeoutRef.current) clearTimeout(liveBannerTimeoutRef.current);
    };
  }, []);
  const [statusOpen, setStatusOpen] = useState(false);
  const [visOpen, setVisOpen] = useState(false);

  const [variant, setVariant] = useState<Variant>("client");

  // ── Talk to AI ──
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInstruction, setAiInstruction] = useState("");
  const [aiCopied, setAiCopied] = useState(false);

  const fetchReport = useCallback(async () => {
    setRefreshing(true);
    const startedAt = Date.now();
    const { data } = await supabase
      .from("client_reports")
      .select(
        "id, client_name, client_slug, client_url, client_content_md, client_content_html, client_content_json, internal_content_md, internal_content_html, internal_content_json, grader_data, status, visibility, created_at, updated_at, published_at"
      )
      .eq("id", id)
      .single();

    if (!data) {
      router.push("/admin/reports");
      return;
    }
    setReport(data as unknown as Report);
    setLoading(false);
    const elapsed = Date.now() - startedAt;
    const minSpin = 500;
    if (elapsed < minSpin) {
      await new Promise((r) => setTimeout(r, minSpin - elapsed));
    }
    setRefreshing(false);
  }, [id, router, supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchReport();
  }, [fetchReport]);

  async function patch(body: Record<string, unknown>) {
    setSaving(true);
    const res = await fetch(`/api/reports/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.error ?? "Save failed");
      return null;
    }
    return res.json();
  }

  async function updateStatus(s: ReportStatus) {
    setStatusOpen(false);
    const result = await patch({ status: s });
    if (!result) return;
    setReport((prev) =>
      prev ? { ...prev, status: result.status, published_at: result.published_at } : prev
    );
    if (result.status === "published") flashLiveBanner();
  }

  async function updateVisibility(v: ReportVisibility) {
    setVisOpen(false);
    const result = await patch({ visibility: v });
    if (!result) return;
    setReport((prev) => (prev ? { ...prev, visibility: result.visibility } : prev));
    flashLiveBanner();
  }

  async function copyShare() {
    if (!report) return;
    const url = `https://tableturnerr.com/report/${report.client_slug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function buildAiCommand(): string {
    if (!report) return "";
    const target = variant === "client" ? "client" : "internal";
    return [
      `/edit-client-report ${report.client_slug}`,
      ``,
      `Variant: ${target}`,
      `Instruction: ${aiInstruction.trim() || "(describe the change you want)"}`,
    ].join("\n");
  }

  async function copyAiCommand() {
    await navigator.clipboard.writeText(buildAiCommand());
    setAiCopied(true);
    setTimeout(() => setAiCopied(false), 2000);
  }

  if (loading) {
    return <ReportDetailSkeleton />;
  }

  if (!report) return null;

  const grader = report.grader_data;
  const currentJson =
    variant === "client" ? report.client_content_json : report.internal_content_json;
  const hasJson = !!currentJson && isClientReport(currentJson);

  // ── Score: prefer grader_data, fall back to hero.graderScore ──
  const heroScore = hasJson ? currentJson?.hero.graderScore : undefined;
  const score = grader?.overallScore ?? heroScore ?? null;
  const scoreColor =
    score === null
      ? "text-[var(--color-warm-gray)]"
      : score >= 70
      ? "text-green-600"
      : score >= 40
      ? "text-amber-600"
      : "text-red-600";

  // ── Categories: prefer report JSON ratings (matches what's published), fall back to grader_data ──
  const categoriesFromRatings =
    hasJson && currentJson?.ratings.length
      ? currentJson.ratings.map((r) => ({ key: r.key, label: r.label, score: r.score }))
      : null;
  const categoriesFromGrader = grader?.categories
    ? Object.entries(grader.categories).map(([key, c]) => ({
        key,
        label: categoryLabels[key] ?? key,
        score: c.score ?? null,
      }))
    : null;
  const categories = categoriesFromRatings ?? categoriesFromGrader;

  const shareUrl = `https://tableturnerr.com/report/${report.client_slug}`;

  const talkToAi = (
    <div className="rounded-xl border border-[var(--color-border)] bg-white">
      <button
        onClick={() => setAiOpen((o) => !o)}
        className="flex w-full items-center justify-between p-4 transition-colors hover:bg-[var(--color-cream)]"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--color-warm-gray)]" />
          <span className="text-sm font-medium text-[var(--color-charcoal)]">
            Talk to AI
          </span>
          <span className="text-xs text-[var(--color-warm-gray-light)]">
            — edit this {variant} report through Claude Code
          </span>
        </div>
        {aiOpen ? (
          <ChevronUp className="h-4 w-4 text-[var(--color-warm-gray)]" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[var(--color-warm-gray)]" />
        )}
      </button>

      {aiOpen && (
        <div className="space-y-4 border-t border-[var(--color-border)] p-4">
          <p className="text-xs text-[var(--color-warm-gray)]">
            Describe the change you want, copy the generated command, and paste it into a Claude Code session
            opened in this repo. The <code className="rounded bg-[var(--color-cream-dark)] px-1 font-mono">edit-client-report</code> skill
            will fetch this report, apply your edits, and push the updated version back. Refresh this page when it&apos;s done.
          </p>

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-[var(--color-charcoal)]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[10px] font-bold text-white">1</span>
              Your instruction
            </label>
            <textarea
              value={aiInstruction}
              onChange={(e) => setAiInstruction(e.target.value)}
              placeholder="e.g. Tighten the executive summary, drop the speculative revenue figures, and add a section on TikTok strategy."
              rows={3}
              className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:border-[var(--color-charcoal)] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-[var(--color-charcoal)]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-[10px] font-bold text-white">2</span>
              Copy & paste this into Claude Code
            </label>
            <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-[var(--color-cream)] p-3 font-mono text-xs text-[var(--color-charcoal)]">
{buildAiCommand()}
            </pre>
            <button
              onClick={copyAiCommand}
              disabled={!aiInstruction.trim()}
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-[var(--color-charcoal)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-charcoal-light)] disabled:opacity-30"
            >
              {aiCopied ? (
                <><Check className="h-3.5 w-3.5" />Copied!</>
              ) : (
                <><Copy className="h-3.5 w-3.5" />Copy command</>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );

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
              className="mt-0.5 inline-flex items-center gap-1 text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
            >
              <Globe className="h-3.5 w-3.5" />
              {report.client_url}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {/* Status */}
          <div className="relative">
            <button
              onClick={() => { setStatusOpen((o) => !o); setVisOpen(false); }}
              disabled={saving}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium capitalize transition-opacity ${
                statusColors[report.status]
              } ${saving ? "opacity-50" : ""}`}
            >
              {report.status}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {statusOpen && (
              <div className="absolute right-0 top-full z-20 mt-1 min-w-[140px] rounded-lg border border-[var(--color-border)] bg-white py-1 shadow-lg">
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

          {/* Visibility */}
          <div className="relative">
            <button
              onClick={() => { setVisOpen((o) => !o); setStatusOpen(false); }}
              disabled={saving}
              title={`Visibility (client report): ${visibilityDescriptions[report.visibility]}`}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium capitalize transition-opacity ${
                visibilityColors[report.visibility]
              } ${saving ? "opacity-50" : ""}`}
            >
              {report.visibility === "private" ? (
                <Lock className="h-3.5 w-3.5" />
              ) : report.visibility === "client_only" ? (
                <Users className="h-3.5 w-3.5" />
              ) : report.visibility === "unlisted" ? (
                <EyeOff className="h-3.5 w-3.5" />
              ) : (
                <Eye className="h-3.5 w-3.5" />
              )}
              {visibilityLabels[report.visibility]}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {visOpen && (
              <div className="absolute right-0 top-full z-20 mt-1 w-72 rounded-lg border border-[var(--color-border)] bg-white py-1 shadow-lg">
                {VISIBILITIES.map((v) => (
                  <button
                    key={v}
                    onClick={() => updateVisibility(v)}
                    disabled={v === report.visibility}
                    className="flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left text-sm capitalize text-[var(--color-charcoal)] hover:bg-[var(--color-cream)] disabled:cursor-default disabled:opacity-50"
                  >
                    <span className="font-medium">
                      {visibilityLabels[v]} {v === report.visibility && "(current)"}
                    </span>
                    <span className="text-xs font-normal normal-case text-[var(--color-warm-gray)]">
                      {visibilityDescriptions[v]}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {report.status === "published" && (
            <>
              <button
                onClick={copyShare}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-charcoal)] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-charcoal-light)]"
              >
                {copied ? (
                  <><Check className="h-3.5 w-3.5" />Copied!</>
                ) : (
                  <><Copy className="h-3.5 w-3.5" />Copy link</>
                )}
              </button>
              <a
                href={`/report/${report.client_slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--color-charcoal)] transition-colors hover:bg-[var(--color-cream)]"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Preview
              </a>
            </>
          )}

          <button
            onClick={() => fetchReport()}
            disabled={saving || refreshing}
            title="Refresh from database"
            className="rounded-full border border-[var(--color-border)] bg-white p-2 text-[var(--color-warm-gray)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-charcoal)] disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-3.5 w-3.5 transition-transform ${saving || refreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Live banner — flashes briefly after a status/visibility change or save */}
      {report.status === "published" && liveBannerVisible && (
        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <Check className="h-4 w-4 shrink-0 text-green-600" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-green-800">
              Client report is live{report.visibility === "unlisted" && " (unlisted — link only)"}{report.visibility === "private" && " (private — admin only)"}{report.visibility === "client_only" && " (client only — portal access required)"}
            </p>
            <p className="mt-0.5 truncate text-xs text-green-700">{shareUrl}</p>
          </div>
          <button
            onClick={copyShare}
            className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-100"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}

      {/* Score summary (header card) */}
      {(score !== null || categories) && (
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[var(--color-charcoal)]">
                {grader ? "Score Breakdown" : "Report scorecard"}
              </h2>
              {grader?.gradedAt && (
                <p className="mt-0.5 text-xs text-[var(--color-warm-gray)]">
                  Graded{" "}
                  {new Date(grader.gradedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              )}
              {!grader && hasJson && (
                <p className="mt-0.5 text-xs text-[var(--color-warm-gray-light)]">
                  Pulled from <code className="font-mono">hero.graderScore</code> + <code className="font-mono">ratings[]</code>
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

          {categories && categories.length > 0 && (
            <div className="mt-4 flex flex-nowrap gap-3 overflow-x-auto">
              {categories.map((cat) => {
                const catColor =
                  cat.score === null
                    ? "text-[var(--color-warm-gray)]"
                    : cat.score >= 70
                    ? "text-green-600"
                    : cat.score >= 40
                    ? "text-amber-600"
                    : "text-red-600";
                return (
                  <div
                    key={cat.key}
                    className="flex min-w-0 flex-1 flex-col items-center rounded-lg bg-[var(--color-cream)] px-3 py-4 text-center"
                  >
                    <span className="text-xs font-medium text-[var(--color-warm-gray)]">
                      {cat.label}
                    </span>
                    <span className={`mt-1 text-xl font-bold tabular-nums ${catColor}`}>
                      {cat.score ?? "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Variant tabs */}
      <div className="flex items-center gap-1 rounded-lg bg-[var(--color-cream-dark)] p-1 w-fit">
        {(["client", "internal"] as Variant[]).map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              variant === v
                ? "bg-white text-[var(--color-charcoal)] shadow-sm"
                : "text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
            }`}
          >
            {v} report
            {v === "internal" && (
              <span className="ml-1.5 inline-flex items-center gap-0.5 text-[10px] font-normal text-[var(--color-warm-gray-light)]">
                <Lock className="h-2.5 w-2.5" />
                team only
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Editor */}
      {hasJson && currentJson ? (
        <ReportEditor
          key={`${id}-${variant}`}
          reportId={id}
          variant={variant}
          initial={currentJson}
          slugLocked={true}
          onSaved={() => { fetchReport(); flashLiveBanner(); }}
          bottomSlot={talkToAi}
        />
      ) : (
        <>
          <LegacyOrEmptyState
            variant={variant}
            report={report}
          />
          {talkToAi}
        </>
      )}

      {/* Metadata */}
      <div className="flex flex-wrap gap-4 text-xs text-[var(--color-warm-gray)]">
        <span>
          Created:{" "}
          {new Date(report.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </span>
        <span>
          Updated:{" "}
          {new Date(report.updated_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </span>
        {report.published_at && (
          <span>
            Published:{" "}
            {new Date(report.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </span>
        )}
      </div>
    </div>
  );
}

function LegacyOrEmptyState({
  variant,
  report,
}: {
  variant: Variant;
  report: Report;
}) {
  const md = variant === "client" ? report.client_content_md : report.internal_content_md;
  const html = variant === "client" ? report.client_content_html : report.internal_content_html;

  if (md && html) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50">
        <div className="flex items-start gap-2 border-b border-amber-200 px-4 py-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <div className="text-sm text-amber-800">
            <strong>Legacy markdown report.</strong> This report has not been migrated to the
            JSON-first format used by the live <code className="rounded bg-white px-1 font-mono text-xs">/report/{report.client_slug}</code> page.
            Re-run <code className="rounded bg-white px-1 font-mono text-xs">/generate-client-report</code> in Claude Code to convert it.
          </div>
        </div>
        <div className="overflow-x-auto p-6">
          <article
            className="prose prose-neutral max-w-none prose-headings:text-[var(--color-charcoal)] prose-p:text-[var(--color-warm-gray)]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white px-6 py-12 text-center text-sm text-[var(--color-warm-gray)]">
      No {variant} report yet. Generate one with{" "}
      <code className="rounded bg-[var(--color-cream-dark)] px-1 py-0.5 font-mono text-xs">
        /generate-client-report
      </code>{" "}
      in Claude Code, or use Talk to AI below.
    </div>
  );
}
