export default function NewPostLoading() {
  return (
    <div className="mx-auto max-w-lg space-y-6 animate-pulse">
      <div className="h-7 w-40 rounded-lg bg-[var(--color-border)]" />

      <div className="space-y-4">
        <div>
          <div className="mb-1.5 h-4 w-20 rounded bg-[var(--color-border)]" />
          <div className="h-12 w-full rounded-lg bg-[var(--color-border)]" />
        </div>
        <div className="h-12 w-full rounded-full bg-[var(--color-border)]" />
      </div>
    </div>
  );
}
