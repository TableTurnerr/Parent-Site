"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import UserAvatar from "@/app/components/ui/UserAvatar";
import { createClient } from "@/app/lib/supabase/client";
import { LogOut } from "lucide-react";
import type { UserRole } from "@/app/lib/supabase/types";
import ThemeToggleButton from "@/app/components/ui/ThemeToggleButton";
import {
  NO_FLASH_THEME_SCRIPT,
  useThemeMode,
  type ThemeMode,
} from "@/app/components/ui/themeMode";
import { useRef } from "react";

interface PortalUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  role: UserRole;
}

function ProfileChip({
  user,
  onSignOut,
  theme,
  onThemeToggle,
}: {
  user: PortalUser;
  onSignOut: () => void;
  theme: ThemeMode;
  onThemeToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <ThemeToggleButton theme={theme} onToggle={onThemeToggle} />
      <div className="flex items-center gap-2 rounded-full border border-border/60 bg-white/70 backdrop-blur-sm pl-1.5 pr-2 py-1">
        <UserAvatar
          src={user.avatarUrl}
          name={user.fullName}
          seed={user.id}
          size={28}
          className="shrink-0"
        />
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
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { theme, toggle } = useThemeMode(wrapperRef);

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME_SCRIPT }} />
      <div
        ref={wrapperRef}
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-[var(--color-cream)]"
      >
        <Navbar
          variant="static"
          rightSlot={
            <ProfileChip
              user={user}
              onSignOut={signOut}
              theme={theme}
              onThemeToggle={toggle}
            />
          }
        />
        {/* Spacer for the fixed Navbar (h-16 mobile, h-20 desktop) */}
        <div className="h-16 md:h-20 flex-shrink-0" aria-hidden="true" />
        <main className="flex-1 bg-[var(--color-cream)]">{children}</main>
        <Footer hideWatermark />
      </div>
    </>
  );
}
