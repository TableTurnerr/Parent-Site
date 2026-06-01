import { cookies } from "next/headers";
import { createClient, createAdminClient } from "./server";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export const IMPERSONATION_COOKIE = "tt_impersonate_client_id";

type AdminLikeRole = "admin" | "manager" | "editor" | "author" | "viewer" | "commenter";

const ADMIN_ROLES = new Set<AdminLikeRole>(["admin", "manager", "editor", "author", "viewer", "commenter"]);

export type Impersonation = {
  clientId: string;
  clientSlug: string;
  clientName: string;
};

export type PortalContext = {
  /** Supabase client to use for portal data queries. Service-role when impersonating, user-scoped otherwise. */
  supabase: SupabaseClient<Database>;
  /** Forces a WHERE client_id = X filter on all portal queries when impersonating. null otherwise. */
  filterClientId: string | null;
  impersonation: Impersonation | null;
};

/**
 * Returns the right Supabase client + client-id filter for the current portal request.
 * Admin/manager/etc. can impersonate a client via the IMPERSONATION_COOKIE — when set,
 * we use a service-role client scoped to that client_id. Otherwise we return the
 * user-scoped client and let RLS do the filtering.
 */
export async function getPortalContext(): Promise<PortalContext> {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const cookieClientId = cookieStore.get(IMPERSONATION_COOKIE)?.value ?? null;

  if (!cookieClientId) {
    return { supabase, filterClientId: null, impersonation: null };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { supabase, filterClientId: null, impersonation: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  const role = profile?.role as AdminLikeRole | undefined;
  if (!role || !ADMIN_ROLES.has(role)) {
    return { supabase, filterClientId: null, impersonation: null };
  }

  const admin = await createAdminClient();
  const { data: client } = await admin
    .from("clients")
    .select("id, slug, name")
    .eq("id", cookieClientId)
    .maybeSingle();
  if (!client) {
    return { supabase, filterClientId: null, impersonation: null };
  }

  return {
    supabase: admin,
    filterClientId: client.id,
    impersonation: { clientId: client.id, clientSlug: client.slug, clientName: client.name },
  };
}

export async function getCurrentImpersonation(): Promise<Impersonation | null> {
  const ctx = await getPortalContext();
  return ctx.impersonation;
}
