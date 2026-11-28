// Presidential Roofing's Google review count before and after (app/lib/growth/results.mjs), as two bars.
// We only have the two counts (day 0 and day 20), so the chart draws exactly those two points and nothing in between.
// Inline SVG, no chart library. Colours come from the theme tokens, so it follows light and dark mode.
import { getResult } from "@/app/lib/growth";

export default function ReviewGrowthChart({ id = "review-growth", compact = false, className = "" }: {
  /** Unique per page: used for the SVG title/description ids. */
  id?: string;
  /** Smaller version without the caption, for use inside a card. */
  compact?: boolean;
  className?: string;
}) {
  const r = getResult("presidential-roofing");
  if (!r) return null;

  // Chart area: y axis 0 to 50 reviews (bars start at zero so the growth isn't exaggerated).
  const W = 320, H = 200, top = 34, bottom = 160, max = 50;
  const y = (v: number) => bottom - ((bottom - top) * v) / max;
  const bars = [
    { x: 70, v: r.reviewsBefore, label: "Day 0", after: false },
    { x: 190, v: r.reviewsAfter, label: `Day ${r.days}`, after: true },
  ];
  const bw = 64;
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  // Arrow from just right of the first count to just left of the second.
  const a = { x: bars[0].x + bw / 2 + 20, y: y(bars[0].v) - 26 };
  const e = { x: bars[1].x - 2, y: y(bars[1].v) - 20 };
  const peak = Math.min(a.y, e.y) - 14;

  return (
    <figure className={className}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${titleId} ${descId}`} className="h-auto w-full">
        <title id={titleId}>{`${r.client} Google reviews: ${r.reviewsBefore} on day 0, ${r.reviewsAfter} on day ${r.days}`}</title>
        <desc id={descId}>{`Two bars. Day 0: ${r.reviewsBefore} reviews. Day ${r.days}: ${r.reviewsAfter} reviews, ${r.added} more (+${r.pct}%).`}</desc>

        {/* gridlines at 0, 25 and 50 reviews */}
        {[0, 25, 50].map((v) => (
          <g key={v}>
            <line x1="40" x2={W - 12} y1={y(v)} y2={y(v)} className="stroke-line" strokeWidth="1" strokeDasharray={v === 0 ? undefined : "3 4"} />
            <text x="32" y={y(v) + 4} textAnchor="end" className="fill-muted" fontSize="11">{v}</text>
          </g>
        ))}

        {bars.map((bar) => (
          <g key={bar.label}>
            <rect
              x={bar.x}
              y={y(bar.v)}
              width={bw}
              height={bottom - y(bar.v)}
              rx="8"
              className={bar.after ? "fill-primary" : "fill-surface-2 stroke-line"}
              strokeWidth={bar.after ? 0 : 1}
            />
            <text x={bar.x + bw / 2} y={y(bar.v) - 8} textAnchor="middle" className="fill-ink" fontSize="20" fontWeight="700">{bar.v}</text>
            <text x={bar.x + bw / 2} y={bottom + 20} textAnchor="middle" className="fill-ink-soft" fontSize="12" fontWeight="600">{bar.label}</text>
          </g>
        ))}

        {/* annotation arrow between the two counts (marks the change, not a trend line) */}
        <path
          d={`M ${a.x} ${a.y} Q ${(a.x + e.x) / 2} ${peak} ${e.x} ${e.y}`}
          fill="none"
          className="stroke-success"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d={`M ${e.x - 9} ${e.y - 1} L ${e.x} ${e.y} L ${e.x - 4} ${e.y - 8}`} fill="none" className="stroke-success" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x={(a.x + e.x) / 2} y={peak - 4} textAnchor="middle" className="fill-success" fontSize="12" fontWeight="700">
          {`+${r.added} reviews (+${r.pct}%)`}
        </text>
      </svg>
      {!compact && (
        <figcaption className="mt-3 text-sm leading-relaxed text-ink-soft">
          {r.client}&apos;s Google review count when we started and {r.days} days later. Two real counts, nothing estimated in between.
        </figcaption>
      )}
    </figure>
  );
}
