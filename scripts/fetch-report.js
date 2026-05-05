#!/usr/bin/env node
/**
 * fetch-report.js
 * Pulls an existing client_reports row from Supabase and writes both JSON bodies
 * (and the grader JSON, if any) into reports-archive/<slug>/ for local editing.
 *
 * Usage:
 *   node scripts/fetch-report.js --slug="grumpys-burgers" [--archive="/custom/dir"]
 *
 * Output files (under --archive or default reports-archive/<slug>/):
 *   <slug>-client-report.json    (primary — what the live page renders)
 *   <slug>-internal-report.json  (admin-only deep-dive)
 *   <slug>-client-report.md      (legacy markdown — written only if the row still has it)
 *   <slug>-internal-report.md    (legacy markdown — written only if the row still has it)
 *   <slug>-grader.json           (only if grader_data is present)
 *   <slug>-meta.json             (snapshot of name/url/status/visibility for the skill)
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

const { slug, archive: archiveOverride } = args;

if (!slug) {
  console.error("Usage: node scripts/fetch-report.js --slug=<client-slug> [--archive=<dir>]");
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const repoRoot = path.resolve(__dirname, "..");
const archiveDir = archiveOverride
  ? path.resolve(archiveOverride)
  : path.join(repoRoot, "reports-archive", slug);

async function run() {
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("client_reports")
    .select(
      "id, client_name, client_slug, client_url, " +
      "client_content_md, client_content_json, " +
      "internal_content_md, internal_content_json, " +
      "grader_data, status, visibility, created_at, updated_at, published_at"
    )
    .eq("client_slug", slug)
    .single();

  if (error || !data) {
    console.error(`Report not found for slug "${slug}":`, error?.message ?? "no row");
    process.exit(1);
  }

  fs.mkdirSync(archiveDir, { recursive: true });

  const clientJsonPath = path.join(archiveDir, `${slug}-client-report.json`);
  const internalJsonPath = path.join(archiveDir, `${slug}-internal-report.json`);
  const clientMdPath = path.join(archiveDir, `${slug}-client-report.md`);
  const internalMdPath = path.join(archiveDir, `${slug}-internal-report.md`);
  const graderPath = path.join(archiveDir, `${slug}-grader.json`);
  const metaPath = path.join(archiveDir, `${slug}-meta.json`);

  if (data.client_content_json) {
    fs.writeFileSync(clientJsonPath, JSON.stringify(data.client_content_json, null, 2), "utf-8");
  }
  if (data.internal_content_json) {
    fs.writeFileSync(internalJsonPath, JSON.stringify(data.internal_content_json, null, 2), "utf-8");
  }
  // Legacy markdown — only write when the row still carries it.
  if (data.client_content_md) {
    fs.writeFileSync(clientMdPath, data.client_content_md, "utf-8");
  }
  if (data.internal_content_md) {
    fs.writeFileSync(internalMdPath, data.internal_content_md, "utf-8");
  }
  if (data.grader_data) {
    fs.writeFileSync(graderPath, JSON.stringify(data.grader_data, null, 2), "utf-8");
  }

  const meta = {
    id: data.id,
    client_name: data.client_name,
    client_slug: data.client_slug,
    client_url: data.client_url,
    status: data.status,
    visibility: data.visibility,
    created_at: data.created_at,
    updated_at: data.updated_at,
    published_at: data.published_at,
    fetched_at: new Date().toISOString(),
  };
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), "utf-8");

  console.log(`\nReport fetched for: ${data.client_name}`);
  console.log(`   Archive: ${archiveDir}`);
  console.log(`   Client JSON:     ${data.client_content_json ? clientJsonPath : "(none)"}`);
  console.log(`   Internal JSON:   ${data.internal_content_json ? internalJsonPath : "(none)"}`);
  console.log(`   Client MD:       ${data.client_content_md ? clientMdPath : "(none, JSON-only)"}`);
  console.log(`   Internal MD:     ${data.internal_content_md ? internalMdPath : "(none, JSON-only)"}`);
  console.log(`   Grader JSON:     ${data.grader_data ? graderPath : "(none)"}`);
  console.log(`   Meta:            ${metaPath}`);
  console.log(`\nFETCHED:${slug}:${archiveDir}`);
}

run().catch((err) => {
  console.error("Unexpected error:", err.message);
  process.exit(1);
});
