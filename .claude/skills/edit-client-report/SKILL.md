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

## Step 0 — Parse the request
Extract:
- **Slug** — required. If not given, ask. Slug must already exist in Supabase.
- **Variant** — `client` or `internal`. Default to `client` if not specified. The "Talk to AI" panel always supplies it explicitly.
- **Instruction** — the change(s) to apply, in plain English.

If the request comes from the admin panel's copy-paste it will look like:
```
/edit-client-report grumpys-burgers

Variant: client
Instruction: Tighten the executive summary, drop the speculative revenue figures, and add a section on TikTok strategy.
```

---

## Step 1 — Fetch the existing report

```bash
python scripts/grader_cli.py fetch --slug "<slug>"
```

Run from: `C:\Users\Hashaam\Desktop\MyCode\ParentSite-Tableturnerr`

Watch stdout for the sentinel line:
```
FETCHED:<slug>:<absolute-path-to-archive-dir>
```

The script writes:
- `reports-archive/<slug>/<slug>-client-report.md`
- `reports-archive/<slug>/<slug>-internal-report.md` (if exists)
- `reports-archive/<slug>/<slug>-grader.json` (if grader data exists)
- `reports-archive/<slug>/<slug>-meta.json` — current `client_name`, `client_url`, `status`, `visibility`. Use these for Step 3.

If the fetch fails (`Report not found for slug ...`), tell the user the slug doesn't exist and stop — do not silently fall through to `generate-client-report`.

---

## Step 2 — Apply the requested edits

Read the relevant variant file from `reports-archive/<slug>/`. Apply the user's instruction:
- Preserve YAML frontmatter, branding banner, watermark div, and footer.
- Preserve section structure unless the instruction explicitly asks to add/remove a section.
- For factual changes (numbers, names, dates), only edit if the instruction supplies the new value or it's clearly derivable from `grader.json`.
- For tone/style changes, rewrite only the affected sections — leave the rest intact.
- If you're unsure about a vague instruction, ask **one** clarifying question before editing.

Save in place — overwrite the file in `reports-archive/<slug>/`.

If both variants need updating (e.g., "fix the company name everywhere"), edit both. Otherwise only touch the variant the user specified.

---

## Step 3 — Push back to Supabase

Use the metadata from `<slug>-meta.json` for `client_name` / `client_url` (don't re-prompt). Push both variants — even the unchanged one is harmless because of the upsert + matching content.

```bash
python scripts/grader_cli.py share \
  --slug "<slug>" \
  --client "<client_name from meta>" \
  --url "<client_url from meta>" \
  --client-report   "<repo>/reports-archive/<slug>/<slug>-client-report.md" \
  --internal-report "<repo>/reports-archive/<slug>/<slug>-internal-report.md" \
  --status     "<status from meta>" \
  --visibility "<visibility from meta>"
```

In the share menu choose option **3** (push). Skip viewing — the user is editing remotely from the admin panel.

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
| Vague instruction | Ask one clarifying question before editing |
| Both variants exist but only one is mentioned | Edit only the specified variant; mention the other was untouched |
| Push fails after edit | Show the error; the local edited MD is preserved in `reports-archive/<slug>/` so the user can retry |

---

## Anti-patterns
- ❌ Don't run `capture` here — we already have the grader data cached.
- ❌ Don't bump status from `draft` → `published` unless asked.
- ❌ Don't change `visibility` unless asked.
- ❌ Don't regenerate the report from scratch — apply targeted edits only.
