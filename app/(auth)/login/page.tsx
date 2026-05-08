"use client";

import { createClient } from "@/app/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const initialNext = searchParams.get("next") ?? "";

  const [email, setEmail] = useState("");
  const [next] = useState(initialNext);
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "sending" }
    | { kind: "sent"; email: string }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  const callbackUrl = (() => {
    if (typeof window === "undefined") return "";
    const url = new URL("/api/auth/callback", window.location.origin);
    if (next) url.searchParams.set("next", next);
    return url.toString();
  })();

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl },
    });
  };

  const handleMagicLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setStatus({ kind: "sending" });
    const supabase = createClient();
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: callbackUrl,
        shouldCreateUser: true,
      },
    });
    if (otpError) {
      setStatus({ kind: "error", message: otpError.message });
      return;
    }
    setStatus({ kind: "sent", email });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-cream)] px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-charcoal)]">
            Table<span className="font-extrabold">Turnerr</span>
          </h1>
          <p className="mt-2 text-sm text-[var(--color-warm-gray)]">
            Sign in to your account
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-8 shadow-sm">
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error === "auth_failed"
                ? "Authentication failed. Please try again."
                : error === "missing_code"
                  ? "Login link is invalid or expired."
                  : "Something went wrong. Please try again."}
            </div>
          )}

          {status.kind === "sent" ? (
            <div className="space-y-3 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-[var(--color-charcoal)]">
                Check your email
              </h2>
              <p className="text-sm text-[var(--color-warm-gray)]">
                We sent a sign-in link to <span className="font-medium text-[var(--color-charcoal)]">{status.email}</span>.
                Click the link to continue.
              </p>
              <button
                type="button"
                onClick={() => setStatus({ kind: "idle" })}
                className="mt-2 text-xs underline text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleMagicLink} className="space-y-3">
                <label htmlFor="email" className="block text-xs font-medium text-[var(--color-charcoal)]">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@restaurant.com"
                  className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:border-[var(--color-charcoal)] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status.kind === "sending" || !email}
                  className="w-full rounded-full bg-[var(--color-charcoal)] px-6 py-3 text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
                >
                  {status.kind === "sending" ? "Sending link…" : "Send sign-in link"}
                </button>
                {status.kind === "error" && (
                  <p className="text-xs text-red-600">{status.message}</p>
                )}
              </form>

              <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wide text-[var(--color-warm-gray-light)]">
                <span className="h-px flex-1 bg-[var(--color-border)]" />
                or
                <span className="h-px flex-1 bg-[var(--color-border)]" />
              </div>

              <button
                onClick={handleGoogleLogin}
                className="flex w-full items-center justify-center gap-3 rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-medium text-[var(--color-charcoal)] transition-all hover:border-[var(--color-charcoal)] hover:shadow-sm"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
            </>
          )}

          <p className="mt-6 text-center text-xs text-[var(--color-warm-gray-light)]">
            Restaurant owners and team members welcome.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--color-cream)]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-charcoal)] border-t-transparent" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
