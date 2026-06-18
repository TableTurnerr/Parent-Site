import { Resend } from "resend";

let cached: Resend | null = null;

/**
 * Returns a singleton Resend client. Throws if RESEND_API_KEY is missing,
 * so callers must be on a server runtime with env vars configured.
 */
export function getResend(): Resend {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not set. See dev-kit/client-portal-setup.md.");
  }
  cached = new Resend(key);
  return cached;
}

export function getFromHeader(): string {
  const name = process.env.EMAIL_FROM_NAME ?? "TableTurnerr Reports";
  const addr = process.env.EMAIL_FROM_ADDRESS ?? "reports@tableturnerr.com";
  return `${name} <${addr}>`;
}

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_URL ??
    "https://www.tableturnerr.com"
  ).replace(/\/$/, "");
}
