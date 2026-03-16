import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

const ALLOWED_REDIRECT_PATHS = ["/admin", "/admin/posts", "/admin/categories", "/admin/settings", "/admin/location-pages"];

function sanitizeRedirectPath(rawNext: string | null): string {
  const fallback = "/admin";
  if (!rawNext) return fallback;

  // Block protocol-relative URLs (//evil.com), non-path values, and backslash tricks
  if (
    !rawNext.startsWith("/") ||
    rawNext.startsWith("//") ||
    rawNext.startsWith("/\\") ||
    rawNext.includes("\0")
  ) {
    return fallback;
  }

  // Parse to extract just the pathname, stripping any host tricks
  try {
    const parsed = new URL(rawNext, "http://placeholder.local");
    const pathname = parsed.pathname;

    // Verify the pathname starts with an allowed prefix
    const isAllowed = ALLOWED_REDIRECT_PATHS.some(
      (allowed) => pathname === allowed || pathname.startsWith(allowed + "/")
    );

    return isAllowed ? pathname : fallback;
  } catch {
    return fallback;
  }
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = sanitizeRedirectPath(searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Auth error — redirect to login with error message
  return NextResponse.redirect(`${origin}/admin/login?error=auth_failed`);
}
