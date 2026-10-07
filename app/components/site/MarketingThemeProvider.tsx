"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import {
  NO_FLASH_THEME_SCRIPT,
  useThemeMode,
  type ThemeControls,
} from "@/app/components/ui/themeMode";

const MarketingThemeContext = createContext<ThemeControls | null>(null);

export function useMarketingTheme(): ThemeControls {
  const theme = useContext(MarketingThemeContext);
  if (!theme) {
    throw new Error("useMarketingTheme must be used within MarketingThemeProvider");
  }
  return theme;
}

export default function MarketingThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const theme = useThemeMode(wrapperRef);

  return (
    <MarketingThemeContext.Provider value={theme}>
      <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME_SCRIPT }} />
      <div
        ref={wrapperRef}
        suppressHydrationWarning
        className="min-h-screen bg-bg text-ink-soft"
      >
        {children}
      </div>
    </MarketingThemeContext.Provider>
  );
}
