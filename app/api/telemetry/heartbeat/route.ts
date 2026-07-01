import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/app/lib/supabase/server";
import type { Json } from "@/app/lib/supabase/types";
import { extractClientIp } from "@/app/lib/ingest/auth";
import { checkAndRecordRateLimit } from "@/app/lib/ingest/rateLimit";
import { authenticateTelemetryRequest } from "@/app/lib/telemetry/auth";
import { parseHeartbeatBody } from "@/app/lib/telemetry/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS() {
  // Server-to-server endpoint: no CORS headers needed, but answer preflights.
  return new NextResponse(null, { status: 204 });
}

export async function POST(request: NextRequest) {
  const ip = extractClientIp(request);
  const rl = await checkAndRecordRateLimit(ip, "telemetry/heartbeat", {
    max: 120,
    windowSec: 60,
  });
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "rate limit exceeded" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  const auth = authenticateTelemetryRequest(request);
  if (!auth.ok) {
    return NextResponse.json(
      { ok: false, error: auth.error },
      { status: auth.status },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = parseHeartbeatBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const admin = await createAdminClient();

  const { data: service, error: lookupErr } = await admin
    .from("monitored_services")
    .select("id,kind")
    .eq("key", parsed.service_key)
    .maybeSingle();

  if (lookupErr) {
    return NextResponse.json(
      { ok: false, error: "lookup failed" },
      { status: 500 },
    );
  }
  if (!service || service.kind !== "push") {
    return NextResponse.json(
      { ok: false, error: "unknown service_key" },
      { status: 404 },
    );
  }

  const nowIso = new Date().toISOString();
  const { error: upsertErr } = await admin.from("service_heartbeats").upsert(
    {
      service_id: service.id,
      service_key: parsed.service_key,
      last_beat_at: nowIso,
      version: parsed.version ?? null,
      status: parsed.status ?? null,
      meta: parsed.meta as Json,
    },
    { onConflict: "service_id" },
  );

  if (upsertErr) {
    return NextResponse.json(
      { ok: false, error: "upsert failed" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { ok: true, service_key: parsed.service_key, received_at: nowIso },
    { status: 200 },
  );
}
