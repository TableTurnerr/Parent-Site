import { UserCog } from "lucide-react";
import { startImpersonation } from "@/app/lib/supabase/impersonation-actions";

export default function ImpersonateButton({
  clientId,
  clientName,
  clientSlug,
}: {
  clientId: string;
  clientName: string;
  clientSlug: string;
}) {
  return (
    <form action={startImpersonation}>
      <input type="hidden" name="clientId" value={clientId} />
      <input type="hidden" name="clientSlug" value={clientSlug} />
      <button
        type="submit"
        title={`Open the portal as if you were an owner of ${clientName}`}
        className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-2.5 py-1 text-xs font-medium text-[var(--color-warm-gray)] hover:border-[var(--color-charcoal)] hover:text-[var(--color-charcoal)]"
      >
        <UserCog className="h-3 w-3" /> View as owner
      </button>
    </form>
  );
}
