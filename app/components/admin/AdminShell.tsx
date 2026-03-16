"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

import type { UserRole } from "@/app/lib/supabase/types";
import { hasRole, ROLE_LABELS } from "@/app/lib/supabase/types";

interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  role: UserRole;
}

// minRole: minimum role required to see this nav item
const NAV_ITEMS: { href: string; label: string; icon: typeof LayoutDashboard; minRole: UserRole }[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, minRole: "viewer" },
  { href: "/admin/posts", label: "Posts", icon: FileText, minRole: "viewer" },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen, minRole: "manager" },
  { href: "/admin/settings", label: "Settings", icon: Settings, minRole: "manager" },
];

export default function AdminShell({
  user,
  children,
}: {
  user: AdminUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-[var(--color-cream)]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[var(--color-charcoal)] transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6">
          <Link href="/admin" className="text-lg font-bold text-white">
            Table<span className="text-[var(--color-accent)]">Turnerr</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white/60 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.filter((item) => hasRole(user.role, item.minRole)).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}

          <div className="my-4 border-t border-white/10" />

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            View Site
          </a>
        </nav>

        {/* User section */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-medium text-white">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-white">
                {user.fullName}
              </p>
              <p className="truncate text-xs text-white/50">
                {ROLE_LABELS[user.role]}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar (mobile) */}
        <header className="flex h-16 items-center gap-4 border-b border-[var(--color-border)] bg-white px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[var(--color-charcoal)] lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <span className="text-xs text-[var(--color-warm-gray-light)]">
            {user.email}
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
