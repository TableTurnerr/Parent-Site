"use client";

import type {
  ReportSection,
  NarrativeSection,
  ScorecardSection,
  TableSection,
  ReviewsSection,
  ProblemListSection,
  CompetitionSection,
  KeywordResearchSection,
  ActionPlanSection,
  SuccessMetricsSection,
  CtaSection,
  LetterGrade,
  KeywordGroup,
} from "@/lib/report-schema";
import {
  TextField,
  NumberField,
  MarkdownField,
  SelectField,
  CheckboxField,
  StringList,
  ObjectList,
  TableEditor,
  FieldGroup,
  Row,
} from "./atoms";

const LETTER_GRADES: LetterGrade[] = [
  "A+", "A", "A-",
  "B+", "B", "B-",
  "C+", "C", "C-",
  "D+", "D", "D-",
  "F",
];

const ACTION_CATEGORIES = ["Quick win", "Build", "Ongoing"] as const;

// ─── Common header (title + intro) ──────────────────────────────────────────

function CommonHeader<T extends { title: string; intro?: string }>({
  section,
  onChange,
}: {
  section: T;
  onChange: (next: T) => void;
}) {
  return (
    <>
      <FieldGroup label="Section title">
        <TextField value={section.title} onChange={(v) => onChange({ ...section, title: v })} />
      </FieldGroup>
      <FieldGroup label="Intro" hint="optional, markdown subset">
        <MarkdownField
          value={section.intro ?? ""}
          onChange={(v) => onChange({ ...section, intro: v || undefined })}
          rows={2}
        />
      </FieldGroup>
    </>
  );
}

// ─── narrative ──────────────────────────────────────────────────────────────

function NarrativeEditor({
  section,
  onChange,
}: {
  section: NarrativeSection;
  onChange: (next: NarrativeSection) => void;
}) {
  return (
    <div className="space-y-3">
      <FieldGroup label="Section title">
        <TextField value={section.title} onChange={(v) => onChange({ ...section, title: v })} />
      </FieldGroup>
      <FieldGroup label="Body paragraphs">
        <StringList
          values={section.body}
          onChange={(v) => onChange({ ...section, body: v })}
          placeholder="Paragraph…"
          addLabel="Add paragraph"
        />
      </FieldGroup>
      <FieldGroup label="Pull-quote callout" hint="optional">
        <MarkdownField
          value={section.callout ?? ""}
          onChange={(v) => onChange({ ...section, callout: v || undefined })}
          rows={2}
        />
      </FieldGroup>
    </div>
  );
}

// ─── scorecard ──────────────────────────────────────────────────────────────

function ScorecardEditor({
  section,
  onChange,
}: {
  section: ScorecardSection;
  onChange: (next: ScorecardSection) => void;
}) {
  return (
    <div className="space-y-3">
      <CommonHeader section={section} onChange={onChange} />
      <FieldGroup label="Tiles">
        <ObjectList
          items={section.items}
          onChange={(items) => onChange({ ...section, items })}
          newItem={() => ({ area: "New area", grade: "B" as LetterGrade, summary: "" })}
          itemLabel={(it) => `${it.area} — ${it.grade}`}
          addLabel="Add tile"
          renderItem={(it, update) => (
            <div className="space-y-2">
              <Row>
                <FieldGroup label="Area">
                  <TextField value={it.area} onChange={(v) => update({ ...it, area: v })} />
                </FieldGroup>
                <FieldGroup label="Grade">
                  <SelectField value={it.grade} options={LETTER_GRADES} onChange={(v) => update({ ...it, grade: v })} />
                </FieldGroup>
              </Row>
              <FieldGroup label="Summary">
                <MarkdownField value={it.summary} onChange={(v) => update({ ...it, summary: v })} rows={2} />
              </FieldGroup>
            </div>
          )}
        />
      </FieldGroup>
      <FieldGroup label="Footnote" hint="optional callout below the grid">
        <MarkdownField
          value={section.footnote ?? ""}
          onChange={(v) => onChange({ ...section, footnote: v || undefined })}
          rows={2}
        />
      </FieldGroup>
    </div>
  );
}

