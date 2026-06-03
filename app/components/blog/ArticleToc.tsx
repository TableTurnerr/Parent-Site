"use client";

import { useEffect, useState } from "react";

/**
 * Sticky "On this page" table of contents with scroll-spy. Highlights the
 * heading currently in view using an IntersectionObserver against the H2 ids
 * injected server-side by buildArticle(). Anchor clicks rely on the global
 * smooth-scroll + scroll-margin-top so targets clear the fixed navbar.
 */
export default function ArticleToc({
  items,
}: {
  items: { id: string; text: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-warm-gray">
        On this page
      </p>
      <ol className="space-y-1 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={`-ml-px block border-l-2 py-1 pl-4 text-[0.9rem] leading-snug transition-colors ${
                active === item.id
                  ? "border-accent font-medium text-charcoal"
                  : "border-transparent text-warm-gray hover:text-charcoal"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
