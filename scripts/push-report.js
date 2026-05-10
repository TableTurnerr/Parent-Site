#!/usr/bin/env node
/**
 * push-report.js
 * Upserts a client_reports row for a given (company, location, month) with
 * both client and internal report bodies. Uses SUPABASE_SERVICE_ROLE_KEY
 * (bypasses RLS) — local-only.
 *
 * Data model (since the locations refactor):
 *   clients          one row per company (e.g. "Taco Delphia")
 *   locations        one row per location under a company ("22nd & Walnut")
 *   client_reports   one row per (company, location, month)
 *
 * Each report JSON's `meta` block + `client.id` + `client.location.id` carry
 * the canonical IDs so the JSON is self-identifying. We resolve / create
 * companies and locations from the JSON's `client` block, then write the IDs
 * back to the local JSON file after a successful push.
 *
 * Usage:
 *   node scripts/push-report.js \
 *     --client="Taco Delphia" \
 *     --slug="taco-delphia-south-broad" \
 *     --url="tacodelphia.online" \
 *     [--month="2026-05"] \
 *     [--location-name="South Broad"] [--location-slug="south-broad"] \
 *     [--location-address="427 S Broad St, Philadelphia, PA 19147"] \
 *     --client-report-json="reports-archive/taco-delphia-south-broad/2026-05/taco-delphia-south-broad-client-report.json" \
 *     --internal-report-json="reports-archive/taco-delphia-south-broad/2026-05/taco-delphia-south-broad-internal-report.json" \
 *     [--grader=".grader-cache/taco-delphia-south-broad.json"] \
 *     [--status=draft] [--visibility=public]
 *
 * Auto-creates the `clients` and `locations` rows when missing.
 * Upserts on (client_id, location_id, report_month).
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

// Strip protocol + trailing slash. Admin links via `https://${client_url}`,
// so storing a value that already has `https://` would produce a broken
// `https://https://...` link.
function normalizeClientUrl(raw) {
  if (!raw) return raw;
  return String(raw).trim().replace(/^https?:\/\//i, "").replace(/\/+$/, "");
}

function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

const {
  client: clientName,
  slug,
  url: rawClientUrl,
  month: monthArg,
  "location-name": locationNameArg,
  "location-slug": locationSlugArg,
  "location-address": locationAddressArg,
  "client-report": clientReportPath,
  "client-report-json": clientReportJsonPathArg,
  "internal-report": internalReportPath,
  "internal-report-json": internalReportJsonPathArg,
  report: legacyReportPath,
  grader: graderPath,
  status = "draft",
  visibility = "public",
} = args;

const clientUrl = normalizeClientUrl(rawClientUrl);

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
const repoRoot = path.resolve(__dirname, "..");

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
  --client="Company Name" \\
  --slug="report-slug" \\
  --url="company-website.com" \\
  [--month="YYYY-MM"]   # default = current month \\
  [--location-name="Location Name"] [--location-slug="location-slug"] [--location-address="..."] \\
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
    return { path: p, data: parsed };
  } catch (e) {
    console.error(`Could not parse ${label} JSON: ${e.message}`);
    process.exit(1);
  }
}

// Pull company + location hints from a JSON report's client/meta blocks,
// falling back to CLI args. Returns the best guess. CLI args > JSON.
function resolveLocationInputs({ clientJson, internalJson, slug, clientName }) {
  const sources = [clientJson?.data, internalJson?.data].filter(Boolean);
  let jsonCompanyId, jsonCompanyName, jsonCompanySlug;
  let jsonLocationId, jsonLocationName, jsonLocationSlug, jsonLocationAddress;
  for (const j of sources) {
    if (!jsonCompanyId)   jsonCompanyId   = j?.client?.company?.id   || j?.client?.id || j?.meta?.companyId;
    if (!jsonCompanyName) jsonCompanyName = j?.client?.company?.name || j?.meta?.companyName;
    if (!jsonCompanySlug) jsonCompanySlug = j?.client?.company?.slug || j?.meta?.companySlug;
    if (!jsonLocationId)  jsonLocationId  = j?.client?.location?.id  || j?.meta?.locationId;
    const loc = j?.client?.location;
    if (loc) {
      jsonLocationName    = jsonLocationName    || loc.name;
      jsonLocationSlug    = jsonLocationSlug    || loc.slug;
      jsonLocationAddress = jsonLocationAddress || loc.address;
    }
  }

  // Derive company name from per-location display name as a last fallback:
  // "Taco Delphia — South Broad" → "Taco Delphia". Uses em-dash, en-dash, or
  // regular hyphen surrounded by whitespace, matching the skill's convention.
  const strippedCompanyName = String(clientName || "")
    .replace(/\s+[—–-]\s+.+$/, "")
    .trim();
  const companyName = jsonCompanyName || strippedCompanyName || clientName || "";
  const companySlug = (jsonCompanySlug || slugify(companyName) || "").toLowerCase();

  const locationName    = locationNameArg    || jsonLocationName    || "Main";
  const locationSlug    = (locationSlugArg   || jsonLocationSlug    || slugify(locationName) || "main").toLowerCase();
  const locationAddress = locationAddressArg || jsonLocationAddress || null;

  return {
    jsonCompanyId, companyName, companySlug,
    jsonLocationId, locationName, locationSlug, locationAddress,
  };
}

async function resolveCompany(supabase, { hintId, companyName, companySlug, clientUrl }) {
  if (hintId) {
    const { data: byId } = await supabase
      .from("clients").select("id, name, slug, url").eq("id", hintId).maybeSingle();
    if (byId) return byId;
  }
  if (companySlug) {
    const { data: bySlug } = await supabase
      .from("clients").select("id, name, slug, url").eq("slug", companySlug).maybeSingle();
    if (bySlug) return bySlug;
  }

  console.log(`   Creating new clients row for company "${companyName}" (slug=${companySlug})`);
  const { data: created, error: createErr } = await supabase
    .from("clients")
    .insert({ name: companyName, slug: companySlug, url: clientUrl })
    .select("id, name, slug, url")
    .single();
  if (createErr) { console.error("Could not create client:", createErr.message); process.exit(1); }
  return created;
}

async function resolveLocation(supabase, { companyId, hintId, name, slug, address }) {
  if (hintId) {
    const { data: byId } = await supabase
      .from("locations").select("id, name, slug, address, is_primary")
      .eq("id", hintId).maybeSingle();
    if (byId && byId.id) return byId;
  }
  const { data: bySlug } = await supabase
    .from("locations").select("id, name, slug, address, is_primary")
    .eq("client_id", companyId).eq("slug", slug).maybeSingle();
  if (bySlug) return bySlug;

  // Mark this as primary if it's the company's first location.
  const { count } = await supabase
    .from("locations").select("id", { count: "exact", head: true }).eq("client_id", companyId);
  const isPrimary = (count ?? 0) === 0;

  console.log(`   Creating new locations row "${name}" (slug=${slug}) under company`);
  const { data: created, error: createErr } = await supabase
    .from("locations")
    .insert({ client_id: companyId, name, slug, address, is_primary: isPrimary })
    .select("id, name, slug, address, is_primary")
    .single();
  if (createErr) { console.error("Could not create location:", createErr.message); process.exit(1); }
  return created;
}

// Inject the canonical meta + id fields into a JSON report body before storing
// it. Keeps every report JSON self-identifying (reportId / companyId /
// locationId at the top, plus inline ids on client.company and client.location).
function attachMeta(json, { reportId, company, location, reportMonth }) {
  if (!json) return json;
  const next = { ...json };
  next.meta = {
    reportId,
    companyId: company.id,
    companyName: company.name,
    companySlug: company.slug,
    locationId: location.id,
    locationName: location.name,
    locationSlug: location.slug,
    reportMonth,
  };
  next.client = {
    ...(json.client || {}),
    id: company.id,
    company: {
      id: company.id,
      name: company.name,
      slug: company.slug,
    },
    location: {
      ...((json.client && json.client.location) || {}),
      id: location.id,
      name: location.name,
      slug: location.slug,
      ...(location.address ? { address: location.address } : {}),
    },
  };
  return next;
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

  const locationInputs = resolveLocationInputs({
    clientJson: clientReportJson,
    internalJson: internalReportJson,
    slug,
    clientName,
  });

  const company = await resolveCompany(supabase, {
    hintId: locationInputs.jsonCompanyId,
    companyName: locationInputs.companyName,
    companySlug: locationInputs.companySlug,
    clientUrl,
  });

  const location = await resolveLocation(supabase, {
    companyId: company.id,
    hintId: locationInputs.jsonLocationId,
    name: locationInputs.locationName,
    slug: locationInputs.locationSlug,
    address: locationInputs.locationAddress,
  });

  // Final JSON bodies: write the canonical IDs into meta + client + location.
  // We must wait until the row is upserted to know the reportId, so we do an
  // initial upsert without IDs, then a second update with the IDs in the JSON.
  const baseClientJson = clientReportJson?.data ?? null;
  const baseInternalJson = internalReportJson?.data ?? null;

  const payload = {
    client_id: company.id,
    location_id: location.id,
    report_month: reportMonth,
    client_name: clientName,
    client_slug: slug,
    client_url: clientUrl,
    status,
    visibility,
    ...(clientReport ? { client_content_md: clientReport.md, client_content_html: clientReport.html } : {}),
    ...(baseClientJson ? { client_content_json: baseClientJson } : {}),
    ...(internalReport ? { internal_content_md: internalReport.md, internal_content_html: internalReport.html } : {}),
    ...(baseInternalJson ? { internal_content_json: baseInternalJson } : {}),
    ...(graderData ? { grader_data: graderData } : {}),
    ...(status === "published" ? { published_at: new Date().toISOString() } : {}),
  };

  const hasClientPayload = !!(clientReport || baseClientJson);
  if (!hasClientPayload) {
    const { data: existing } = await supabase
      .from("client_reports")
      .select("id")
      .eq("client_id", company.id)
      .eq("location_id", location.id)
      .eq("report_month", reportMonth)
      .maybeSingle();
    if (!existing) {
      console.error("New (company, location, month) rows require --client-report-json. Aborting.");
      process.exit(1);
    }
  }

  const { data: upserted, error } = await supabase
    .from("client_reports")
    .upsert(payload, { onConflict: "client_id,location_id,report_month" })
    .select("id, client_name, client_slug, client_url, report_month, status, visibility, created_at, updated_at, published_at")
    .single();

  if (error) { console.error("Supabase error:", error.message); process.exit(1); }

  // Second pass: write meta + ids into the JSON content now that we know reportId.
  const finalClientJson = attachMeta(baseClientJson, {
    reportId: upserted.id,
    company,
    location,
    reportMonth: monthShort,
  });
  const finalInternalJson = attachMeta(baseInternalJson, {
    reportId: upserted.id,
    company,
    location,
    reportMonth: monthShort,
  });

  const metaPatch = {
    ...(finalClientJson ? { client_content_json: finalClientJson } : {}),
    ...(finalInternalJson ? { internal_content_json: finalInternalJson } : {}),
  };
  if (Object.keys(metaPatch).length > 0) {
    const { error: patchErr } = await supabase
      .from("client_reports")
      .update(metaPatch)
      .eq("id", upserted.id);
    if (patchErr) console.warn(`(Could not write meta back to row: ${patchErr.message})`);
  }

  // Mirror the meta back into the local JSON files so the user has IDs on disk.
  if (finalClientJson && clientReportJson?.path) {
    try {
      fs.writeFileSync(clientReportJson.path, JSON.stringify(finalClientJson, null, 2), "utf-8");
    } catch (e) {
      console.warn(`(Could not rewrite ${clientReportJson.path}: ${e.message})`);
    }
  }
  if (finalInternalJson && internalReportJson?.path) {
    try {
      fs.writeFileSync(internalReportJson.path, JSON.stringify(finalInternalJson, null, 2), "utf-8");
    } catch (e) {
      console.warn(`(Could not rewrite ${internalReportJson.path}: ${e.message})`);
    }
  }

  // Write a local meta snapshot so manage_reports.py can show status/visibility
  // without a live Supabase round-trip. Live index from list-reports.js takes
  // precedence — this is a fallback for offline use.
  try {
    const archiveDir = path.join(repoRoot, "reports-archive", slug, monthShort);
    fs.mkdirSync(archiveDir, { recursive: true });
    const metaPath = path.join(archiveDir, `${slug}-meta.json`);
    const meta = {
      id: upserted.id,
      report_id: upserted.id,
      company_id: company.id,
      company_name: company.name,
      company_slug: company.slug,
      location_id: location.id,
      location_name: location.name,
      location_slug: location.slug,
      client_name: upserted.client_name,
      client_slug: upserted.client_slug,
      client_url: upserted.client_url,
      report_month: upserted.report_month,
      status: upserted.status,
      visibility: upserted.visibility,
      created_at: upserted.created_at,
      updated_at: upserted.updated_at,
      published_at: upserted.published_at,
      pushed_at: new Date().toISOString(),
    };
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), "utf-8");
  } catch (e) {
    console.warn(`(Could not write local meta: ${e.message})`);
  }

  const localUrl = `http://localhost:3000/report/${upserted.client_slug}/${monthShort}`;
  const prodUrl = `https://tableturnerr.com/report/${upserted.client_slug}/${monthShort}`;

  console.log(`\nReport pushed`);
  console.log(`   Company:    ${company.name} (${company.id})`);
  console.log(`   Location:   ${location.name} (${location.id})`);
  console.log(`   Report ID:  ${upserted.id}`);
  console.log(`   Slug:       ${upserted.client_slug}`);
  console.log(`   Month:      ${monthShort}`);
  console.log(`   Status:     ${upserted.status}`);
  console.log(`   Visibility: ${upserted.visibility}`);
  console.log(`   Variants:   client-md=${clientReport ? "yes" : "unchanged"}, client-json=${clientReportJson ? "yes" : "unchanged"}, internal-md=${internalReport ? "yes" : "unchanged"}, internal-json=${internalReportJson ? "yes" : "unchanged"}`);
  console.log(`\nClient share link (local): ${localUrl}`);
  console.log(`Client share link (prod):  ${prodUrl}`);
  console.log(`Admin panel:               http://localhost:3000/admin/reports/${upserted.id}`);
}

run().catch((err) => { console.error("Unexpected error:", err.message); process.exit(1); });
