"use client";

import { useState, type ReactNode } from "react";
import { InlineMarkdown } from "./inline";

const num2 = (i: number) => String(i).padStart(2, "0");

export function CollapsibleSection({
  id,
  index,
  title,
  intro,
  defaultOpen = false,
  children,
}: {
  id: string;
  index: number;
  title: string;
  intro?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section
      className={`section rp-collapsible ${open ? "is-open" : ""}`}
      id={id}
    >
      <button
        type="button"
        className="rp-collapsible-toggle"
        aria-expanded={open}
        aria-controls={`${id}-body`}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="rp-collapsible-head">
          <div className="section-num">
            <span>{`Section ${num2(index)}`}</span>
          </div>
          <h2>{title}</h2>
          {intro && (
            <p className="section-intro">
              <InlineMarkdown text={intro} />
            </p>
          )}
        </div>
        <span className="rp-expand-indicator" aria-hidden>
          <span className="rp-expand-icon">
            <span className="rp-chev rp-chev-1" />
            <span className="rp-chev rp-chev-2" />
          </span>
          <span className="rp-expand-label">
            {open ? "Click to Collapse" : "Click to Expand"}
          </span>
        </span>
      </button>
      <div
        id={`${id}-body`}
        className="rp-collapsible-body"
        hidden={!open}
        aria-hidden={!open}
      >
        {children}
      </div>
    </section>
  );
}

export function CollapsibleProblem({
  number,
  title,
  defaultOpen = false,
  children,
}: {
  number: number;
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`problem rp-collapsible-problem ${open ? "is-open" : ""}`}>
      <button
        type="button"
        className="rp-problem-toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="problem-num">
          <span>{num2(number)}</span>
          Problem
        </div>
        <div className="rp-problem-headline">
          <h3>{title}</h3>
          <span className="rp-expand-indicator rp-expand-indicator-sm" aria-hidden>
            <span className="rp-expand-icon">
              <span className="rp-chev rp-chev-1" />
              <span className="rp-chev rp-chev-2" />
            </span>
            <span className="rp-expand-label">
              {open ? "Click to Collapse" : "Click to Expand"}
            </span>
          </span>
        </div>
      </button>
      <div className="rp-problem-body" hidden={!open} aria-hidden={!open}>
        {children}
      </div>
    </div>
  );
}
