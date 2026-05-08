import { updateSession } from "@/app/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // Recover stray Supabase OAuth callbacks: if Supabase falls back to the Site URL
  // (because the redirectTo isn't in the Redirect URLs allowlist), the user lands
  // somewhere like "/?code=..." instead of "/api/auth/callback?code=...". Forward
  // those to the real callback so the session can be exchanged.
  const code = request.nextUrl.searchParams.get("code");
  if (
    code &&
    !request.nextUrl.pathname.startsWith("/api/auth/callback") &&
    !request.nextUrl.pathname.startsWith("/api/")
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
