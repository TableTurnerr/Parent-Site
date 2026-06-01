import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

const STATUSES = ["new", "read", "archived"] as const;
type ReviewStatus = (typeof STATUSES)[number];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; reviewId: string }> },
) {
  const { id: clientId, reviewId } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { status?: ReviewStatus };
  try {
    body = (await request.json()) as { status?: ReviewStatus };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const status = body.status;
  if (!status || !STATUSES.includes(status)) {
    return NextResponse.json({ error: "status must be 'new', 'read', or 'archived'" }, { status: 400 });
  }

  const update: Record<string, unknown> = { status };
  if (status === "read") {
    update.read_at = new Date().toISOString();
    update.read_by = user.id;
  } else if (status === "new") {
    update.read_at = null;
    update.read_by = null;
  }

  const { data, error } = await supabase
    .from("site_reviews")
    .update(update)
    .eq("id", reviewId)
    .eq("client_id", clientId)
    .select("id, status, read_at, read_by, updated_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true, review: data });
}
