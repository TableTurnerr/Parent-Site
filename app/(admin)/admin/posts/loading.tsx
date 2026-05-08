export default function PostsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="h-7 w-20 rounded-lg bg-[var(--color-border)]" />
          <div className="mt-2 h-4 w-64 rounded bg-[var(--color-border)]" />
        </div>
        <div className="h-10 w-full sm:w-28 rounded-full bg-[var(--color-border)]" />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-lg bg-[var(--color-cream-dark)] p-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-8 w-20 rounded-md bg-[var(--color-border)]" />
          ))}
        </div>
        <div className="h-9 w-full sm:w-64 rounded-lg bg-[var(--color-border)]" />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white overflow-hidden">
        {/* Table header */}
        <div className="flex items-center gap-6 border-b border-[var(--color-border)] px-6 py-3">
          <div className="h-3 w-12 flex-1 rounded bg-[var(--color-border)]" />
          <div className="hidden h-3 w-16 rounded bg-[var(--color-border)] md:block" />
          <div className="hidden h-3 w-14 rounded bg-[var(--color-border)] sm:block" />
          <div className="hidden h-3 w-12 rounded bg-[var(--color-border)] lg:block" />
          <div className="ml-auto h-3 w-16 rounded bg-[var(--color-border)]" />
        </div>
        {/* Table rows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-6 border-b border-[var(--color-border)] px-6 py-4 last:border-0"
          >
            <div className="flex-1 min-w-0">
              <div className="h-4 w-52 max-w-full rounded bg-[var(--color-border)]" />
              <div className="mt-1.5 h-3 w-72 max-w-full rounded bg-[var(--color-border)]" />
            </div>
            <div className="hidden h-4 w-24 rounded bg-[var(--color-border)] md:block" />
            <div className="hidden h-6 w-16 rounded-full bg-[var(--color-border)] sm:block" />
            <div className="hidden h-4 w-20 rounded bg-[var(--color-border)] lg:block" />
            <div className="h-7 w-7 rounded-lg bg-[var(--color-border)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
