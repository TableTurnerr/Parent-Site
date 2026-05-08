export default function PortalDashboardLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 lg:px-8 lg:py-12 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-7 w-44 rounded-lg bg-[var(--color-border)]" />
        <div className="mt-2 h-4 w-72 max-w-full rounded bg-[var(--color-border)]" />
      </div>

      {/* Client cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-6"
          >
            <div>
              <div className="h-5 w-48 rounded bg-[var(--color-border)]" />
              <div className="mt-2 h-4 w-40 rounded bg-[var(--color-border)]" />
            </div>
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
              <div>
                <div className="h-3 w-20 rounded bg-[var(--color-border)]" />
                <div className="mt-1.5 h-4 w-32 rounded bg-[var(--color-border)]" />
              </div>
              <div className="h-4 w-4 rounded bg-[var(--color-border)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
