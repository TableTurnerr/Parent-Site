"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Plain <img> that swaps to a branded fallback if the source is missing or
 * fails to load. Used for client-site screenshots and hero art so a missing
 * file never shows a broken-image icon (we dropped thum.io live screenshots
 * because its free tier started blocking requests).
 */
export default function SafeImage({
  src,
  alt,
  className,
  fallback,
  loading = "lazy",
}: {
  src?: string;
  alt: string;
  className?: string;
  fallback: ReactNode;
  loading?: "lazy" | "eager";
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn(className)}
      loading={loading}
      onError={() => setFailed(true)}
    />
  );
}
