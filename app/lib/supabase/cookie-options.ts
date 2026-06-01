import type { CookieOptions } from "@supabase/ssr";

/**
 * Augments cookie options so the Supabase auth cookie is readable by every
 * subdomain of the configured root (e.g. tableturnerr.com, auth.tableturnerr.com,
 * wireframes.tableturnerr.com) — required for cross-subdomain SSO.
 *
 * In dev, NEXT_PUBLIC_COOKIE_DOMAIN is unset and we don't touch the options,
 * so cookies behave normally on localhost.
 */
export function withSharedDomain(options: CookieOptions = {}): CookieOptions {
  const domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN;
  if (!domain) return options;
  return {
    ...options,
    domain,
    secure: true,
    sameSite: options.sameSite ?? "lax",
  };
}
