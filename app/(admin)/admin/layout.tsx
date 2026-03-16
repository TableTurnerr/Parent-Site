import { createClient } from "@/app/lib/supabase/server";
import type { UserRole } from "@/app/lib/supabase/types";
import AdminShell from "@/app/components/admin/AdminShell";

export const metadata = {
  title: "Admin | TableTurnerr",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // No user — render children directly (login page handles its own UI).
  // The proxy middleware handles redirecting unauthenticated users away
  // from protected /admin/* routes to /admin/login.
  if (!user) {
    return <>{children}</>;
  }

  // Fetch the user's profile for the admin shell
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <AdminShell
      user={{
        id: user.id,
        email: user.email ?? "",
        fullName:
          profile?.full_name ??
          user.user_metadata?.full_name ??
          "Team Member",
        avatarUrl:
          profile?.avatar_url ?? user.user_metadata?.avatar_url ?? null,
        role: (profile?.role as UserRole) ?? "viewer",
      }}
    >
      {children}
    </AdminShell>
  );
}
