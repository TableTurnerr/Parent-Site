import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { withSharedDomain } from "./cookie-options";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

// HSTS must not be set in development — browsers cache it and force https://localhost,
// breaking the HTTP dev server for the entire browser profile.
if (process.env.NODE_ENV !== "development") {
  SECURITY_HEADERS["Strict-Transport-Security"] =
    "max-age=63072000; includeSubDomains; preload";
}

function applySecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, withSharedDomain(options)),
          );
        },
      },
    },
  );

  const path = request.nextUrl.pathname;
  const isAdminRoute = path.startsWith("/admin");
  const isPortalRoute = path.startsWith("/portal");
  const isLoginPage = path === "/login";
  const isPendingPage = path.startsWith("/admin/pending");
  const isDeniedPage = path.startsWith("/admin/denied");
  const isAuthRoute = isAdminRoute || isPortalRoute || isLoginPage;

  // Public pages don't need session refresh
  if (!isAuthRoute) {
    return applySecurityHeaders(supabaseResponse);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Login page: if already signed in, send to role's home
  if (isLoginPage) {
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, status")
        .eq("id", user.id)
        .single();
      const url = request.nextUrl.clone();
      if (profile?.role === "client") {
        url.pathname = "/portal";
      } else if (profile?.status === "approved") {
        url.pathname = "/admin";
      } else {
        url.pathname = "/admin/pending";
      }
      url.search = "";
      return NextResponse.redirect(url);
    }
    return applySecurityHeaders(supabaseResponse);
  }

  // Pending / denied pages — allow signed-in user to view, redirect anon to login
  if (isPendingPage || isDeniedPage) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return applySecurityHeaders(supabaseResponse);
  }

  // /portal — requires auth
  if (isPortalRoute) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", path);
      return NextResponse.redirect(url);
    }
    return applySecurityHeaders(supabaseResponse);
  }

  // /admin/* (non-public) — auth required, role/status gated
  if (isAdminRoute) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", path);
      return NextResponse.redirect(url);
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role, status")
      .eq("id", user.id)
      .single();

    // Clients must not see /admin
    if (profile?.role === "client") {
      const url = request.nextUrl.clone();
      url.pathname = "/portal";
      return NextResponse.redirect(url);
    }

    if (!profile || profile.status === "pending") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/pending";
      return NextResponse.redirect(url);
    }

    if (profile.status === "denied") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/denied";
      return NextResponse.redirect(url);
    }
  }

  return applySecurityHeaders(supabaseResponse);
}
