import { NextResponse, type NextRequest } from "next/server";
import { after } from "next/server";
import { createAdminClient } from "@/app/lib/supabase/server";
import type { Json } from "@/app/lib/supabase/types";
import { authenticateIngestRequest, extractClientIp, resolveLocationId } from "@/app/lib/ingest/auth";
import { buildCorsHeaders } from "@/app/lib/ingest/cors";
import { notifyNewSubmission } from "@/app/lib/ingest/notifications";
import { checkAndRecordRateLimit } from "@/app/lib/ingest/rateLimit";
import { verifyTurnstileToken } from "@/app/lib/ingest/turnstile";
import { parseSubmissionBody } from "@/app/lib/ingest/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS(request: NextRequest) {
  const headers = await buildCorsHeaders(request);
  return new NextResponse(null, { status: 204, headers });
}

export async function POST(request: NextRequest) {
  const corsH = await buildCorsHeaders(request);
  const json = (body: unknown, status: number) =>
    NextResponse.json(body, { status, headers: corsH });

  const len = request.headers.get("content-length");
  if (len && Number(len) > 50_000) {
    return json({ error: "Request body too large" }, 413);
  }

  const ip = extractClientIp(request);
  const rl = await checkAndRecordRateLimit(ip, "ingest/form-submissions");
  if (!rl.ok) {
    return NextResponse.json(
      { error: "rate limit exceeded" },
      { status: 429, headers: { ...corsH, "Retry-After": String(rl.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid JSON body" }, 400);
  }

  const token =
    body && typeof body === "object"
      ? (body as Record<string, unknown>).turnstile_token
      : undefined;
  const captcha = await verifyTurnstileToken(
    typeof token === "string" ? token : "",
    ip,
  );
  if (!captcha.ok) return json({ error: "captcha failed" }, 401);

  const auth = await authenticateIngestRequest(request);
  if (!auth.ok) return json({ error: auth.error }, auth.status);

  const parsed = parseSubmissionBody(body);
  if (!parsed.ok) return json({ error: parsed.error }, 400);
  const { data } = parsed;

  const location_id = await resolveLocationId(auth.context.client_id, data.location_slug);

  const admin = await createAdminClient();
  const { data: inserted, error } = await admin
    .from("site_form_submissions")
    .insert({
      client_id: auth.context.client_id,
      location_id,
      form_type: data.form_type,
      payload: data.payload as Json,
      contact_name: data.contact_name,
      contact_email: data.contact_email,
      contact_phone: data.contact_phone,
      source: auth.context.client_slug,
      api_key_id: auth.context.api_key_id,
      ip: ip ?? undefined,
      user_agent: request.headers.get("user-agent") ?? undefined,
    })
    .select("id")
    .single();

  if (error) return json({ error: "insert failed" }, 500);

  after(async () => {
    try {
      await notifyNewSubmission(inserted.id);
    } catch {
      // Swallow — notification failures must not affect ingestion.
    }
  });

  return json({ ok: true, id: inserted.id }, 201);
}
