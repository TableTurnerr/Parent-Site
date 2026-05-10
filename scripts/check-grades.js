#!/usr/bin/env node
/**
 * check-grades.js
 * Diagnose why some reports show no grade in /admin/reports.
 * Reads each row's grader_data + client_content_json and prints what shape
 * the score is in (or what's missing).
 */
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: path.join(__dirname, "../.env.local"), quiet: true });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

(async () => {
  const { data, error } = await supabase
    .from("client_reports")
    .select("client_slug, report_month, grader_data, client_content_json")
    .order("client_slug");
  if (error) { console.error(error.message); process.exit(1); }

  for (const r of data) {
    const month = r.report_month.slice(0, 7);
    const g = r.grader_data || null;
    const cj = r.client_content_json || null;
    const overallScore = g?.overallScore ?? null;
    const heroScore = cj?.hero?.graderScore ?? null;
    const heroGrade = cj?.hero?.overallGrade ?? null;
    const graderKeys = g ? Object.keys(g).slice(0, 8).join(",") : "(null)";
    console.log(
      r.client_slug.padEnd(28),
      month,
      "| overallScore:", String(overallScore).padEnd(6),
      "| hero.graderScore:", String(heroScore).padEnd(6),
      "| hero.overallGrade:", String(heroGrade).padEnd(4),
      "| grader_data keys:", graderKeys
    );
  }
})();
