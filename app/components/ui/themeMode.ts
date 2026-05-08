"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";

export type ThemeMode = "light" | "dark";

const COOKIE_NAME = "admin-theme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function readThemeCookie(): ThemeMode | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )admin-theme=([^;]*)/);
  if (!match) return null;
  const value = decodeURIComponent(match[1]);
  return value === "dark" || value === "light" ? value : null;
}

function writeThemeCookie(theme: ThemeMode): void {
  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
}

export interface ThemeControls {
  theme: ThemeMode;
  setTheme: (next: ThemeMode) => void;
  toggle: () => void;
}

/**
 * Applies the resolved `dark` class to the element held in `ref`. Resolves
 * via `admin-theme` cookie first (user choice), then `prefers-color-scheme`
 * (system default). Subscribes to system-preference changes when no cookie
 * is set so the page tracks the OS in real time.
 *
 * Returns `{ theme, setTheme, toggle }` so a UI control can switch modes
 * and persist the choice via cookie.
 *
 * Pair with `<script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME_SCRIPT }} />`
 * placed immediately before the wrapper element to avoid a flash before
 * hydration.
 */
export function useThemeMode(ref: RefObject<HTMLElement | null>): ThemeControls {
  const [theme, setThemeState] = useState<ThemeMode>("light");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const apply = (next: ThemeMode) => {
      el.classList.toggle("dark", next === "dark");
      setThemeState(next);
    };

    const cookie = readThemeCookie();
    if (cookie) {
      apply(cookie);
      return;
    }

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    apply(mql.matches ? "dark" : "light");
    const handler = (e: MediaQueryListEvent) =>
      apply(e.matches ? "dark" : "light");
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [ref]);

  const setTheme = useCallback(
    (next: ThemeMode) => {
      const el = ref.current;
      if (el) el.classList.toggle("dark", next === "dark");
      setThemeState(next);
      writeThemeCookie(next);
    },
    [ref],
  );

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return { theme, setTheme, toggle };
}

/**
 * Inline script that runs synchronously before hydration to apply the
 * resolved `dark` class to its next sibling element.
 */
export const NO_FLASH_THEME_SCRIPT = `(function(){try{var s=document.currentScript;var el=s&&s.nextElementSibling;if(!el)return;var m=document.cookie.match(/(?:^|; )${COOKIE_NAME}=([^;]*)/);var t=m?decodeURIComponent(m[1]):null;if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}el.classList.toggle('dark',t==='dark');}catch(e){}})();`;
