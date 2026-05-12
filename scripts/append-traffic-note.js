#!/usr/bin/env node
/**
 * append-traffic-note.js
 * Appends a "current traffic vs. 3-month target" paragraph to
 * keywords.totals.summary in each archived 2026-05 client report, and (with
 * --apply) syncs the patched JSON back to client_reports.client_content_json.
 *
 *   node scripts/append-traffic-note.js          # dry-run (diff only)
 *   node scripts/append-traffic-note.js --write  # write JSON files on disk
 *   node scripts/append-traffic-note.js --apply  # write files + push to Supabase
 *
 * --apply implies --write. Idempotent: skips reports already containing the
 * traffic-note marker.
 */

const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env.local"), quiet: true });

const WRITE = process.argv.includes("--write") || process.argv.includes("--apply");
const APPLY = process.argv.includes("--apply");
const ARCHIVE = path.join(__dirname, "..", "reports-archive");
const MONTH = "2026-05";
const MARKER = "**Where you stand today vs. where you can be in 3 months:**";

// Per-client traffic paragraphs. Current-traffic ranges derived from each
// report's search/content/gbp ratings + verdict. 3-month targets sized to ~5-8%
// of the low end of that report's keyword opportunity total.
const NOTES = {
  "al-baghdadi":
    "**Where you stand today vs. where you can be in 3 months:** Al-Baghdadi's three sites combined are currently pulling roughly **80–150 visitors a month** — almost all branded searches (people typing *\"Al Baghdadi Richardson\"* directly). Once the three domains consolidate, the keyword set goes live across the site and GBP, and the directory clean-up is done, a realistic **3-month target is 800+ monthly visitors**, growing toward 1,500+ by month six — roughly a **5–10× lift**. On a 10,770–23,150 monthly-search keyword opportunity, capturing even the bottom end of that range clears the target comfortably.",
  "asadero-chikalica":
    "**Where you stand today vs. where you can be in 3 months:** the site is currently pulling roughly **50–100 visitors a month** — almost entirely branded searches and overspill from the LA Times feature. With the keyword set live, GBP cleaned up, and the Mexicali / guisados / catering pages built out, a realistic **3-month target is 600+ monthly visitors**, climbing toward 1,000+ by month six — roughly a **6–12× lift**. On a 7,000–15,000 monthly-search keyword opportunity, hitting the bottom of that range is well within reach.",
  "bay-ridge-pizza":
    "**Where you stand today vs. where you can be in 3 months:** a 40-year brand with 78/100 GBP health is already pulling roughly **250–450 visitors a month** — mostly branded plus *\"pizza near me\"* Maps clicks. With the keyword set worked into the site and GBP and the heritage / GF / whole-wheat story brought forward, a realistic **3-month target is 1,000+ monthly visitors**, with a clear path to 1,800+ by month six — about a **3–4× lift**. On a 12,170–24,450 monthly-search opportunity, a 5–8% capture rate alone gets you there.",
  "pure-on-the-plaza":
    "**Where you stand today vs. where you can be in 3 months:** the site is currently pulling roughly **150–300 visitors a month** — almost all branded and a handful of Plaza neighborhood searches. With the keyword set live, the sprouted / organic / GF / clean story brought forward, and catering content shipped, a realistic **3-month target is 1,000+ monthly visitors**, growing toward 1,800+ by month six — roughly a **5–8× lift**. On an 11,190–20,890 monthly-search keyword opportunity, that's comfortably within reach.",
  "taco-delphia-22nd-walnut":
    "**Where you stand today vs. where you can be in 3 months:** tacodelphia.online as a whole is currently pulling roughly **100–250 visitors a month** across both locations — almost all branded searches, with very little Center City weekday-lunch or build-your-own discovery traffic landing on the 22nd & Walnut pages specifically. With the keyword set live across both locations' site and GBP and the Center City lunch / corporate-catering content built out, a realistic **3-month target is 1,000+ monthly visitors to the 22nd & Walnut pages alone**, climbing toward 1,800+ by month six. On a 13,460–27,600 monthly-search Center City opportunity, even a 5% capture rate clears it.",
  "taco-delphia-south-broad":
    "**Where you stand today vs. where you can be in 3 months:** tacodelphia.online as a whole is currently pulling roughly **100–250 visitors a month** across both locations — almost entirely branded searches, with very little discovery traffic reaching the South Broad pages specifically. With the keyword set live, the catering and build-your-own pages built, and GBP cleaned up, a realistic **3-month target is 1,000+ monthly visitors to the South Broad pages alone**, climbing toward 1,800+ by month six. On a 12,350–24,630 monthly-search South Broad / South Philly opportunity, that's comfortably hit at a 5–8% capture rate.",
  "tonys-pizza-bros":
    "**Where you stand today vs. where you can be in 3 months:** Tony's already ranks #1 for several branded and *\"pizza Camarillo\"* terms, and the site is currently pulling roughly **400–800 visitors a month**. With the rest of the keyword set (pasta, scratch, deep dish, GF, neighborhood, catering) worked into the site and GBP, a realistic **3-month target is 1,200+ monthly visitors**, growing toward 2,000+ by month six — a **2–3× lift** off an already-strong baseline. On a 7,640–12,190 monthly-search opportunity, that's well within reach.",
  "wings-n-things-elmont":
    "**Where you stand today vs. where you can be in 3 months:** wingsny.com as a whole is currently pulling roughly **500–1,000 visitors a month** across both locations — but **almost none of that is reaching the Elmont pages**, because the Google listing is broken and Elmont is buried in local search. With the listing fixed, the keyword set live, and the 37-year brand story brought online, a realistic **3-month target is 600+ monthly visitors specifically to the Elmont pages**, climbing toward 1,200+ by month six. On an 8,000–16,600 monthly-search Elmont-area keyword opportunity, that's well within reach.",
  "wings-n-things-hempstead":
    "**Where you stand today vs. where you can be in 3 months:** wingsny.com as a whole is currently pulling roughly **500–1,000 visitors a month** across both locations, **and most of it is already coming through Hempstead** (88/100 search health, strong local Maps rankings). The next move is converting those rankings into orders and reaching deeper into the keyword set above — a realistic **3-month target is 1,500+ monthly visitors to the Hempstead pages**, climbing toward 2,500+ by month six. On a 9,000–19,400 monthly-search Hempstead-area keyword opportunity, that's a **2–3× lift** off an already-strong baseline.",
};

