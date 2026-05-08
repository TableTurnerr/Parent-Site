export default function ReportDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 h-7 w-7 rounded-lg bg-[var(--color-border)]" />
          <div>
            <div className="h-7 w-56 rounded-lg bg-[var(--color-border)]" />
            <div className="mt-1.5 h-4 w-40 rounded bg-[var(--color-border)]" />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="h-8 w-24 rounded-full bg-[var(--color-border)]" />
          <div className="h-8 w-28 rounded-full bg-[var(--color-border)]" />
          <div className="h-8 w-28 rounded-full bg-[var(--color-border)]" />
          <div className="h-8 w-24 rounded-full bg-[var(--color-border)]" />
          <div className="h-8 w-8 rounded-full bg-[var(--color-border)]" />
        </div>
      </div>

      {/* Score card */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="h-4 w-44 rounded bg-[var(--color-border)]" />
            <div className="mt-1.5 h-3 w-32 rounded bg-[var(--color-border)]" />
          </div>
          <div className="flex items-baseline gap-1">
            <div className="h-10 w-14 rounded bg-[var(--color-border)]" />
            <div className="h-4 w-10 rounded bg-[var(--color-border)]" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-lg bg-[var(--color-cream)] px-3 py-4 text-center"
            >
              <div className="h-3 w-12 rounded bg-[var(--color-border)]" />
              <div className="mt-2 h-6 w-10 rounded bg-[var(--color-border)]" />
            </div>
          ))}
        </div>
      </div>

      {/* Variant tabs */}
      <div className="flex items-center gap-1 rounded-lg bg-[var(--color-cream-dark)] p-1 w-fit">
        <div className="h-8 w-28 rounded-md bg-[var(--color-border)]" />
        <div className="h-8 w-32 rounded-md bg-[var(--color-border)]" />
      </div>

      {/* Editor body */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
          <div className="h-4 w-36 rounded bg-[var(--color-border)]" />
          <div className="h-7 w-20 rounded-full bg-[var(--color-border)]" />
        </div>
        <div className="space-y-3 p-6">
          {[92, 78, 85, 70, 88, 65, 80, 74, 90].map((w, i) => (
            <div
              key={i}
              className="h-4 rounded bg-[var(--color-border)]"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>

      {/* Talk to AI placeholder */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-[var(--color-border)]" />
            <div className="h-4 w-24 rounded bg-[var(--color-border)]" />
          </div>
          <div className="h-4 w-4 rounded bg-[var(--color-border)]" />
        </div>
      </div>
    </div>
  );
}
