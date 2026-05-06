"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Save,
  Code,
  Type,
  Eye,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Sparkles,
  AlertTriangle,
  Check,
} from "lucide-react";
import {
  isClientReport,
  type ClientReport,
  type ReportSection,
} from "@/lib/report-schema";
import { ReportRendererBody } from "@/components/report/report-renderer";
import { StructuralEditor } from "./report-editors/structural";
import {
  SectionTypeEditor,
  SECTION_TYPE_LABELS,
  newSection,
} from "./report-editors/section-types";

type Variant = "client" | "internal";
type EditorTab = "visual" | "json" | "rendered";

export function ReportEditor({
  reportId,
  variant,
  initial,
  slugLocked = true,
  onSaved,
}: {
  reportId: string;
  variant: Variant;
  initial: ClientReport;
  slugLocked?: boolean;
  onSaved?: () => void;
}) {
  const [tab, setTab] = useState<EditorTab>("visual");
  const [draft, setDraft] = useState<ClientReport>(initial);
  const [jsonText, setJsonText] = useState<string>(() => JSON.stringify(initial, null, 2));
  const [jsonError, setJsonError] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>("");
  const [showPreviewPane, setShowPreviewPane] = useState(true);

  // Reset when the underlying report or variant changes (e.g., refresh).
  useEffect(() => {
    setDraft(initial);
    setJsonText(JSON.stringify(initial, null, 2));
    setJsonError("");
  }, [initial, variant]);

  const isDirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(initial),
    [draft, initial]
  );

  // ── Sync draft → JSON text when entering JSON tab ─────────────────────────
  function switchTab(next: EditorTab) {
    if (tab === "json" && next !== "json") {
      // Try to commit JSON edits back to draft before leaving.
      try {
        const parsed = JSON.parse(jsonText);
        if (isClientReport(parsed)) {
          setDraft(parsed);
          setJsonError("");
        } else {
          setJsonError("JSON does not match ClientReport v1 schema. Fix before switching tabs.");
          return;
        }
      } catch (e) {
        setJsonError(`Invalid JSON: ${(e as Error).message}`);
        return;
      }
    }
    if (next === "json") {
      setJsonText(JSON.stringify(draft, null, 2));
      setJsonError("");
    }
    setTab(next);
  }

  // ── Update sections helpers ───────────────────────────────────────────────
  function updateSection(index: number, next: ReportSection) {
    const sections = [...draft.sections];
    sections[index] = next;
    setDraft({ ...draft, sections });
  }
  function removeSection(index: number) {
    if (!confirm("Remove this section? This cannot be undone until you discard or save.")) return;
    const sections = draft.sections.filter((_, i) => i !== index);
    setDraft({ ...draft, sections });
  }
  function moveSection(index: number, dir: -1 | 1) {
    const j = index + dir;
    if (j < 0 || j >= draft.sections.length) return;
    const sections = [...draft.sections];
    [sections[index], sections[j]] = [sections[j], sections[index]];
    setDraft({ ...draft, sections });
  }
  function addSection(type: ReportSection["type"]) {
    setDraft({ ...draft, sections: [...draft.sections, newSection(type)] });
  }

  // ── Save ──────────────────────────────────────────────────────────────────
  async function save() {
    let payload: ClientReport = draft;
    if (tab === "json") {
      try {
        const parsed = JSON.parse(jsonText);
        if (!isClientReport(parsed)) {
          setJsonError("JSON does not match ClientReport v1 schema.");
          return;
        }
        payload = parsed;
        setDraft(parsed);
      } catch (e) {
        setJsonError(`Invalid JSON: ${(e as Error).message}`);
        return;
      }
    }
    setSaving(true);
    setSaveStatus("");
    try {
      const res = await fetch(`/api/reports/${reportId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variant, content_json: payload }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setSaveStatus(`Error: ${err.error ?? res.statusText}`);
        return;
      }
      setSaveStatus("Saved!");
      onSaved?.();
      setTimeout(() => setSaveStatus(""), 2500);
    } finally {
      setSaving(false);
    }
  }

  function discard() {
    if (!confirm("Discard all unsaved changes?")) return;
    setDraft(initial);
    setJsonText(JSON.stringify(initial, null, 2));
    setJsonError("");
  }

  return (
    <div className="space-y-4">
      <Toolbar
        tab={tab}
        switchTab={switchTab}
        save={save}
        discard={discard}
        saving={saving}
        saveStatus={saveStatus}
        isDirty={isDirty}
        showPreviewPane={showPreviewPane}
        togglePreviewPane={() => setShowPreviewPane((s) => !s)}
      />

      <div className={`grid gap-4 ${showPreviewPane && tab !== "rendered" ? "lg:grid-cols-[1fr_1fr]" : "grid-cols-1"}`}>
        <div className="min-w-0 space-y-4">
          {tab === "visual" && (
            <VisualEditor
              draft={draft}
              setDraft={setDraft}
              slugLocked={slugLocked}
              updateSection={updateSection}
              removeSection={removeSection}
              moveSection={moveSection}
              addSection={addSection}
            />
          )}

          {tab === "json" && (
            <JsonEditor
              jsonText={jsonText}
              setJsonText={(v) => {
                setJsonText(v);
                if (jsonError) setJsonError("");
              }}
              jsonError={jsonError}
            />
          )}

          {tab === "rendered" && (
            <RenderedView draft={draft} />
          )}
        </div>

        {showPreviewPane && tab !== "rendered" && (
          <PreviewPane draft={draft} jsonText={jsonText} jsonTab={tab === "json"} />
        )}
      </div>
    </div>
  );
}

// ─── Toolbar ─────────────────────────────────────────────────────────────

function Toolbar({
  tab,
  switchTab,
  save,
  discard,
  saving,
  saveStatus,
  isDirty,
  showPreviewPane,
  togglePreviewPane,
}: {
  tab: EditorTab;
  switchTab: (t: EditorTab) => void;
  save: () => void;
  discard: () => void;
  saving: boolean;
  saveStatus: string;
  isDirty: boolean;
  showPreviewPane: boolean;
  togglePreviewPane: () => void;
}) {
  const tabs = [
    { key: "visual" as const, label: "Visual", icon: Type },
    { key: "json" as const, label: "JSON", icon: Code },
    { key: "rendered" as const, label: "Rendered", icon: Eye },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white p-2">
      <div className="flex items-center gap-1">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => switchTab(t.key)}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                tab === t.key
                  ? "bg-[var(--color-charcoal)] text-white"
                  : "text-[var(--color-warm-gray)] hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-charcoal)]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1" />

      {tab !== "rendered" && (
        <button
          type="button"
          onClick={togglePreviewPane}
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-[var(--color-warm-gray)] transition-colors hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-charcoal)]"
          title="Toggle live preview pane"
        >
          <ChevronsUpDown className="h-3.5 w-3.5 rotate-90" />
          {showPreviewPane ? "Hide preview" : "Show preview"}
        </button>
      )}

      {saveStatus && (
        <span className={`text-xs ${saveStatus.startsWith("Error") ? "text-red-600" : "text-green-600"}`}>
          {saveStatus}
        </span>
      )}
      {!saveStatus && isDirty && (
        <span className="text-xs text-[var(--color-warm-gray-light)]">Unsaved changes</span>
      )}

      {isDirty && (
        <button
          type="button"
          onClick={discard}
          disabled={saving}
          className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-warm-gray)] transition-colors hover:bg-[var(--color-cream)] disabled:opacity-50"
        >
          Discard
        </button>
      )}

      <button
        type="button"
        onClick={save}
        disabled={saving || !isDirty}
        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-charcoal)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-charcoal-light)] disabled:opacity-40"
      >
        <Save className="h-3.5 w-3.5" />
        {saving ? "Saving…" : "Save"}
      </button>
    </div>
  );
}

// ─── Visual editor body ──────────────────────────────────────────────────

function VisualEditor({
  draft,
  setDraft,
  slugLocked,
  updateSection,
  removeSection,
  moveSection,
  addSection,
}: {
  draft: ClientReport;
  setDraft: (next: ClientReport) => void;
  slugLocked: boolean;
  updateSection: (index: number, next: ReportSection) => void;
  removeSection: (index: number) => void;
  moveSection: (index: number, dir: -1 | 1) => void;
  addSection: (type: ReportSection["type"]) => void;
}) {
  return (
    <div className="space-y-6">
      <StructuralEditor
        report={draft}
        onChange={setDraft}
        slugLocked={slugLocked}
      />

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-[var(--color-charcoal)]">
          Sections ({draft.sections.length})
        </h3>
        {draft.sections.map((section, index) => (
          <SectionCard
            key={`${section.id}-${index}`}
            section={section}
            index={index}
            total={draft.sections.length}
            onChange={(next) => updateSection(index, next)}
            onRemove={() => removeSection(index)}
            onMoveUp={() => moveSection(index, -1)}
            onMoveDown={() => moveSection(index, 1)}
          />
        ))}
        <AddSectionMenu onAdd={addSection} />
      </div>
    </div>
  );
}

function SectionCard({
  section,
  index,
  total,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  section: ReportSection;
  index: number;
  total: number;
  onChange: (next: ReportSection) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white">
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-2.5">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex flex-1 items-center gap-2 text-left"
        >
          <span className="rounded-md bg-[var(--color-cream-dark)] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[var(--color-warm-gray)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm font-medium text-[var(--color-charcoal)]">{section.title}</span>
          <span className="text-[10px] uppercase tracking-wider text-[var(--color-warm-gray-light)]">
            {SECTION_TYPE_LABELS[section.type]}
          </span>
          <span className="ml-auto text-xs text-[var(--color-warm-gray-light)]">
            {open ? "−" : "+"}
          </span>
        </button>
        <button
          type="button"
          onClick={onMoveUp}
          disabled={index === 0}
          className="rounded p-1 text-[var(--color-warm-gray-light)] hover:bg-[var(--color-cream)] hover:text-[var(--color-charcoal)] disabled:opacity-20"
          title="Move up"
        >
          <ChevronUp className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={index === total - 1}
          className="rounded p-1 text-[var(--color-warm-gray-light)] hover:bg-[var(--color-cream)] hover:text-[var(--color-charcoal)] disabled:opacity-20"
          title="Move down"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="rounded p-1 text-[var(--color-warm-gray-light)] hover:bg-red-50 hover:text-red-600"
          title="Remove section"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
      {open && (
        <div className="space-y-3 p-4">
          <div className="rounded-md bg-[var(--color-cream)] px-3 py-2 text-[11px] text-[var(--color-warm-gray)]">
            <span className="font-mono">id:</span> {section.id}
          </div>
          <SectionTypeEditor section={section} onChange={onChange} />
        </div>
      )}
    </div>
  );
}

function AddSectionMenu({ onAdd }: { onAdd: (type: ReportSection["type"]) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[var(--color-border)] px-4 py-2 text-xs font-medium text-[var(--color-warm-gray)] transition-colors hover:border-[var(--color-charcoal)] hover:text-[var(--color-charcoal)]"
      >
        <Plus className="h-3.5 w-3.5" />
        Add section
      </button>
      {open && (
        <div className="absolute z-20 mt-1 grid min-w-[200px] gap-0.5 rounded-lg border border-[var(--color-border)] bg-white p-1 shadow-lg">
          {(Object.keys(SECTION_TYPE_LABELS) as Array<ReportSection["type"]>).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                onAdd(type);
                setOpen(false);
              }}
              className="flex items-center justify-between rounded-md px-3 py-2 text-left text-sm text-[var(--color-charcoal)] hover:bg-[var(--color-cream)]"
            >
              <span>{SECTION_TYPE_LABELS[type]}</span>
              <span className="font-mono text-[10px] text-[var(--color-warm-gray-light)]">{type}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── JSON editor ─────────────────────────────────────────────────────────

function JsonEditor({
  jsonText,
  setJsonText,
  jsonError,
}: {
  jsonText: string;
  setJsonText: (v: string) => void;
  jsonError: string;
}) {
  return (
    <div className="space-y-2">
      <p className="flex items-center gap-1.5 text-xs text-[var(--color-warm-gray)]">
        <Sparkles className="h-3 w-3" />
        Edit the raw <code className="rounded bg-[var(--color-cream-dark)] px-1 font-mono">ClientReport v1</code> JSON.
        Schema-validated on save.
      </p>
      <textarea
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        spellCheck={false}
        className="min-h-[600px] w-full resize-y rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] p-4 font-mono text-xs leading-relaxed text-[var(--color-charcoal)] focus:border-[var(--color-charcoal)] focus:outline-none"
      />
      {jsonError && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span className="font-mono">{jsonError}</span>
        </div>
      )}
    </div>
  );
}

// ─── Rendered (read-only) view ────────────────────────────────────────────

function RenderedView({ draft }: { draft: ClientReport }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
      <div className="border-b border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-2 text-xs text-[var(--color-warm-gray)]">
        <Check className="mr-1 inline h-3 w-3" />
        Read-only preview of the saved JSON. Switch to Visual or JSON to edit.
      </div>
      <div className="report-iframe-wrap">
        <ReportRendererBody report={draft} />
      </div>
    </div>
  );
}

// ─── Live preview pane (split view) ──────────────────────────────────────

function PreviewPane({
  draft,
  jsonText,
  jsonTab,
}: {
  draft: ClientReport;
  jsonText: string;
  jsonTab: boolean;
}) {
  // When in JSON tab, attempt to parse current text for live preview;
  // fall back to the last-good draft if invalid.
  const previewReport = useMemo<ClientReport>(() => {
    if (!jsonTab) return draft;
    try {
      const parsed = JSON.parse(jsonText);
      if (isClientReport(parsed)) return parsed;
    } catch {
      // ignore
    }
    return draft;
  }, [draft, jsonText, jsonTab]);

  return (
    <div className="lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)]">
      <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-xs text-[var(--color-warm-gray)]">
          <Eye className="h-3 w-3" />
          Live preview
          <span className="text-[var(--color-warm-gray-light)]">— updates as you type</span>
        </div>
        <div className="report-iframe-wrap max-h-[calc(100vh-8rem)] overflow-y-auto">
          <ReportRendererBody report={previewReport} />
        </div>
      </div>
    </div>
  );
}
