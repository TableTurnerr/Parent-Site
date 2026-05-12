import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

function normalizeOrigin(value: string): string | null {
  const trimmed = value.trim().toLowerCase().replace(/\/+$/, "");
  if (!trimmed) return null;
  try {
    const u = new URL(trimmed);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    return `${u.protocol}//${u.host}`;
  } catch {
    return null;
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: clientId } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("client_site_origins")
    .select("id, origin, label, created_at")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ origins: data ?? [] });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: clientId } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const rawOrigin = typeof body.origin === "string" ? body.origin : "";
  const origin = normalizeOrigin(rawOrigin);
  if (!origin) {
    return NextResponse.json({ error: "origin must be a valid http(s) URL" }, { status: 400 });
  }
  const label = typeof body.label === "string" && body.label.trim()
    ? body.label.trim().slice(0, 80)
    : null;

  const { data, error } = await supabase
    .from("client_site_origins")
    .insert({ client_id: clientId, origin, label, created_by: user.id })
    .select("id, origin, label, created_at")
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "origin already exists for this client" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ ok: true, origin: data });
}
