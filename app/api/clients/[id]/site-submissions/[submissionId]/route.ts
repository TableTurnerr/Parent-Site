import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

const STATUSES = ["new", "read", "archived"] as const;
type SubmissionStatus = (typeof STATUSES)[number];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; submissionId: string }> },
) {
  const { id: clientId, submissionId } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { status?: SubmissionStatus };
  try {
    body = (await request.json()) as { status?: SubmissionStatus };
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
    .from("site_form_submissions")
    .update(update)
    .eq("id", submissionId)
    .eq("client_id", clientId)
    .select("id, status, read_at, read_by, updated_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true, submission: data });
}
