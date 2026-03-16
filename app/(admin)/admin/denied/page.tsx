"use client";

import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ShieldX } from "lucide-react";

export default function DeniedPage() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-cream)]">
      <div className="w-full max-w-md space-y-6 px-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <ShieldX className="h-8 w-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-charcoal)]">
          Access Denied
        </h1>
        <p className="text-sm text-[var(--color-warm-gray)]">
          Your access request has been denied. If you believe this is an error,
          contact the site administrator.
        </p>
        <button
          onClick={handleSignOut}
          className="rounded-full bg-[var(--color-charcoal)] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-charcoal-light)]"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
