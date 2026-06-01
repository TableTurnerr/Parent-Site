// Client report JSON schema (v1).
// One source of truth for what /generate-client-report and /edit-client-report emit,
// what push-report.js stores in client_reports.client_content_json, and what
// app/report/[slug] renders.

export type ReportSchemaVersion = 1;

export type LetterGrade =
  | "A+" | "A" | "A-"
  | "B+" | "B" | "B-"
  | "C+" | "C" | "C-"
  | "D+" | "D" | "D-"
  | "F";

export type GradeTone = "excellent" | "good" | "ok" | "weak" | "poor";

export type InlineText = string; // markdown subset: **bold**, *italic*, [text](url), `code`

export interface ReportLocation {
  id?: string;               // Supabase locations.id — present after first push
  name: string;              // "Downtown", "Westside", etc.
  slug?: string;             // url-safe variant of name; auto-derived if omitted
  address?: string;          // optional street address
  siblings?: string[];       // names of other locations under the same brand
  totalLocations?: number;   // total count across the brand
  graderRunFor?: string[];   // location names that received a fresh grader run this cycle
  skippedLocations?: string[]; // location names not graded this cycle (capacity limit)
}

export interface ReportCompany {
  id?: string;               // Supabase clients.id — present after first push
  name: string;              // brand-level name (e.g. "Taco Delphia")
  slug: string;              // brand-level slug (e.g. "taco-delphia")
}

export interface ReportClient {
  id?: string;               // mirror of company.id — convenience accessor
  name: string;              // display name; multi-location uses "<Brand> — <Location>"
  slug: string;              // per-report slug used in /report/<slug>/<month>
  url: string;
  preparedBy?: string;
  preparedDate: string;      // ISO date or human-readable
  company?: ReportCompany;   // canonical company info; populated after first push
  location?: ReportLocation; // present whenever the report belongs to a named location
}

export interface ReportHero {
  title: string;
  subtitle?: string;
  narrative: InlineText[]; // paragraphs
  overallGrade: LetterGrade;
  graderScore?: number; // 0..100 (Owner.com grader)
  monthlyRevenueLoss?: number; // USD
  verdict: InlineText; // one-line summary
}

export interface ScorecardItem {
  area: string;
  grade: LetterGrade;
  summary: InlineText;
}

export interface RatingCategory {
  key: string;             // "seo", "mobile", "social", etc.
  label: string;           // "SEO", "Mobile", etc.
  score: number;           // 0..100
}

// ─── Section variants ──────────────────────────────────────────────────────

export interface NarrativeSection {
  type: "narrative";
  id: string;
  title: string;
  body: InlineText[];           // paragraphs
  callout?: InlineText;          // optional pull-quote box at the end
}

export interface ScorecardSection {
  type: "scorecard";
  id: string;
  title: string;
  intro?: InlineText;
  items: ScorecardItem[];
  footnote?: InlineText;
}

export interface TableSection {
  type: "table";
  id: string;
  title: string;
  intro?: InlineText;
  headers: string[];
  rows: InlineText[][];
  emphasizeFirstColumn?: boolean;
  callout?: InlineText;
}

export interface ReviewsSection {
  type: "reviews";
  id: string;
  title: string;
  intro?: InlineText;
  platforms: { platform: string; rating?: string; reviews?: string }[];
  loved?: InlineText[];
  complaints?: InlineText[];
  recommendation?: InlineText;
}

export interface ProblemListSection {
  type: "problems";
  id: string;
  title: string;
  intro?: InlineText;
  items: {
    number?: number;
    title: string;
    body: InlineText[];           // paragraphs
    bullets?: InlineText[];       // optional bulleted list inside the card
  }[];
}

export interface CompetitionSection {
  type: "competition";
  id: string;
  title: string;
  intro?: InlineText;
  competitors: {
    name: string;
    style?: string;
    rating?: string;
    knownFor?: InlineText;
    rank?: string; // "#1", "#8", etc.
    isYou?: boolean;
  }[];
  searchPosition?: { search: string; map: string; organic: string }[];
  rivalCallouts?: { title: string; body: InlineText[] }[];
  winLose?: { area: string; winning?: InlineText; losing?: InlineText }[];
  opportunity?: {
    intro?: InlineText;
    rows: { opportunity: string; competition: InlineText; canOwn: InlineText }[];
    bottomLine?: InlineText;
  };
}

