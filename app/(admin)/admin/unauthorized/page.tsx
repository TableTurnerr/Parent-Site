import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-cream)]">
      <div className="w-full max-w-md space-y-6 px-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <svg
            className="h-8 w-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-charcoal)]">
          Access Denied
        </h1>
        <p className="text-sm text-[var(--color-warm-gray)]">
          Your account is not authorized to access the admin dashboard. Contact
          the site administrator to request access.
        </p>
        <Link
          href="/"
          className="inline-block rounded-full bg-[var(--color-charcoal)] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-charcoal-light)]"
        >
          Back to Site
        </Link>
      </div>
    </div>
  );
}
