import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/app/lib/supabase/server";
import { sendEmail } from "@/app/lib/email/send";
import { renderShareEmail } from "@/app/lib/email/templates";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

  // Has the recipient ever signed up? Determines email copy.
  const hasExistingAccount = Boolean(existing?.profile_id);

  const tpl = renderShareEmail({
    recipientEmail: email,
    clientName: client.name,
    invitedByName: inviter?.full_name ?? null,
    reportMonth: null,
    hasExistingAccount,
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
