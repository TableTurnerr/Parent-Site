"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";

/**
 * Review calculator: how many new 5-star reviews a restaurant needs to raise
 * its average Google rating to a target.
 *
 * Math: current total stars = rating * count. Each new 5-star review adds 5
 * stars and 1 to the count. Solve for the smallest whole number n where
 * (rating*count + 5n) / (count + n) >= target.
 *
 * Honest framing: this is exact arithmetic for 5-star reviews only (the best
 * case). Real-world reviews are a mix, so we frame it as "at least n".
 * Inputs are typeable + slider; values update on input, no timers, so nothing
 * needs gating behind prefers-reduced-motion.
 */

interface FieldProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (v: number) => void;
}

function clamp(v: number, min: number, max: number): number {
  if (Number.isNaN(v)) return min;
  return Math.min(max, Math.max(min, v));
}

function Field({ id, label, value, min, max, step, suffix, onChange }: FieldProps) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);

  function commit(raw: string) {
    const parsed = Number(raw.replace(/,/g, ""));
    const rounded = step < 1 ? Math.round(parsed / step) * step : Math.round(parsed);
    const next = clamp(Number(rounded.toFixed(1)), min, max);
    onChange(next);
    setDraft(String(next));
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2 gap-3">
        <label htmlFor={id} className="text-sm font-medium text-charcoal">
          {label}
        </label>
        <div className="flex items-baseline rounded-lg border border-border bg-cream px-2.5 py-1 focus-within:border-accent transition-colors">
          <input
            id={`${id}-input`}
            type="text"
            inputMode="decimal"
            value={draft}
            aria-label={`${label} (type a value)`}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={(e) => commit(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
            }}
            className="w-16 bg-transparent text-right font-display font-semibold text-charcoal tabular-nums outline-none"
          />
          {suffix && (
            <span className="font-display font-semibold text-charcoal text-sm">{suffix}</span>
          )}
        </div>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-charcoal/10"
        style={{ accentColor: "var(--color-accent)" }}
      />
    </div>
  );
}

export default function ReviewCalculator() {
  const [rating, setRating] = useState(4.1);
  const [count, setCount] = useState(60);
  const [target, setTarget] = useState(4.5);

  const result = useMemo(() => {
    // Target can't exceed 5, and must be above current to need any reviews.
    const safeTarget = Math.min(target, 5);
    if (safeTarget <= rating) return { needed: 0, impossible: false, alreadyThere: true };
    // (rating*count + 5n)/(count + n) >= target  ->  n >= count*(target-rating)/(5-target)
    if (safeTarget >= 5) {
      // Only reachable with all 5-star and rating already 5; otherwise effectively impossible.
      return { needed: Infinity, impossible: true, alreadyThere: false };
    }
    const n = (count * (safeTarget - rating)) / (5 - safeTarget);
    return { needed: Math.ceil(n), impossible: false, alreadyThere: false };
  }, [rating, count, target]);

  return (
    <section className="bg-cream py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Controls */}
          <div className="rounded-[1.25rem] border border-border bg-cream-dark p-7 sm:p-9">
            <SectionLabel>Review Calculator</SectionLabel>
            <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-tight text-charcoal mt-3 mb-7">
              How many reviews to reach your target rating?
            </h2>
            <div className="space-y-7">
              <Field
                id="rev-rating"
                label="Current Google rating"
                value={rating}
                min={1}
                max={5}
                step={0.1}
                suffix="★"
                onChange={setRating}
              />
              <Field
                id="rev-count"
                label="Number of reviews you have"
                value={count}
                min={1}
                max={2000}
                step={1}
                onChange={setCount}
              />
              <Field
                id="rev-target"
                label="Target rating"
                value={target}
                min={1}
                max={5}
                step={0.1}
                suffix="★"
                onChange={setTarget}
              />
            </div>
          </div>

          {/* Result */}
          <div className="rounded-[1.25rem] dark-sheen elevate text-cream p-7 sm:p-9 flex flex-col">
            <p className="text-warm-gray-light text-sm uppercase tracking-[0.2em] font-medium">
              New 5-star reviews needed
            </p>

            {result.alreadyThere ? (
              <>
                <p className="font-display font-bold text-accent-gradient mt-3 leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
                  You&apos;re there
                </p>
                <p className="text-warm-gray-light text-lg mt-2">
                  Your rating already meets that target. Keep the reviews coming to hold it.
                </p>
              </>
            ) : result.impossible ? (
              <>
                <p className="font-display font-bold text-accent-gradient mt-3 leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
                  Aim a little lower
                </p>
                <p className="text-warm-gray-light text-lg mt-2">
                  A perfect 5.0 average is effectively unreachable once you have any non-5-star reviews. Try a target like 4.8.
                </p>
              </>
            ) : (
              <>
                <p
                  className="font-display font-bold leading-none tracking-tight text-accent-gradient mt-3 tabular-nums"
                  style={{ fontSize: "clamp(2.75rem, 7vw, 4.5rem)" }}
                  aria-live="polite"
                >
                  {result.needed.toLocaleString("en-US")}
                </p>
                <p className="text-warm-gray-light text-lg mt-1">
                  consecutive 5-star reviews to go from {rating.toFixed(1)}★ to {Math.min(target, 5).toFixed(1)}★
                </p>
              </>
            )}

            <p className="text-warm-gray-light text-[0.95rem] leading-relaxed mt-7">
              This assumes new reviews are all 5-star, so treat it as the best case.
              A steady stream of recent, genuine reviews is what actually lifts your
              rating and your ranking in local search.
            </p>

            <div className="mt-auto pt-7">
              <Link
                href="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-cream text-charcoal px-7 py-3.5 font-medium hover:bg-white transition-colors"
              >
                Get help generating reviews
              </Link>
              <p className="text-warm-gray-light text-xs mt-3">
                Estimate only, based on the figures you enter.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
