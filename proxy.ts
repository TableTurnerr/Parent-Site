import { updateSession } from "@/app/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

// Hosts the parent Next.js app is deployed under. `AUTH_HOST` (e.g.
// auth.tableturnerr.com) serves ONLY the login UI + OAuth callback so every
// site in the family — parent, wireframes, future sub-apps — can delegate
// authentication to a single place. Everything else on the auth host is
// 308'd to the main app host.
const AUTH_HOST = process.env.NEXT_PUBLIC_AUTH_HOST; // e.g. "auth.tableturnerr.com"
const APP_HOST = process.env.NEXT_PUBLIC_APP_HOST; // e.g. "tableturnerr.com"

const AUTH_ALLOWED_PATHS = new Set(["/login"]);
const AUTH_ALLOWED_PREFIXES = ["/api/auth/"];

function isAuthSurface(pathname: string): boolean {
  if (AUTH_ALLOWED_PATHS.has(pathname)) return true;
  return AUTH_ALLOWED_PREFIXES.some((p) => pathname.startsWith(p));
}

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? "";
  const pathname = request.nextUrl.pathname;

  // --- Host gate: auth.tableturnerr.com is a single-purpose surface.
  if (AUTH_HOST && host === AUTH_HOST.toLowerCase() && !isAuthSurface(pathname)) {
    const target = new URL(request.nextUrl.toString());
    target.host = APP_HOST ?? host;
    target.protocol = "https:";
    target.port = "";
    return NextResponse.redirect(target, 308);
  }

  // --- /login on the main host is owned by the auth host. Bounce there,
  // preserving the `next` and `error` params.
  if (
    AUTH_HOST &&
    APP_HOST &&
    host === APP_HOST.toLowerCase() &&
    pathname === "/login"
  ) {
    const target = new URL(request.nextUrl.toString());
    target.host = AUTH_HOST;
    target.protocol = "https:";
    target.port = "";
    return NextResponse.redirect(target, 308);
  }

  // Recover stray Supabase OAuth callbacks: if Supabase falls back to the Site URL
  // (because the redirectTo isn't in the Redirect URLs allowlist), the user lands
  // somewhere like "/?code=..." instead of "/api/auth/callback?code=...". Forward
  // those to the real callback so the session can be exchanged.
  const code = request.nextUrl.searchParams.get("code");
  if (
    code &&
    !pathname.startsWith("/api/auth/callback") &&
    !pathname.startsWith("/api/")
  ) {
    const callbackUrl = request.nextUrl.clone();
    callbackUrl.pathname = "/api/auth/callback";
    // No `next` here — the callback resolves the role and redirects accordingly.
    return NextResponse.redirect(callbackUrl);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public file extensions (images, fonts)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2?)$).*)",
  ],
};
