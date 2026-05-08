import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();
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
  const body = await request.json().catch(() => ({}));

  const update: Record<string, unknown> = {};
  if (typeof body.name === "string") update.name = body.name.trim();
  if (typeof body.url === "string") update.url = body.url.trim();
  if (typeof body.primary_contact_email === "string" || body.primary_contact_email === null) {
    update.primary_contact_email = body.primary_contact_email
      ? body.primary_contact_email.trim().toLowerCase()
      : null;
  }
  if (typeof body.notes === "string" || body.notes === null) update.notes = body.notes;

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
