export default function CompaniesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-7 w-32 rounded-lg bg-[var(--color-border)]" />
        <div className="mt-2 h-4 w-96 max-w-full rounded bg-[var(--color-border)]" />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white overflow-hidden">
        <div className="flex items-center gap-6 border-b border-[var(--color-border)] px-6 py-3">
          <div className="h-3 w-20 flex-1 rounded bg-[var(--color-border)]" />
          <div className="hidden h-3 w-16 rounded bg-[var(--color-border)] md:block" />
          <div className="h-3 w-14 rounded bg-[var(--color-border)]" />
          <div className="h-3 w-14 rounded bg-[var(--color-border)]" />
          <div className="ml-auto h-3 w-14 rounded bg-[var(--color-border)]" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-6 border-b border-[var(--color-border)] px-6 py-4 last:border-0"
          >
            <div className="flex-1 min-w-0">
              <div className="h-4 w-48 max-w-full rounded bg-[var(--color-border)]" />
            </div>
            <div className="hidden h-4 w-32 rounded bg-[var(--color-border)] md:block" />
            <div className="h-4 w-6 rounded bg-[var(--color-border)]" />
            <div className="h-4 w-6 rounded bg-[var(--color-border)]" />
            <div className="ml-auto h-7 w-16 rounded-lg bg-[var(--color-border)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
