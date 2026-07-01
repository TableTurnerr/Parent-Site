import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Health endpoint hit by the uptime poller for the parent site.
 * Trivial liveness check — returns immediately with no DB access.
 */
export function GET() {
  return NextResponse.json({
    ok: true,
    service: "parent-site",
    ts: new Date().toISOString(),
  });
}
