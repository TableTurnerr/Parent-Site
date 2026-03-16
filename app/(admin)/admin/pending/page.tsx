"use client";

import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";

export default function PendingPage() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-cream)]">
      <div className="w-full max-w-md space-y-6 px-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
          <Clock className="h-8 w-8 text-amber-500" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-charcoal)]">
          Access Requested
        </h1>
        <p className="text-sm text-[var(--color-warm-gray)]">
          Your request to access the admin dashboard has been submitted. An
          administrator will review and approve your access shortly.
        </p>
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
          <p className="text-xs text-[var(--color-warm-gray-light)]">
            You&apos;ll be able to access the dashboard once your request is
            approved. Check back later or contact the administrator.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.refresh()}
            className="rounded-full border border-[var(--color-border)] bg-white px-6 py-2.5 text-sm font-medium text-[var(--color-charcoal)] transition-colors hover:bg-[var(--color-cream-dark)]"
          >
            Check Again
          </button>
          <button
            onClick={handleSignOut}
            className="rounded-full bg-[var(--color-charcoal)] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-charcoal-light)]"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
