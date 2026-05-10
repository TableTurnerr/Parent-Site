#!/usr/bin/env node
/**
 * backfill-grader-data.js
 * Repair: rows with grader_data=null get rewritten from a matching
 * .grader-cache/*.json file (matched by normalized URL when the slug-named
 * file is missing). Without grader_data, /admin/reports renders no score.
 *
 * Usage:
 *   node scripts/backfill-grader-data.js          # dry-run
 *   node scripts/backfill-grader-data.js --apply
 */

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: path.join(__dirname, "../.env.local"), quiet: true });

const APPLY = process.argv.includes("--apply");
const CACHE_DIR = path.join(__dirname, "..", ".grader-cache");

function norm(u) {
  if (!u) return "";
  return String(u).trim().toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/+$/, "");
}

function loadCacheIndex() {
  // Map: normalizedUrl → [{ file, data }, ...]
  const idx = new Map();
  if (!fs.existsSync(CACHE_DIR)) return idx;
  for (const f of fs.readdirSync(CACHE_DIR)) {
    if (!f.endsWith(".json")) continue;
    try {
      const data = JSON.parse(fs.readFileSync(path.join(CACHE_DIR, f), "utf-8"));
      const key = norm(data.url);
      if (!key) continue;
      const list = idx.get(key) || [];
      list.push({ file: f, data });
      idx.set(key, list);
    } catch { /* ignore bad cache files */ }
  }
  return idx;
}

(async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
  const { data: rows, error } = await supabase
    .from("client_reports")
    .select("id, client_slug, client_url, report_month, grader_data, client_content_json");
  if (error) { console.error(error.message); process.exit(1); }

  const cacheIdx = loadCacheIndex();
  const toFix = [];

  for (const r of rows) {
    if (r.grader_data) continue; // already populated
    const month = r.report_month.slice(0, 7);
    const targetUrl = norm(r.client_url);
    let pick = null;

    // 1) try exact slug filename
    const bySlug = path.join(CACHE_DIR, `${r.client_slug}.json`);
    if (fs.existsSync(bySlug)) {
      try { pick = { file: `${r.client_slug}.json`, data: JSON.parse(fs.readFileSync(bySlug, "utf-8")) }; }
      catch { /* ignore */ }
    }

    // 2) match by URL
    if (!pick) {
      const candidates = cacheIdx.get(targetUrl) || [];
      if (candidates.length === 1) {
        pick = candidates[0];
      } else if (candidates.length > 1) {
        // multiple cache files with the same URL (e.g. multi-location brands).
        // Disambiguate by comparing scores against the JSON's hero.graderScore.
        const heroScore = r.client_content_json?.hero?.graderScore ?? null;
        if (heroScore != null) {
          pick = candidates.find((c) => c.data.overallScore === heroScore) || null;
        }
        if (!pick) pick = candidates[0]; // fallback: first match
      }
    }

    if (!pick) {
      console.log(`  [no-cache] ${r.client_slug} ${month} (url=${r.client_url})`);
      continue;
    }

    const cacheScore = pick.data.overallScore;
    const heroScore = r.client_content_json?.hero?.graderScore;
    const tag = (cacheScore != null && heroScore != null && cacheScore !== heroScore)
      ? `  [WARN: cache=${cacheScore} ≠ hero=${heroScore}]` : "";
    console.log(`  ${r.client_slug.padEnd(28)} ${month} ← ${pick.file}  score=${cacheScore}${tag}`);
    toFix.push({ id: r.id, slug: r.client_slug, data: pick.data });
  }

  if (toFix.length === 0) {
    console.log("Nothing to backfill.");
    return;
  }
  console.log(`\nPlanned: ${toFix.length} row(s)`);
  if (!APPLY) {
    console.log("(dry-run; pass --apply to write)");
    return;
  }
  let ok = 0, fail = 0;
  for (const u of toFix) {
    const { error: e } = await supabase
      .from("client_reports")
      .update({ grader_data: u.data })
      .eq("id", u.id);
    if (e) { console.error(`  ✗ ${u.slug}: ${e.message}`); fail++; } else { ok++; }
  }
  console.log(`\nDone. ${ok} ok · ${fail} failed.`);
})();