// ─── table ──────────────────────────────────────────────────────────────────

function TableSectionEditor({
  section,
  onChange,
}: {
  section: TableSection;
  onChange: (next: TableSection) => void;
}) {
  return (
    <div className="space-y-3">
      <CommonHeader section={section} onChange={onChange} />
      <FieldGroup label="Table">
        <TableEditor
          headers={section.headers}
          rows={section.rows}
          onChange={({ headers, rows }) => onChange({ ...section, headers, rows })}
        />
      </FieldGroup>
      <CheckboxField
        checked={!!section.emphasizeFirstColumn}
        onChange={(v) => onChange({ ...section, emphasizeFirstColumn: v })}
        label="Emphasize first column"
      />
      <FieldGroup label="Callout" hint="optional">
        <MarkdownField
          value={section.callout ?? ""}
          onChange={(v) => onChange({ ...section, callout: v || undefined })}
          rows={2}
        />
      </FieldGroup>
    </div>
  );
}

// ─── reviews ────────────────────────────────────────────────────────────────

function ReviewsEditor({
  section,
  onChange,
}: {
  section: ReviewsSection;
  onChange: (next: ReviewsSection) => void;
}) {
  return (
    <div className="space-y-3">
      <CommonHeader section={section} onChange={onChange} />
      <FieldGroup label="Platforms">
        <ObjectList<ReviewsSection["platforms"][number]>
          items={section.platforms}
          onChange={(platforms) => onChange({ ...section, platforms })}
          newItem={() => ({ platform: "Google" })}
          itemLabel={(it) => `${it.platform} ${it.rating ? `· ${it.rating}★` : ""}`}
          addLabel="Add platform"
          renderItem={(it, update) => (
            <div className="grid gap-2 sm:grid-cols-3">
              <FieldGroup label="Platform">
                <TextField value={it.platform} onChange={(v) => update({ ...it, platform: v })} />
              </FieldGroup>
              <FieldGroup label="Rating" hint="e.g. 4.6">
                <TextField value={it.rating ?? ""} onChange={(v) => update({ ...it, rating: v || undefined })} />
              </FieldGroup>
              <FieldGroup label="Reviews count" hint="e.g. 312">
                <TextField value={it.reviews ?? ""} onChange={(v) => update({ ...it, reviews: v || undefined })} />
              </FieldGroup>
            </div>
          )}
        />
      </FieldGroup>
      <FieldGroup label="What customers love" hint="optional">
        <StringList
          values={section.loved ?? []}
          onChange={(v) => onChange({ ...section, loved: v.length ? v : undefined })}
          placeholder="Loved bullet…"
          addLabel="Add bullet"
        />
      </FieldGroup>
      <FieldGroup label="Common complaints" hint="optional">
        <StringList
          values={section.complaints ?? []}
          onChange={(v) => onChange({ ...section, complaints: v.length ? v : undefined })}
          placeholder="Complaint bullet…"
          addLabel="Add bullet"
        />
      </FieldGroup>
      <FieldGroup label="Recommendation" hint="optional callout">
        <MarkdownField
          value={section.recommendation ?? ""}
          onChange={(v) => onChange({ ...section, recommendation: v || undefined })}
          rows={2}
        />
      </FieldGroup>
    </div>
  );
}

// ─── problems ───────────────────────────────────────────────────────────────

