import { NextResponse, type NextRequest } from "next/server";
import { createClient, createAdminClient } from "@/app/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json({ client: data });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, status")
    .eq("id", user.id)
    .single();
  if (!profile || profile.status !== "approved" || profile.role === "client") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));

  const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  const update: Record<string, unknown> = {};
  if (typeof body.name === "string") update.name = body.name.trim();
  if (typeof body.slug === "string") {
    const slug = body.slug.trim().toLowerCase();
    if (!SLUG_RE.test(slug)) {
      return NextResponse.json({ error: "Invalid slug (lowercase letters, numbers, hyphens)" }, { status: 400 });
    }
    update.slug = slug;
  }
  if (typeof body.url === "string") update.url = body.url.trim();
  if (typeof body.primary_contact_email === "string" || body.primary_contact_email === null) {
    update.primary_contact_email = body.primary_contact_email
      ? body.primary_contact_email.trim().toLowerCase()
      : null;
  }
  if (typeof body.notes === "string" || body.notes === null) update.notes = body.notes;
  if (typeof body.status === "string") {
    const status = body.status.trim().toLowerCase();
    if (status !== "prospect" && status !== "client" && status !== "template") {
      return NextResponse.json({ error: "Invalid status (prospect, client, template)" }, { status: 400 });
    }
    update.status = status;
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No updatable fields" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("clients")
    .update(update)
    .eq("id", id)
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true, client: data });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, status")
    .eq("id", user.id)
    .single();
  if (!profile || profile.status !== "approved" || profile.role === "client") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Service role bypasses RLS (no DELETE policy → silent 0-row no-op otherwise);
  // .select() confirms the row was actually removed.
  const admin = await createAdminClient();
  const { data, error } = await admin
    .from("clients")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data || data.length === 0) {
    return NextResponse.json({ error: "Client not found or already deleted" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, deleted: data.length });
}
