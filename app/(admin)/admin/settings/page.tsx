import { createClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";
import AccessManager from "@/app/components/admin/AccessManager";

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

  if (requester?.role !== "admin") throw new Error("Admin only");

  const userId = formData.get("user_id") as string;
  const newStatus = formData.get("status") as "pending" | "approved" | "denied";

  await supabase
    .from("profiles")
    .update({ status: newStatus })
    .eq("id", userId);

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

  if (requester?.role !== "admin") throw new Error("Admin only");

  const userId = formData.get("user_id") as string;
  const newRole = formData.get("role") as "admin" | "author";

  await supabase
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

  const isAdmin = profile?.role === "admin";

  const pendingRequests =
    allProfiles?.filter((p) => p.status === "pending") ?? [];
  const approvedMembers =
    allProfiles?.filter((p) => p.status === "approved") ?? [];
  const deniedMembers =
    allProfiles?.filter((p) => p.status === "denied") ?? [];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-[var(--color-charcoal)]">
        Settings
      </h1>

      {/* Current user */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-charcoal)]">
          Your Profile
        </h2>
        <div className="flex items-center gap-4">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.full_name ?? ""}
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-lg font-medium text-white">
              {(profile?.full_name ?? "T").charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-medium text-[var(--color-charcoal)]">
              {profile?.full_name ?? "Team Member"}
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
            showReapproveAction
          />
        </div>
      )}
    </div>
  );
}