function ProblemsEditor({
  section,
  onChange,
}: {
  section: ProblemListSection;
  onChange: (next: ProblemListSection) => void;
}) {
  return (
    <div className="space-y-3">
      <CommonHeader section={section} onChange={onChange} />
      <FieldGroup label="Problem cards">
        <ObjectList<ProblemListSection["items"][number]>
          items={section.items}
          onChange={(items) => onChange({ ...section, items })}
          newItem={() => ({ title: "New problem", body: [""] })}
          itemLabel={(it, i) => `${(it.number ?? i + 1).toString().padStart(2, "0")} — ${it.title}`}
          addLabel="Add problem"
          renderItem={(it, update) => (
            <div className="space-y-2">
              <Row>
                <FieldGroup label="Number" hint="optional, defaults to position">
                  <NumberField value={it.number} min={1} onChange={(v) => update({ ...it, number: v })} />
                </FieldGroup>
                <FieldGroup label="Title">
                  <TextField value={it.title} onChange={(v) => update({ ...it, title: v })} />
                </FieldGroup>
              </Row>
              <FieldGroup label="Body paragraphs">
                <StringList
                  values={it.body}
                  onChange={(v) => update({ ...it, body: v })}
                  placeholder="Paragraph…"
                  addLabel="Add paragraph"
                />
              </FieldGroup>
              <FieldGroup label="Bullets" hint="optional">
                <StringList
                  values={it.bullets ?? []}
                  onChange={(v) => update({ ...it, bullets: v.length ? v : undefined })}
                  placeholder="Bullet…"
                  addLabel="Add bullet"
                />
              </FieldGroup>
            </div>
          )}
        />
      </FieldGroup>
    </div>
  );
}

// ─── competition ────────────────────────────────────────────────────────────

