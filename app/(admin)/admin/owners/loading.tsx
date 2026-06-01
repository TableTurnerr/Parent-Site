export default function OwnersLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-7 w-24 rounded-lg bg-[var(--color-border)]" />
        <div className="mt-2 h-4 w-80 max-w-full rounded bg-[var(--color-border)]" />
      </div>

      {/* Owners list */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white">
        <div className="divide-y divide-[var(--color-border)]">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="h-4 w-56 max-w-full rounded bg-[var(--color-border)]" />
                  <div className="mt-1.5 h-3 w-32 rounded bg-[var(--color-border)]" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-3 w-20 rounded bg-[var(--color-border)]" />
                  <div className="h-8 w-28 rounded-full bg-[var(--color-border)]" />
                </div>
              </div>
              {i % 2 === 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <div className="h-6 w-24 rounded-full bg-[var(--color-border)]" />
                  <div className="h-6 w-32 rounded-full bg-[var(--color-border)]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
