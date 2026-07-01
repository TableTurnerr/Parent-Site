/**
 * Pure validators for the telemetry ingest API. No DB access — these only
 * shape and sanitise untrusted request bodies into rows the routes can insert.
 */

export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

const LOG_LEVELS: readonly LogLevel[] = [
  "debug",
  "info",
  "warn",
  "error",
  "fatal",
];

const HEARTBEAT_STATUSES = ["ok", "degraded", "down"] as const;
type HeartbeatStatus = (typeof HEARTBEAT_STATUSES)[number];

const SERVICE_KEY_RE = /^[a-z0-9][a-z0-9_-]{1,63}$/;
const MAX_ENTRIES = 100;
const MESSAGE_MAX = 8192;
const EVENT_MAX = 256;
const VERSION_MAX = 128;

export type ValidEntry = {
  service_key: string;
  level: LogLevel;
  message: string;
  event: string | null;
  context: Record<string, unknown>;
  created_at?: string;
};

export type ParseError = { index: number; error: string };

export type ParseLogsResult =
  | {
      ok: true;
      service_key: string | null;
      entries: ValidEntry[];
      errors: ParseError[];
    }
  | { ok: false; error: string };

export type ParseHeartbeatResult =
  | {
      ok: true;
      service_key: string;
      version?: string;
      status?: HeartbeatStatus;
      meta: Record<string, unknown>;
    }
  | { ok: false; error: string };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toIsoString(value: unknown): string | null {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

/**
 * Validates a batch-of-logs body. The top level must be an object carrying an
 * `entries` array (1..100). Each entry is validated independently: valid ones
 * are collected, rejected ones are recorded in `errors` with their index so the
 * caller can return a partial-success (207) response. A `{ ok: false }` result
 * is reserved for envelope-level problems (bad shape, empty/oversized batch).
 */
export function parseLogsBody(body: unknown): ParseLogsResult {
  if (!isPlainObject(body)) {
    return { ok: false, error: "body must be an object" };
  }

  const entriesRaw = body.entries;
  if (!Array.isArray(entriesRaw)) {
    return { ok: false, error: "entries must be a non-empty array" };
  }
  if (entriesRaw.length === 0) {
    return { ok: false, error: "entries must be a non-empty array" };
  }
  if (entriesRaw.length > MAX_ENTRIES) {
    return { ok: false, error: `entries must contain at most ${MAX_ENTRIES} items` };
  }

  const topServiceKey =
    typeof body.service_key === "string" && body.service_key.trim()
      ? body.service_key.trim()
      : null;

  const entries: ValidEntry[] = [];
  const errors: ParseError[] = [];

  entriesRaw.forEach((raw: unknown, index: number) => {
    if (!isPlainObject(raw)) {
      errors.push({ index, error: "entry must be an object" });
      return;
    }

    if (typeof raw.message !== "string" || !raw.message.trim()) {
      errors.push({ index, error: "message required" });
      return;
    }
    const message = raw.message.trim().slice(0, MESSAGE_MAX);

    let level: LogLevel = "info";
    if (raw.level !== undefined && raw.level !== null) {
      if (
        typeof raw.level !== "string" ||
        !(LOG_LEVELS as readonly string[]).includes(raw.level)
      ) {
        errors.push({
          index,
          error: "level must be one of debug|info|warn|error|fatal",
        });
        return;
      }
      level = raw.level as LogLevel;
    }

    const serviceKey =
      typeof raw.service_key === "string" && raw.service_key.trim()
        ? raw.service_key.trim()
        : topServiceKey;
    if (!serviceKey) {
      errors.push({ index, error: "service_key required" });
      return;
    }
    if (!SERVICE_KEY_RE.test(serviceKey)) {
      errors.push({
        index,
        error: "service_key must match ^[a-z0-9][a-z0-9_-]{1,63}$",
      });
      return;
    }

    let event: string | null = null;
    if (typeof raw.event === "string") {
      const trimmed = raw.event.trim();
      event = trimmed ? trimmed.slice(0, EVENT_MAX) : null;
    }

    const context = isPlainObject(raw.context) ? raw.context : {};

    const entry: ValidEntry = {
      service_key: serviceKey,
      level,
      message,
      event,
      context,
    };

    const createdAt = toIsoString(raw.ts);
    if (createdAt) entry.created_at = createdAt;

    entries.push(entry);
  });

  return { ok: true, service_key: topServiceKey, entries, errors };
}

/**
 * Validates a single heartbeat body. Unlike logs this is all-or-nothing: any
 * malformed field rejects the whole request.
 */
export function parseHeartbeatBody(body: unknown): ParseHeartbeatResult {
  if (!isPlainObject(body)) {
    return { ok: false, error: "body must be an object" };
  }

  const serviceKey =
    typeof body.service_key === "string" ? body.service_key.trim() : "";
  if (!serviceKey) {
    return { ok: false, error: "service_key required" };
  }
  if (!SERVICE_KEY_RE.test(serviceKey)) {
    return {
      ok: false,
      error: "service_key must match ^[a-z0-9][a-z0-9_-]{1,63}$",
    };
  }

  let status: HeartbeatStatus | undefined;
  if (body.status !== undefined && body.status !== null) {
    if (
      typeof body.status !== "string" ||
      !(HEARTBEAT_STATUSES as readonly string[]).includes(body.status)
    ) {
      return { ok: false, error: "status must be one of ok|degraded|down" };
    }
    status = body.status as HeartbeatStatus;
  }

  let version: string | undefined;
  if (body.version !== undefined && body.version !== null) {
    if (typeof body.version !== "string") {
      return { ok: false, error: "version must be a string" };
    }
    const trimmed = body.version.trim();
    if (trimmed) version = trimmed.slice(0, VERSION_MAX);
  }

  const meta = isPlainObject(body.meta) ? body.meta : {};

  return {
    ok: true,
    service_key: serviceKey,
    meta,
    ...(version !== undefined ? { version } : {}),
    ...(status !== undefined ? { status } : {}),
  };
}
