import type { UserRole } from "@/app/lib/supabase/types";

/**
 * Default landing path after login, based on the user's role.
 * `client` → portal; team roles → admin; otherwise → pending screen.
 */
export function defaultPathForRole(role: UserRole | null | undefined): string {
  if (role === "client") return "/portal";
  if (role === "admin" || role === "manager" || role === "editor" || role === "author") {
    return "/admin";
  }
  return "/admin/pending";
}

const ALLOWED_REDIRECT_PREFIXES = ["/admin", "/portal", "/report"];

/**
 * Hosts the auth host is allowed to redirect back to after sign-in, for
 * cross-subdomain handoff (e.g. wireframes.tableturnerr.com). Comma-separated
 * list of origins, e.g. "https://wireframes.tableturnerr.com,https://other.tableturnerr.com".
 */
function allowedExternalOrigins(): Set<string> {
  const raw = process.env.NEXT_PUBLIC_ALLOWED_RETURN_ORIGINS ?? "";
  return new Set(
    raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function sanitizeRedirectPath(rawNext: string | null, fallback: string): string {
  if (!rawNext) return fallback;
  if (rawNext.includes("\0")) return fallback;

  // Absolute URL — allow only if origin is in the allowlist (cross-subdomain handoff).
  if (/^https?:\/\//i.test(rawNext)) {
    try {
      const parsed = new URL(rawNext);
      if (allowedExternalOrigins().has(parsed.origin.toLowerCase())) {
        return parsed.toString();
      }
    } catch {
      // fall through
    }
    return fallback;
  }

  // Path — must start with single slash and match an allowed prefix.
  if (
    !rawNext.startsWith("/") ||
    rawNext.startsWith("//") ||
    rawNext.startsWith("/\\")
  ) {
    return fallback;
  }
  try {
    const parsed = new URL(rawNext, "http://placeholder.local");
    const pathname = parsed.pathname;
    const isAllowed = ALLOWED_REDIRECT_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
    );
    return isAllowed ? pathname + parsed.search : fallback;
  } catch {
    return fallback;
  }
}
