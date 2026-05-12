import { createClient, createAdminClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";
import AccessManager from "@/app/components/admin/AccessManager";
import UserAvatar from "@/app/components/ui/UserAvatar";
import AddOwnerForm from "@/app/components/admin/AddOwnerForm";

async function updateUserStatus(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Verify requester is admin
  const { data: requester } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (requester?.role !== "admin" && requester?.role !== "manager")
    throw new Error("Manager or Admin only");

  const userId = formData.get("user_id") as string;
  const newStatus = formData.get("status") as "pending" | "approved" | "denied";

  const admin = await createAdminClient();
  await admin
    .from("profiles")
    .update({ status: newStatus })
    .eq("id", userId);

  revalidatePath("/admin/settings");
}

async function updateUserProfile(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: requester } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (requester?.role !== "admin" && requester?.role !== "manager")
    throw new Error("Manager or Admin only");

  const userId = formData.get("user_id") as string;
  const fullNameRaw = formData.get("full_name");
  const avatarUrlRaw = formData.get("avatar_url");

  const updates: { full_name?: string | null; avatar_url?: string | null } = {};
  if (typeof fullNameRaw === "string") {
    const trimmed = fullNameRaw.trim();
    updates.full_name = trimmed.length > 0 ? trimmed : null;
  }
  if (typeof avatarUrlRaw === "string") {
    const trimmed = avatarUrlRaw.trim();
    updates.avatar_url = trimmed.length > 0 ? trimmed : null;
  }

  if (Object.keys(updates).length === 0) return;

  const admin = await createAdminClient();
  await admin.from("profiles").update(updates).eq("id", userId);

  revalidatePath("/admin/settings");
}

