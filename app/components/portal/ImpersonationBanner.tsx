import { UserCog, LogOut } from "lucide-react";
import { stopImpersonation } from "@/app/lib/supabase/impersonation-actions";

export default function ImpersonationBanner({
  clientName,
  clientSlug,
}: {
  clientName: string;
  clientSlug: string;
}) {
  return (
    <div className="sticky top-16 z-40 border-b border-amber-300 bg-amber-50 md:top-20">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-amber-900">
          <UserCog className="h-3.5 w-3.5" />
          <span>
            Viewing portal as <span className="font-semibold">{clientName}</span> (impersonation)
          </span>
        </div>
        <form action={stopImpersonation}>
          <input
            type="hidden"
            name="returnTo"
            value={`/admin/companies/${clientSlug}`}
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-md border border-amber-400 bg-white px-2.5 py-1 text-xs font-medium text-amber-900 hover:bg-amber-100"
          >
            <LogOut className="h-3 w-3" />
            Exit impersonation
          </button>
        </form>
      </div>
    </div>
  );
}
