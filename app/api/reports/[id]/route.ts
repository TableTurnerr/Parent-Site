import { createClient } from "@/app/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { marked } from "marked";

type Variant = "client" | "internal";

type PatchBody = {
  status?: "draft" | "published" | "archived";
  visibility?: "public" | "unlisted" | "private";
  variant?: Variant;
  content_md?: string;
  client_name?: string;
  client_url?: string;
};

const STATUS = ["draft", "published", "archived"] as const;
const VISIBILITY = ["public", "unlisted", "private"] as const;

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

  const { data, error } = await supabase
    .from("client_reports")
    .update(update)
    .eq("id", id)
    .select("id, client_slug, status, visibility, published_at, updated_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
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
