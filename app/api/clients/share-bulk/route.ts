import { NextResponse, type NextRequest } from "next/server";
import { createClient, createAdminClient } from "@/app/lib/supabase/server";
import { sendEmail } from "@/app/lib/email/send";
import { renderShareEmail, renderMultiShareEmail } from "@/app/lib/email/templates";
import { getSiteUrl } from "@/app/lib/email/client";
import type { Database } from "@/app/lib/supabase/types";

type NotificationInsert = Database["public"]["Tables"]["report_notifications"]["Insert"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const clientIds: string[] = Array.isArray(body.clientIds)
    ? body.clientIds.filter((v: unknown): v is string => typeof v === "string" && v.length > 0)
    : [];

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (clientIds.length === 0) {
    return NextResponse.json({ error: "No companies selected" }, { status: 400 });
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: clients, error: clientsError } = await supabase
    .from("clients")
    .select("id, name, slug")
    .in("id", clientIds);

  if (clientsError || !clients || clients.length === 0) {
    return NextResponse.json({ error: "Companies not found" }, { status: 404 });
  }

  const grantedClientIds: string[] = [];
  const grantIds: string[] = [];
  let hadExistingProfile = false;

  for (const c of clients) {
    const { data: existing } = await supabase
      .from("client_access")
      .select("id, revoked_at, profile_id")
      .eq("client_id", c.id)
      .eq("email", email)
      .maybeSingle();

    if (existing?.profile_id) hadExistingProfile = true;

    if (existing) {
      if (existing.revoked_at) {
        const { data: updated, error: updateError } = await supabase
          .from("client_access")
          .update({ revoked_at: null, invited_by: user.id, invited_at: new Date().toISOString() })
          .eq("id", existing.id)
          .select("id")
          .single();
        if (updateError || !updated) continue;
        grantIds.push(updated.id);
        grantedClientIds.push(c.id);
      } else {
        // already active — include in grants list but don't count as new
        grantIds.push(existing.id);
      }
    } else {
      const { data: created, error: insertError } = await supabase
        .from("client_access")
        .insert({ client_id: c.id, email, invited_by: user.id })
        .select("id")
        .single();
      if (insertError || !created) continue;
      grantIds.push(created.id);
      grantedClientIds.push(c.id);
    }
  }

  if (grantedClientIds.length === 0) {
    return NextResponse.json({ ok: true, alreadyGranted: true });
  }

  const newlyGrantedClients = clients.filter((c) => grantedClientIds.includes(c.id));

  // Inviter for the email body
  const { data: inviter } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .single();

  // One magic-login URL for the recipient
  const adminSupabase = await createAdminClient();
  const site = getSiteUrl();
  const redirectTo = `${site}/api/auth/callback`;
  let oneClickLoginUrl: string | null = null;
  try {
    const { data: linkData, error: linkError } = await adminSupabase.auth.admin.generateLink({
      type: hadExistingProfile ? "magiclink" : "invite",
      email,
      options: { redirectTo },
    });
    if (!linkError) {
      oneClickLoginUrl = linkData?.properties?.action_link ?? null;
    }
  } catch {
    oneClickLoginUrl = null;
  }

  const tpl =
    newlyGrantedClients.length === 1
      ? renderShareEmail({
          recipientEmail: email,
          clientName: newlyGrantedClients[0].name,
          invitedByName: inviter?.full_name ?? null,
          reportMonth: null,
          hasExistingAccount: hadExistingProfile,
          loginUrl: oneClickLoginUrl,
        })
      : renderMultiShareEmail({
          recipientEmail: email,
          clientNames: newlyGrantedClients.map((c) => c.name),
          invitedByName: inviter?.full_name ?? null,
          hasExistingAccount: hadExistingProfile,
          loginUrl: oneClickLoginUrl,
        });

  const sendResult = await sendEmail({
    to: email,
    subject: tpl.subject,
    html: tpl.html,
    text: tpl.text,
  });

  // One notification row per newly created/reactivated grant
  if (grantIds.length > 0) {
    const rows: NotificationInsert[] = grantIds.map((gid) => ({
      report_id: null,
      client_access_id: gid,
      notification_type: "share",
      email,
      delivery_id: sendResult.id ?? null,
      delivery_status: sendResult.ok ? "sent" : "failed",
      error_message: sendResult.error ?? null,
    }));
    await supabase.from("report_notifications").insert(rows);
  }

  return NextResponse.json({
    ok: true,
    grantedCount: grantedClientIds.length,
    emailSent: sendResult.ok,
    emailError: sendResult.error,
  });
}
