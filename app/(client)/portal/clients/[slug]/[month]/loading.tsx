export default function PortalReportLoading() {
  return (
    <div className="report-portal-embed animate-pulse">
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 lg:px-8 lg:py-12">
        {/* Back link */}
        <div className="h-3 w-44 rounded bg-[var(--color-border)]" />

        {/* Hero */}
        <div className="space-y-4">
          <div className="h-4 w-28 rounded bg-[var(--color-border)]" />
          <div className="space-y-3">
            <div className="h-10 w-3/4 max-w-3xl rounded-lg bg-[var(--color-border)]" />
            <div className="h-10 w-1/2 max-w-xl rounded-lg bg-[var(--color-border)]" />
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full max-w-2xl rounded bg-[var(--color-border)]" />
            <div className="h-4 w-5/6 max-w-2xl rounded bg-[var(--color-border)]" />
          </div>
        </div>

        {/* Score + ratings grid */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="h-4 w-40 rounded bg-[var(--color-border)]" />
              <div className="mt-1.5 h-3 w-32 rounded bg-[var(--color-border)]" />
            </div>
            <div className="flex items-baseline gap-1">
              <div className="h-12 w-16 rounded bg-[var(--color-border)]" />
              <div className="h-4 w-10 rounded bg-[var(--color-border)]" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-lg bg-[var(--color-cream)] px-3 py-4"
              >
                <div className="h-3 w-14 rounded bg-[var(--color-border)]" />
                <div className="mt-2 h-7 w-12 rounded bg-[var(--color-border)]" />
              </div>
            ))}
          </div>
        </div>

        {/* Section blocks */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-white p-6">
            <div className="h-6 w-56 rounded-lg bg-[var(--color-border)]" />
            <div className="space-y-2">
              {[92, 78, 88, 70, 84].map((w, j) => (
                <div
                  key={j}
                  className="h-4 rounded bg-[var(--color-border)]"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <div
                  key={j}
                  className="rounded-lg border border-[var(--color-border)] p-4"
                >
                  <div className="h-4 w-32 rounded bg-[var(--color-border)]" />
                  <div className="mt-2 h-3 w-full rounded bg-[var(--color-border)]" />
                  <div className="mt-1.5 h-3 w-4/5 rounded bg-[var(--color-border)]" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
