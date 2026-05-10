#!/usr/bin/env node
/**
 * fix-report-urls.js
 * One-shot repair: scan reports-archive/ for local client-report JSONs,
 * normalize each one's `client.url` (strip protocol + trailing slash + leading
 * "www." removed only when JSON itself has no www), and update the matching
 * Supabase `client_reports.client_url` (and `clients.url`) when they differ.
 *
 * The admin UI links via `https://${client_url}`, so rows storing a value with
 * `https://` already prepended produce double-prefixed broken links. This
 * script fixes that by normalizing every row to a bare domain (+ optional
 * path), matching the JSON.
 *
 * Usage:
 *   node scripts/fix-report-urls.js          # dry-run, shows planned changes
 *   node scripts/fix-report-urls.js --apply  # actually write to Supabase
 */

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: path.join(__dirname, "../.env.local"), quiet: true });

const APPLY = process.argv.includes("--apply");
const ARCHIVE = path.join(__dirname, "..", "reports-archive");

function normalizeUrl(raw) {
  if (!raw) return "";
  let u = String(raw).trim();
  u = u.replace(/^https?:\/\//i, "");
  u = u.replace(/\/+$/, "");
  return u;
}

function readJsonUrl(slug, month) {
  const p = path.join(ARCHIVE, slug, month, `${slug}-client-report.json`);
  if (!fs.existsSync(p)) return null;
  try {
    const data = JSON.parse(fs.readFileSync(p, "utf-8"));
    return data?.client?.url || null;
  } catch {
    return null;
  }
}

async function run() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }
  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });

  const { data: rows, error } = await supabase
    .from("client_reports")
    .select("id, client_id, client_slug, client_url, report_month")
    .order("client_slug");
  if (error) { console.error("Supabase error:", error.message); process.exit(1); }

  console.log(APPLY ? "APPLY mode — will write changes\n" : "DRY-RUN mode — pass --apply to write\n");

  const reportUpdates = [];
  const clientUpdatesBySlug = new Map(); // slug -> { client_id, normalized }

  for (const r of rows) {
    const month = r.report_month.slice(0, 7);
    const jsonUrl = readJsonUrl(r.client_slug, month);
    const normalizedFromJson = normalizeUrl(jsonUrl);
    const normalizedFromRow = normalizeUrl(r.client_url);
    // Prefer the JSON when available; otherwise just normalize the existing row.
    const target = normalizedFromJson || normalizedFromRow;
    if (!target) {
      console.log(`  [skip] ${r.client_slug} ${month}: no usable URL anywhere`);
      continue;
    }
    if (target === r.client_url) {
      // Already canonical.
      continue;
    }
    console.log(`  ${r.client_slug} ${month}`);
    console.log(`     was:  ${r.client_url}`);
    console.log(`     now:  ${target}`);
    reportUpdates.push({ id: r.id, client_url: target });

    // Also update the parent clients row to the same normalized value.
    const prev = clientUpdatesBySlug.get(r.client_slug);
    if (!prev) {
      clientUpdatesBySlug.set(r.client_slug, { client_id: r.client_id, slug: r.client_slug, url: target });
    }
  }

  if (reportUpdates.length === 0) {
    console.log("\nAll URLs already canonical. Nothing to do.");
    return;
  }
  console.log(`\nPlanned changes: ${reportUpdates.length} report row(s), ${clientUpdatesBySlug.size} client row(s)`);

  if (!APPLY) {
    console.log("\n(dry-run; pass --apply to write)");
    return;
  }

  let ok = 0, fail = 0;
  for (const u of reportUpdates) {
    const { error: e } = await supabase
      .from("client_reports")
      .update({ client_url: u.client_url })
      .eq("id", u.id);
    if (e) { console.error(`  ✗ ${u.id}: ${e.message}`); fail++; } else { ok++; }
  }
  for (const c of clientUpdatesBySlug.values()) {
    const { error: e } = await supabase
      .from("clients")
      .update({ url: c.url })
      .eq("id", c.client_id);
    if (e) { console.error(`  ✗ clients ${c.slug}: ${e.message}`); fail++; } else { ok++; }
  }
  console.log(`\nDone. ${ok} ok · ${fail} failed.`);
}

run().catch((e) => { console.error("Unexpected:", e.message); process.exit(1); });
