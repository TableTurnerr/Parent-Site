"use client";

import { Moon, Sun } from "lucide-react";

export type AdminTheme = "light" | "dark";

export default function ThemeToggle({
  theme,
  onChange,
}: {
  theme: AdminTheme;
  onChange: (next: AdminTheme) => void;
}) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={() => onChange(isDark ? "light" : "dark")}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="rounded-lg p-1.5 text-[var(--color-warm-gray)] transition-colors hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-charcoal)]"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
