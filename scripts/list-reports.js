#!/usr/bin/env node
/**
 * list-reports.js
 * Lists every row in `client_reports` and emits JSON to stdout. Used by
 * `manage_reports.py` to enrich its local archive listing with the live
 * status/visibility from Supabase (the source of truth — meta files can be
 * stale if status was changed in the admin panel).
 *
 * Usage:
 *   node scripts/list-reports.js
 *
 * Output (stdout, JSON):
 *   [
 *     {
 *       "id": "...",
 *       "client_name": "...", "client_slug": "...", "client_url": "...",
 *       "report_month": "2026-05",
 *       "status": "draft", "visibility": "public",
 *       "has_client_json": true, "has_internal_json": true,
 *       "created_at": "...", "updated_at": "...", "published_at": null
 *     }, ...
 *   ]
 */

const path = require("path");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: path.join(__dirname, "../.env.local"), quiet: true });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

async function run() {
  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });

  const { data, error } = await supabase
    .from("client_reports")
    .select(
      "id, client_id, location_id, client_name, client_slug, client_url, report_month, " +
      "status, visibility, client_content_json, internal_content_json, " +
      "created_at, updated_at, published_at, " +
      "clients ( id, name, slug ), locations ( id, name, slug, address, is_primary )"
    )
    .order("client_slug", { ascending: true })
    .order("report_month", { ascending: false });

  if (error) {
    console.error("Supabase error:", error.message);
    process.exit(1);
  }

  const rows = (data || []).map((r) => ({
    id: r.id,
    company_id: r.client_id,
    company_name: r.clients?.name ?? null,
    company_slug: r.clients?.slug ?? null,
    location_id: r.location_id,
    location_name: r.locations?.name ?? null,
    location_slug: r.locations?.slug ?? null,
    location_address: r.locations?.address ?? null,
    is_primary_location: r.locations?.is_primary ?? null,
    client_name: r.client_name,
    client_slug: r.client_slug,
    client_url: r.client_url,
    report_month: r.report_month.slice(0, 7), // YYYY-MM
    status: r.status,
    visibility: r.visibility,
    has_client_json: !!r.client_content_json,
    has_internal_json: !!r.internal_content_json,
    created_at: r.created_at,
    updated_at: r.updated_at,
    published_at: r.published_at,
  }));

  process.stdout.write(JSON.stringify(rows));
}

run().catch((err) => { console.error("Unexpected error:", err.message); process.exit(1); });
