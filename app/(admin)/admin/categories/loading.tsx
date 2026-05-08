export default function CategoriesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-7 w-40 rounded-lg bg-[var(--color-border)]" />
        <div className="mt-2 h-4 w-56 rounded bg-[var(--color-border)]" />
      </div>

      {/* Add category form skeleton */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="h-11 flex-1 rounded-lg bg-[var(--color-border)]" />
        <div className="h-11 w-full sm:w-16 rounded-full bg-[var(--color-border)]" />
      </div>

      {/* Category list */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white">
        <div className="divide-y divide-[var(--color-border)]">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded bg-[var(--color-border)]" />
                <div>
                  <div className="h-4 w-28 rounded bg-[var(--color-border)]" />
                  <div className="mt-1 h-3 w-36 rounded bg-[var(--color-border)]" />
                </div>
              </div>
              <div className="h-7 w-7 rounded-lg bg-[var(--color-border)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