function CompetitionEditor({
  section,
  onChange,
}: {
  section: CompetitionSection;
  onChange: (next: CompetitionSection) => void;
}) {
  const opp = section.opportunity;
  return (
    <div className="space-y-3">
      <CommonHeader section={section} onChange={onChange} />

      <FieldGroup label="Competitors">
        <ObjectList<CompetitionSection["competitors"][number]>
          items={section.competitors}
          onChange={(competitors) => onChange({ ...section, competitors })}
          newItem={() => ({ name: "New competitor" })}
          itemLabel={(it) => `${it.rank ?? "—"} ${it.name}${it.isYou ? " (you)" : ""}`}
          addLabel="Add competitor"
          renderItem={(it, update) => (
            <div className="space-y-2">
              <Row>
                <FieldGroup label="Rank" hint="e.g. #1">
                  <TextField value={it.rank ?? ""} onChange={(v) => update({ ...it, rank: v || undefined })} />
                </FieldGroup>
                <FieldGroup label="Name">
                  <TextField value={it.name} onChange={(v) => update({ ...it, name: v })} />
                </FieldGroup>
              </Row>
              <Row>
                <FieldGroup label="Style" hint="cuisine/genre">
                  <TextField value={it.style ?? ""} onChange={(v) => update({ ...it, style: v || undefined })} />
                </FieldGroup>
                <FieldGroup label="Rating" hint="e.g. 4.5">
                  <TextField value={it.rating ?? ""} onChange={(v) => update({ ...it, rating: v || undefined })} />
                </FieldGroup>
              </Row>
              <FieldGroup label="Known for">
                <MarkdownField
                  value={it.knownFor ?? ""}
                  onChange={(v) => update({ ...it, knownFor: v || undefined })}
                  rows={2}
                />
              </FieldGroup>
              <CheckboxField
                checked={!!it.isYou}
                onChange={(v) => update({ ...it, isYou: v || undefined })}
                label="This is the client (highlight as 'You')"
              />
            </div>
          )}
        />
      </FieldGroup>

      <FieldGroup label="Search position table" hint="optional">
        <ObjectList
          items={section.searchPosition ?? []}
          onChange={(rows) => onChange({ ...section, searchPosition: rows.length ? rows : undefined })}
          newItem={() => ({ search: "", map: "", organic: "" })}
          itemLabel={(it) => it.search || "Search query"}
          addLabel="Add search"
          renderItem={(it, update) => (
            <div className="grid gap-2 sm:grid-cols-3">
              <FieldGroup label="Search">
                <TextField value={it.search} onChange={(v) => update({ ...it, search: v })} />
              </FieldGroup>
              <FieldGroup label="Map pack">
                <TextField value={it.map} onChange={(v) => update({ ...it, map: v })} />
              </FieldGroup>
              <FieldGroup label="Organic">
                <TextField value={it.organic} onChange={(v) => update({ ...it, organic: v })} />
              </FieldGroup>
            </div>
          )}
        />
      </FieldGroup>

      <FieldGroup label="Rival callouts" hint="optional">
        <ObjectList
          items={section.rivalCallouts ?? []}
          onChange={(items) => onChange({ ...section, rivalCallouts: items.length ? items : undefined })}
          newItem={() => ({ title: "Rival", body: [""] })}
          itemLabel={(it) => it.title || "Untitled"}
          addLabel="Add callout"
          renderItem={(it, update) => (
            <div className="space-y-2">
              <FieldGroup label="Title">
                <TextField value={it.title} onChange={(v) => update({ ...it, title: v })} />
              </FieldGroup>
              <FieldGroup label="Body">
                <StringList
                  values={it.body}
                  onChange={(v) => update({ ...it, body: v })}
                  addLabel="Add paragraph"
                />
              </FieldGroup>
            </div>
          )}
        />
      </FieldGroup>

      <FieldGroup label="Win / lose breakdown" hint="optional">
        <ObjectList<NonNullable<CompetitionSection["winLose"]>[number]>
          items={section.winLose ?? []}
          onChange={(items) => onChange({ ...section, winLose: items.length ? items : undefined })}
          newItem={() => ({ area: "Area" })}
          itemLabel={(it) => it.area}
          addLabel="Add area"
          renderItem={(it, update) => (
            <div className="space-y-2">
              <FieldGroup label="Area">
                <TextField value={it.area} onChange={(v) => update({ ...it, area: v })} />
              </FieldGroup>
              <FieldGroup label="Where you win">
                <MarkdownField
                  value={it.winning ?? ""}
                  onChange={(v) => update({ ...it, winning: v || undefined })}
                  rows={2}
                />
              </FieldGroup>
              <FieldGroup label="Where you lose">
                <MarkdownField
                  value={it.losing ?? ""}
                  onChange={(v) => update({ ...it, losing: v || undefined })}
                  rows={2}
                />
              </FieldGroup>
            </div>
          )}
        />
      </FieldGroup>

      <details className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-3">
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
          Opportunity sub-section {opp ? "" : "— (none)"}
        </summary>
        <div className="mt-3 space-y-3">
          <CheckboxField
            checked={!!opp}
            onChange={(v) =>
              onChange({
                ...section,
                opportunity: v
                  ? opp ?? { rows: [] }
                  : undefined,
              })
            }
            label="Include opportunity sub-section"
          />
          {opp && (
            <>
              <FieldGroup label="Intro">
                <MarkdownField
                  value={opp.intro ?? ""}
                  onChange={(v) => onChange({ ...section, opportunity: { ...opp, intro: v || undefined } })}
                  rows={2}
                />
              </FieldGroup>
              <FieldGroup label="Opportunity rows">
                <ObjectList
                  items={opp.rows}
                  onChange={(rows) => onChange({ ...section, opportunity: { ...opp, rows } })}
                  newItem={() => ({ opportunity: "", competition: "", canOwn: "" })}
                  itemLabel={(it) => it.opportunity || "Opportunity"}
                  addLabel="Add row"
                  renderItem={(it, update) => (
                    <div className="grid gap-2 sm:grid-cols-3">
                      <FieldGroup label="Opportunity">
                        <TextField value={it.opportunity} onChange={(v) => update({ ...it, opportunity: v })} />
                      </FieldGroup>
                      <FieldGroup label="Competition">
                        <MarkdownField value={it.competition} onChange={(v) => update({ ...it, competition: v })} rows={2} />
                      </FieldGroup>
                      <FieldGroup label="Can you own it?">
                        <MarkdownField value={it.canOwn} onChange={(v) => update({ ...it, canOwn: v })} rows={2} />
                      </FieldGroup>
                    </div>
                  )}
                />
              </FieldGroup>
              <FieldGroup label="Bottom line">
                <MarkdownField
                  value={opp.bottomLine ?? ""}
                  onChange={(v) => onChange({ ...section, opportunity: { ...opp, bottomLine: v || undefined } })}
                  rows={2}
                />
              </FieldGroup>
            </>
          )}
        </div>
      </details>
    </div>
  );
}

