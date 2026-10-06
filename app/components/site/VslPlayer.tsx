"use client";

import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function VslPlayer() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const anchor = anchorRef.current;
    if (!anchor) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFloating(!entry.isIntersecting),
      { threshold: 0.35 },
    );

    observer.observe(anchor);
    return () => observer.disconnect();
  }, [isPlaying]);

  function playVideo() {
    const video = videoRef.current;
    if (!video) return;
    void video.play();
  }

  return (
    <div ref={anchorRef} className="relative aspect-video">
      <motion.div
        layout
        initial={false}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className={`aspect-video ${
          isFloating
            ? "fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm md:bottom-6 md:right-6 md:w-[26rem]"
            : "absolute inset-0"
        }`}
      >
        <div aria-hidden className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-primary/15 blur-3xl" />
        <div className="h-full overflow-hidden rounded-[1.5rem] border-[3px] border-ink bg-ink p-1.5 shadow-[0_35px_80px_-35px_rgba(10,19,38,0.55)] sm:p-2">
          <div className="relative h-full overflow-hidden rounded-[1.1rem] bg-ink">
            <video
              ref={videoRef}
              className="block h-full w-full object-cover"
              controls={hasStarted}
              playsInline
              preload="metadata"
              poster="/videos/tableturnerr-vsl-poster.webp"
              aria-label="Watch the TableTurnerr overview video"
              onPlay={() => {
                setHasStarted(true);
                setIsPlaying(true);
              }}
              onPause={() => {
                setIsPlaying(false);
                setIsFloating(false);
              }}
              onEnded={() => {
                setIsPlaying(false);
                setIsFloating(false);
              }}
            >
              <source src="/videos/tableturnerr-vsl.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>

            {!isPlaying && (
              <button
                type="button"
                onClick={playVideo}
                aria-label="Play the TableTurnerr overview video"
                className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-primary text-white shadow-[0_12px_30px_rgba(10,19,38,0.4)] transition duration-200 hover:scale-105 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:h-20 sm:w-20"
              >
                <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" aria-hidden />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