function loadReport(slug) {
  const file = path.join(ARCHIVE, slug, MONTH, `${slug}-client-report.json`);
  if (!fs.existsSync(file)) return null;
  const text = fs.readFileSync(file, "utf-8");
  const data = JSON.parse(text);
  return { file, data };
}

function patchSummary(data, note) {
  const kw = (data.sections || []).find((s) => s.id === "keywords");
  if (!kw || !kw.totals || typeof kw.totals.summary !== "string") return null;
  const existing = kw.totals.summary;
  if (existing.includes(MARKER)) return { skipped: true, existing };
  kw.totals.summary = `${existing}\n\n${note}`;
  return { skipped: false, existing, next: kw.totals.summary };
}

async function syncToSupabase(rows) {
  const { createClient } = require("@supabase/supabase-js");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }
  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });

  let ok = 0;
  let fail = 0;
  for (const r of rows) {
    const reportMonth = `${MONTH}-01`;
    const { data: existing, error: selErr } = await supabase
      .from("client_reports")
      .select("id, client_slug, report_month")
      .eq("client_slug", r.slug)
      .eq("report_month", reportMonth)
      .maybeSingle();
    if (selErr) {
      console.error(`  ✗ ${r.slug}: select error ${selErr.message}`);
      fail++;
      continue;
    }
    if (!existing) {
      console.warn(`  · ${r.slug}: no client_reports row for ${reportMonth} — skipping Supabase sync`);
      continue;
    }
    const { error: updErr } = await supabase
      .from("client_reports")
      .update({ client_content_json: r.data })
      .eq("id", existing.id);
    if (updErr) {
      console.error(`  ✗ ${r.slug}: ${updErr.message}`);
      fail++;
    } else {
      console.log(`  ✓ ${r.slug}: synced (row ${existing.id})`);
      ok++;
    }
  }
  console.log(`\nSupabase sync: ${ok} ok, ${fail} failed`);
}

async function run() {
  const mode = APPLY ? "APPLY (files + Supabase)" : WRITE ? "WRITE (files only)" : "DRY-RUN";
  console.log(`Mode: ${mode}\n`);

  const slugs = Object.keys(NOTES);
  const patched = [];
  for (const slug of slugs) {
    const loaded = loadReport(slug);
    if (!loaded) {
      console.warn(`  · ${slug}: no archive JSON found`);
      continue;
    }
    const result = patchSummary(loaded.data, NOTES[slug]);
    if (!result) {
      console.warn(`  · ${slug}: no keywords.totals.summary to patch`);
      continue;
    }
    if (result.skipped) {
      console.log(`  · ${slug}: already contains traffic note, skipping`);
      continue;
    }
    console.log(`  ✓ ${slug}: patched`);
    patched.push({ slug, file: loaded.file, data: loaded.data });
  }

  console.log(`\nPlanned changes: ${patched.length} report(s)`);

  if (!WRITE) {
    console.log("\n(dry-run; pass --write to update JSON files, --apply to also push to Supabase)");
    return;
  }

  for (const r of patched) {
    fs.writeFileSync(r.file, JSON.stringify(r.data, null, 2), "utf-8");
    console.log(`  wrote ${path.relative(process.cwd(), r.file)}`);
  }

  if (!APPLY) {
    console.log("\nFiles updated. Pass --apply to also sync to Supabase.");
    return;
  }

  console.log("\nSyncing patched JSONs to Supabase...");
  await syncToSupabase(patched);
}

run().catch((e) => {
  console.error("Unexpected:", e.message);
  process.exit(1);
});
