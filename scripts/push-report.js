#!/usr/bin/env node
/**
 * push-report.js
 * Upserts a client_reports row for a given client + month with both client and
 * internal report bodies. Uses SUPABASE_SERVICE_ROLE_KEY (bypasses RLS) — local-only.
 *
 * Usage:
 *   node scripts/push-report.js \
 *     --client="Grumpy's Burgers" \
 *     --slug="grumpys-burgers" \
 *     --url="grumpys-burgers.com" \
 *     [--month="2026-05"]                                  # default = current month \
 *     --client-report-json="reports-archive/grumpys-burgers/2026-05/grumpys-burgers-client-report.json" \
 *     --internal-report-json="reports-archive/grumpys-burgers/2026-05/grumpys-burgers-internal-report.json" \
 *     [--grader=".grader-cache/grumpys-burgers.json"] \
 *     [--status=draft] [--visibility=public]
 *
 * Auto-creates the `clients` row if missing for the given slug.
 * Upserts on (client_id, report_month) so each (client, month) pair is unique.
 */

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const { marked } = require("marked");
require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

const args = Object.fromEntries(
  process.argv.slice(2)
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const eq = a.indexOf("=");
      return [a.slice(2, eq), a.slice(eq + 1)];
    })
);

const {
  client: clientName,
  slug,
  url: clientUrl,
  month: monthArg,
  "client-report": clientReportPath,
  "client-report-json": clientReportJsonPathArg,
  "internal-report": internalReportPath,
  "internal-report-json": internalReportJsonPathArg,
  report: legacyReportPath,
  grader: graderPath,
  status = "draft",
  visibility = "public",
} = args;

function defaultMonth() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

function normalizeMonth(input) {
  if (!input) return `${defaultMonth()}-01`;
  const m = /^(\d{4})-(\d{2})(?:-01)?$/.exec(input);
  if (!m) {
    console.error(`Invalid --month "${input}". Use YYYY-MM or YYYY-MM-01.`);
    process.exit(1);
  }
  return `${m[1]}-${m[2]}-01`;
}

const reportMonth = normalizeMonth(monthArg);
const monthShort = reportMonth.slice(0, 7);

const resolvedClientReport = clientReportPath || legacyReportPath;
let resolvedClientReportJson = clientReportJsonPathArg || null;
if (!resolvedClientReportJson && resolvedClientReport) {
  const guess = resolvedClientReport.replace(/\.md$/i, ".json");
  if (guess !== resolvedClientReport && fs.existsSync(guess)) resolvedClientReportJson = guess;
}
let resolvedInternalReportJson = internalReportJsonPathArg || null;
if (!resolvedInternalReportJson && internalReportPath) {
  const guess = internalReportPath.replace(/\.md$/i, ".json");
  if (guess !== internalReportPath && fs.existsSync(guess)) resolvedInternalReportJson = guess;
}

const hasAnyVariant =
  resolvedClientReport || resolvedClientReportJson || internalReportPath || resolvedInternalReportJson;

