import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/app/lib/supabase/server";
import { generateApiKey } from "@/app/lib/ingest/keys";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: clientId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("client_api_keys")
    .select("id, key_prefix, label, created_at, created_by, last_used_at, revoked_at")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ apiKeys: data ?? [] });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: clientId } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
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
  const label = typeof body.label === "string" ? body.label.trim() : "";
  if (!label || label.length > 80) {
    return NextResponse.json({ error: "label required (1-80 chars)" }, { status: 400 });
  }

  const { plaintext, hash, prefix } = generateApiKey();

  const { data, error } = await supabase
    .from("client_api_keys")
    .insert({
      client_id: clientId,
      key_hash: hash,
      key_prefix: prefix,
      label,
      created_by: user.id,
    })
    .select("id, key_prefix, label, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({
    ok: true,
    apiKey: { ...data, plaintext },
  });
}
