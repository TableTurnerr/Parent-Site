"use client";

import type {
  ClientReport,
  ReportClient,
  ReportHero,
  RatingCategory,
  LetterGrade,
} from "@/lib/report-schema";
import {
  TextField,
  NumberField,
  MarkdownField,
  SelectField,
  StringList,
  ObjectList,
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

export function ClientMetaEditor({
  client,
  onChange,
  slugLocked = true,
}: {
  client: ReportClient;
  onChange: (next: ReportClient) => void;
  slugLocked?: boolean;
}) {
  const set = <K extends keyof ReportClient>(k: K, v: ReportClient[K]) => onChange({ ...client, [k]: v });
  return (
    <div className="space-y-3">
      <Row>
        <FieldGroup label="Client name">
          <TextField value={client.name} onChange={(v) => set("name", v)} />
        </FieldGroup>
        <FieldGroup label="Slug" hint={slugLocked ? "(locked)" : undefined}>
          <TextField value={client.slug} onChange={(v) => set("slug", v)} disabled={slugLocked} />
        </FieldGroup>
      </Row>
      <Row>
        <FieldGroup label="Client URL">
          <TextField value={client.url} onChange={(v) => set("url", v)} placeholder="example.com" />
        </FieldGroup>
        <FieldGroup label="Prepared date" hint="ISO or human-readable">
          <TextField value={client.preparedDate} onChange={(v) => set("preparedDate", v)} placeholder="2026-05-06" />
        </FieldGroup>
      </Row>
      <FieldGroup label="Prepared by" hint="optional">
        <TextField value={client.preparedBy ?? ""} onChange={(v) => set("preparedBy", v || undefined)} placeholder="Tableturnerr" />
      </FieldGroup>
    </div>
  );
}

export function HeroEditor({
  hero,
  onChange,
}: {
  hero: ReportHero;
  onChange: (next: ReportHero) => void;
}) {
  const set = <K extends keyof ReportHero>(k: K, v: ReportHero[K]) => onChange({ ...hero, [k]: v });
  return (
    <div className="space-y-3">
      <FieldGroup label="Headline title">
        <TextField value={hero.title} onChange={(v) => set("title", v)} />
      </FieldGroup>
      <FieldGroup label="Subtitle" hint="optional">
        <TextField value={hero.subtitle ?? ""} onChange={(v) => set("subtitle", v || undefined)} />
      </FieldGroup>
      <FieldGroup label="Narrative paragraphs" hint="markdown subset OK">
        <StringList
          values={hero.narrative}
          onChange={(v) => set("narrative", v)}
          placeholder="Opening paragraph…"
          addLabel="Add paragraph"
        />
      </FieldGroup>
      <Row>
        <FieldGroup label="Overall grade">
          <SelectField value={hero.overallGrade} options={LETTER_GRADES} onChange={(v) => set("overallGrade", v)} />
        </FieldGroup>
        <FieldGroup label="Grader score" hint="0–100, optional">
          <NumberField value={hero.graderScore} min={0} max={100} onChange={(v) => set("graderScore", v)} />
        </FieldGroup>
      </Row>
      <FieldGroup label="Estimated monthly revenue loss (USD)" hint="optional">
        <NumberField value={hero.monthlyRevenueLoss} min={0} onChange={(v) => set("monthlyRevenueLoss", v)} />
      </FieldGroup>
      <FieldGroup label="One-line verdict">
        <MarkdownField value={hero.verdict} onChange={(v) => set("verdict", v)} rows={2} />
      </FieldGroup>
    </div>
  );
}

export function RatingsEditor({
  ratings,
  onChange,
}: {
  ratings: RatingCategory[];
  onChange: (next: RatingCategory[]) => void;
}) {
  return (
    <ObjectList
      items={ratings}
      onChange={onChange}
      newItem={() => ({ key: "new", label: "New", score: 0 })}
      itemLabel={(it) => `${it.label} — ${it.score}/100`}
      addLabel="Add rating"
      renderItem={(it, update) => (
        <div className="grid gap-2 sm:grid-cols-3">
          <FieldGroup label="Key" hint="lowercase id">
            <TextField value={it.key} onChange={(v) => update({ ...it, key: v })} />
          </FieldGroup>
          <FieldGroup label="Label">
            <TextField value={it.label} onChange={(v) => update({ ...it, label: v })} />
          </FieldGroup>
          <FieldGroup label="Score (0–100)">
            <NumberField value={it.score} min={0} max={100} onChange={(v) => update({ ...it, score: v ?? 0 })} />
          </FieldGroup>
        </div>
      )}
    />
  );
}

// ─── Top-level editor combining all three structural pieces ───────────────

export function StructuralEditor({
  report,
  onChange,
  slugLocked = true,
}: {
  report: ClientReport;
  onChange: (next: ClientReport) => void;
  slugLocked?: boolean;
}) {
  return (
    <div className="space-y-6">
      <SectionShell label="Client metadata">
        <ClientMetaEditor
          client={report.client}
          onChange={(c) => onChange({ ...report, client: c })}
          slugLocked={slugLocked}
        />
      </SectionShell>
      <SectionShell label="Hero">
        <HeroEditor hero={report.hero} onChange={(h) => onChange({ ...report, hero: h })} />
      </SectionShell>
      <SectionShell label="Sidebar ratings">
        <RatingsEditor ratings={report.ratings} onChange={(r) => onChange({ ...report, ratings: r })} />
      </SectionShell>
    </div>
  );
}

function SectionShell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details open className="group rounded-xl border border-[var(--color-border)] bg-white">
      <summary className="flex cursor-pointer items-center justify-between border-b border-[var(--color-border)] px-4 py-3 text-sm font-semibold text-[var(--color-charcoal)] group-open:border-b">
        <span>{label}</span>
        <span className="text-xs font-normal text-[var(--color-warm-gray-light)] group-open:hidden">click to expand</span>
      </summary>
      <div className="p-4">{children}</div>
    </details>
  );
}
