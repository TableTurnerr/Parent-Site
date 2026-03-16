"use client";

import { Check, X, Shield, ShieldOff } from "lucide-react";

interface Member {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  status: string;
  created_at: string;
}

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
          className="flex items-center justify-between px-6 py-4"
        >
          <div className="flex items-center gap-3">
            {member.avatar_url ? (
              <img
                src={member.avatar_url}
                alt={member.full_name ?? ""}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-warm-gray-light)] text-sm font-medium text-white">
                {(member.full_name ?? "?").charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-[var(--color-charcoal)]">
                {member.full_name ?? "Unknown"}
                {member.id === currentUserId && (
                  <span className="ml-1.5 text-xs text-[var(--color-warm-gray-light)]">
                    (you)
                  </span>
                )}
              </p>
              <p className="text-xs text-[var(--color-warm-gray-light)]">
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

          <div className="flex items-center gap-2">
            {/* Role toggle (for approved members) */}
            {member.status === "approved" && member.id !== currentUserId && (
              <form action={updateRoleAction}>
                <input type="hidden" name="user_id" value={member.id} />
                <input
                  type="hidden"
                  name="role"
                  value={member.role === "admin" ? "author" : "admin"}
                />
                <button
                  type="submit"
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    member.role === "admin"
                      ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                      : "bg-[var(--color-cream-dark)] text-[var(--color-warm-gray)] hover:bg-[var(--color-border)]"
                  }`}
                  title={
                    member.role === "admin"
                      ? "Demote to Author"
                      : "Promote to Admin"
                  }
                >
                  {member.role === "admin" ? (
                    <Shield className="h-3 w-3" />
                  ) : (
                    <ShieldOff className="h-3 w-3" />
                  )}
                  {member.role === "admin" ? "Admin" : "Author"}
                </button>
              </form>
            )}

            {/* Self badge */}
            {member.id === currentUserId && (
              <span className="rounded-full bg-purple-100 px-3 py-1.5 text-xs font-medium text-purple-700">
                Admin
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
                    className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-200"
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
                    className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-200"
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
                  className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-200"
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
                  className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
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
