import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";
import { defaultPathForRole, sanitizeRedirectPath } from "@/app/lib/auth/redirects";
import type { UserRole } from "@/app/lib/supabase/types";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const rawNext = searchParams.get("next");

  const supabase = await createClient();

  // Magic-link / email OTP flow
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type: type as "magiclink" | "signup" | "email" | "recovery" | "invite",
      token_hash: tokenHash,
    });
    if (error) {
      return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }
  } else {
    return NextResponse.redirect(`${origin}/login?error=missing_code`);
  }

  // Resolve role for redirect
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let role: UserRole | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    role = (profile?.role as UserRole) ?? null;
  }

  let fallback = defaultPathForRole(role);

  // If a client has access to exactly one company, deep-link them straight
  // into that company's reports page instead of the multi-company dashboard.
  if (user && role === "client") {
    const { data: accessibleClients } = await supabase
      .from("clients")
      .select("slug")
      .limit(2);
    if (accessibleClients?.length === 1 && accessibleClients[0]?.slug) {
      fallback = `/portal/clients/${accessibleClients[0].slug}`;
    }
  }

  const next = sanitizeRedirectPath(rawNext, fallback);

  // Cross-subdomain handoff: sanitize already validated this against the
  // allowlist, so an absolute URL here is safe to redirect to as-is.
  if (/^https?:\/\//i.test(next)) {
    return NextResponse.redirect(next);
  }

  // Internal redirect: bounce back to the main app host (configured via
  // NEXT_PUBLIC_APP_URL) rather than `origin` — when this callback runs on
  // auth.tableturnerr.com, origin is the auth host and we want the user to
  // end up on the actual app.
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const base = isLocalEnv
    ? origin
    : appUrl
      ? appUrl.replace(/\/$/, "")
      : forwardedHost
        ? `https://${forwardedHost}`
        : origin;

  return NextResponse.redirect(`${base}${next}`);
}