async function updateUserRole(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: requester } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (requester?.role !== "admin" && requester?.role !== "manager")
    throw new Error("Manager or Admin only");

  const userId = formData.get("user_id") as string;
  const newRole = formData.get("role") as "client" | "viewer" | "commenter" | "author" | "editor" | "manager" | "admin";

  const admin = await createAdminClient();
  await admin
    .from("profiles")
    .update({ role: newRole })
    .eq("id", userId);

  revalidatePath("/admin/settings");
}

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  const { data: allProfiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at");

  const { data: companies } = await supabase
    .from("clients")
    .select("id, name")
    .order("name", { ascending: true });

  const { data: clientGrants } = await supabase
    .from("client_access")
    .select("profile_id, clients(name)")
    .is("revoked_at", null)
    .not("profile_id", "is", null);

  const companiesByProfile = new Map<string, string[]>();
  for (const grant of clientGrants ?? []) {
    if (!grant.profile_id) continue;
    const linked = grant.clients as { name: string } | { name: string }[] | null;
    const name = Array.isArray(linked) ? linked[0]?.name : linked?.name;
    if (!name) continue;
    const list = companiesByProfile.get(grant.profile_id) ?? [];
    list.push(name);
    companiesByProfile.set(grant.profile_id, list);
  }

  const resolveDisplayName = (p: { id: string; role: string; full_name: string | null }) => {
    if (p.role === "client") {
      const assigned = companiesByProfile.get(p.id) ?? [];
      if (assigned.length === 1) return assigned[0];
    }
    return p.full_name ?? "User";
  };

  const withDisplayName = <T extends { id: string; role: string; full_name: string | null }>(p: T) => ({
    ...p,
    full_name: resolveDisplayName(p),
  });

  const isAdmin = profile?.role === "admin";

  const pendingRequests =
    allProfiles?.filter((p) => p.status === "pending").map(withDisplayName) ?? [];
  const approvedMembers =
    allProfiles
      ?.filter((p) => p.status === "approved" && p.role !== "client")
      .map(withDisplayName) ?? [];
  const approvedClients =
    allProfiles
      ?.filter((p) => p.status === "approved" && p.role === "client")
      .map(withDisplayName) ?? [];
  const deniedMembers =
    allProfiles?.filter((p) => p.status === "denied").map(withDisplayName) ?? [];

  const ownDisplayName = profile ? resolveDisplayName(profile) : "Team Member";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-charcoal)]">
          Settings
        </h1>
        <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
          Manage team access and roles.
        </p>
      </div>

      {/* Current user */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-charcoal)]">
          Your Profile
        </h2>
        <div className="flex items-center gap-4">
          <UserAvatar
            src={profile?.avatar_url}
            name={ownDisplayName}
            seed={profile?.id}
            size={56}
          />
          <div>
            <p className="font-medium text-[var(--color-charcoal)]">
              {ownDisplayName}
            </p>
            <p className="text-sm text-[var(--color-warm-gray)]">
              {profile?.email}
            </p>
            <div className="mt-1 flex gap-2">
              <span className="inline-block rounded-full bg-[var(--color-cream-dark)] px-2.5 py-0.5 text-xs font-medium capitalize text-[var(--color-warm-gray)]">
                {profile?.role ?? "author"}
              </span>
              <span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium capitalize text-green-700">
                {profile?.status ?? "pending"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Access Requests (admin only) */}
      {isAdmin && pendingRequests.length > 0 && (
        <div className="rounded-xl border-2 border-amber-200 bg-amber-50">
          <div className="border-b border-amber-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-[var(--color-charcoal)]">
              Pending Access Requests
              <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                {pendingRequests.length}
              </span>
            </h2>
          </div>
          <AccessManager
            members={pendingRequests}
            updateStatusAction={updateUserStatus}
            updateRoleAction={updateUserRole}
            updateProfileAction={updateUserProfile}
            showApproveActions
          />
        </div>
      )}

      {/* Approved Team Members (admin only) */}
      {isAdmin && (
        <div className="rounded-xl border border-[var(--color-border)] bg-white">
          <div className="border-b border-[var(--color-border)] px-6 py-4">
            <h2 className="text-lg font-semibold text-[var(--color-charcoal)]">
              Team Members
            </h2>
            <p className="mt-0.5 text-xs text-[var(--color-warm-gray)]">
              Manage roles and access for approved team members.
            </p>
          </div>
          {approvedMembers.length > 0 ? (
            <AccessManager
              members={approvedMembers}
              updateStatusAction={updateUserStatus}
              updateRoleAction={updateUserRole}
              currentUserId={user!.id}
            />
          ) : (
            <div className="px-6 py-8 text-center text-sm text-[var(--color-warm-gray)]">
              No approved members yet.
            </div>
          )}
        </div>
      )}

      {/* Clients (admin only) */}
      {isAdmin && (
        <div className="rounded-xl border border-[var(--color-border)] bg-white">
          <div className="border-b border-[var(--color-border)] px-6 py-4">
            <h2 className="text-lg font-semibold text-[var(--color-charcoal)]">
              Clients
            </h2>
            <p className="mt-0.5 text-xs text-[var(--color-warm-gray)]">
              Restaurant owners with access to their company&apos;s reports.
            </p>
          </div>
          {approvedClients.length > 0 ? (
            <AccessManager
              members={approvedClients}
              updateStatusAction={updateUserStatus}
              updateRoleAction={updateUserRole}
              currentUserId={user!.id}
            />
          ) : (
            <AddOwnerForm
              companies={companies ?? []}
              heading="Add a client"
              description="Invite a restaurant owner by email and assign them to one or more companies."
            />
          )}
        </div>
      )}

      {/* Denied users (admin only) */}
      {isAdmin && deniedMembers.length > 0 && (
        <div className="rounded-xl border border-[var(--color-border)] bg-white">
          <div className="border-b border-[var(--color-border)] px-6 py-4">
            <h2 className="text-lg font-semibold text-[var(--color-charcoal)]">
              Denied Users
            </h2>
          </div>
          <AccessManager
            members={deniedMembers}
            updateStatusAction={updateUserStatus}
            updateRoleAction={updateUserRole}
            updateProfileAction={updateUserProfile}
            showReapproveAction
          />
        </div>
      )}
    </div>
  );
}
