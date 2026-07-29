import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("clients")
    .select("id, name, slug, url, primary_contact_email, created_at, updated_at")
    .order("name");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ clients: data ?? [] });
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const slug = typeof body.slug === "string" ? body.slug.trim().toLowerCase() : "";
  const url = typeof body.url === "string" ? body.url.trim() : "";
  const primaryContactEmail = typeof body.primary_contact_email === "string"
    ? body.primary_contact_email.trim().toLowerCase()
    : null;

  if (!name) return NextResponse.json({ error: "name required" }, { status: 400 });
  if (!url) return NextResponse.json({ error: "url required" }, { status: 400 });
  if (!SLUG_RE.test(slug)) return NextResponse.json({ error: "Invalid slug (lowercase letters, numbers, hyphens)" }, { status: 400 });

  const { data, error } = await supabase
    .from("clients")
    .insert({ name, slug, url, primary_contact_email: primaryContactEmail, created_by: user.id })
    .select("id, slug")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true, client: data });
}