if (!clientName || !slug || !clientUrl || !hasAnyVariant) {
  console.error(`
Usage: node scripts/push-report.js \\
  --client="Client Name" \\
  --slug="client-slug" \\
  --url="client-website.com" \\
  [--month="YYYY-MM"]   # default = current month \\
  [--client-report-json="/path/to/client-report.json"] \\
  [--internal-report-json="/path/to/internal-report.json"] \\
  [--grader="/path/to/grader.json"] \\
  [--status=draft|published|archived] \\
  [--visibility=public|unlisted|private]
`);
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

function readMarkdown(p) {
  if (!p) return null;
  if (!fs.existsSync(p)) { console.error(`Report file not found: ${p}`); process.exit(1); }
  const md = fs.readFileSync(p, "utf-8");
  const body = md.replace(/^---[\s\S]*?---\n/, "");
  return { md, html: marked.parse(body) };
}

function readJsonReport(p, label) {
  if (!p) return null;
  if (!fs.existsSync(p)) { console.error(`${label} JSON not found: ${p}`); process.exit(1); }
  try {
    const text = fs.readFileSync(p, "utf-8");
    const parsed = JSON.parse(text);
    if (parsed.version !== 1) console.warn(`Warning: ${label} JSON has unexpected version: ${parsed.version}`);
    return parsed;
  } catch (e) {
    console.error(`Could not parse ${label} JSON: ${e.message}`);
    process.exit(1);
  }
}

async function run() {
  console.log(`\nPushing report for: ${clientName} (${monthShort})`);
  const clientReport = readMarkdown(resolvedClientReport);
  const clientReportJson = readJsonReport(resolvedClientReportJson, "client-report");
  const internalReport = readMarkdown(internalReportPath);
  const internalReportJson = readJsonReport(resolvedInternalReportJson, "internal-report");

  let graderData = null;
  if (graderPath && fs.existsSync(graderPath)) {
    try { graderData = JSON.parse(fs.readFileSync(graderPath, "utf-8")); }
    catch (e) { console.warn(`Could not parse grader JSON: ${e.message}`); }
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });

  // Resolve or create the clients row
  let { data: clientRow } = await supabase
    .from("clients")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (!clientRow) {
    console.log(`   Creating new clients row for slug=${slug}`);
    const { data: created, error: createErr } = await supabase
      .from("clients")
      .insert({ name: clientName, slug, url: clientUrl })
      .select("id")
      .single();
    if (createErr) { console.error("Could not create client:", createErr.message); process.exit(1); }
    clientRow = created;
  }

  const payload = {
    client_id: clientRow.id,
    report_month: reportMonth,
    client_name: clientName,
    client_slug: slug,
    client_url: clientUrl,
    status,
    visibility,
    ...(clientReport ? { client_content_md: clientReport.md, client_content_html: clientReport.html } : {}),
    ...(clientReportJson ? { client_content_json: clientReportJson } : {}),
    ...(internalReport ? { internal_content_md: internalReport.md, internal_content_html: internalReport.html } : {}),
    ...(internalReportJson ? { internal_content_json: internalReportJson } : {}),
    ...(graderData ? { grader_data: graderData } : {}),
    ...(status === "published" ? { published_at: new Date().toISOString() } : {}),
  };

  const hasClientPayload = !!(clientReport || clientReportJson);
  if (!hasClientPayload) {
    const { data: existing } = await supabase
      .from("client_reports")
      .select("id")
      .eq("client_id", clientRow.id)
      .eq("report_month", reportMonth)
      .maybeSingle();
    if (!existing) {
      console.error("New (client, month) rows require --client-report-json. Aborting.");
      process.exit(1);
    }
  }

  const { data, error } = await supabase
    .from("client_reports")
    .upsert(payload, { onConflict: "client_id,report_month" })
    .select("id, client_slug, report_month, status, visibility")
    .single();

  if (error) { console.error("Supabase error:", error.message); process.exit(1); }

  const localUrl = `http://localhost:3000/report/${data.client_slug}/${monthShort}`;
  const prodUrl = `https://tableturnerr.com/report/${data.client_slug}/${monthShort}`;

  console.log(`\nReport pushed`);
  console.log(`   ID:         ${data.id}`);
  console.log(`   Slug:       ${data.client_slug}`);
  console.log(`   Month:      ${monthShort}`);
  console.log(`   Status:     ${data.status}`);
  console.log(`   Visibility: ${data.visibility}`);
  console.log(`   Variants:   client-md=${clientReport ? "yes" : "unchanged"}, client-json=${clientReportJson ? "yes" : "unchanged"}, internal-md=${internalReport ? "yes" : "unchanged"}, internal-json=${internalReportJson ? "yes" : "unchanged"}`);
  console.log(`\nClient share link (local): ${localUrl}`);
  console.log(`Client share link (prod):  ${prodUrl}`);
  console.log(`Admin panel:               http://localhost:3000/admin/reports/${data.id}`);
}

run().catch((err) => { console.error("Unexpected error:", err.message); process.exit(1); });
