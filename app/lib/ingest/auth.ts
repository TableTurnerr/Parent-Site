import { createAdminClient } from "@/app/lib/supabase/server";
import { hashApiKey } from "./keys";

export type IngestContext = {
  client_id: string;
  client_slug: string;
  api_key_id: string;
};

function normalizeOrigin(value: string | null): string | null {
  if (!value) return null;
  return value.trim().toLowerCase().replace(/\/+$/, "");
}

export async function authenticateIngestRequest(request: Request): Promise<
  | { ok: true; context: IngestContext }
  | { ok: false; status: number; error: string }
> {
  const apiKey = request.headers.get("x-api-key");
  if (!apiKey || !apiKey.startsWith("ttk_")) {
    return { ok: false, status: 401, error: "missing or malformed api key" };
  }

  const origin = normalizeOrigin(request.headers.get("origin"));
  if (!origin) {
    return { ok: false, status: 400, error: "origin header required" };
  }

  const admin = await createAdminClient();
  const keyHash = hashApiKey(apiKey);

  const { data: keyRow, error: keyErr } = await admin
    .from("client_api_keys")
    .select("id, client_id, revoked_at, clients!inner ( slug )")
    .eq("key_hash", keyHash)
    .is("revoked_at", null)
    .maybeSingle();

  if (keyErr) return { ok: false, status: 500, error: "auth lookup failed" };
  if (!keyRow) return { ok: false, status: 401, error: "invalid api key" };

  const { data: originRows, error: originErr } = await admin
    .from("client_site_origins")
    .select("origin")
    .eq("client_id", keyRow.client_id);

  if (originErr) return { ok: false, status: 500, error: "origin lookup failed" };

  const allowed = (originRows ?? []).some((row) => normalizeOrigin(row.origin) === origin);
  if (!allowed) return { ok: false, status: 403, error: "origin not allowed for this api key" };

  await admin
    .from("client_api_keys")
    .update({ last_used_at: new Date().toISOString() })
    .eq("id", keyRow.id);

  const clientSlug = (keyRow.clients as unknown as { slug: string } | null)?.slug ?? "";

  return {
    ok: true,
    context: {
      client_id: keyRow.client_id,
      client_slug: clientSlug,
      api_key_id: keyRow.id,
    },
  };
}

export async function resolveLocationId(
  clientId: string,
  locationSlug: string | null
): Promise<string | null> {
  if (!locationSlug) return null;
  const admin = await createAdminClient();
  const { data } = await admin
    .from("locations")
    .select("id")
    .eq("client_id", clientId)
    .eq("slug", locationSlug)
    .maybeSingle();
  return data?.id ?? null;
}

export function extractClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip");
}
