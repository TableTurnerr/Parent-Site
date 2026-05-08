'use client';

import { useEffect, useState } from "react";

type Mode = "light" | "dark";

const PALETTES: Record<Mode, {
  bg: string;
  fg: string;
  muted: string;
  mutedFaint: string;
  buttonBorder: string;
  logoFill: string;
  primaryBg: string;
  primaryFg: string;
}> = {
  light: {
    bg: "#FAFAF8",
    fg: "#1A1A1A",
    muted: "#6B6560",
    mutedFaint: "#9E9890",
    buttonBorder: "rgba(26,26,26,0.2)",
    logoFill: "#1A1A1A",
    primaryBg: "#1A1A1A",
    primaryFg: "#FAFAF8",
  },
  dark: {
    bg: "#0F0F11",
    fg: "#FAFAF8",
    muted: "#B5B0AB",
    mutedFaint: "#75716B",
    buttonBorder: "rgba(250,250,248,0.25)",
    logoFill: "#FAFAF8",
    primaryBg: "#FAFAF8",
    primaryFg: "#1A1A1A",
  },
};

function readThemeCookie(): Mode | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|; )admin-theme=([^;]*)/);
  if (!m) return null;
  const v = decodeURIComponent(m[1]);
  return v === "dark" || v === "light" ? v : null;
}

function writeThemeCookie(theme: Mode) {
  document.cookie = `admin-theme=${theme}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  const [mode, setMode] = useState<Mode>("light");

  useEffect(() => {
    const cookie = readThemeCookie();
    if (cookie) {
      setMode(cookie);
      return;
    }
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    setMode(mql.matches ? "dark" : "light");
    const handler = (e: MediaQueryListEvent) =>
      setMode(e.matches ? "dark" : "light");
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const c = PALETTES[mode];

  return (
    <html lang="en">
      <head>
        {/* Pre-hydration paint: respects prefers-color-scheme by default;
            cookie wins via the inline script below (sets data-theme on <html>). */}
        <style
          dangerouslySetInnerHTML={{
            __html: `html[data-theme=dark] body{background-color:#0F0F11 !important;color:#FAFAF8 !important}html[data-theme=light] body{background-color:#FAFAF8 !important;color:#1A1A1A !important}@media (prefers-color-scheme: dark){html:not([data-theme]) body{background-color:#0F0F11 !important;color:#FAFAF8 !important}}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=document.cookie.match(/(?:^|; )admin-theme=([^;]*)/);var t=m?decodeURIComponent(m[1]):null;if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: c.bg,
          color: c.fg,
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "1.5rem",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Theme toggle (top-right) */}
        <button
          type="button"
          onClick={() => {
            const next: Mode = mode === "dark" ? "light" : "dark";
            setMode(next);
            writeThemeCookie(next);
            document.documentElement.setAttribute("data-theme", next);
          }}
          aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "9999px",
            border: `1px solid ${c.buttonBorder}`,
            backgroundColor: "transparent",
            color: c.fg,
            cursor: "pointer",
          }}
        >
          {mode === "dark" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Simple inline SVG logo */}
        <a href="/" aria-label="Back to home" style={{ marginBottom: "2.5rem" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="43"
            height="38"
            viewBox="0 0 43 38"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.34942 2.36898L4.69883 4.73796H9.74991H14.8007L17.1415 2.36898L19.4823 0H9.74103H0L2.34942 2.36898ZM20.4703 4.54317L15.9656 9.08661L15.9774 20.0073L15.9892 30.9283L19.3909 34.4642L22.7923 38L26.1762 34.591L29.5604 31.1823L29.4917 21.7709L29.423 12.3595L26.4179 14.898C24.7652 16.2941 23.3541 17.4978 23.2823 17.5731C23.1581 17.7031 24.1929 17.5052 25.1767 17.2106C25.6021 17.0832 25.634 17.4623 25.634 22.6424V28.2109L24.2188 29.6944L22.8038 31.1776L21.7471 30.0002L20.6906 28.8226L20.6799 19.8689L20.6692 10.9155L23.7435 7.82658L26.8177 4.73796H32.5681H38.3184L40.6592 2.36898L43 0H33.9875H24.9753L20.4703 4.54317Z"
              fill={c.logoFill}
            />
          </svg>
        </a>

        <h1
          style={{
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 600,
            marginBottom: "0.75rem",
            lineHeight: 1.2,
          }}
        >
          Plot twist: an error
        </h1>

        <p
          style={{
            fontSize: "1.125rem",
            color: c.muted,
            maxWidth: "28rem",
            marginBottom: "2rem",
            lineHeight: 1.6,
          }}
        >
          Something unexpected happened and our team has been quietly notified.
          Try again in a moment.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={reset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: c.primaryBg,
              color: c.primaryFg,
              border: "none",
              borderRadius: "9999px",
              padding: "0.875rem 1.75rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>

          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "transparent",
              color: c.fg,
              border: `1.5px solid ${c.buttonBorder}`,
              borderRadius: "9999px",
              padding: "0.875rem 1.75rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Back to Home
          </a>
        </div>

        {error.digest && (
          <p
            style={{
              marginTop: "2rem",
              fontSize: "0.75rem",
              color: c.mutedFaint,
              fontFamily: "monospace",
            }}
          >
            Error ID: {error.digest}
          </p>
        )}
      </body>
    </html>
  );
}
