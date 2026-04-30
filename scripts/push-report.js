#!/usr/bin/env node
/**
 * push-report.js
 * Upserts a client_reports row with both the internal and client report bodies.
 * Uses SUPABASE_SERVICE_ROLE_KEY (bypasses RLS) — local-only.
 *
 * Usage:
 *   node scripts/push-report.js \
 *     --client="Grumpy's Burgers" \
 *     --slug="grumpys-burgers" \
 *     --url="grumpys-burgers.com" \
 *     --client-report="C:/path/Grumpys-Client-Report.md" \
 *     --internal-report="C:/path/Grumpys-Internal-Full-Report.md" \
 *     [--grader=".grader-cache/grumpys-burgers.json"] \
 *     [--status=draft] [--visibility=public]
 *
 * Either report can be omitted on update (we won't overwrite an existing column with null).
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
  "client-report": clientReportPath,
  "internal-report": internalReportPath,
  report: legacyReportPath,
  grader: graderPath,
  status = "draft",
  visibility = "public",
} = args;

const resolvedClientReport = clientReportPath || legacyReportPath;

if (!clientName || !slug || !clientUrl || (!resolvedClientReport && !internalReportPath)) {
  console.error(`
Usage: node scripts/push-report.js \\
  --client="Client Name" \\
  --slug="client-slug" \\
  --url="client-website.com" \\
  --client-report="/path/to/client-report.md" \\
  --internal-report="/path/to/internal-report.md" \\
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

function readReport(p) {
  if (!p) return null;
  if (!fs.existsSync(p)) {
    console.error(`Report file not found: ${p}`);
    process.exit(1);
  }
  const md = fs.readFileSync(p, "utf-8");
  const body = md.replace(/^---[\s\S]*?---\n/, "");
  return { md, html: marked.parse(body) };
}

async function run() {
  console.log(`\nPushing report for: ${clientName}`);

  const clientReport = readReport(resolvedClientReport);
  const internalReport = readReport(internalReportPath);

  let graderData = null;
  if (graderPath && fs.existsSync(graderPath)) {
    try {
      graderData = JSON.parse(fs.readFileSync(graderPath, "utf-8"));
    } catch (e) {
      console.warn(`Could not parse grader JSON: ${e.message}`);
    }
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const payload = {
    client_name: clientName,
    client_slug: slug,
    client_url: clientUrl,
    status,
    visibility,
    ...(clientReport ? {
      client_content_md: clientReport.md,
      client_content_html: clientReport.html,
    } : {}),
    ...(internalReport ? {
      internal_content_md: internalReport.md,
      internal_content_html: internalReport.html,
    } : {}),
    ...(graderData ? { grader_data: graderData } : {}),
    ...(status === "published" ? { published_at: new Date().toISOString() } : {}),
  };

  // For new rows we still need client_content_md (NOT NULL). On upsert with no existing
  // row + no client report supplied, that's a bug — let it surface.
  if (!clientReport) {
    const { data: existing } = await supabase
      .from("client_reports")
      .select("client_content_md")
      .eq("client_slug", slug)
      .maybeSingle();
    if (!existing) {
      console.error("New client_reports rows require --client-report. Aborting.");
      process.exit(1);
    }
  }

  const { data, error } = await supabase
    .from("client_reports")
    .upsert(payload, { onConflict: "client_slug" })
    .select("id, client_slug, status, visibility")
    .single();

  if (error) {
    console.error("Supabase error:", error.message);
    process.exit(1);
  }

  const localUrl = `http://localhost:3000/report/${data.client_slug}`;
  const prodUrl = `https://tableturnerr.com/report/${data.client_slug}`;

  console.log(`\nReport pushed`);
  console.log(`   ID:         ${data.id}`);
  console.log(`   Slug:       ${data.client_slug}`);
  console.log(`   Status:     ${data.status}`);
  console.log(`   Visibility: ${data.visibility}`);
  console.log(`   Variants:   client=${clientReport ? "yes" : "unchanged"}, internal=${internalReport ? "yes" : "unchanged"}`);
  console.log(`\nClient share link (local): ${localUrl}`);
  console.log(`Client share link (prod):  ${prodUrl}`);
  console.log(`Admin panel:               http://localhost:3000/admin/reports/${data.id}`);
}

run().catch((err) => {
  console.error("Unexpected error:", err.message);
  process.exit(1);
});
