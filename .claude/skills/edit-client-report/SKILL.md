# Skill: Edit Client Report

## Trigger (must be EXPLICIT)
Only run this skill when the user clearly asks to **edit, update, revise, or change** an **existing** report. Examples:

- `/edit-client-report <slug>`
- "edit the client report for Grumpy's"
- "update the internal report for pure-on-the-plaza"
- "revise the published Grumpy's report — drop the revenue projection"
- A pasted block from the admin panel's "Talk to AI" copy that begins with `/edit-client-report <slug>` followed by `Variant: client|internal` and `Instruction: ...`

Do **not** trigger this skill on a generic "make a report" request — that's `generate-client-report`.

---

## CRITICAL RULES

1. **JSON ONLY — never edit or create `.md` files.** Both the client and internal reports are JSON files now. The schema for both is `lib/report-schema.ts` (`ClientReport` v1). Markdown is retired.
2. **The client JSON's section order, IDs, and titles are LOCKED** to mirror `reports-archive/pure-on-the-plaza/pure-on-the-plaza-client-report.json`. You may rewrite content inside sections, but do not rename `id` fields, swap section types, or change the section order unless the instruction explicitly demands it.
3. **The client `actionPlan` always has exactly 4 items** — Research → Build → Polish → Ongoing. Editing the action plan means rewording inside those four; never adding a 5th step or dropping one.

---

## Step 0 — Parse the request
Extract:
- **Slug** — required. If not given, ask. Slug must already exist in Supabase.
- **Month** — optional, format `YYYY-MM`. Defaults to the latest month for the client. Ask if the user mentions multiple months or "the September report".
- **Variant** — `client` or `internal`. Default to `client` if not specified. The "Talk to AI" panel always supplies it explicitly.
- **Instruction** — the change(s) to apply, in plain English.

If the request comes from the admin panel's copy-paste it will look like:
```
/edit-client-report grumpys-burgers

Month: 2026-05
Variant: client
Instruction: Tighten the executive summary, drop the speculative revenue figures, and add a section on TikTok strategy.
```

---

## Step 1 — Fetch the existing report

```bash
node scripts/fetch-report.js --slug="<slug>" [--month="YYYY-MM"]
```

Run from: `C:\Users\Hashaam\Desktop\MyCode\ParentSite-Tableturnerr`

Watch stdout for the sentinel line:
```
FETCHED:<slug>:<YYYY-MM>:<absolute-path-to-archive-dir>
```

The script writes (under `reports-archive/<slug>/<YYYY-MM>/`):
- `<slug>-client-report.json`   (the client JSON — what powers the live page)
- `<slug>-internal-report.json` (the internal JSON — admin-only)
- `<slug>-grader.json` (raw grader data, if cached)
- `<slug>-meta.json` (current `client_name`, `client_url`, `report_month`, `status`, `visibility` — use these for Step 3)

If the fetch fails (`Report not found for slug ...`), tell the user the slug doesn't exist and stop — do not silently fall through to `generate-client-report`.

If a row exists but doesn't have a JSON variant yet (legacy markdown row), tell the user the report needs to be regenerated via `generate-client-report` before it can be edited under the JSON-only flow.

---

## Step 2 — Apply the requested edits

For **client variant**: edit `<slug>-client-report.json` in place.
For **internal variant**: edit `<slug>-internal-report.json` in place.

**Never write or modify a `.md` file.** If you find any in the archive folder, ignore them — they are legacy and will be removed.

General rules:
- Schema: `lib/report-schema.ts` (`ClientReport` v1). Read `reports-archive/pure-on-the-plaza/pure-on-the-plaza-client-report.json` if you need a reference.
- Preserve section `id`s — they are the anchor links (`#problems`, `#keywords`, `#action-plan`, `#next-steps`, etc.).
- Preserve section order unless the instruction explicitly asks to add/remove a section.
- Inline formatting in JSON strings is the small markdown subset only: `**bold**`, `*italic*`, `[label](url)`, `` `code` ``. Never emit raw HTML.
- For factual changes (numbers, names, dates), only edit if the instruction supplies the new value or it's clearly derivable from `grader.json`.
- For tone/style changes, rewrite only the affected sections — leave the rest intact.
- Re-validate the JSON parses cleanly before saving.
- If you're unsure about a vague instruction, ask **one** clarifying question before editing.

If both variants need updating (e.g., "fix the company name everywhere"), edit both. Otherwise only touch the variant the user specified.

---

## Step 3 — Push back to Supabase

Use the metadata from `<slug>-meta.json` for `client_name` / `client_url` (don't re-prompt). The push script accepts JSON-only — no `--client-report` markdown flag is needed:

```bash
node scripts/push-report.js \
  --client="<client_name from meta>" \
  --slug="<slug>" \
  --url="<client_url from meta>" \
  --month="<YYYY-MM from meta.report_month>" \
  --client-report-json="<repo>/reports-archive/<slug>/<YYYY-MM>/<slug>-client-report.json" \
  --internal-report-json="<repo>/reports-archive/<slug>/<YYYY-MM>/<slug>-internal-report.json" \
  --status=<status from meta> \
  --visibility=<visibility from meta>
```

Always pass `--month` so the upsert hits the right (client, month) row instead of accidentally creating a new month.

Only pass the JSON flags for variants that actually changed — the script preserves the other variant's column when its flag is omitted.

`client_content_json` drives the live `/report/<slug>` page. `internal_content_json` drives the admin deep-dive.

**Do not change** `status` or `visibility` unless the user explicitly asked to. Preserve the existing values from `<slug>-meta.json`.

---

## Step 4 — Return a concise summary

```
✅ Edits applied to <Client Name> (<slug>)

Variant edited:    <client|internal>
Files updated:     <list>
Pushed to Supabase: yes
Status:            <unchanged|new>
Visibility:        <unchanged|new>

Refresh /admin/reports/<id> to see the changes.
```

---

## Error handling
| Problem | Action |
|---------|--------|
| `Report not found for slug` | Stop. Tell the user the slug doesn't exist. Don't generate a new one. |
| Row exists but has no JSON variant | Tell the user the row is legacy markdown — it must be regenerated via `generate-client-report` before this skill can edit it. |
| Vague instruction | Ask one clarifying question before editing |
| Both variants exist but only one is mentioned | Edit only the specified variant; mention the other was untouched |
| Push fails after edit | Show the error; the local edited JSON is preserved in `reports-archive/<slug>/` so the user can retry |
| JSON fails to parse after editing | Open the file, fix the syntax error, re-save. Never hand-edit the structure to "work around" a parse error. |

---

## Anti-patterns
- ❌ Don't run `capture` here — we already have grader data cached.
- ❌ Don't bump status from `draft` → `published` unless asked.
- ❌ Don't change `visibility` unless asked.
- ❌ Don't regenerate the report from scratch — apply targeted edits only.
- ❌ Don't write or edit `.md` files. JSON only.
- ❌ Don't drop the `actionPlan` from 4 items down to 3, or add a 5th. The four-step structure is locked.
