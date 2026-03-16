export default function EditPostLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[var(--color-border)]" />
          <div>
            <div className="h-5 w-20 rounded bg-[var(--color-border)]" />
            <div className="mt-1 h-3 w-12 rounded bg-[var(--color-border)]" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-28 rounded-full bg-[var(--color-border)]" />
          <div className="h-9 w-24 rounded-full bg-[var(--color-border)]" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main editor */}
        <div className="space-y-4">
          <div className="h-10 w-3/4 rounded bg-[var(--color-border)]" />
          <div className="rounded-xl border border-[var(--color-border)] bg-white">
            <div className="border-b border-[var(--color-border)] px-4 py-2">
              <div className="h-3 w-24 rounded bg-[var(--color-border)]" />
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 rounded bg-[var(--color-border)]"
                    style={{ width: `${60 + Math.random() * 40}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--color-border)] bg-white p-4"
            >
              <div className="mb-2 h-3 w-20 rounded bg-[var(--color-border)]" />
              <div className="h-9 w-full rounded-lg bg-[var(--color-border)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
