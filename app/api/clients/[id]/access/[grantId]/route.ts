import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; grantId: string }> },
) {
  const { id: clientId, grantId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase
    .from("client_access")
    .update({ revoked_at: new Date().toISOString() })
    .eq("id", grantId)
    .eq("client_id", clientId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
