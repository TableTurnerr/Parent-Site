"use client";

// Click-to-play YouTube facade: shows the thumbnail and a play button, and only loads the (privacy-enhanced)
// YouTube player after a click, so pages don't pay YouTube's ~1 MB of scripts up front (protects LCP/INP).
import { useState } from "react";
import { Play } from "lucide-react";
import { VSL, fmtTime, vslEmbedUrl, vslThumb } from "@/app/lib/growth/video";

export default function VideoPlayer({ showChapters = true }: { showChapters?: boolean }) {
  const [start, setStart] = useState<number | null>(null);
  const playing = start !== null;

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-night shadow-[0_30px_70px_-40px_rgba(10,19,38,0.55)]">
        {playing ? (
          <iframe
            key={start}
            src={`${vslEmbedUrl}?autoplay=1&rel=0&modestbranding=1&start=${start}`}
            title={VSL.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setStart(0)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Play video: ${VSL.title} (${VSL.durationLabel})`}
            data-analytics-event="vsl_play"
          >
            {/* Remote YouTube thumbnail; next/image would need a remotePatterns change for i.ytimg.com. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={vslThumb} alt="" width={1280} height={720} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/10 to-transparent" />
            <span aria-hidden className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-night shadow-xl transition-transform group-hover:scale-110 md:h-20 md:w-20">
              <Play className="ml-1 h-7 w-7 fill-current md:h-8 md:w-8" />
            </span>
            <span className="absolute bottom-3 left-3 right-3 text-left text-sm font-semibold text-white md:bottom-5 md:left-5 md:text-base">
              Watch: how it works and what it costs · {VSL.durationLabel}
            </span>
          </button>
        )}
      </div>
      {showChapters && (
        <details className="mt-4 rounded-xl border border-line bg-bg p-4 text-sm">
          <summary className="cursor-pointer font-semibold text-ink">Jump to a chapter</summary>
          <ol className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {VSL.chapters.map(([s, label]) => (
              <li key={s}>
                <button type="button" onClick={() => setStart(s)} className="flex w-full gap-2 rounded-md px-2 py-1 text-left text-ink-soft hover:bg-surface hover:text-ink">
                  <span className="w-10 shrink-0 font-mono text-xs leading-5 text-primary">{fmtTime(s)}</span>
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ol>
        </details>
      )}
    </div>
  );
}
