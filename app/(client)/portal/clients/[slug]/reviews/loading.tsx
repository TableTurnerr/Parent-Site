export default function PortalReviewsLoading() {
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

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[var(--color-border)] pb-3">
        <div className="h-7 w-20 rounded-md bg-[var(--color-border)]" />
        <div className="h-7 w-20 rounded-md bg-[var(--color-border)]" />
        <div className="h-7 w-24 rounded-md bg-[var(--color-border)]" />
      </div>

      {/* Cards */}
      <div className="space-y-3">
        <div className="h-3 w-24 rounded bg-[var(--color-border)]" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-[var(--color-border)] bg-white p-6"
          >
            <div className="h-4 w-32 rounded bg-[var(--color-border)]" />
            <div className="mt-3 h-4 w-40 rounded bg-[var(--color-border)]" />
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full rounded bg-[var(--color-border)]" />
              <div className="h-3 w-5/6 rounded bg-[var(--color-border)]" />
              <div className="h-3 w-2/3 rounded bg-[var(--color-border)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
