import Link from "next/link";

type TabKey = "reports" | "reviews" | "submissions";

type Tab = {
  key: TabKey;
  label: string;
  href: string;
  count?: number;
};

export default function CompanyTabs({
  slug,
  current,
  newReviewsCount = 0,
  newSubmissionsCount = 0,
}: {
  slug: string;
  current: TabKey;
  newReviewsCount?: number;
  newSubmissionsCount?: number;
}) {
  const tabs: Tab[] = [
    { key: "reports", label: "Reports", href: `/portal/clients/${slug}` },
    {
      key: "reviews",
      label: "Reviews",
      href: `/portal/clients/${slug}/reviews`,
      count: newReviewsCount,
    },
    {
      key: "submissions",
      label: "Submissions",
      href: `/portal/clients/${slug}/submissions`,
      count: newSubmissionsCount,
    },
  ];

  return (
    <nav className="flex flex-wrap items-center gap-1 border-b border-[var(--color-border)] pb-3">
      {tabs.map((t) => {
        const isActive = t.key === current;
        const baseCls = "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors";
        const stateCls = isActive
          ? "bg-[var(--color-charcoal)] text-white"
          : "text-[var(--color-warm-gray)] hover:bg-[var(--color-cream)] hover:text-[var(--color-charcoal)]";
        const showBadge = typeof t.count === "number" && t.count > 0;
        return (
          <Link key={t.key} href={t.href} className={`${baseCls} ${stateCls}`}>
            {t.label}
            {showBadge && (
              <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-[10px] font-semibold text-white">
                {t.count}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
