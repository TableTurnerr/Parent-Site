"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";

/**
 * Menu price / food cost calculator. Owners enter what a plate costs them to
 * make and the food-cost percentage they want to hit, and get the menu price
 * that lands on that target, plus the profit it leaves per plate and per month.
 *
 * Honest framing: food cost percentage is only one input to pricing. This does
 * not account for labor, rent, or other overhead, so we frame the output as a
 * starting price, not a guaranteed margin. Numbers update on user input (no
 * timers), so nothing needs gating behind prefers-reduced-motion.
 */

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const usd2 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

interface FieldProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  onChange: (v: number) => void;
}

function clamp(v: number, min: number, max: number): number {
  if (Number.isNaN(v)) return min;
  return Math.min(max, Math.max(min, v));
}

function Field({ id, label, value, min, max, step, prefix, suffix, onChange }: FieldProps) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);

  function commit(raw: string) {
    const parsed = Number(raw.replace(/,/g, ""));
    if (Number.isNaN(parsed)) {
      setDraft(String(value));
      return;
    }
    // Snap to the slider step, then keep the right number of decimals so a
    // 0.25 step keeps cents instead of collapsing to whole numbers.
    const snapped = step < 1 ? Math.round(parsed / step) * step : Math.round(parsed);
    const decimals = step < 1 ? (String(step).split(".")[1]?.length ?? 1) : 0;
    const next = clamp(Number(snapped.toFixed(decimals)), min, max);
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
          {prefix && (
            <span className="font-display font-semibold text-charcoal text-sm">{prefix}</span>
          )}
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
      <div className="flex justify-between mt-1 text-[0.7rem] text-warm-gray-light tabular-nums">
        <span>{prefix}{min.toLocaleString("en-US")}{suffix}</span>
        <span>{prefix}{max.toLocaleString("en-US")}{suffix}</span>
      </div>
    </div>
  );
}

export default function MenuPriceCalculator() {
  const [cost, setCost] = useState(4.5); // plate cost to make ($)
  const [target, setTarget] = useState(30); // target food cost (%)
  const [units, setUnits] = useState(300); // plates sold per month

  const { price, profitPerPlate, monthlyProfit } = useMemo(() => {
    const t = clamp(target, 1, 90) / 100;
    const p = cost / t;
    const perPlate = p - cost;
    return {
      price: p,
      profitPerPlate: perPlate,
      monthlyProfit: perPlate * units,
    };
  }, [cost, target, units]);

  return (
    <section className="bg-cream py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Controls */}
          <div className="rounded-[1.25rem] border border-border bg-cream-dark p-7 sm:p-9">
            <SectionLabel>Menu Price Calculator</SectionLabel>
            <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-tight text-charcoal mt-3 mb-7">
              What should you charge for this dish?
            </h2>
            <div className="space-y-7">
              <Field
                id="mpc-cost"
                label="What the plate costs you to make"
                value={cost}
                min={0.5}
                max={50}
                step={0.25}
                prefix="$"
                onChange={setCost}
              />
              <Field
                id="mpc-target"
                label="Target food cost"
                value={target}
                min={15}
                max={45}
                step={1}
                suffix="%"
                onChange={setTarget}
              />
              <Field
                id="mpc-units"
                label="Plates sold per month"
                value={units}
                min={0}
                max={5000}
                step={10}
                onChange={setUnits}
              />
            </div>
          </div>

          {/* Result */}
          <div className="rounded-[1.25rem] dark-sheen elevate text-cream p-7 sm:p-9 flex flex-col">
            <p className="text-warm-gray-light text-sm uppercase tracking-[0.2em] font-medium">
              Suggested menu price
            </p>
            <p
              className="font-display font-bold leading-none tracking-tight text-accent-gradient mt-3 tabular-nums"
              style={{ fontSize: "clamp(2.75rem, 7vw, 4.5rem)" }}
              aria-live="polite"
            >
              {usd2.format(price)}
            </p>
            <p className="text-warm-gray-light text-lg mt-1">
              to hit a {target}% food cost
            </p>

            <div className="mt-7 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-warm-gray/20 px-5 py-4">
                <p className="font-display font-bold text-2xl text-cream tabular-nums">
                  {usd2.format(profitPerPlate)}
                </p>
                <p className="text-warm-gray-light text-sm mt-0.5">profit per plate</p>
              </div>
              <div className="rounded-xl border border-warm-gray/20 px-5 py-4">
                <p className="font-display font-bold text-2xl text-cream tabular-nums">
                  {usd.format(monthlyProfit)}
                </p>
                <p className="text-warm-gray-light text-sm mt-0.5">gross profit / month</p>
              </div>
            </div>

            <p className="text-warm-gray-light text-[0.95rem] leading-relaxed mt-7">
              Food cost is one piece of pricing. This is a starting price before
              labor, rent, and other overhead, so use it as a floor and adjust for
              what your market will bear.
            </p>

            <div className="mt-auto pt-7">
              <Link
                href="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-cream text-charcoal px-7 py-3.5 font-medium hover:bg-white transition-colors"
              >
                Get a menu built to sell
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