export interface KeywordGroup {
  id: string;
  label: string;             // "Money Keywords", "Secret Weapons", etc.
  summary: InlineText;       // shown when collapsed — the "overview"
  highlight?: string;        // small badge on the trigger ("7,500–12,000/mo")
  intro?: InlineText;        // shown above the table when expanded
  table: {
    headers: string[];
    rows: InlineText[][];
  };
  takeaway?: InlineText;     // shown below the table when expanded
}

export interface KeywordResearchSection {
  type: "keywords";
  id: string;
  title: string;
  intro?: InlineText;
  groups: KeywordGroup[];
  totals?: {
    headers: string[];
    rows: InlineText[][];
    summary?: InlineText;
  };
}

export interface ActionPlanItem {
  priority: number;
  category: "Quick win" | "Build" | "Ongoing" | string;
  action: InlineText;
  impact: InlineText;
  timeline: string;
}

export interface ActionPlanSection {
  type: "actionPlan";
  id: string;
  title: string;
  intro?: InlineText;
  items: ActionPlanItem[];
}

export interface SuccessMetricsSection {
  type: "successMetrics";
  id: string;
  title: string;
  intro?: InlineText;
  items: { metric: string; now: string; target: string }[];
  callout?: InlineText;
}

export interface CtaSection {
  type: "cta";
  id: string;
  title: string;
  body: InlineText[];
  primary?: { label: string; href?: string };
  secondary?: { label: string; href?: string };
}

export interface ProgressionStep {
  label: string;
  info: InlineText;        // 1-liner shown in the tooltip
  recommended?: boolean;   // marks the "*recommended" step
}

export interface ProgressionBarSection {
  type: "progressionBar";
  id: string;
  title?: string;
  intro?: InlineText;
  steps: ProgressionStep[];
}

export interface GroupSection {
  type: "group";
  id: string;
  title: string;
  intro?: InlineText;
  sections: ChildSection[];
}

export type ChildSection =
  | NarrativeSection
  | ScorecardSection
  | TableSection
  | ReviewsSection
  | ProblemListSection
  | CompetitionSection
  | KeywordResearchSection
  | ActionPlanSection
  | SuccessMetricsSection
  | ProgressionBarSection;

export type ReportSection =
  | NarrativeSection
  | ScorecardSection
  | TableSection
  | ReviewsSection
  | ProblemListSection
  | CompetitionSection
  | KeywordResearchSection
  | ActionPlanSection
  | SuccessMetricsSection
  | ProgressionBarSection
  | GroupSection
  | CtaSection;

export interface ReportMeta {
  reportId?: string;       // client_reports.id — set after first push
  companyId?: string;      // clients.id
  companyName?: string;
  companySlug?: string;
  locationId?: string;     // locations.id
  locationName?: string;
  locationSlug?: string;
  reportMonth?: string;    // "YYYY-MM"
}

export interface ClientReport {
  version: ReportSchemaVersion;
  meta?: ReportMeta;             // canonical IDs + lookup keys; populated post-push
  client: ReportClient;
  hero: ReportHero;
  ratings: RatingCategory[];     // sidebar score breakdown
  sections: ReportSection[];
}

// ─── Helpers ───────────────────────────────────────────────────────────────

export function gradeTone(grade: LetterGrade): GradeTone {
  const letter = grade.charAt(0).toUpperCase();
  switch (letter) {
    case "A": return "excellent";
    case "B": return "good";
    case "C": return "ok";
    case "D": return "weak";
    default:  return "poor";
  }
}

export function scoreTone(score: number): GradeTone {
  if (score >= 85) return "excellent";
  if (score >= 70) return "good";
  if (score >= 50) return "ok";
  if (score >= 30) return "weak";
  return "poor";
}

export const toneClasses: Record<GradeTone, { bg: string; text: string; ring: string; bar: string }> = {
  excellent: { bg: "bg-emerald-50",  text: "text-emerald-700",  ring: "ring-emerald-200",  bar: "bg-emerald-500" },
  good:      { bg: "bg-lime-50",     text: "text-lime-700",     ring: "ring-lime-200",     bar: "bg-lime-500" },
  ok:        { bg: "bg-amber-50",    text: "text-amber-700",    ring: "ring-amber-200",    bar: "bg-amber-500" },
  weak:      { bg: "bg-orange-50",   text: "text-orange-700",   ring: "ring-orange-200",   bar: "bg-orange-500" },
  poor:      { bg: "bg-rose-50",     text: "text-rose-700",     ring: "ring-rose-200",     bar: "bg-rose-500" },
};

export function isClientReport(value: unknown): value is ClientReport {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    v.version === 1 &&
    typeof v.client === "object" &&
    typeof v.hero === "object" &&
    Array.isArray(v.ratings) &&
    Array.isArray(v.sections)
  );
}
