import { createAdminClient } from "@/app/lib/supabase/server";

function normalizeOrigin(value: string): string {
  return value.trim().toLowerCase().replace(/\/+$/, "");
}

export async function isAllowedOrigin(origin: string): Promise<boolean> {
  const normalized = normalizeOrigin(origin);
  if (!normalized) return false;
  const admin = await createAdminClient();
  const { data } = await admin
    .from("client_site_origins")
    .select("origin")
    .limit(1000);
  if (!data) return false;
  return data.some((row) => normalizeOrigin(row.origin) === normalized);
}

export function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-API-Key",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

export async function buildCorsHeaders(request: Request): Promise<Record<string, string>> {
  const origin = request.headers.get("origin");
  if (!origin) return {};
  const allowed = await isAllowedOrigin(origin);
  return allowed ? corsHeaders(origin) : {};
}
