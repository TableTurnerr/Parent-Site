"use client";

import { useEffect, useRef } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";

export function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-1 flex items-baseline gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
        {children}
      </span>
      {hint && (
        <span className="text-[11px] font-normal normal-case text-[var(--color-warm-gray-light)]">
          {hint}
        </span>
      )}
    </div>
  );
}

export function TextField({
  value,
  onChange,
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:border-[var(--color-charcoal)] focus:outline-none disabled:bg-[var(--color-cream)] disabled:opacity-60"
    />
  );
}

export function NumberField({
  value,
  onChange,
  placeholder,
  min,
  max,
}: {
  value: number | undefined;
  onChange: (v: number | undefined) => void;
  placeholder?: string;
  min?: number;
  max?: number;
}) {
  return (
    <input
      type="number"
      value={value ?? ""}
      min={min}
      max={max}
      onChange={(e) => {
        const raw = e.target.value;
        if (raw === "") onChange(undefined);
        else {
          const n = Number(raw);
          onChange(Number.isFinite(n) ? n : undefined);
        }
      }}
      placeholder={placeholder}
      className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:border-[var(--color-charcoal)] focus:outline-none"
    />
  );
}

export function MarkdownField({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [value]);
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-none overflow-hidden rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm leading-relaxed text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:border-[var(--color-charcoal)] focus:outline-none"
    />
  );
}

export function SelectField<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: readonly T[] | T[];
  onChange: (v: T) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-charcoal)] focus:border-[var(--color-charcoal)] focus:outline-none"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export function CheckboxField({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-[var(--color-charcoal)]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-[var(--color-border)] accent-[var(--color-charcoal)]"
      />
      {label}
    </label>
  );
}

// ─── Repeating list of strings (paragraphs / bullets) ─────────────────────

export function StringList({
  values,
  onChange,
  placeholder,
  multiline = true,
  addLabel = "Add",
}: {
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  multiline?: boolean;
  addLabel?: string;
}) {
  const list = values ?? [];
  const update = (i: number, v: string) => {
    const next = [...list];
    next[i] = v;
    onChange(next);
  };
  const remove = (i: number) => {
    const next = [...list];
    next.splice(i, 1);
    onChange(next);
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {list.map((v, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="flex flex-col gap-0.5 pt-1">
            <button
              type="button"
              onClick={() => move(i, -1)}
              disabled={i === 0}
              className="rounded p-0.5 text-[var(--color-warm-gray-light)] hover:bg-[var(--color-cream)] hover:text-[var(--color-charcoal)] disabled:opacity-20"
              title="Move up"
            >
              <ChevronUp className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => move(i, 1)}
              disabled={i === list.length - 1}
              className="rounded p-0.5 text-[var(--color-warm-gray-light)] hover:bg-[var(--color-cream)] hover:text-[var(--color-charcoal)] disabled:opacity-20"
              title="Move down"
            >
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
          <div className="flex-1">
            {multiline ? (
              <MarkdownField value={v} onChange={(nv) => update(i, nv)} placeholder={placeholder} rows={2} />
            ) : (
              <TextField value={v} onChange={(nv) => update(i, nv)} placeholder={placeholder} />
            )}
          </div>
          <button
            type="button"
            onClick={() => remove(i)}
            className="mt-1 rounded p-1.5 text-[var(--color-warm-gray-light)] hover:bg-red-50 hover:text-red-600"
            title="Remove"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...list, ""])}
        className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-warm-gray)] transition-colors hover:border-[var(--color-charcoal)] hover:text-[var(--color-charcoal)]"
      >
        <Plus className="h-3 w-3" />
        {addLabel}
      </button>
    </div>
  );
}

// ─── Generic repeating object list ─────────────────────────────────────────

export function ObjectList<T>({
  items,
  onChange,
  renderItem,
  newItem,
  itemLabel,
  collapsible = true,
  addLabel,
}: {
  items: T[];
  onChange: (next: T[]) => void;
  renderItem: (item: T, update: (next: T) => void, index: number) => React.ReactNode;
  newItem: () => T;
  itemLabel: (item: T, index: number) => string;
  collapsible?: boolean;
  addLabel?: string;
}) {
  const list = items ?? [];
  const update = (i: number, v: T) => {
    const next = [...list];
    next[i] = v;
    onChange(next);
  };
  const remove = (i: number) => {
    const next = [...list];
    next.splice(i, 1);
    onChange(next);
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {list.map((item, i) => (
        <ItemCard
          key={i}
          title={itemLabel(item, i)}
          collapsible={collapsible}
          onMoveUp={i === 0 ? undefined : () => move(i, -1)}
          onMoveDown={i === list.length - 1 ? undefined : () => move(i, 1)}
          onRemove={() => remove(i)}
        >
          {renderItem(item, (next) => update(i, next), i)}
        </ItemCard>
      ))}
      <button
        type="button"
        onClick={() => onChange([...list, newItem()])}
        className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-warm-gray)] transition-colors hover:border-[var(--color-charcoal)] hover:text-[var(--color-charcoal)]"
      >
        <Plus className="h-3 w-3" />
        {addLabel ?? "Add item"}
      </button>
    </div>
  );
}

