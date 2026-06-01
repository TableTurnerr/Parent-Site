import { createClient } from "@/app/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { marked } from "marked";
import { isClientReport } from "@/lib/report-schema";
import { sendEmail } from "@/app/lib/email/send";
import { renderPublishedEmail } from "@/app/lib/email/templates";

type Variant = "client" | "internal";

type PatchBody = {
  status?: "draft" | "published" | "archived";
  visibility?: "public" | "unlisted" | "private" | "client_only";
  variant?: Variant;
  content_md?: string;
  content_json?: unknown;
  client_name?: string;
  client_url?: string;
  report_month?: string; // "YYYY-MM-01" or "YYYY-MM"
};

const MONTH_RE = /^(\d{4})-(\d{2})(?:-01)?$/;

function normalizeMonth(input: string): string | null {
  const m = MONTH_RE.exec(input);
  if (!m) return null;
  return `${m[1]}-${m[2]}-01`;
}

const STATUS = ["draft", "published", "archived"] as const;
const VISIBILITY = ["public", "unlisted", "private", "client_only"] as const;

function stripFrontmatter(md: string): string {
  return md.replace(/^---[\s\S]*?---\n/, "");
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as PatchBody;
  const update: Record<string, unknown> = {};

  if (body.status !== undefined) {
    if (!STATUS.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    update.status = body.status;
    if (body.status === "published") {
      update.published_at = new Date().toISOString();
    }
  }

  if (body.visibility !== undefined) {
    if (!VISIBILITY.includes(body.visibility)) {
      return NextResponse.json({ error: "Invalid visibility" }, { status: 400 });
    }
    update.visibility = body.visibility;
  }

  if (body.client_name !== undefined) update.client_name = body.client_name;
  if (body.client_url !== undefined) update.client_url = body.client_url;

  if (body.report_month !== undefined) {
    const normalized = normalizeMonth(body.report_month);
    if (!normalized) {
      return NextResponse.json({ error: "report_month must be YYYY-MM or YYYY-MM-01" }, { status: 400 });
    }
    update.report_month = normalized;
  }

  if (body.content_json !== undefined) {
    if (body.variant !== "client" && body.variant !== "internal") {
      return NextResponse.json({ error: "variant must be 'client' or 'internal' when sending content_json" }, { status: 400 });
    }
    if (!isClientReport(body.content_json)) {
      return NextResponse.json({ error: "content_json failed schema validation (expected ClientReport v1)" }, { status: 400 });
    }
    if (body.variant === "client") {
      update.client_content_json = body.content_json;
    } else {
      update.internal_content_json = body.content_json;
    }
  }

  if (body.content_md !== undefined) {
    if (body.variant !== "client" && body.variant !== "internal") {
      return NextResponse.json({ error: "variant must be 'client' or 'internal' when sending content_md" }, { status: 400 });
    }
    const md = body.content_md;
    const html = marked.parse(stripFrontmatter(md)) as string;
    if (body.variant === "client") {
      update.client_content_md = md;
      update.client_content_html = html;
    } else {
      update.internal_content_md = md;
      update.internal_content_html = html;
    }
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No updatable fields supplied" }, { status: 400 });
  }

  // Capture pre-update status to detect draft→published transitions
  const { data: before } = await supabase
    .from("client_reports")
    .select("status, client_id, report_month")
    .eq("id", id)
    .single();

  const { data, error } = await supabase
    .from("client_reports")
    .update(update)
    .eq("id", id)
    .select("id, client_id, client_slug, report_month, status, visibility, published_at, updated_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Fire-and-forget: notify all active grants if this report just became published.
  if (
    body.status === "published" &&
    before?.status !== "published" &&
    data?.client_id
  ) {
    notifyClientsOfPublishedReport({
      reportId: data.id,
      clientId: data.client_id,
      reportMonth: data.report_month,
    }).catch((err) => console.error("[reports] notify failed", err));
  }

  return NextResponse.json(data);
}

/**
 * Sends "Your monthly report is ready" emails to every active grant for a client.
 * Idempotent via the report_notifications partial unique index — re-publishing
 * the same report will not send duplicate emails for the same grant.
 */
async function notifyClientsOfPublishedReport({
  reportId,
  clientId,
  reportMonth,
}: {
  reportId: string;
  clientId: string;
  reportMonth: string;
}) {
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("clients")
    .select("name, slug")
    .eq("id", clientId)
    .single();
  if (!client) return;

  const { data: grants } = await supabase
    .from("client_access")
    .select("id, email")
    .eq("client_id", clientId)
    .is("revoked_at", null);

  for (const g of grants ?? []) {
    // Skip if we've already sent a 'published' email for this report+grant
    const { data: already } = await supabase
      .from("report_notifications")
      .select("id")
      .eq("report_id", reportId)
      .eq("client_access_id", g.id)
      .eq("notification_type", "published")
      .maybeSingle();
    if (already) continue;

    const tpl = renderPublishedEmail({
      recipientEmail: g.email,
      clientName: client.name,
      reportMonth,
      reportSlug: client.slug,
    });

    const result = await sendEmail({
      to: g.email,
      subject: tpl.subject,
      html: tpl.html,
      text: tpl.text,
    });

    await supabase.from("report_notifications").insert({
      report_id: reportId,
      client_access_id: g.id,
      notification_type: "published",
      email: g.email,
      delivery_id: result.id ?? null,
      delivery_status: result.ok ? "sent" : "failed",
      error_message: result.error ?? null,
    });
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("client_reports")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase.from("client_reports").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
