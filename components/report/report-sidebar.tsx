"use client";

import { useEffect, useState } from "react";
import type { LetterGrade, RatingCategory } from "@/lib/report-schema";

type SectionLink = { id: string; label: string };

const num2 = (i: number) => String(i).padStart(2, "0");

function toneFor(score: number): string {
  if (score >= 80) return "green";
  if (score >= 60) return "lime";
  if (score >= 40) return "amber";
  if (score >= 25) return "orange";
  return "rose";
}

function useActiveSection(sections: SectionLink[]) {
  const [active, setActive] = useState<string | null>(sections[0]?.id ?? null);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 200;
      let current = sections[0]?.id ?? null;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        if (el.offsetTop <= y) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);
  return active;
}

export function ReportSidebar({
  overallGrade,
  graderScore,
  ratings,
  preparedDate,
  sections,
}: {
  overallGrade: LetterGrade;
  graderScore?: number;
  ratings: RatingCategory[];
  preparedDate: string;
  sections: SectionLink[];
}) {
  const active = useActiveSection(sections);
  const letter = overallGrade.charAt(0);
  const modifier = overallGrade.slice(1);

  return (
    <aside className="sidebar">
      <div className="side-block">
        <div className="side-eyebrow">
          <span>Verdict</span>
          <span className="num">{preparedDate}</span>
        </div>
        <div className="side-grade">
          <div className="side-grade-letter">
            {letter}
            {modifier && <span>{modifier}</span>}
          </div>
          <div className="side-grade-meta">
            {typeof graderScore === "number" ? (
              <>
                <span className="num">{graderScore}/100</span>
                <span>Online presence</span>
              </>
            ) : (
              <span>Online presence</span>
            )}
          </div>
        </div>
      </div>

      {ratings.length > 0 && (
        <div className="side-block">
          <div className="side-eyebrow">
            <span>Score Breakdown</span>
            <span className="num">{ratings.length}</span>
          </div>
          <ul className="score-list">
            {ratings.map((r) => (
              <li className="score-row" key={r.key}>
                <div className="score-row-top">
                  <span className="score-label">{r.label}</span>
                  <span className="score-value">{r.score}</span>
                </div>
                <div className="score-track">
                  <div
                    className="score-fill"
                    data-tone={toneFor(r.score)}
                    style={{ width: `${Math.max(2, Math.min(100, r.score))}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

    </aside>
  );
}

export function ReportRail({ sections }: { sections: SectionLink[] }) {
  const active = useActiveSection(sections);
  if (sections.length === 0) return null;
  return (
    <aside className="rail">
      <div className="side-block">
        <div className="side-eyebrow">
          <span>Sections</span>
          <span className="num">{num2(sections.length)}</span>
        </div>
        <ul className="section-nav">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={active === s.id ? "is-active" : ""}
              >
                <span className="num">{num2(i + 1)}</span>
                <span>{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
