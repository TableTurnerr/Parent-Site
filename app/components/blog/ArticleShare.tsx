"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

/**
 * Share row for a blog post: prefilled X / Facebook / LinkedIn links plus a
 * copy-link button. The share targets are public URLs (the post itself), so
 * nothing sensitive is exposed.
 */
export default function ArticleShare({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;

  const links = [
    { label: "X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* clipboard blocked; ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-12 max-w-3xl border-t border-border pt-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-charcoal">Share this article</span>
        <div className="flex flex-wrap items-center gap-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-4 py-2 text-sm text-charcoal transition-colors hover:border-charcoal/40 hover:text-accent"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-charcoal transition-colors hover:border-charcoal/40"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>
    </div>
  );
}
