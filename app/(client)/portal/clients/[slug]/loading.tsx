export default function PortalClientLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 lg:px-8 lg:py-12 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-3 w-28 rounded bg-[var(--color-border)]" />
        <div className="mt-2 flex flex-wrap items-baseline gap-3">
          <div className="h-8 w-56 rounded-lg bg-[var(--color-border)]" />
          <div className="h-4 w-44 rounded bg-[var(--color-border)]" />
        </div>
      </div>

      {/* Reports list */}
      <div className="space-y-3">
        <div className="h-3 w-36 rounded bg-[var(--color-border)]" />
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
          <div className="divide-y divide-[var(--color-border)]">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 px-6 py-4"
              >
                <div>
                  <div className="h-4 w-32 rounded bg-[var(--color-border)]" />
                  <div className="mt-1.5 h-3 w-40 rounded bg-[var(--color-border)]" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-4 w-12 rounded bg-[var(--color-border)]" />
                  <div className="h-4 w-4 rounded bg-[var(--color-border)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
