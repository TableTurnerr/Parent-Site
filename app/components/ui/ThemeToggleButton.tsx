"use client";

import { Moon, Sun } from "lucide-react";
import type { ThemeMode } from "./themeMode";

export default function ThemeToggleButton({
  theme,
  onToggle,
  className = "",
}: {
  theme: ThemeMode;
  onToggle: () => void;
  className?: string;
}) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 bg-cream-dark text-charcoal/70 transition-colors hover:border-charcoal/40 hover:text-charcoal " +
        className
      }
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
