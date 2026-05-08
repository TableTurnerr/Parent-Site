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

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url, role, email")
    .eq("id", user.id)
    .single();

  return (
    <ClientShell
      version={pkg.version}
      user={{
        id: user.id,
        email: profile?.email ?? user.email ?? "",
        fullName: profile?.full_name ?? user.user_metadata?.full_name ?? "Owner",
        avatarUrl: profile?.avatar_url ?? user.user_metadata?.avatar_url ?? null,
        role: profile?.role ?? "client",
      }}
    >
      {children}
    </ClientShell>
  );
}
