#!/usr/bin/env node
/**
 * push-report.js
 * Reads a generated markdown report and upserts it into the Supabase client_reports table.
 * Uses the SUPABASE_SERVICE_ROLE_KEY (bypasses RLS) — safe for local script use only.
 *
 * Usage:
 *   node scripts/push-report.js \
 *     --client="Grumpy's Burgers" \
 *     --slug="grumpys-burgers" \
 *     --url="grumpys-burgers.com" \
 *     --report="C:/path/to/Grumpys-Client-Report.md" \
 *     [--grader=".grader-cache/grumpys-burgers.json"] \
 *     [--status=published]
 */

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const { marked } = require("marked");
require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

// Parse CLI args
const args = Object.fromEntries(
  process.argv.slice(2)
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const eq = a.indexOf("=");
      return [a.slice(2, eq), a.slice(eq + 1)];
    })
);

const { client: clientName, slug, url: clientUrl, report: reportPath, grader: graderPath, status = "draft" } = args;

if (!clientName || !slug || !clientUrl || !reportPath) {
  console.error(`
Usage: node scripts/push-report.js \\
  --client="Client Name" \\
  --slug="client-slug" \\
  --url="client-website.com" \\
  --report="/path/to/report.md" \\
  [--grader="/path/to/grader.json"] \\
  [--status=published]
`);
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

async function run() {
  console.log(`\n📤 Pushing report for: ${clientName}`);

  // Read markdown
  if (!fs.existsSync(reportPath)) {
    console.error(`❌ Report file not found: ${reportPath}`);
    process.exit(1);
  }
  const reportMd = fs.readFileSync(reportPath, "utf-8");

  // Strip YAML frontmatter before converting to HTML
  const mdBody = reportMd.replace(/^---[\s\S]*?---\n/, "");
  const reportHtml = marked.parse(mdBody);

  // Read grader JSON if provided
  let graderData = null;
  if (graderPath && fs.existsSync(graderPath)) {
    try {
      graderData = JSON.parse(fs.readFileSync(graderPath, "utf-8"));
    } catch (e) {
      console.warn(`⚠️  Could not parse grader JSON: ${e.message}`);
    }
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const payload = {
    client_name: clientName,
    client_slug: slug,
    client_url: clientUrl,
    report_content_md: reportMd,
    report_content_html: reportHtml,
    grader_data: graderData,
    status,
    ...(status === "published" ? { published_at: new Date().toISOString() } : {}),
  };

  // Upsert by slug (update if exists, insert if new)
  const { data, error } = await supabase
    .from("client_reports")
    .upsert(payload, { onConflict: "client_slug" })
    .select("id, client_slug, status")
    .single();

  if (error) {
    console.error("❌ Supabase error:", error.message);
    process.exit(1);
  }

  const localUrl = `http://localhost:3000/report/${data.client_slug}`;
  const prodUrl = `https://tableturnerr.com/report/${data.client_slug}`;

  console.log(`\n✅ Report pushed successfully!`);
  console.log(`   ID:     ${data.id}`);
  console.log(`   Slug:   ${data.client_slug}`);
  console.log(`   Status: ${data.status}`);
  console.log(`\n🔗 Share link (local):  ${localUrl}`);
  console.log(`🔗 Share link (prod):   ${prodUrl}`);
  console.log(`\n   Admin panel: http://localhost:3000/admin/reports/${data.id}`);
}

run().catch((err) => {
  console.error("❌ Unexpected error:", err.message);
  process.exit(1);
});
