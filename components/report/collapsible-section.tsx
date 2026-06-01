"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { InlineMarkdown } from "./inline";

const num2 = (i: number) => String(i).padStart(2, "0");

export function CollapsibleSection({
  id,
  index,
  title,
  intro,
  defaultOpen = false,
  depth = 0,
  children,
}: {
  id: string;
  index: number;
  title: string;
  intro?: string;
  defaultOpen?: boolean;
  depth?: number;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section
      className={`section rp-collapsible ${open ? "is-open" : ""} ${depth > 0 ? "is-child" : ""}`}
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
          {depth === 0 && (
            <div className="section-num">
              <span>{`Section ${num2(index)}`}</span>
            </div>
          )}
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

export function StepInfoTooltip({ info }: { info: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <span
      ref={wrapRef}
      className={`rp-step-info ${open ? "is-open" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="rp-step-info-btn"
        aria-label="More info"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        i
      </button>
      <span className="rp-step-info-pop" role="tooltip" hidden={!open}>
        <InlineMarkdown text={info} />
      </span>
    </span>
  );
}
