export default function PostsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-7 w-16 rounded-lg bg-[var(--color-border)]" />
        <div className="h-10 w-28 rounded-full bg-[var(--color-border)]" />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-lg bg-[var(--color-cream-dark)] p-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-8 w-20 rounded-md bg-[var(--color-border)]" />
          ))}
        </div>
        <div className="h-9 w-64 rounded-lg bg-[var(--color-border)]" />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white">
        {/* Table header */}
        <div className="flex border-b border-[var(--color-border)] px-6 py-3">
          <div className="h-3 w-16 rounded bg-[var(--color-border)]" />
          <div className="ml-auto h-3 w-16 rounded bg-[var(--color-border)]" />
        </div>
        {/* Table rows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4 last:border-0"
          >
            <div className="flex-1">
              <div className="h-4 w-52 rounded bg-[var(--color-border)]" />
              <div className="mt-1 h-3 w-72 rounded bg-[var(--color-border)]" />
            </div>
            <div className="hidden items-center gap-6 sm:flex">
              <div className="h-4 w-20 rounded bg-[var(--color-border)]" />
              <div className="h-6 w-16 rounded-full bg-[var(--color-border)]" />
              <div className="h-4 w-24 rounded bg-[var(--color-border)]" />
            </div>
            <div className="ml-4 h-7 w-7 rounded-lg bg-[var(--color-border)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
