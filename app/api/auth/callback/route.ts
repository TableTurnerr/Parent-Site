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

  const fallback = defaultPathForRole(role);
  const next = sanitizeRedirectPath(rawNext, fallback);

  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  const base = isLocalEnv
    ? origin
    : forwardedHost
      ? `https://${forwardedHost}`
      : origin;

  return NextResponse.redirect(`${base}${next}`);
}
