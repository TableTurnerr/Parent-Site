"use client";

import { useState } from "react";

export function ReportActions({ title }: { title: string }) {
  const [shareLabel, setShareLabel] = useState<"Share" | "Copied" | "Sharing…">(
    "Share",
  );

  const onPrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const onShare = async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    const shareData = {
      title: `${title} — Digital Presence Report`,
      text: `Digital Presence Report for ${title}`,
      url,
    };
    try {
      if (typeof navigator !== "undefined" && "share" in navigator) {
        setShareLabel("Sharing…");
        await navigator.share(shareData);
        setShareLabel("Share");
        return;
      }
    } catch {
      // user dismissed or share failed — fall through to clipboard
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareLabel("Copied");
      setTimeout(() => setShareLabel("Share"), 1800);
    } catch {
      setShareLabel("Share");
    }
  };

  return (
    <div className="report-actions">
      <button
        type="button"
        onClick={onPrint}
        className="report-action-btn"
        aria-label="Print report"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
        <span>Print</span>
      </button>
      <button
        type="button"
        onClick={onShare}
        className="report-action-btn"
        aria-label="Share report"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        <span>{shareLabel}</span>
      </button>
    </div>
  );
}
