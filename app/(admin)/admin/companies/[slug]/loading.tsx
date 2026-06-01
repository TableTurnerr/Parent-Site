export default function CompanyDetailLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Breadcrumb + header */}
      <div>
        <div className="h-3 w-24 rounded bg-[var(--color-border)]" />
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <div className="h-7 w-48 rounded-lg bg-[var(--color-border)]" />
          <div className="h-4 w-40 rounded bg-[var(--color-border)]" />
        </div>
        <div className="mt-1 h-3 w-32 rounded bg-[var(--color-border)]" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Reports list — 2 cols */}
        <section className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-3 w-32 rounded bg-[var(--color-border)]" />
            <div className="h-3 w-28 rounded bg-[var(--color-border)]" />
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-white">
            <div className="divide-y divide-[var(--color-border)]">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between gap-3 px-5 py-4">
                  <div>
                    <div className="h-4 w-32 rounded bg-[var(--color-border)]" />
                    <div className="mt-1.5 h-3 w-28 rounded bg-[var(--color-border)]" />
                  </div>
                  <div className="h-6 w-20 rounded-full bg-[var(--color-border)]" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Owner access — 1 col */}
        <section className="space-y-3">
          <div className="h-3 w-28 rounded bg-[var(--color-border)]" />
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-5 space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="h-10 flex-1 rounded-lg bg-[var(--color-border)]" />
              <div className="h-10 w-full sm:w-20 rounded-full bg-[var(--color-border)]" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <div>
                    <div className="h-4 w-40 rounded bg-[var(--color-border)]" />
                    <div className="mt-1 h-3 w-24 rounded bg-[var(--color-border)]" />
                  </div>
                  <div className="h-6 w-16 rounded-full bg-[var(--color-border)]" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
