"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/app/components/ui/Logo";
import { createClient } from "@/app/lib/supabase/client";
import { LogOut } from "lucide-react";
import type { UserRole } from "@/app/lib/supabase/types";

interface PortalUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  role: UserRole;
}

export default function ClientShell({
  user,
  version,
  children,
}: {
  user: PortalUser;
  version: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      <header className="border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8">
          <Link href="/portal" className="flex items-center gap-2 text-[var(--color-charcoal)]">
            <Logo className="h-6 w-auto text-[var(--color-charcoal)]" />
            <span className="text-lg font-bold">
              Table<span className="font-extrabold">Turnerr</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-medium text-[var(--color-charcoal)]">{user.fullName}</p>
              <p className="text-xs text-[var(--color-warm-gray-light)]">{user.email}</p>
            </div>
            {user.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatarUrl} alt={user.fullName} className="h-9 w-9 rounded-full object-cover" />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-charcoal)] text-sm font-medium text-white">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
            )}
            <button
              onClick={signOut}
              className="rounded-lg p-2 text-[var(--color-warm-gray)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-charcoal)]"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-12">{children}</main>

      <footer className="border-t border-[var(--color-border)] bg-white py-6">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <p className="text-xs text-[var(--color-warm-gray-light)]">
            v{version} · TableTurnerr
          </p>
        </div>
      </footer>
    </div>
  );
}
