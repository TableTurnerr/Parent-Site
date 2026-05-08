"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";

export type DropdownOption<T extends string = string> = {
  key: T;
  label: string;
  description?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const ITEM_BASE =
  "group flex w-full flex-col items-start gap-0.5 border-l-4 px-3 py-2 text-left text-sm transition-colors disabled:cursor-default";
const ITEM_DEFAULT =
  "border-transparent text-[var(--color-charcoal)] hover:border-[#43403D] hover:bg-[#43403D] hover:text-[#FAFAF8]";
const ITEM_ACTIVE =
  "border-[var(--color-charcoal)] bg-[var(--color-cream-dark)] text-[var(--color-charcoal)]";

export const dropdownItemClass = {
  base: ITEM_BASE,
  default: ITEM_DEFAULT,
  active: ITEM_ACTIVE,
};

export const dropdownMenuClass =
  "rounded-lg border border-[var(--color-border)] bg-white py-1 shadow-xl";

/**
 * Renders a single dropdown menu item with the standard reports-page styling
 * (charcoal hover, left-border accent, "Current" badge for active option).
 */
export function DropdownItem({
  option,
  onSelect,
}: {
  option: DropdownOption;
  onSelect: () => void;
}) {
  const isActive = option.active === true;
  return (
    <button
      type="button"
      disabled={option.disabled || isActive}
      onClick={() => {
        if (!isActive) onSelect();
      }}
      className={`${ITEM_BASE} ${isActive ? ITEM_ACTIVE : ITEM_DEFAULT}`}
    >
      <span className="flex w-full items-center justify-between gap-2 font-medium">
        <span>{option.label}</span>
        {isActive && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-warm-gray)] group-hover:text-[#D4D0CB]">
            Current
          </span>
        )}
      </span>
      {option.description && (
        <span className="text-xs font-normal leading-snug text-[var(--color-warm-gray)] group-hover:text-[#D4D0CB]">
          {option.description}
        </span>
      )}
    </button>
  );
}

/**
 * Chip-style trigger + dropdown menu (the reports-page pattern).
 */
export function ChipDropdown({
  open,
  onOpenChange,
  busy,
  chipClassName,
  label,
  title,
  options,
  menuWidth = 180,
  align = "left",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  busy?: boolean;
  chipClassName: string;
  label: string;
  title?: string;
  options: DropdownOption[];
  menuWidth?: number;
  align?: "left" | "right";
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<{
    vertical: "below" | "above";
    horizontal: "left" | "right";
  }>({ vertical: "below", horizontal: align });

  useEffect(() => {
    if (!open) return;
    const compute = () => {
      const trigger = triggerRef.current;
      const menu = menuRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const menuHeight = menu?.offsetHeight ?? 240;
      const menuW = menu?.offsetWidth ?? menuWidth;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const margin = 8;

      const spaceBelow = vh - rect.bottom;
      const spaceAbove = rect.top;
      const vertical: "below" | "above" =
        spaceBelow < menuHeight + margin && spaceAbove > spaceBelow ? "above" : "below";

      let horizontal: "left" | "right" = align;
      if (align === "left" && rect.left + menuW + margin > vw) horizontal = "right";
      else if (align === "right" && rect.right - menuW - margin < 0) horizontal = "left";

      setPlacement({ vertical, horizontal });
    };
    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute, true);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("scroll", compute, true);
    };
  }, [open, align, menuWidth]);

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => onOpenChange(!open)}
        disabled={busy}
        title={title}
        className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80 disabled:opacity-50 ${chipClassName}`}
      >
        {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
        {label}
        <ChevronDown className="h-3 w-3 opacity-70" />
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => onOpenChange(false)}
          />
          <div
            ref={menuRef}
            className={`absolute z-50 ${dropdownMenuClass} ${
              placement.vertical === "above" ? "bottom-full mb-1" : "top-full mt-1"
            } ${placement.horizontal === "right" ? "right-0" : "left-0"}`}
            style={{ minWidth: menuWidth }}
          >
            {options.map((o) => (
              <DropdownItem
                key={o.key}
                option={o}
                onSelect={() => {
                  onOpenChange(false);
                  o.onClick?.();
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Form-style dropdown that replaces a native <select>. Same item visuals as
 * the reports-page menu.
 */
export function SelectDropdown<T extends string>({
  value,
  options,
  onChange,
  placeholder,
  disabled,
  className = "",
  menuWidth,
  align = "left",
}: {
  value: T;
  options: ReadonlyArray<T | { value: T; label: string; description?: string }>;
  onChange: (v: T) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  menuWidth?: number;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const normalized = options.map((opt) =>
    typeof opt === "string"
      ? { value: opt as T, label: opt as string }
      : opt
  );
  const current = normalized.find((o) => o.value === value);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
        className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-left text-sm text-[var(--color-charcoal)] transition-colors hover:border-[var(--color-charcoal)] focus:border-[var(--color-charcoal)] focus:outline-none disabled:opacity-50"
      >
        <span className={current ? "" : "text-[var(--color-warm-gray-light)]"}>
          {current?.label ?? placeholder ?? "Select…"}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-[var(--color-warm-gray)] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div
          className={`absolute top-full z-50 mt-1 ${dropdownMenuClass} ${
            align === "right" ? "right-0" : "left-0"
          }`}
          style={{ minWidth: menuWidth ?? "100%" }}
        >
          {normalized.map((opt) => (
            <DropdownItem
              key={opt.value}
              option={{
                key: opt.value,
                label: opt.label,
                description: "description" in opt ? opt.description : undefined,
                active: opt.value === value,
              }}
              onSelect={() => {
                setOpen(false);
                onChange(opt.value);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
