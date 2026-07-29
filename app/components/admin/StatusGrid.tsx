"use client";

import { ServiceStatusChip } from "./ServiceStatusChip";
import type { ServiceStatus } from "@/app/lib/status/queries";

function formatRelativeTime(iso: string | null): string {
  if (!iso) return "never";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "never";
  const sec = Math.round((Date.now() - then) / 1000);
  if (sec < 0) return "just now";
  if (sec < 60) return `${sec}s ago`;
  const min = Math.round(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const days = Math.round(hr / 24);
  return `${days}d ago`;
}

function formatPct(pct: number | null): string {
  return pct === null ? "—" : `${pct}%`;
}

export function StatusGrid({ services }: { services: ServiceStatus[] }) {
  if (services.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-white">
        <div className="px-6 py-16 text-center">
          <p className="text-sm font-medium text-[var(--color-charcoal)]">
            No monitored services
          </p>
          <p className="mt-1 text-xs text-[var(--color-warm-gray)]">
            Enable a service to see its health and uptime here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <div
          key={service.key}
          className="rounded-xl border border-[var(--color-border)] bg-white p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate font-semibold text-[var(--color-charcoal)]">
                {service.name}
              </h2>
              <p className="mt-0.5 truncate text-xs text-[var(--color-warm-gray)]">
                {service.key} · {service.kind}
              </p>
            </div>
            <ServiceStatusChip status={service.latestStatus} />
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
                Latency
              </dt>
              <dd className="mt-0.5 font-medium tabular-nums text-[var(--color-charcoal)]">
                {service.latestLatencyMs !== null
                  ? `${service.latestLatencyMs} ms`
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
                Last checked
              </dt>
              <dd
                className="mt-0.5 font-medium text-[var(--color-charcoal)]"
                title={service.lastCheckedAt ?? undefined}
              >
                {formatRelativeTime(service.lastCheckedAt)}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
                Uptime 24h
              </dt>
              <dd className="mt-0.5 font-medium tabular-nums text-[var(--color-charcoal)]">
                {formatPct(service.uptime24h)}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
                Uptime 7d
              </dt>
              <dd className="mt-0.5 font-medium tabular-nums text-[var(--color-charcoal)]">
                {formatPct(service.uptime7d)}
              </dd>
            </div>
          </dl>

          {service.version && (
            <p className="mt-4 border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-warm-gray)]">
              Version{" "}
              <span className="font-mono text-[var(--color-charcoal)]">
                {service.version}
              </span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
