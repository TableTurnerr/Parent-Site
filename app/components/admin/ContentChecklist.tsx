"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Check, AlertTriangle, X } from "lucide-react";
import {
  runChecks,
  checkScore,
  wordCount,
  readingTime,
  type CheckInput,
  type CheckLevel,
} from "@/app/lib/content-checks";

const LEVEL_ICON: Record<CheckLevel, typeof Check> = {
  pass: Check,
  warn: AlertTriangle,
  fail: X,
};

const LEVEL_COLOR: Record<CheckLevel, string> = {
  pass: "text-green-600",
  warn: "text-amber-600",
  fail: "text-red-600",
};

export default function ContentChecklist(props: CheckInput) {
  const [open, setOpen] = useState(true);

  const results = useMemo(() => runChecks(props), [props]);
  const { pass, total } = checkScore(results);
  const words = useMemo(() => wordCount(props.contentHtml), [props.contentHtml]);
  const mins = useMemo(() => readingTime(props.contentHtml), [props.contentHtml]);
  const failing = results.filter((r) => r.level === "fail").length;

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4 transition-colors hover:bg-[var(--color-cream)]"
      >
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
          Content Check
          <span
            className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${
              failing > 0
                ? "bg-red-100 text-red-700"
                : pass === total
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
            }`}
          >
            {pass}/{total}
          </span>
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-[var(--color-warm-gray)]" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[var(--color-warm-gray)]" />
        )}
      </button>

      {open && (
        <div className="border-t border-[var(--color-border)] p-4">
          {/* Word count + reading time */}
          <div className="mb-3 flex items-center gap-4 text-xs text-[var(--color-warm-gray)]">
            <span>
              <span className="font-semibold text-[var(--color-charcoal)]">{words}</span> words
            </span>
            <span>
              <span className="font-semibold text-[var(--color-charcoal)]">{mins}</span> min read
            </span>
          </div>

          <ul className="space-y-2">
            {results.map((r) => {
              const Icon = LEVEL_ICON[r.level];
              return (
                <li key={r.id} className="flex items-start gap-2">
                  <Icon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${LEVEL_COLOR[r.level]}`} />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[var(--color-charcoal)]">{r.label}</p>
                    <p className="text-xs leading-snug text-[var(--color-warm-gray-light)]">
                      {r.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