// ─── keywords ───────────────────────────────────────────────────────────────

function KeywordsEditor({
  section,
  onChange,
}: {
  section: KeywordResearchSection;
  onChange: (next: KeywordResearchSection) => void;
}) {
  const newGroup = (): KeywordGroup => ({
    id: `group-${Date.now().toString(36)}`,
    label: "New group",
    summary: "",
    table: { headers: ["Keyword", "Volume", "Difficulty"], rows: [] },
  });

  return (
    <div className="space-y-3">
      <CommonHeader section={section} onChange={onChange} />

      <FieldGroup label="Keyword groups">
        <ObjectList
          items={section.groups}
          onChange={(groups) => onChange({ ...section, groups })}
          newItem={newGroup}
          itemLabel={(g) => `${g.label}${g.highlight ? ` · ${g.highlight}` : ""}`}
          addLabel="Add group"
          renderItem={(g, update) => (
            <div className="space-y-2">
              <Row>
                <FieldGroup label="ID">
                  <TextField value={g.id} onChange={(v) => update({ ...g, id: v })} />
                </FieldGroup>
                <FieldGroup label="Label">
                  <TextField value={g.label} onChange={(v) => update({ ...g, label: v })} />
                </FieldGroup>
              </Row>
              <FieldGroup label="Highlight badge" hint="optional">
                <TextField value={g.highlight ?? ""} onChange={(v) => update({ ...g, highlight: v || undefined })} />
              </FieldGroup>
              <FieldGroup label="Summary" hint="shown when collapsed">
                <MarkdownField value={g.summary} onChange={(v) => update({ ...g, summary: v })} rows={2} />
              </FieldGroup>
              <FieldGroup label="Intro" hint="optional, shown above table">
                <MarkdownField
                  value={g.intro ?? ""}
                  onChange={(v) => update({ ...g, intro: v || undefined })}
                  rows={2}
                />
              </FieldGroup>
              <FieldGroup label="Table">
                <TableEditor
                  headers={g.table.headers}
                  rows={g.table.rows}
                  onChange={({ headers, rows }) => update({ ...g, table: { headers, rows } })}
                />
              </FieldGroup>
              <FieldGroup label="Takeaway" hint="optional, shown below table">
                <MarkdownField
                  value={g.takeaway ?? ""}
                  onChange={(v) => update({ ...g, takeaway: v || undefined })}
                  rows={2}
                />
              </FieldGroup>
            </div>
          )}
        />
      </FieldGroup>

      <details className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-3">
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
          Totals sub-section {section.totals ? "" : "— (none)"}
        </summary>
        <div className="mt-3 space-y-3">
          <CheckboxField
            checked={!!section.totals}
            onChange={(v) =>
              onChange({
                ...section,
                totals: v
                  ? section.totals ?? { headers: ["Bucket", "Volume"], rows: [] }
                  : undefined,
              })
            }
            label="Include totals sub-section"
          />
          {section.totals && (
            <>
              <FieldGroup label="Totals table">
                <TableEditor
                  headers={section.totals.headers}
                  rows={section.totals.rows}
                  onChange={({ headers, rows }) =>
                    onChange({ ...section, totals: { ...section.totals!, headers, rows } })
                  }
                />
              </FieldGroup>
              <FieldGroup label="Summary callout">
                <MarkdownField
                  value={section.totals.summary ?? ""}
                  onChange={(v) =>
                    onChange({ ...section, totals: { ...section.totals!, summary: v || undefined } })
                  }
                  rows={2}
                />
              </FieldGroup>
            </>
          )}
        </div>
      </details>
    </div>
  );
}

// ─── actionPlan ─────────────────────────────────────────────────────────────

