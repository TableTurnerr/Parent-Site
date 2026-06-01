import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { Database } from "./types";
import { withSharedDomain } from "./cookie-options";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, withSharedDomain(options))
            );
          } catch {
            // setAll called from a Server Component — safe to ignore
            // if middleware is refreshing sessions.
          }
        },
      },
    }
  );
}

/**
 * Creates an admin client with the service role key.
 * Use only in server-side code that needs to bypass RLS.
 *
 * Uses the plain supabase-js client (no cookies) so the user's session JWT
 * never overrides the service role on the Authorization header.
 */
export async function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
