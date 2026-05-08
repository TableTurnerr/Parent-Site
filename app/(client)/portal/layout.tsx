import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";
import ClientShell from "@/app/components/portal/ClientShell";
import pkg from "@/package.json";

export const metadata = {
  title: "Portal | TableTurnerr",
  robots: { index: false, follow: false },
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/portal");

  const [{ data: profile }, { data: sharedClients }] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, avatar_url, role, email")
      .eq("id", user.id)
      .single(),
    supabase.from("clients").select("name").limit(2),
  ]);

  const displayName =
    sharedClients && sharedClients.length === 1
      ? sharedClients[0].name
      : (profile?.full_name ?? user.user_metadata?.full_name ?? "User");

  return (
    <ClientShell
      version={pkg.version}
      user={{
        id: user.id,
        email: profile?.email ?? user.email ?? "",
        fullName: displayName,
        avatarUrl: profile?.avatar_url ?? user.user_metadata?.avatar_url ?? null,
        role: profile?.role ?? "client",
      }}
    >
      {children}
    </ClientShell>
  );
}
