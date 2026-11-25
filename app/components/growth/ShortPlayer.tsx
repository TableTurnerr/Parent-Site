"use client";
// Vertical (9:16) click-to-play facade for the client YouTube short: thumbnail first, the privacy-enhanced player
// only after a click, same approach as VideoPlayer.
import { useState } from "react";
import { Play } from "lucide-react";
import { CLIENT_SHORT, shortEmbedFor, shortThumbWebpFor, type Short } from "@/app/lib/growth/video";

export default function ShortPlayer({ compact = false, video = CLIENT_SHORT, summary = false }: { compact?: boolean; video?: Short; summary?: boolean }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div>
    <div className={`relative mx-auto aspect-[9/16] w-full ${compact ? "max-w-[12.5rem]" : "max-w-[20rem]"} overflow-hidden rounded-[1.75rem] border border-line bg-night shadow-[0_30px_70px_-40px_rgba(10,19,38,0.55)]`}>
      {playing ? (
        <iframe
          src={`${shortEmbedFor(video)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 h-full w-full cursor-pointer" aria-label={`Play video: ${video.title} (${video.durationLabel})`}>
          {/* Remote YouTube thumbnail; next/image would need a remotePatterns change for i.ytimg.com. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shortThumbWebpFor(video)} alt={`Video: ${video.title}`} width={1080} height={1920} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
          <span aria-hidden className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#fff] text-[#0a1326] shadow-xl transition-transform group-hover:scale-110">
            <Play className="ml-1 h-7 w-7 fill-current" />
          </span>
          <span className="absolute bottom-4 left-4 right-4 text-left text-sm font-semibold text-white">
            {video.title} · {video.durationLabel}
          </span>
        </button>
      )}
    </div>
      {summary && video.summary && (
        <details className="mx-auto mt-3 max-w-[20rem] text-left text-sm text-ink-soft">
          <summary className="cursor-pointer font-semibold text-ink">What&apos;s in this video</summary>
          <div className="mt-2 space-y-2 leading-relaxed">{video.summary.map((p) => <p key={p}>{p}</p>)}</div>
        </details>
      )}
    </div>
  );
}
