import { NextResponse, type NextRequest } from "next/server";
import { createClient, createAdminClient } from "@/app/lib/supabase/server";
import { sendEmail } from "@/app/lib/email/send";
import { renderShareEmail } from "@/app/lib/email/templates";
import { getSiteUrl } from "@/app/lib/email/client";
import { checkAndRecordRateLimit } from "@/app/lib/ingest/rateLimit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 10_000;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const len = request.headers.get("content-length");
  if (len && Number(len) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request body too large" }, { status: 413 });
  }

  const { id: clientId } = await params;
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const supabase = await createClient();

  // RLS gates this — only team writers can write to client_access / clients.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate-limit per user to prevent email spam abuse: 20 share emails per hour.
  const rl = await checkAndRecordRateLimit(
    user.id,
    "share/single",
    { max: 20, windowSec: 3600 },
  );
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many share requests — try again later" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("id, name, slug")
    .eq("id", clientId)
    .single();

  if (clientError || !client) {
    return NextResponse.json({ error: "Company not found" }, { status: 404 });
  }

  // Look up existing grant (active or revoked) — re-activate if revoked
  const { data: existing } = await supabase
    .from("client_access")
    .select("id, revoked_at, profile_id")
    .eq("client_id", clientId)
    .eq("email", email)
    .maybeSingle();

  let grantId: string;
  if (existing) {
    if (existing.revoked_at) {
      const { data: updated, error: updateError } = await supabase
        .from("client_access")
        .update({ revoked_at: null, invited_by: user.id, invited_at: new Date().toISOString() })
        .eq("id", existing.id)
        .select("id")
        .single();
      if (updateError || !updated) {
        return NextResponse.json({ error: updateError?.message ?? "Could not re-grant access" }, { status: 500 });
      }
      grantId = updated.id;
    } else {
      // Already active — return idempotent success but skip resending email
      return NextResponse.json({ ok: true, alreadyGranted: true, grantId: existing.id });
    }
  } else {
    const { data: created, error: insertError } = await supabase
      .from("client_access")
      .insert({ client_id: clientId, email, invited_by: user.id })
      .select("id")
      .single();
    if (insertError || !created) {
      return NextResponse.json({ error: insertError?.message ?? "Could not grant access" }, { status: 500 });
    }
    grantId = created.id;
  }

  // Resolve invited_by name for the email body
  const { data: inviter } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .single();

  // Has the recipient ever signed up? Determines email copy + magic-link type.
  const hasExistingAccount = Boolean(existing?.profile_id);

  // Generate a one-click magic-login URL so the recipient lands in the portal
  // without having to request a separate login email. For existing users we
  // issue a `magiclink`; for new emails we issue an `invite` (creates the
  // auth.users row on click and lets the handle_new_user trigger backfill the
  // client_access grant).
  const adminSupabase = await createAdminClient();
  const site = getSiteUrl();
  const redirectTo = `${site}/api/auth/callback`;
  let oneClickLoginUrl: string | null = null;
  try {
    const { data: linkData, error: linkError } = await adminSupabase.auth.admin.generateLink({
      type: hasExistingAccount ? "magiclink" : "invite",
      email,
      options: { redirectTo },
    });
    if (!linkError) {
      oneClickLoginUrl = linkData?.properties?.action_link ?? null;
    }
  } catch {
    oneClickLoginUrl = null;
  }

  const tpl = renderShareEmail({
    recipientEmail: email,
    clientName: client.name,
    invitedByName: inviter?.full_name ?? null,
    reportMonth: null,
    hasExistingAccount,
    loginUrl: oneClickLoginUrl,
  });

  const sendResult = await sendEmail({
    to: email,
    subject: tpl.subject,
    html: tpl.html,
    text: tpl.text,
  });

  await supabase.from("report_notifications").insert({
    report_id: null,
    client_access_id: grantId,
    notification_type: "share",
    email,
    delivery_id: sendResult.id ?? null,
    delivery_status: sendResult.ok ? "sent" : "failed",
    error_message: sendResult.error ?? null,
  });

  return NextResponse.json({
    ok: true,
    grantId,
    emailSent: sendResult.ok,
    emailError: sendResult.error,
  });
}
