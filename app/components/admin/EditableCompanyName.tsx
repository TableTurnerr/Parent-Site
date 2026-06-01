"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Check, X } from "lucide-react";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export default function EditableCompanyName({
  clientId,
  name,
  slug,
}: {
  clientId: string;
  name: string;
  slug: string;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [nameValue, setNameValue] = useState(name);
  const [slugValue, setSlugValue] = useState(slug);
  const [slugTouched, setSlugTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  useEffect(() => {
    if (editing && !slugTouched) setSlugValue(slugify(nameValue));
  }, [nameValue, editing, slugTouched]);

  const cancel = () => {
    setNameValue(name);
    setSlugValue(slug);
    setSlugTouched(false);
    setErr(null);
    setEditing(false);
  };

  const save = async () => {
    const trimmedName = nameValue.trim();
    const trimmedSlug = slugValue.trim().toLowerCase();
    if (!trimmedName) {
      setErr("Name can't be empty");
      return;
    }
    if (!SLUG_RE.test(trimmedSlug)) {
      setErr("Invalid slug (lowercase letters, numbers, hyphens)");
      return;
    }
    if (trimmedName === name && trimmedSlug === slug) {
      setEditing(false);
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      const payload: Record<string, string> = {};
      if (trimmedName !== name) payload.name = trimmedName;
      if (trimmedSlug !== slug) payload.slug = trimmedSlug;
      const res = await fetch(`/api/clients/${clientId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error ?? "Failed to update");
        return;
      }
      setEditing(false);
      if (trimmedSlug !== slug) {
        router.replace(`/admin/companies/${trimmedSlug}`);
      } else {
        router.refresh();
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  if (!editing) {
    return (
      <div className="flex items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-charcoal)]">{name}</h1>
        <button
          type="button"
          onClick={() => setEditing(true)}
          aria-label="Edit company name"
          className="rounded-md p-1 text-[var(--color-warm-gray-light)] hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-charcoal)]"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            else if (e.key === "Escape") cancel();
          }}
          disabled={busy}
          placeholder="Company name"
          className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-1.5 text-xl sm:text-2xl font-bold text-[var(--color-charcoal)] focus:border-[var(--color-charcoal)] focus:outline-none disabled:opacity-50"
        />
        <button
          type="button"
          onClick={save}
          disabled={busy}
          aria-label="Save"
          className="rounded-md p-1.5 text-green-700 hover:bg-green-50 disabled:opacity-50"
        >
          <Check className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={cancel}
          disabled={busy}
          aria-label="Cancel"
          className="rounded-md p-1.5 text-[var(--color-warm-gray)] hover:bg-[var(--color-cream-dark)] disabled:opacity-50"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-[var(--color-warm-gray)]">slug</label>
        <input
          type="text"
          value={slugValue}
          onChange={(e) => {
            setSlugTouched(true);
            setSlugValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            else if (e.key === "Escape") cancel();
          }}
          disabled={busy}
          placeholder="company-slug"
          className="flex-1 max-w-xs rounded-md border border-[var(--color-border)] bg-white px-2 py-1 font-mono text-xs text-[var(--color-charcoal)] focus:border-[var(--color-charcoal)] focus:outline-none disabled:opacity-50"
        />
      </div>
      {slugValue !== slug && (
        <p className="text-xs text-[var(--color-warm-gray)]">
          Changing the slug updates this company's URL. Existing portal links will need to be re-shared.
        </p>
      )}
      {err && <p className="text-xs text-red-700">{err}</p>}
    </div>
  );
}
