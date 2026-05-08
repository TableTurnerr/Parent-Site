export default function ReportsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-7 w-44 rounded-lg bg-[var(--color-border)]" />
        <div className="mt-2 space-y-1.5">
          <div className="h-4 w-full max-w-2xl rounded bg-[var(--color-border)]" />
          <div className="h-4 w-2/3 max-w-xl rounded bg-[var(--color-border)]" />
        </div>
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

      {/* Bulk action bar placeholder */}
      <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5">
        <div className="h-4 w-40 rounded bg-[var(--color-border)]" />
        <div className="flex gap-2">
          <div className="h-7 w-24 rounded-full bg-[var(--color-border)]" />
          <div className="h-7 w-24 rounded-full bg-[var(--color-border)]" />
        </div>
      </div>

      {/* Reports table */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white overflow-hidden">
        <div className="flex items-center gap-6 border-b border-[var(--color-border)] px-6 py-3">
          <div className="h-4 w-4 rounded bg-[var(--color-border)]" />
          <div className="h-3 w-16 flex-1 rounded bg-[var(--color-border)]" />
          <div className="hidden h-3 w-16 rounded bg-[var(--color-border)] md:block" />
          <div className="hidden h-3 w-14 rounded bg-[var(--color-border)] sm:block" />
          <div className="hidden h-3 w-14 rounded bg-[var(--color-border)] lg:block" />
          <div className="hidden h-3 w-12 rounded bg-[var(--color-border)] sm:block" />
          <div className="ml-auto h-3 w-14 rounded bg-[var(--color-border)]" />
        </div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-6 border-b border-[var(--color-border)] px-6 py-4 last:border-0"
          >
            <div className="h-4 w-4 rounded bg-[var(--color-border)]" />
            <div className="flex-1 min-w-0">
              <div className="h-4 w-44 max-w-full rounded bg-[var(--color-border)]" />
              <div className="mt-1 h-3 w-32 rounded bg-[var(--color-border)]" />
            </div>
            <div className="hidden h-4 w-24 rounded bg-[var(--color-border)] md:block" />
            <div className="hidden h-6 w-16 rounded-full bg-[var(--color-border)] sm:block" />
            <div className="hidden h-6 w-20 rounded-full bg-[var(--color-border)] lg:block" />
            <div className="hidden h-4 w-10 rounded bg-[var(--color-border)] sm:block" />
            <div className="ml-auto h-7 w-7 rounded-lg bg-[var(--color-border)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
