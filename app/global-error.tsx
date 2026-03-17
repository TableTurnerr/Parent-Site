'use client';

import { useEffect } from "react";

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

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAFAF8",
          color: "#1A1A1A",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "1.5rem",
          textAlign: "center",
        }}
      >
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
              fill="#1A1A1A"
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
          We&rsquo;ll be right back
        </h1>

        <p
          style={{
            fontSize: "1.125rem",
            color: "#6B6560",
            maxWidth: "28rem",
            marginBottom: "2rem",
            lineHeight: 1.6,
          }}
        >
          Something unexpected happened. Our team has been notified.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={reset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#1A1A1A",
              color: "#FAFAF8",
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
              color: "#1A1A1A",
              border: "1.5px solid rgba(26,26,26,0.2)",
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
              color: "#9E9890",
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