function ItemCard({
  title,
  children,
  onMoveUp,
  onMoveDown,
  onRemove,
  collapsible,
}: {
  title: string;
  children: React.ReactNode;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
  collapsible: boolean;
}) {
  return (
    <details open={!collapsible || true} className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)]">
      <summary className="flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-xs font-medium text-[var(--color-charcoal)]">
        <span className="truncate">{title || "Untitled"}</span>
        <span className="flex shrink-0 items-center gap-0.5">
          {onMoveUp && (
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); onMoveUp(); }}
              className="rounded p-1 text-[var(--color-warm-gray-light)] hover:bg-white hover:text-[var(--color-charcoal)]"
              title="Move up"
            >
              <ChevronUp className="h-3 w-3" />
            </button>
          )}
          {onMoveDown && (
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); onMoveDown(); }}
              className="rounded p-1 text-[var(--color-warm-gray-light)] hover:bg-white hover:text-[var(--color-charcoal)]"
              title="Move down"
            >
              <ChevronDown className="h-3 w-3" />
            </button>
          )}
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); onRemove(); }}
            className="rounded p-1 text-[var(--color-warm-gray-light)] hover:bg-red-50 hover:text-red-600"
            title="Remove"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </span>
      </summary>
      <div className="space-y-2 border-t border-[var(--color-border)] bg-white p-3">
        {children}
      </div>
    </details>
  );
}

// ─── Compact horizontal field row ─────────────────────────────────────────

export function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

export function FieldGroup({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <FieldLabel hint={hint}>{label}</FieldLabel>
      {children}
    </div>
  );
}

// ─── Table editor (headers + rows[][]) ─────────────────────────────────────

export function TableEditor({
  headers,
  rows,
  onChange,
}: {
  headers: string[];
  rows: string[][];
  onChange: (next: { headers: string[]; rows: string[][] }) => void;
}) {
  const cols = headers.length;
  const setHeader = (i: number, v: string) => {
    const next = [...headers];
    next[i] = v;
    onChange({ headers: next, rows });
  };
  const addColumn = () => {
    onChange({
      headers: [...headers, "Column"],
      rows: rows.map((r) => [...r, ""]),
    });
  };
  const removeColumn = (i: number) => {
    if (cols <= 1) return;
    onChange({
      headers: headers.filter((_, idx) => idx !== i),
      rows: rows.map((r) => r.filter((_, idx) => idx !== i)),
    });
  };
  const setCell = (r: number, c: number, v: string) => {
    const next = rows.map((row) => [...row]);
    next[r][c] = v;
    onChange({ headers, rows: next });
  };
  const addRow = () => {
    onChange({ headers, rows: [...rows, Array(cols).fill("")] });
  };
  const removeRow = (i: number) => {
    onChange({ headers, rows: rows.filter((_, idx) => idx !== i) });
  };
  const moveRow = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    onChange({ headers, rows: next });
  };

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--color-cream-dark)]">
              <th className="w-8" />
              {headers.map((h, i) => (
                <th key={i} className="border-l border-[var(--color-border)] p-1.5">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={h}
                      onChange={(e) => setHeader(i, e.target.value)}
                      className="w-full bg-transparent px-1 text-xs font-semibold text-[var(--color-charcoal)] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeColumn(i)}
                      disabled={cols <= 1}
                      className="rounded p-0.5 text-[var(--color-warm-gray-light)] hover:bg-red-50 hover:text-red-600 disabled:opacity-20"
                      title="Remove column"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </th>
              ))}
              <th className="w-8 border-l border-[var(--color-border)]">
                <button
                  type="button"
                  onClick={addColumn}
                  className="p-1 text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
                  title="Add column"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-t border-[var(--color-border)]">
                <td className="w-8 align-top">
                  <div className="flex flex-col items-center gap-0">
                    <button type="button" onClick={() => moveRow(ri, -1)} disabled={ri === 0} className="p-0.5 text-[var(--color-warm-gray-light)] hover:text-[var(--color-charcoal)] disabled:opacity-20">
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button type="button" onClick={() => moveRow(ri, 1)} disabled={ri === rows.length - 1} className="p-0.5 text-[var(--color-warm-gray-light)] hover:text-[var(--color-charcoal)] disabled:opacity-20">
                      <ChevronDown className="h-3 w-3" />
                    </button>
                    <button type="button" onClick={() => removeRow(ri)} className="p-0.5 text-[var(--color-warm-gray-light)] hover:text-red-600">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </td>
                {row.map((cell, ci) => (
                  <td key={ci} className="border-l border-[var(--color-border)] p-1 align-top">
                    <textarea
                      value={cell}
                      onChange={(e) => setCell(ri, ci, e.target.value)}
                      rows={1}
                      className="w-full resize-y bg-transparent p-1 text-xs text-[var(--color-charcoal)] focus:outline-none"
                    />
                  </td>
                ))}
                <td className="w-8 border-l border-[var(--color-border)]" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={addRow}
        className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-warm-gray)] transition-colors hover:border-[var(--color-charcoal)] hover:text-[var(--color-charcoal)]"
      >
        <Plus className="h-3 w-3" />
        Add row
      </button>
    </div>
  );
}