function ActionPlanEditor({
  section,
  onChange,
}: {
  section: ActionPlanSection;
  onChange: (next: ActionPlanSection) => void;
}) {
  return (
    <div className="space-y-3">
      <CommonHeader section={section} onChange={onChange} />
      <FieldGroup label="Action items" hint="four-step structure: Research → Build → Polish → Ongoing">
        <ObjectList
          items={section.items}
          onChange={(items) => onChange({ ...section, items })}
          newItem={() => ({
            priority: section.items.length + 1,
            category: "Build",
            action: "",
            impact: "",
            timeline: "",
          })}
          itemLabel={(it) => `${String(it.priority).padStart(2, "0")} · ${it.category}`}
          addLabel="Add step"
          renderItem={(it, update) => (
            <div className="space-y-2">
              <Row>
                <FieldGroup label="Priority">
                  <NumberField value={it.priority} min={1} onChange={(v) => update({ ...it, priority: v ?? 1 })} />
                </FieldGroup>
                <FieldGroup label="Category">
                  <SelectField
                    value={(ACTION_CATEGORIES as readonly string[]).includes(it.category) ? (it.category as typeof ACTION_CATEGORIES[number]) : "Build"}
                    options={ACTION_CATEGORIES}
                    onChange={(v) => update({ ...it, category: v })}
                  />
                </FieldGroup>
              </Row>
              <FieldGroup label="Action">
                <MarkdownField value={it.action} onChange={(v) => update({ ...it, action: v })} rows={2} />
              </FieldGroup>
              <FieldGroup label="Impact">
                <MarkdownField value={it.impact} onChange={(v) => update({ ...it, impact: v })} rows={2} />
              </FieldGroup>
              <FieldGroup label="Timeline" hint="e.g. 'Week 1', '30 days'">
                <TextField value={it.timeline} onChange={(v) => update({ ...it, timeline: v })} />
              </FieldGroup>
            </div>
          )}
        />
      </FieldGroup>
    </div>
  );
}

// ─── successMetrics ─────────────────────────────────────────────────────────

function SuccessMetricsEditor({
  section,
  onChange,
}: {
  section: SuccessMetricsSection;
  onChange: (next: SuccessMetricsSection) => void;
}) {
  return (
    <div className="space-y-3">
      <CommonHeader section={section} onChange={onChange} />
      <FieldGroup label="Metrics">
        <ObjectList
          items={section.items}
          onChange={(items) => onChange({ ...section, items })}
          newItem={() => ({ metric: "", now: "", target: "" })}
          itemLabel={(it) => it.metric || "Metric"}
          addLabel="Add metric"
          renderItem={(it, update) => (
            <div className="grid gap-2 sm:grid-cols-3">
              <FieldGroup label="Metric">
                <TextField value={it.metric} onChange={(v) => update({ ...it, metric: v })} />
              </FieldGroup>
              <FieldGroup label="Now">
                <TextField value={it.now} onChange={(v) => update({ ...it, now: v })} />
              </FieldGroup>
              <FieldGroup label="Target">
                <TextField value={it.target} onChange={(v) => update({ ...it, target: v })} />
              </FieldGroup>
            </div>
          )}
        />
      </FieldGroup>
      <FieldGroup label="Callout" hint="optional">
        <MarkdownField
          value={section.callout ?? ""}
          onChange={(v) => onChange({ ...section, callout: v || undefined })}
          rows={2}
        />
      </FieldGroup>
    </div>
  );
}

// ─── cta ────────────────────────────────────────────────────────────────────

