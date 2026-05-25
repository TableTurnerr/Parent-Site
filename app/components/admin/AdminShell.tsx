"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/app/components/ui/Logo";
import UserAvatar from "@/app/components/ui/UserAvatar";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  PanelLeftClose,
  PanelLeft,
  MapPin,
  FileBarChart2,
  Building2,
  Users,
  LayoutTemplate,
} from "lucide-react";

import type { UserRole } from "@/app/lib/supabase/types";
import { hasRole, ROLE_LABELS } from "@/app/lib/supabase/types";
import ThemeToggle, { type AdminTheme } from "./ThemeToggle";
import { NO_FLASH_THEME_SCRIPT } from "@/app/components/ui/themeMode";

interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  role: UserRole;
}

const THEME_COOKIE = "admin-theme";
const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

type NavItem = { href: string; label: string; icon: typeof LayoutDashboard; minRole: UserRole };
type NavGroup = { label: string; items: NavItem[] };

// minRole: minimum role required to see this nav item
const NAV_GROUPS: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, minRole: "viewer" },
    ],
  },
  {
    label: "Reports",
    items: [
      { href: "/admin/reports", label: "Reports", icon: FileBarChart2, minRole: "viewer" },
      { href: "/admin/companies", label: "Prospects & Clients", icon: Building2, minRole: "viewer" },
      { href: "/admin/owners", label: "Owners", icon: Users, minRole: "viewer" },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/posts", label: "Posts", icon: FileText, minRole: "viewer" },
      { href: "/admin/categories", label: "Blog Categories", icon: FolderOpen, minRole: "manager" },
      { href: "/admin/location-pages", label: "Location Pages", icon: MapPin, minRole: "viewer" },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/settings", label: "Settings", icon: Settings, minRole: "manager" },
    ],
  },
];

