"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import UserAvatar from "@/app/components/ui/UserAvatar";
import { ChipDropdown } from "@/app/components/ui/Dropdown";
import { ROLE_LABELS, ROLE_DESCRIPTIONS } from "@/app/lib/supabase/types";
import type { UserRole } from "@/app/lib/supabase/types";

interface Member {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  status: string;
  created_at: string;
}

const ALL_ROLES: UserRole[] = ["client", "viewer", "commenter", "author", "editor", "manager", "admin"];

const ROLE_COLORS: Record<UserRole, string> = {
  client: "bg-sky-50 text-sky-700",
  viewer: "bg-gray-100 text-gray-600",
  commenter: "bg-blue-50 text-blue-600",
  author: "bg-teal-50 text-teal-700",
  editor: "bg-emerald-50 text-emerald-600",
  manager: "bg-purple-50 text-purple-600",
  admin: "bg-amber-50 text-amber-700",
};

export default function AccessManager({
  members,
  updateStatusAction,
  updateRoleAction,
  showApproveActions,
  showReapproveAction,
  currentUserId,
}: {
  members: Member[];
  updateStatusAction: (formData: FormData) => Promise<void>;
  updateRoleAction: (formData: FormData) => Promise<void>;
  showApproveActions?: boolean;
  showReapproveAction?: boolean;
  currentUserId?: string;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  return (
    <ul className="divide-y divide-[var(--color-border)]">
      {members.map((member) => (
        <li
          key={member.id}
          className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6"
        >
          <div className="flex items-center gap-3 min-w-0">
            <UserAvatar
              src={member.avatar_url}
              name={member.full_name ?? member.email ?? "User"}
              seed={member.id}
              size={40}
              className="shrink-0"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[var(--color-charcoal)]">
                {member.full_name ?? "User"}
                {member.id === currentUserId && (
                  <span className="ml-1.5 text-xs text-[var(--color-warm-gray-light)]">
                    (you)
                  </span>
                )}
              </p>
              <p className="truncate text-xs text-[var(--color-warm-gray-light)]">
                {member.email}
              </p>
              <p className="text-xs text-[var(--color-warm-gray-light)]">
                Joined{" "}
                {new Date(member.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 sm:justify-end">
            {/* Role selector (for approved members, not self) */}
            {member.status === "approved" && member.id !== currentUserId && (
              <ChipDropdown
                open={openMenu === member.id}
                onOpenChange={(o) => setOpenMenu(o ? member.id : null)}
                chipClassName={ROLE_COLORS[(member.role as UserRole) ?? "viewer"]}
                label={ROLE_LABELS[(member.role as UserRole) ?? "viewer"]}
                title={ROLE_DESCRIPTIONS[(member.role as UserRole) ?? "viewer"]}
                menuWidth={240}
                align="right"
                options={ALL_ROLES.map((role) => ({
                  key: role,
                  label: ROLE_LABELS[role],
                  description: ROLE_DESCRIPTIONS[role],
                  active: role === member.role,
                  onClick: () => {
                    const fd = new FormData();
                    fd.set("user_id", member.id);
                    fd.set("role", role);
                    updateRoleAction(fd);
                  },
                }))}
              />
            )}

            {/* Self badge */}
            {member.id === currentUserId && (
              <span
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                  ROLE_COLORS[(member.role as UserRole) ?? "viewer"]
                }`}
              >
                {ROLE_LABELS[(member.role as UserRole) ?? "viewer"]}
              </span>
            )}

            {/* Approve/Deny (for pending requests) */}
            {showApproveActions && (
              <div className="flex gap-1.5">
                <form action={updateStatusAction}>
                  <input type="hidden" name="user_id" value={member.id} />
                  <input type="hidden" name="status" value="approved" />
                  <button
                    type="submit"
                    className="flex cursor-pointer items-center gap-1 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-200"
                  >
                    <Check className="h-3 w-3" />
                    Approve
                  </button>
                </form>
                <form action={updateStatusAction}>
                  <input type="hidden" name="user_id" value={member.id} />
                  <input type="hidden" name="status" value="denied" />
                  <button
                    type="submit"
                    className="flex cursor-pointer items-center gap-1 rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-200"
                  >
                    <X className="h-3 w-3" />
                    Deny
                  </button>
                </form>
              </div>
            )}

            {/* Re-approve (for denied users) */}
            {showReapproveAction && (
              <form action={updateStatusAction}>
                <input type="hidden" name="user_id" value={member.id} />
                <input type="hidden" name="status" value="approved" />
                <button
                  type="submit"
                  className="flex cursor-pointer items-center gap-1 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-200"
                >
                  <Check className="h-3 w-3" />
                  Re-approve
                </button>
              </form>
            )}

            {/* Revoke (for approved non-self members) */}
            {member.status === "approved" && member.id !== currentUserId && (
              <form action={updateStatusAction}>
                <input type="hidden" name="user_id" value={member.id} />
                <input type="hidden" name="status" value="denied" />
                <button
                  type="submit"
                  className="cursor-pointer rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                >
                  Revoke
                </button>
              </form>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