function CtaEditor({
  section,
  onChange,
}: {
  section: CtaSection;
  onChange: (next: CtaSection) => void;
}) {
  return (
    <div className="space-y-3">
      <FieldGroup label="Section title">
        <TextField value={section.title} onChange={(v) => onChange({ ...section, title: v })} />
      </FieldGroup>
      <FieldGroup label="Body paragraphs">
        <StringList
          values={section.body}
          onChange={(v) => onChange({ ...section, body: v })}
          addLabel="Add paragraph"
        />
      </FieldGroup>
      <Row>
        <FieldGroup label="Primary button label">
          <TextField
            value={section.primary?.label ?? ""}
            onChange={(v) =>
              onChange({
                ...section,
                primary: v ? { ...(section.primary ?? {}), label: v } : undefined,
              })
            }
          />
        </FieldGroup>
        <FieldGroup label="Primary href" hint="optional">
          <TextField
            value={section.primary?.href ?? ""}
            onChange={(v) =>
              onChange({
                ...section,
                primary: section.primary ? { ...section.primary, href: v || undefined } : undefined,
              })
            }
          />
        </FieldGroup>
      </Row>
      <Row>
        <FieldGroup label="Secondary button label" hint="optional">
          <TextField
            value={section.secondary?.label ?? ""}
            onChange={(v) =>
              onChange({
                ...section,
                secondary: v ? { ...(section.secondary ?? {}), label: v } : undefined,
              })
            }
          />
        </FieldGroup>
        <FieldGroup label="Secondary href" hint="optional">
          <TextField
            value={section.secondary?.href ?? ""}
            onChange={(v) =>
              onChange({
                ...section,
                secondary: section.secondary ? { ...section.secondary, href: v || undefined } : undefined,
              })
            }
          />
        </FieldGroup>
      </Row>
    </div>
  );
}

// ─── Dispatcher ─────────────────────────────────────────────────────────────

export function SectionTypeEditor({
  section,
  onChange,
}: {
  section: ReportSection;
  onChange: (next: ReportSection) => void;
}) {
  switch (section.type) {
    case "narrative":
      return <NarrativeEditor section={section} onChange={onChange as (s: NarrativeSection) => void} />;
    case "scorecard":
      return <ScorecardEditor section={section} onChange={onChange as (s: ScorecardSection) => void} />;
    case "table":
      return <TableSectionEditor section={section} onChange={onChange as (s: TableSection) => void} />;
    case "reviews":
      return <ReviewsEditor section={section} onChange={onChange as (s: ReviewsSection) => void} />;
    case "problems":
      return <ProblemsEditor section={section} onChange={onChange as (s: ProblemListSection) => void} />;
    case "competition":
      return <CompetitionEditor section={section} onChange={onChange as (s: CompetitionSection) => void} />;
    case "keywords":
      return <KeywordsEditor section={section} onChange={onChange as (s: KeywordResearchSection) => void} />;
    case "actionPlan":
      return <ActionPlanEditor section={section} onChange={onChange as (s: ActionPlanSection) => void} />;
    case "successMetrics":
      return <SuccessMetricsEditor section={section} onChange={onChange as (s: SuccessMetricsSection) => void} />;
    case "cta":
      return <CtaEditor section={section} onChange={onChange as (s: CtaSection) => void} />;
    default:
      return (
        <p className="text-xs text-red-600">
          Unknown section type. Edit via the JSON tab.
        </p>
      );
  }
}

// ─── Section type metadata + factories (for "add section") ─────────────────

export const SECTION_TYPE_LABELS: Record<ReportSection["type"], string> = {
  narrative: "Narrative",
  scorecard: "Scorecard",
  table: "Table",
  reviews: "Reviews",
  problems: "Problems",
  competition: "Competition",
  keywords: "Keywords",
  actionPlan: "Action plan",
  successMetrics: "Success metrics",
  cta: "Call to action",
};

export function newSection(type: ReportSection["type"]): ReportSection {
  const id = `${type}-${Date.now().toString(36)}`;
  switch (type) {
    case "narrative":
      return { type, id, title: "New section", body: [""] };
    case "scorecard":
      return { type, id, title: "New scorecard", items: [] };
    case "table":
      return { type, id, title: "New table", headers: ["Column 1", "Column 2"], rows: [] };
    case "reviews":
      return { type, id, title: "Reviews", platforms: [] };
    case "problems":
      return { type, id, title: "Problems", items: [] };
    case "competition":
      return { type, id, title: "Competition", competitors: [] };
    case "keywords":
      return { type, id, title: "Keyword research", groups: [] };
    case "actionPlan":
      return { type, id, title: "Action plan", items: [] };
    case "successMetrics":
      return { type, id, title: "Success metrics", items: [] };
    case "cta":
      return { type, id, title: "Next steps", body: [""] };
  }
}
