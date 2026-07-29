import type { Enums } from "@/app/lib/supabase/types";

type UptimeStatus = Enums<"uptime_status">;

const statusColors: Record<UptimeStatus, string> = {
  up: "bg-green-100 text-green-700",
  degraded: "bg-amber-100 text-amber-700",
  down: "bg-red-100 text-red-700",
};

const statusDots: Record<UptimeStatus, string> = {
  up: "bg-green-500",
  degraded: "bg-amber-500",
  down: "bg-red-500",
};

const statusLabels: Record<UptimeStatus, string> = {
  up: "Up",
  degraded: "Degraded",
  down: "Down",
};

export function ServiceStatusChip({ status }: { status: UptimeStatus | null }) {
  const color = status ? statusColors[status] : "bg-gray-100 text-gray-600";
  const dot = status ? statusDots[status] : "bg-gray-400";
  const label = status ? statusLabels[status] : "Unknown";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden />
      {label}
    </span>
  );
}