export default function AdminShell({
  user,
  version,
  initialTheme = null,
  children,
}: {
  user: AdminUser;
  version: string;
  initialTheme?: AdminTheme | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  // null = follow system; resolved on the client in the effect below.
  const [theme, setTheme] = useState<AdminTheme>(initialTheme ?? "light");
  const userExpandedRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Apply theme to wrapper element directly (matches the pre-paint script
  // so the React tree never fights it). When no cookie is set, follow the
  // OS preference and subscribe to changes.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const apply = (next: AdminTheme) => {
      el.classList.toggle("dark", next === "dark");
      setTheme(next);
    };

    if (initialTheme === "dark" || initialTheme === "light") {
      apply(initialTheme);
      return;
    }

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    apply(mql.matches ? "dark" : "light");
    const handler = (e: MediaQueryListEvent) =>
      apply(e.matches ? "dark" : "light");
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [initialTheme]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin-sidebar-collapsed");
      if (stored === "true") setCollapsed(true);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const handler = () => {
      if (userExpandedRef.current) return;
      setCollapsed((prev) => {
        if (prev) return prev;
        try { localStorage.setItem("admin-sidebar-collapsed", "true"); } catch { /* ignore */ }
        return true;
      });
    };
    window.addEventListener("admin-sidebar-auto-collapse", handler);
    return () => window.removeEventListener("admin-sidebar-auto-collapse", handler);
  }, []);

  const handleThemeChange = (next: AdminTheme) => {
    setTheme(next);
    wrapperRef.current?.classList.toggle("dark", next === "dark");
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; samesite=lax`;
  };

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      if (!next) userExpandedRef.current = true;
      try { localStorage.setItem("admin-sidebar-collapsed", String(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const formatTime = useCallback(() => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  }, []);

  const [currentTime, setCurrentTime] = useState(formatTime);
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(formatTime()), 10_000);
    return () => clearInterval(interval);
  }, [formatTime]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
    <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME_SCRIPT }} />
    <div
      ref={wrapperRef}
      suppressHydrationWarning
      className="flex h-screen bg-[var(--color-cream)]"
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[var(--color-charcoal)] transition-all duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:w-[68px]" : "w-64"}`}
      >
        {/* Logo */}
        <div className={`flex h-16 shrink-0 items-center ${collapsed ? "justify-between px-3 lg:justify-center" : "justify-between px-6"}`}>
          <Link href="/admin" className={`flex items-center gap-2 text-white ${collapsed ? "lg:hidden" : ""}`}>
            <Logo className="w-auto h-6 text-white shrink-0" />
            <span className="text-lg font-bold">Table<span className="font-extrabold">Turnerr</span></span>
          </Link>
          {collapsed && (
            <Link href="/admin" className="hidden lg:flex items-center justify-center">
              <Logo className="w-auto h-7 text-white" />
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 overflow-y-auto py-4 ${collapsed ? "px-2" : "px-3"}`}>
          {NAV_GROUPS.map((group, groupIdx) => {
            const visibleItems = group.items.filter((item) => hasRole(user.role, item.minRole));
            if (visibleItems.length === 0) return null;
            return (
              <div key={group.label} className={groupIdx > 0 ? "mt-5" : ""}>
                {collapsed ? (
                  groupIdx > 0 && <div className="mx-2 mb-2 border-t border-white/10" />
                ) : (
                  <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/30">
                    {group.label}
                  </p>
                )}
                <div className="space-y-0.5">
                  {visibleItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        title={collapsed ? item.label : undefined}
                        className={`flex items-center rounded-lg text-sm font-medium transition-colors ${
                          collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5"
                        } ${
                          active
                            ? "bg-white/10 text-white"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{item.label}</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="my-4 border-t border-white/10" />

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title={collapsed ? "View Site" : undefined}
            className={`flex items-center rounded-lg text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white ${
              collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5"
            }`}
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            {!collapsed && <span>View Site</span>}
          </a>

          {process.env.NEXT_PUBLIC_WIREFRAMES_URL && (
            <a
              href={process.env.NEXT_PUBLIC_WIREFRAMES_URL}
              target="_blank"
              rel="noopener noreferrer"
              title={collapsed ? "Wireframes" : undefined}
              className={`mt-0.5 flex items-center rounded-lg text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white ${
                collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5"
              }`}
            >
              <LayoutTemplate className="h-4 w-4 shrink-0" />
              {!collapsed && <span>Wireframes</span>}
            </a>
          )}
        </nav>

        {/* Collapse toggle (desktop only) */}
        <div className="hidden border-t border-white/10 lg:block">
          <button
            onClick={toggleCollapsed}
            className={`flex w-full items-center text-xs font-medium text-white/40 transition-colors hover:bg-white/5 hover:text-white/70 ${
              collapsed ? "justify-center p-3" : "gap-3 px-4 py-3"
            }`}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <>
                <PanelLeftClose className="h-4 w-4" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>

        {/* User section */}
        <div className={`border-t border-white/10 ${collapsed ? "p-2" : "p-4"}`}>
          <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
            <UserAvatar
              src={user.avatarUrl}
              name={user.fullName}
              seed={user.id}
              size={32}
              className="shrink-0"
              title={collapsed ? `${user.fullName} (${ROLE_LABELS[user.role]})` : undefined}
            />
            {!collapsed && (
              <>
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
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar (mobile) */}
        <header className="flex h-16 items-center gap-4 border-b border-[var(--color-border)] bg-[var(--card)] px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 text-[var(--color-charcoal)] transition-colors hover:bg-[var(--color-cream-dark)] lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          {collapsed && (
            <button
              onClick={toggleCollapsed}
              className="hidden rounded-lg p-1.5 text-[var(--color-warm-gray)] transition-colors hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-charcoal)] lg:block"
              title="Expand sidebar"
            >
              <PanelLeft className="h-5 w-5" />
            </button>
          )}
          <div className="flex-1" />
          <ThemeToggle theme={theme} onChange={handleThemeChange} />
          <span className="text-xs font-medium text-[var(--color-warm-gray-light)]">
            v{version}
          </span>
          <span className="text-xs tabular-nums text-[var(--color-warm-gray-light)]">
            {currentTime}
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
    </>
  );
}
