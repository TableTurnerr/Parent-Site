export default function AdminDashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-32 rounded-lg bg-[var(--color-border)]" />
          <div className="mt-2 h-4 w-64 rounded-lg bg-[var(--color-border)]" />
        </div>
        <div className="h-10 w-28 rounded-full bg-[var(--color-border)]" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-[var(--color-border)] bg-white p-5"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-[var(--color-border)]" />
              <div className="h-4 w-20 rounded bg-[var(--color-border)]" />
            </div>
            <div className="mt-3 h-9 w-12 rounded bg-[var(--color-border)]" />
          </div>
        ))}
      </div>

      {/* Recent posts */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
          <div className="h-5 w-28 rounded bg-[var(--color-border)]" />
          <div className="h-4 w-16 rounded bg-[var(--color-border)]" />
        </div>
        <div className="divide-y divide-[var(--color-border)]">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4">
              <div className="flex-1">
                <div className="h-4 w-48 rounded bg-[var(--color-border)]" />
                <div className="mt-1.5 h-3 w-28 rounded bg-[var(--color-border)]" />
              </div>
              <div className="h-6 w-16 rounded-full bg-[var(--color-border)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
