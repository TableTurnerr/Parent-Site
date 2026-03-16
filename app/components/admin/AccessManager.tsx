"use client";

import { Check, X } from "lucide-react";
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

const ALL_ROLES: UserRole[] = ["viewer", "commenter", "editor", "manager", "admin"];

const ROLE_COLORS: Record<UserRole, string> = {
  viewer: "bg-gray-100 text-gray-600",
  commenter: "bg-blue-50 text-blue-600",
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
  return (
    <ul className="divide-y divide-[var(--color-border)]">
      {members.map((member) => (
        <li
          key={member.id}
          className="flex items-center justify-between gap-4 px-6 py-4"
        >
          <div className="flex items-center gap-3 min-w-0">
            {member.avatar_url ? (
              <img
                src={member.avatar_url}
                alt={member.full_name ?? ""}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-warm-gray-light)] text-sm font-medium text-white">
                {(member.full_name ?? "?").charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[var(--color-charcoal)]">
                {member.full_name ?? "Unknown"}
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

          <div className="flex items-center gap-2 shrink-0">
            {/* Role selector (for approved members, not self) */}
            {member.status === "approved" && member.id !== currentUserId && (
              <form action={updateRoleAction}>
                <input type="hidden" name="user_id" value={member.id} />
                <select
                  name="role"
                  defaultValue={member.role}
                  onChange={(e) => {
                    const form = e.target.closest("form");
                    if (form) form.requestSubmit();
                  }}
                  className={`cursor-pointer appearance-none rounded-full px-3 py-1.5 pr-7 text-xs font-medium ${
                    ROLE_COLORS[(member.role as UserRole) ?? "viewer"]
                  } border-0 bg-none focus:outline-none`}
                  title={ROLE_DESCRIPTIONS[(member.role as UserRole) ?? "viewer"]}
                >
                  {ALL_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {ROLE_LABELS[role]}
                    </option>
                  ))}
                </select>
              </form>
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
