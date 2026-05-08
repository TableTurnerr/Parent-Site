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

export function sanitizeRedirectPath(rawNext: string | null, fallback: string): string {
  if (!rawNext) return fallback;
  if (
    !rawNext.startsWith("/") ||
    rawNext.startsWith("//") ||
    rawNext.startsWith("/\\") ||
    rawNext.includes("\0")
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
