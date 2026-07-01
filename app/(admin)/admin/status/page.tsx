import { createClient } from "@/app/lib/supabase/server";
import { getServiceStatuses } from "@/app/lib/status/queries";
import { StatusGrid } from "@/app/components/admin/StatusGrid";

export const dynamic = "force-dynamic";

export default async function StatusPage() {
  const supabase = await createClient();
  const services = await getServiceStatuses(supabase);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-charcoal)]">
          Service Status
        </h1>
        <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
          Live health, latency, and uptime for monitored services.
        </p>
      </div>

      <StatusGrid services={services} />
    </div>
  );
}
