const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const VERIFY_TIMEOUT_MS = 5000;

export type TurnstileVerifyResult = { ok: boolean; reason?: string };

export async function verifyTurnstileToken(
  token: string,
  ip: string | null,
): Promise<TurnstileVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn(
      "[ingest] TURNSTILE_SECRET_KEY not set — skipping captcha verification",
    );
    return { ok: true };
  }
  if (!token || typeof token !== "string") {
    return { ok: false, reason: "missing token" };
  }

  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);
  if (ip) form.set("remoteip", ip);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
      signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
    });
    if (!res.ok) return { ok: false, reason: `siteverify http ${res.status}` };
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (data.success === true) return { ok: true };
    const codes = Array.isArray(data["error-codes"]) ? data["error-codes"].join(",") : "unknown";
    return { ok: false, reason: codes };
  } catch (err) {
    const message = err instanceof Error ? err.message : "network error";
    return { ok: false, reason: message };
  }
}
