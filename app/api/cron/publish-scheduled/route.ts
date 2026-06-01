import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Cron endpoint: publishes any scheduled posts whose time has arrived.
 *
 * Trigger this on a schedule (e.g. every 5 minutes). Two options:
 *   1. Vercel Cron — add to vercel.json (see infra note below). Vercel sends a
 *      request with an Authorization: Bearer <CRON_SECRET> header automatically
 *      when CRON_SECRET is set in the project env.
 *   2. Any external scheduler (cron-job.org, GitHub Actions) hitting this URL
 *      with header `Authorization: Bearer <CRON_SECRET>`.
 *
 * ⚠️ Owner note: setting up the cron trigger + CRON_SECRET is hosting/infra
 * (Hasham's domain). This endpoint is the logic; it does nothing until a
 * scheduler calls it. It is safe to deploy unwired — it just never fires.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;

  // Require the secret in production. If CRON_SECRET is unset we refuse rather
  // than run unauthenticated, so a public URL can't trigger publishing.
  if (!secret) {
    return NextResponse.json(
      { error: "CRON_SECRET not configured; scheduling is inactive." },
      { status: 503 }
    );
  }
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createAdminClient();
  const nowIso = new Date().toISOString();

  // Find scheduled posts whose time has passed.
  const { data: due, error: selErr } = await supabase
    .from("blog_posts")
    .select("id, slug, scheduled_at")
    .eq("status", "scheduled")
    .lte("scheduled_at", nowIso);

  if (selErr) {
    return NextResponse.json({ error: selErr.message }, { status: 500 });
  }
  if (!due || due.length === 0) {
    return NextResponse.json({ published: 0 });
  }

  const ids = due.map((p) => p.id);
  const { error: updErr } = await supabase
    .from("blog_posts")
    .update({ status: "published", published_at: nowIso })
    .in("id", ids);

  if (updErr) {
    return NextResponse.json({ error: updErr.message }, { status: 500 });
  }

  // Refresh the public blog so the newly live posts appear.
  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  for (const p of due) revalidatePath(`/blog/${p.slug}`);

  return NextResponse.json({ published: ids.length, slugs: due.map((p) => p.slug) });
}
