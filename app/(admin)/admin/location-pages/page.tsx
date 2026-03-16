import Link from "next/link";
import { ExternalLink, Search, MapPin } from "lucide-react";
import { TARGET_CITIES } from "@/app/lib/location-data";
import { SERVICE_PAGES } from "@/app/lib/service-data";

const services = Object.values(SERVICE_PAGES);

export default async function LocationPagesPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; city?: string; q?: string }>;
}) {
  const params = await searchParams;
  const serviceFilter = params.service ?? "all";
  const cityFilter = params.city ?? "all";
  const searchQuery = params.q?.toLowerCase() ?? "";

  // Build all location pages
  const allPages = services.flatMap((service) =>
    TARGET_CITIES.map((city) => ({
      service: service.title,
      serviceSlug: service.slug,
      category: service.category,
      city: city.name,
      citySlug: city.slug,
      state: city.state,
      stateCode: city.stateCode,
      path: `/services/${service.slug}/${city.slug}`,
      title: `${service.title} in ${city.name}, ${city.stateCode}`,
    }))
  );

  // Apply filters
  const filtered = allPages.filter((page) => {
    if (serviceFilter !== "all" && page.serviceSlug !== serviceFilter)
      return false;
    if (cityFilter !== "all" && page.citySlug !== cityFilter) return false;
    if (searchQuery && !page.title.toLowerCase().includes(searchQuery))
      return false;
    return true;
  });

  const categoryColors: Record<string, string> = {
    "Web Design": "bg-blue-100 text-blue-700",
    SEO: "bg-green-100 text-green-700",
    Branding: "bg-purple-100 text-purple-700",
    "Paid Ads": "bg-amber-100 text-amber-700",
    "Local Search": "bg-teal-100 text-teal-700",
    "Online Ordering": "bg-rose-100 text-rose-700",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-charcoal)]">
          Location Pages
        </h1>
        <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
          {filtered.length} of {allPages.length} city-specific service pages
          &mdash; {services.length} services &times; {TARGET_CITIES.length}{" "}
          cities.
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Service filter */}
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
            Service
          </label>
          <div className="inline-flex items-center gap-0.5 rounded-lg bg-[var(--color-cream-dark)] p-0.5 overflow-x-auto">
            <Link
              href={`/admin/location-pages${cityFilter !== "all" ? `?city=${cityFilter}` : ""}`}
              className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium leading-none transition-colors inline-flex items-center justify-center ${
                serviceFilter === "all"
                  ? "bg-white text-[var(--color-charcoal)] shadow-sm"
                  : "text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
              }`}
            >
              All
            </Link>
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/admin/location-pages?service=${s.slug}${cityFilter !== "all" ? `&city=${cityFilter}` : ""}`}
                className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium leading-none transition-colors inline-flex items-center justify-center ${
                  serviceFilter === s.slug
                    ? "bg-white text-[var(--color-charcoal)] shadow-sm"
                    : "text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
                }`}
              >
                {s.category}
              </Link>
            ))}
          </div>
        </div>

        {/* City filter + Search */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
            City
          </label>
          <div className="inline-flex items-center gap-0.5 rounded-lg bg-[var(--color-cream-dark)] p-0.5 overflow-x-auto">
            <Link
              href={`/admin/location-pages${serviceFilter !== "all" ? `?service=${serviceFilter}` : ""}`}
              className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium leading-none transition-colors inline-flex items-center justify-center ${
                cityFilter === "all"
                  ? "bg-white text-[var(--color-charcoal)] shadow-sm"
                  : "text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
              }`}
            >
              All
            </Link>
            {TARGET_CITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/admin/location-pages?city=${c.slug}${serviceFilter !== "all" ? `&service=${serviceFilter}` : ""}`}
                className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium leading-none transition-colors inline-flex items-center justify-center ${
                  cityFilter === c.slug
                    ? "bg-white text-[var(--color-charcoal)] shadow-sm"
                    : "text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Search */}
        <form className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-warm-gray-light)]" />
          <input
            type="search"
            name="q"
            defaultValue={searchQuery}
            placeholder="Search pages..."
            className="w-full rounded-lg border border-[var(--color-border)] bg-white py-2 pl-10 pr-4 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:border-[var(--color-charcoal)] focus:outline-none sm:w-64"
          />
        </form>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white overflow-x-auto">
        {filtered.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Page Title
                </th>
                <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] md:table-cell">
                  Service
                </th>
                <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] sm:table-cell">
                  City
                </th>
                <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] lg:table-cell">
                  URL Path
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  View
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filtered.map((page) => (
                <tr
                  key={page.path}
                  className="transition-colors hover:bg-[var(--color-cream)]"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-[var(--color-charcoal)]">
                      {page.title}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--color-warm-gray-light)] sm:hidden">
                      {page.city}, {page.stateCode}
                    </p>
                  </td>
                  <td className="hidden px-6 py-4 md:table-cell">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                        categoryColors[page.category] ??
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {page.category}
                    </span>
                  </td>
                  <td className="hidden px-6 py-4 sm:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-[var(--color-warm-gray)]">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      {page.city}, {page.stateCode}
                    </div>
                  </td>
                  <td className="hidden px-6 py-4 lg:table-cell">
                    <code className="rounded bg-[var(--color-cream-dark)] px-2 py-1 text-xs text-[var(--color-warm-gray)]">
                      {page.path}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={page.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--color-warm-gray)] transition-colors hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-charcoal)]"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">View</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="px-6 py-16 text-center">
            <p className="text-sm text-[var(--color-warm-gray)]">
              {searchQuery
                ? `No pages found matching "${searchQuery}"`
                : "No pages match the selected filters."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
