#!/usr/bin/env node
/**
 * verify-archive-sync.js
 * Compares every report under reports-archive/<slug>/<YYYY-MM>/ to its
 * corresponding row in public.client_reports. Reports any drift between
 * disk and DB so re-pushes can be done deliberately.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const repoRoot = path.resolve(__dirname, "..");
const archiveRoot = path.join(repoRoot, "reports-archive");

function sha(obj) {
  if (obj == null) return null;
  const s = JSON.stringify(obj, Object.keys(obj).sort ? undefined : undefined);
  return crypto.createHash("sha256").update(stable(obj)).digest("hex").slice(0, 12);
}
function stable(v) {
  if (Array.isArray(v)) return `[${v.map(stable).join(",")}]`;
  if (v && typeof v === "object") {
    return `{${Object.keys(v).sort().map(k => JSON.stringify(k)+":"+stable(v[k])).join(",")}}`;
  }
  return JSON.stringify(v);
}
function readJson(p) {
  if (!fs.existsSync(p)) return null;
  try { return JSON.parse(fs.readFileSync(p, "utf-8")); }
  catch (e) { return { __parseError: e.message }; }
}

async function run() {
  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  const slugDirs = fs.readdirSync(archiveRoot, { withFileTypes: true })
    .filter(d => d.isDirectory()).map(d => d.name).sort();

  const findings = [];
  for (const slug of slugDirs) {
    const slugDir = path.join(archiveRoot, slug);
    const monthDirs = fs.readdirSync(slugDir, { withFileTypes: true })
      .filter(d => d.isDirectory()).map(d => d.name).sort();
    for (const month of monthDirs) {
      const dir = path.join(slugDir, month);
      const reportMonth = `${month}-01`;
      const metaPath = path.join(dir, `${slug}-meta.json`);
      const clientJsonPath = path.join(dir, `${slug}-client-report.json`);
      const internalJsonPath = path.join(dir, `${slug}-internal-report.json`);
      const graderJsonPath = path.join(dir, `${slug}-grader.json`);
      const clientMdPath = path.join(dir, `${slug}-client-report.md`);
      const internalMdPath = path.join(dir, `${slug}-internal-report.md`);

      const meta = readJson(metaPath);
      const clientJson = readJson(clientJsonPath);
      const internalJson = readJson(internalJsonPath);
      const graderJson = readJson(graderJsonPath);
      const clientMd = fs.existsSync(clientMdPath) ? fs.readFileSync(clientMdPath, "utf-8") : null;
      const internalMd = fs.existsSync(internalMdPath) ? fs.readFileSync(internalMdPath, "utf-8") : null;

      const item = {
        slug, month, reportMonth,
        dir: path.relative(repoRoot, dir),
        files: {
          meta: !!meta, clientJson: !!clientJson, internalJson: !!internalJson,
          grader: !!graderJson, clientMd: !!clientMd, internalMd: !!internalMd,
        },
        issues: [],
      };

      if (!meta) {
        item.issues.push("MISSING meta.json on disk — cannot resolve report id");
        findings.push(item);
        continue;
      }

      const reportId = meta.id || meta.report_id;
      if (!reportId) {
        item.issues.push("meta.json has no id / report_id");
        findings.push(item);
        continue;
      }

      const { data: row, error } = await supabase
        .from("client_reports")
        .select("id, client_id, location_id, report_month, status, visibility, client_name, client_slug, client_url, grader_data, client_content_md, client_content_html, client_content_json, internal_content_md, internal_content_html, internal_content_json, created_at, updated_at, published_at")
        .eq("id", reportId)
        .maybeSingle();
      if (error) {
        item.issues.push(`DB error: ${error.message}`);
        findings.push(item);
        continue;
      }
      if (!row) {
        item.issues.push(`No DB row for id=${reportId}`);
        findings.push(item);
        continue;
      }

      // Compare scalars
      const scalarChecks = [
        ["report_month",  String(row.report_month),  reportMonth],
        ["status",        row.status,                meta.status],
        ["visibility",    row.visibility,            meta.visibility],
        ["client_name",   row.client_name,           meta.client_name],
        ["client_slug",   row.client_slug,           meta.client_slug],
        ["client_url",    row.client_url,            meta.client_url],
        ["client_id",     row.client_id,             meta.company_id],
        ["location_id",   row.location_id,           meta.location_id],
      ];
      for (const [field, dbVal, fileVal] of scalarChecks) {
        if (fileVal !== undefined && dbVal !== fileVal) {
          item.issues.push(`${field}: db="${dbVal}" meta="${fileVal}"`);
        }
      }

      // Compare JSON payloads
      const jsonChecks = [
        ["grader_data",          row.grader_data,           graderJson],
        ["client_content_json",  row.client_content_json,   clientJson],
        ["internal_content_json",row.internal_content_json, internalJson],
      ];
      for (const [field, dbVal, fileVal] of jsonChecks) {
        const dbHash = sha(dbVal);
        const fileHash = sha(fileVal);
        item[`${field}_dbHash`] = dbHash;
        item[`${field}_fileHash`] = fileHash;
        if (fileVal && !dbVal) item.issues.push(`${field}: file has data, DB is NULL`);
        else if (!fileVal && dbVal) item.issues.push(`${field}: DB has data, file missing`);
        else if (fileVal && dbVal && dbHash !== fileHash) {
          item.issues.push(`${field}: content differs (db=${dbHash} vs file=${fileHash})`);
        }
      }

      // Compare MD bodies if file has them
      if (clientMd) {
        if (!row.client_content_md) item.issues.push("client_content_md: file has MD, DB is NULL");
        else if (clientMd.replace(/\r\n/g, "\n") !== row.client_content_md.replace(/\r\n/g, "\n")) {
          item.issues.push(`client_content_md: content differs (file=${clientMd.length}b db=${row.client_content_md.length}b)`);
        }
      }
      if (internalMd) {
        if (!row.internal_content_md) item.issues.push("internal_content_md: file has MD, DB is NULL");
        else if (internalMd.replace(/\r\n/g, "\n") !== row.internal_content_md.replace(/\r\n/g, "\n")) {
          item.issues.push(`internal_content_md: content differs (file=${internalMd.length}b db=${row.internal_content_md.length}b)`);
        }
      }

      // Note (not an issue) when DB has MD but file does not — that's a legacy
      // row where MD was pushed in some earlier session but never archived.
      if (!clientMd && row.client_content_md) item.notes = (item.notes||[]).concat(`DB has client_content_md (${row.client_content_md.length}b) but no client-report.md on disk`);
      if (!internalMd && row.internal_content_md) item.notes = (item.notes||[]).concat(`DB has internal_content_md (${row.internal_content_md.length}b) but no internal-report.md on disk`);

      findings.push(item);
    }
  }

  // Pretty print
  let allClean = true;
  for (const f of findings) {
    const ok = f.issues.length === 0;
    if (!ok) allClean = false;
    console.log(`\n${ok ? "OK" : "DIFF"}  ${f.slug}/${f.month}`);
    console.log(`     files: ${Object.entries(f.files).filter(([,v])=>v).map(([k])=>k).join(", ") || "(none)"}`);
    if (f.client_content_json_dbHash || f.client_content_json_fileHash) {
      console.log(`     client_content_json:   db=${f.client_content_json_dbHash || "null"}  file=${f.client_content_json_fileHash || "null"}`);
    }
    if (f.internal_content_json_dbHash || f.internal_content_json_fileHash) {
      console.log(`     internal_content_json: db=${f.internal_content_json_dbHash || "null"}  file=${f.internal_content_json_fileHash || "null"}`);
    }
    if (f.grader_data_dbHash || f.grader_data_fileHash) {
      console.log(`     grader_data:           db=${f.grader_data_dbHash || "null"}  file=${f.grader_data_fileHash || "null"}`);
    }
    for (const issue of f.issues) console.log(`     ✗ ${issue}`);
    for (const note of (f.notes || [])) console.log(`     · ${note}`);
  }
  console.log(`\n${allClean ? "All archive files are in sync with Supabase." : "Drift detected — see DIFF rows above."}`);
}

run().catch(e => { console.error("Unexpected error:", e); process.exit(1); });
