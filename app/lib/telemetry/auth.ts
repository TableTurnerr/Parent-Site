import { timingSafeEqual } from "node:crypto";

export type TelemetryAuthResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

/**
 * Authenticates a machine-facing telemetry request via a shared bearer token.
 *
 * If TELEMETRY_INGEST_TOKEN is unset/empty we refuse with 503 rather than run
 * open, mirroring the cron endpoint's posture (a public URL must not be able to
 * push logs/heartbeats while the ingest secret is unconfigured).
 *
 * The token comparison is constant-time (guarded by a length check) so an
 * attacker cannot use response timing to recover the secret byte by byte.
 */
export function authenticateTelemetryRequest(req: Request): TelemetryAuthResult {
  const expected = process.env.TELEMETRY_INGEST_TOKEN;
  if (!expected) {
    return { ok: false, status: 503, error: "telemetry ingest not configured" };
  }

  const header = req.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header);
  if (!match) {
    return { ok: false, status: 401, error: "unauthorized" };
  }
  const provided = match[1].trim();

  const expectedBuf = Buffer.from(expected, "utf8");
  const providedBuf = Buffer.from(provided, "utf8");

  // timingSafeEqual throws on length mismatch; the length check both guards
  // that call and is itself a non-secret-dependent early exit.
  if (
    expectedBuf.length !== providedBuf.length ||
    !timingSafeEqual(expectedBuf, providedBuf)
  ) {
    return { ok: false, status: 401, error: "unauthorized" };
  }

  return { ok: true };
}
