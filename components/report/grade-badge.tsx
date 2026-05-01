import { gradeTone, toneClasses, type LetterGrade } from "@/lib/report-schema";
import { cn } from "@/lib/utils";

export function GradeBadge({
  grade,
  size = "md",
  className,
}: {
  grade: LetterGrade;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const tone = gradeTone(grade);
  const t = toneClasses[tone];
  const sizes = {
    sm: "h-7 min-w-7 px-2 text-xs",
    md: "h-9 min-w-9 px-2.5 text-sm",
    lg: "h-12 min-w-12 px-3 text-lg",
    xl: "h-20 min-w-20 px-4 text-3xl",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-bold tabular-nums ring-1 ring-inset",
        t.bg,
        t.text,
        t.ring,
        sizes[size],
        className,
      )}
    >
      {grade}
    </span>
  );
}

export function ScoreBar({ score, label }: { score: number; label?: string }) {
  const tone =
    score >= 70 ? "good" : score >= 50 ? "ok" : score >= 30 ? "weak" : "poor";
  const t = toneClasses[tone];
  return (
    <div className="w-full">
      {label && (
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-warm-gray">{label}</span>
          <span className="font-semibold tabular-nums text-charcoal">
            {score}
          </span>
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-cream-dark">
        <div
          className={cn("h-full rounded-full transition-all", t.bar)}
          style={{ width: `${Math.max(2, Math.min(100, score))}%` }}
        />
      </div>
    </div>
  );
}
