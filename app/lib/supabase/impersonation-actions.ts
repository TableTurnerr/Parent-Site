"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "./server";
import { IMPERSONATION_COOKIE } from "./impersonation";

const ADMIN_ROLES = new Set(["admin", "manager", "editor", "author", "viewer", "commenter"]);

const ONE_HOUR = 60 * 60;

export async function startImpersonation(formData: FormData) {
  const clientId = String(formData.get("clientId") ?? "");
  const clientSlug = String(formData.get("clientSlug") ?? "");
  if (!clientId || !clientSlug) {
    throw new Error("Missing client identifier");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, status")
    .eq("id", user.id)
    .single();
  if (
    !profile ||
    profile.status !== "approved" ||
    !profile.role ||
    !ADMIN_ROLES.has(profile.role)
  ) {
    throw new Error("Forbidden");
  }

  const { data: client } = await supabase
    .from("clients")
    .select("id, slug")
    .eq("id", clientId)
    .maybeSingle();
  if (!client) throw new Error("Client not found");

  const cookieStore = await cookies();
  cookieStore.set(IMPERSONATION_COOKIE, client.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_HOUR,
  });

  redirect(`/portal/clients/${client.slug}`);
}

export async function stopImpersonation(formData: FormData) {
  const cookieStore = await cookies();
  cookieStore.delete(IMPERSONATION_COOKIE);
  const returnTo = String(formData.get("returnTo") ?? "/admin/companies");
  redirect(returnTo);
}
