"use client";

import { useState } from "react";
import { type KeywordGroup } from "@/lib/report-schema";
import { InlineMarkdown } from "./inline";

const num2 = (i: number) => String(i).padStart(2, "0");

export function KeywordGroupsList({
  groups,
}: {
  groups: KeywordGroup[];
}) {
  const [openSet, setOpenSet] = useState<Set<string>>(
    () => new Set(groups[0] ? [groups[0].id] : []),
  );

  const toggle = (id: string) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="kw-groups">
      {groups.map((group, i) => {
        const isOpen = openSet.has(group.id);
        return (
          <div
            key={group.id}
            className={`kw-group ${isOpen ? "is-open" : ""}`}
          >
            <button
              type="button"
              className="kw-summary"
              aria-expanded={isOpen}
              onClick={() => toggle(group.id)}
            >
              <span className="kw-index">{num2(i + 1)}</span>
              <div>
                <div className="kw-label">{group.label}</div>
                <p className="kw-summary-text">
                  <InlineMarkdown text={group.summary} />
                </p>
              </div>
              {group.highlight && (
                <span className="kw-highlight">{group.highlight}</span>
              )}
              <span className="kw-chevron" aria-hidden />
            </button>
            {isOpen && (
              <div className="kw-body">
                {group.intro && (
                  <p className="kw-body-intro">
                    <InlineMarkdown text={group.intro} />
                  </p>
                )}
                <div className="report-table-wrap">
                  <table className="report-table">
                    <thead>
                      <tr>
                        {group.table.headers.map((h) => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {group.table.rows.map((row, ri) => (
                        <tr key={ri}>
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className={
                                ci === 0
                                  ? "emphasize"
                                  : ci === 1
                                    ? "num"
                                    : ""
                              }
                            >
                              <InlineMarkdown text={cell} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {group.takeaway && (
                  <div className="kw-takeaway">
                    <InlineMarkdown text={group.takeaway} />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
