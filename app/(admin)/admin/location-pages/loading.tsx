export default function LocationPagesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-7 w-40 rounded-lg bg-[var(--color-border)]" />
        <div className="mt-2 h-4 w-64 rounded bg-[var(--color-border)]" />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:flex-wrap">
        <div className="flex-1 min-w-[180px]">
          <div className="mb-1.5 h-3 w-14 rounded bg-[var(--color-border)]" />
          <div className="flex gap-1 rounded-lg bg-[var(--color-cream-dark)] p-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-20 rounded-md bg-[var(--color-border)]"
              />
            ))}
          </div>
        </div>
        <div className="min-w-[180px]">
          <div className="mb-1.5 h-3 w-8 rounded bg-[var(--color-border)]" />
          <div className="flex gap-1 rounded-lg bg-[var(--color-cream-dark)] p-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 rounded-md bg-[var(--color-border)]"
              />
            ))}
          </div>
        </div>
        <div className="h-9 w-64 rounded-lg bg-[var(--color-border)] sm:ml-auto" />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white">
        <div className="flex border-b border-[var(--color-border)] px-6 py-3 gap-8">
          <div className="h-3 w-20 rounded bg-[var(--color-border)]" />
          <div className="h-3 w-16 rounded bg-[var(--color-border)]" />
          <div className="ml-auto h-3 w-12 rounded bg-[var(--color-border)]" />
        </div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4 last:border-0"
          >
            <div className="flex-1">
              <div className="h-4 w-64 rounded bg-[var(--color-border)]" />
              <div className="mt-1 h-3 w-36 rounded bg-[var(--color-border)]" />
            </div>
            <div className="hidden items-center gap-6 sm:flex">
              <div className="h-6 w-16 rounded-full bg-[var(--color-border)]" />
              <div className="h-4 w-24 rounded bg-[var(--color-border)]" />
              <div className="h-4 w-48 rounded bg-[var(--color-border)]" />
            </div>
            <div className="ml-4 h-7 w-14 rounded-lg bg-[var(--color-border)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
