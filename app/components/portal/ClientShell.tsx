"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
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

function ProfileChip({ user, onSignOut }: { user: PortalUser; onSignOut: () => void }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border/60 bg-white/70 backdrop-blur-sm pl-1.5 pr-2 py-1">
      {user.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.avatarUrl} alt={user.fullName} className="h-7 w-7 rounded-full object-cover" />
      ) : (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-charcoal text-[11px] font-medium text-white">
          {user.fullName.charAt(0).toUpperCase()}
        </div>
      )}
      <span className="hidden lg:block max-w-[120px] truncate text-xs font-medium text-charcoal">
        {user.fullName}
      </span>
      <button
        onClick={onSignOut}
        className="flex h-7 w-7 items-center justify-center rounded-full text-warm-gray transition-colors hover:bg-cream hover:text-charcoal"
        title="Sign out"
        aria-label="Sign out"
      >
        <LogOut className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export default function ClientShell({
  user,
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
    <>
      <Navbar variant="static" rightSlot={<ProfileChip user={user} onSignOut={signOut} />} />
      {/* Spacer for the fixed Navbar (h-16 mobile, h-20 desktop) */}
      <div className="h-16 md:h-20" aria-hidden="true" />
      <main className="min-h-[60vh] bg-[var(--color-cream)]">{children}</main>
      <Footer />
    </>
  );
}
