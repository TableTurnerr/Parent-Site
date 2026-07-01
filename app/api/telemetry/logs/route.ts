import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/app/lib/supabase/server";
import type { Database, Json } from "@/app/lib/supabase/types";
import { extractClientIp } from "@/app/lib/ingest/auth";
import { checkAndRecordRateLimit } from "@/app/lib/ingest/rateLimit";
import { authenticateTelemetryRequest } from "@/app/lib/telemetry/auth";
import { parseLogsBody } from "@/app/lib/telemetry/validation";
import { maybePruneSystemLogs } from "@/app/lib/telemetry/retention";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SystemLogInsert = Database["public"]["Tables"]["system_logs"]["Insert"];

export async function OPTIONS() {
  // Server-to-server endpoint: no CORS headers needed, but answer preflights.
  return new NextResponse(null, { status: 204 });
}

export async function POST(request: NextRequest) {
  const ip = extractClientIp(request);
  const rl = await checkAndRecordRateLimit(ip, "telemetry/logs", {
    max: 60,
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

  const parsed = parseLogsBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const { entries, errors } = parsed;
  const rejected = errors.length;

  // Every entry was rejected — nothing to insert.
  if (entries.length === 0) {
    return NextResponse.json(
      { ok: false, accepted: 0, rejected, errors },
      { status: 400 },
    );
  }

  const admin = await createAdminClient();

  const rows: SystemLogInsert[] = entries.map((entry) => {
    const row: SystemLogInsert = {
      service_key: entry.service_key,
      level: entry.level,
      message: entry.message,
      event: entry.event,
      context: entry.context as Json,
    };
    if (entry.created_at) row.created_at = entry.created_at;
    return row;
  });

  const { error } = await admin.from("system_logs").insert(rows);
  if (error) {
    return NextResponse.json(
      { ok: false, error: "insert failed" },
      { status: 500 },
    );
  }

  // Fire-and-forget retention sweep; never awaited.
  maybePruneSystemLogs(admin);

  const accepted = entries.length;
  if (rejected === 0) {
    return NextResponse.json(
      { ok: true, accepted, rejected: 0, errors: [] },
      { status: 200 },
    );
  }

  // Partial success: some entries stored, some rejected.
  return NextResponse.json(
    { ok: true, accepted, rejected, errors },
    { status: 207 },
  );
}
