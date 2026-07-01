import type { Enums } from "@/app/lib/supabase/types";

type LogLevel = Enums<"log_level">;

const levelColors: Record<LogLevel, string> = {
  debug: "bg-gray-100 text-gray-600",
  info: "bg-blue-100 text-blue-700",
  warn: "bg-amber-100 text-amber-700",
  error: "bg-red-100 text-red-700",
  fatal: "bg-red-600 text-white",
};

export function LogLevelBadge({ level }: { level: LogLevel }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide ${levelColors[level]}`}
    >
      {level}
    </span>
  );
}
