export default function SettingsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-7 w-24 rounded-lg bg-[var(--color-border)]" />

      {/* Profile card */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
        <div className="mb-4 h-5 w-28 rounded bg-[var(--color-border)]" />
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-[var(--color-border)]" />
          <div>
            <div className="h-4 w-32 rounded bg-[var(--color-border)]" />
            <div className="mt-1.5 h-3 w-44 rounded bg-[var(--color-border)]" />
            <div className="mt-2 flex gap-2">
              <div className="h-5 w-16 rounded-full bg-[var(--color-border)]" />
              <div className="h-5 w-18 rounded-full bg-[var(--color-border)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Team members */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white">
        <div className="border-b border-[var(--color-border)] px-6 py-4">
          <div className="h-5 w-32 rounded bg-[var(--color-border)]" />
          <div className="mt-1 h-3 w-64 rounded bg-[var(--color-border)]" />
        </div>
        <div className="divide-y divide-[var(--color-border)]">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 px-6 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[var(--color-border)]" />
                <div>
                  <div className="h-4 w-28 rounded bg-[var(--color-border)]" />
                  <div className="mt-1 h-3 w-40 rounded bg-[var(--color-border)]" />
                  <div className="mt-1 h-3 w-24 rounded bg-[var(--color-border)]" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-7 w-20 rounded-full bg-[var(--color-border)]" />
                <div className="h-7 w-16 rounded-full bg-[var(--color-border)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
