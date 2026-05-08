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

  const providers: string[] = Array.isArray(user.app_metadata?.providers)
    ? user.app_metadata.providers
    : user.app_metadata?.provider
      ? [user.app_metadata.provider]
      : [];
  const isGoogle = providers.includes("google");
  const googleRealName = isGoogle
    ? (user.user_metadata?.full_name ?? user.user_metadata?.name ?? null)
    : null;

  let displayName = profile?.full_name ?? user.user_metadata?.full_name ?? "Owner";
  if (sharedClients && sharedClients.length === 1) {
    displayName = googleRealName ?? sharedClients[0].name;
  }

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
