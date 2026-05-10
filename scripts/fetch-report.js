#!/usr/bin/env node
/**
 * fetch-report.js
 * Pulls a client_reports row from Supabase by (slug, month) and writes JSON bodies
 * (and grader JSON, if any) into reports-archive/<slug>/<YYYY-MM>/ for local editing.
 *
 * Usage:
 *   node scripts/fetch-report.js --slug="grumpys-burgers" [--month="2026-05"] [--archive="/custom/dir"]
 *
 * Default month: latest published or draft month for that client.
 *
 * Output files (under <archive>/):
 *   <slug>-client-report.json    (primary — what live page renders)
 *   <slug>-internal-report.json  (admin-only deep-dive)
 *   <slug>-client-report.md      (legacy MD, only if row still has it)
 *   <slug>-internal-report.md    (legacy MD, only if row still has it)
 *   <slug>-grader.json           (only if grader_data present)
 *   <slug>-meta.json             (snapshot of name/url/month/status/visibility)
 */

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

const args = Object.fromEntries(
  process.argv.slice(2)
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const eq = a.indexOf("=");
      return [a.slice(2, eq), a.slice(eq + 1)];
    })
);

const { slug, month: monthArg, archive: archiveOverride } = args;

if (!slug) {
  console.error("Usage: node scripts/fetch-report.js --slug=<client-slug> [--month=YYYY-MM] [--archive=<dir>]");
  process.exit(1);
}

function normalizeMonth(input) {
  if (!input) return null;
  const m = /^(\d{4})-(\d{2})(?:-01)?$/.exec(input);
  if (!m) { console.error(`Invalid --month "${input}". Use YYYY-MM.`); process.exit(1); }
  return `${m[1]}-${m[2]}-01`;
}

const requestedMonth = normalizeMonth(monthArg);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const repoRoot = path.resolve(__dirname, "..");

async function run() {
  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });

  // The slug can refer to either a company-level slug (e.g. "taco-delphia")
  // or a per-report slug (e.g. "taco-delphia-south-broad"). Try report slug
  // first since it uniquely identifies one (company, location) combo.
  let { data: rowsByReportSlug } = await supabase
    .from("client_reports")
    .select("id, client_id, location_id")
    .eq("client_slug", slug)
    .order("report_month", { ascending: false })
    .limit(1);

  let clientRow;
  let locationFilter = null;
  if (rowsByReportSlug && rowsByReportSlug[0]) {
    locationFilter = rowsByReportSlug[0].location_id;
    const { data: c } = await supabase
      .from("clients").select("id, name, slug, url").eq("id", rowsByReportSlug[0].client_id).maybeSingle();
    clientRow = c;
  } else {
    const { data: c, error: clientErr } = await supabase
      .from("clients").select("id, name, slug, url").eq("slug", slug).maybeSingle();
    if (clientErr || !c) { console.error(`No client or report found for slug "${slug}".`); process.exit(1); }
    clientRow = c;
  }

  // Pick the row: requested month, or latest if not specified
  let query = supabase
    .from("client_reports")
    .select(
      "id, client_id, location_id, client_name, client_slug, client_url, report_month, " +
      "client_content_md, client_content_json, " +
      "internal_content_md, internal_content_json, " +
      "grader_data, status, visibility, created_at, updated_at, published_at"
    )
    .eq("client_id", clientRow.id);

  if (locationFilter) query = query.eq("location_id", locationFilter);

  if (requestedMonth) {
    query = query.eq("report_month", requestedMonth);
  } else {
    query = query.order("report_month", { ascending: false }).limit(1);
  }

  const { data: rows, error } = await query;
  const data = rows && rows[0];

  if (error || !data) {
    console.error(`Report not found for slug="${slug}"${requestedMonth ? ` month=${requestedMonth}` : ""}: ${error?.message ?? "no row"}`);
    process.exit(1);
  }

  const monthShort = data.report_month.slice(0, 7);
  const archiveDir = archiveOverride
    ? path.resolve(archiveOverride)
    : path.join(repoRoot, "reports-archive", slug, monthShort);

  fs.mkdirSync(archiveDir, { recursive: true });

  const clientJsonPath = path.join(archiveDir, `${slug}-client-report.json`);
  const internalJsonPath = path.join(archiveDir, `${slug}-internal-report.json`);
  const clientMdPath = path.join(archiveDir, `${slug}-client-report.md`);
  const internalMdPath = path.join(archiveDir, `${slug}-internal-report.md`);
  const graderPath = path.join(archiveDir, `${slug}-grader.json`);
  const metaPath = path.join(archiveDir, `${slug}-meta.json`);

  if (data.client_content_json) fs.writeFileSync(clientJsonPath, JSON.stringify(data.client_content_json, null, 2), "utf-8");
  if (data.internal_content_json) fs.writeFileSync(internalJsonPath, JSON.stringify(data.internal_content_json, null, 2), "utf-8");
  if (data.client_content_md) fs.writeFileSync(clientMdPath, data.client_content_md, "utf-8");
  if (data.internal_content_md) fs.writeFileSync(internalMdPath, data.internal_content_md, "utf-8");
  if (data.grader_data) fs.writeFileSync(graderPath, JSON.stringify(data.grader_data, null, 2), "utf-8");

  // Look up the location row so the meta snapshot includes it.
  let location = null;
  if (data.location_id) {
    const { data: loc } = await supabase
      .from("locations").select("id, name, slug, address, is_primary").eq("id", data.location_id).maybeSingle();
    location = loc;
  }

  const meta = {
    id: data.id,
    report_id: data.id,
    company_id: clientRow.id,
    company_name: clientRow.name,
    company_slug: clientRow.slug,
    location_id: location?.id ?? data.location_id ?? null,
    location_name: location?.name ?? null,
    location_slug: location?.slug ?? null,
    client_name: data.client_name,
    client_slug: data.client_slug,
    client_url: data.client_url,
    report_month: data.report_month,
    status: data.status,
    visibility: data.visibility,
    created_at: data.created_at,
    updated_at: data.updated_at,
    published_at: data.published_at,
    fetched_at: new Date().toISOString(),
  };
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), "utf-8");

  console.log(`\nReport fetched for: ${data.client_name} (${monthShort})`);
  console.log(`   Archive: ${archiveDir}`);
  console.log(`   Client JSON:     ${data.client_content_json ? clientJsonPath : "(none)"}`);
  console.log(`   Internal JSON:   ${data.internal_content_json ? internalJsonPath : "(none)"}`);
  console.log(`   Client MD:       ${data.client_content_md ? clientMdPath : "(none, JSON-only)"}`);
  console.log(`   Internal MD:     ${data.internal_content_md ? internalMdPath : "(none, JSON-only)"}`);
  console.log(`   Grader JSON:     ${data.grader_data ? graderPath : "(none)"}`);
  console.log(`   Meta:            ${metaPath}`);
  console.log(`\nFETCHED:${slug}:${monthShort}:${archiveDir}`);
}

run().catch((err) => { console.error("Unexpected error:", err.message); process.exit(1); });
