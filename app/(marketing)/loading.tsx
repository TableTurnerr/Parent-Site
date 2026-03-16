export default function MarketingLoading() {
  return (
    <div className="min-h-screen bg-cream animate-pulse">
      {/* Hero skeleton */}
      <div className="pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Text column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="h-8 w-32 rounded-full bg-border/60" />
              <div className="space-y-3">
                <div className="h-12 w-full max-w-lg rounded-xl bg-border/60" />
                <div className="h-12 w-3/4 rounded-xl bg-border/60" />
              </div>
              <div className="space-y-2">
                <div className="h-5 w-full max-w-md rounded-lg bg-border/40" />
                <div className="h-5 w-5/6 max-w-md rounded-lg bg-border/40" />
              </div>
              <div className="flex gap-4 pt-2">
                <div className="h-12 w-44 rounded-full bg-border/60" />
                <div className="h-12 w-36 rounded-full bg-border/40" />
              </div>
            </div>
            {/* Image column */}
            <div className="lg:col-span-5">
              <div className="aspect-[4/3] sm:aspect-[4/5] rounded-[1.25rem] bg-border/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Features skeleton */}
      <div className="bg-cream-dark py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="space-y-3 mb-12">
            <div className="h-4 w-24 rounded bg-border/60" />
            <div className="h-9 w-80 rounded-lg bg-border/50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-cream rounded-[1.25rem] p-8 border border-border/30">
                <div className="h-10 w-10 rounded-full bg-border/60 mb-5" />
                <div className="h-6 w-3/4 rounded-lg bg-border/50 mb-3" />
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-border/30" />
                  <div className="h-4 w-5/6 rounded bg-border/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
