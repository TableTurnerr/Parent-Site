// Convert the markdown blog drafts in docs/blog-drafts/ into clean HTML files
// ready to paste straight into the post editor's HTML tab.
//
//   node scripts/drafts-to-html.mjs
//
// Output: docs/blog-drafts/html/<slug>.html (body only, no frontmatter, no
// inline styles). Paste into the editor's HTML tab. The frontmatter fields
// (title, slug, meta_*, excerpt, categories) still go into their own inputs.

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const here = dirname(fileURLToPath(import.meta.url));
const draftsDir = join(here, "..", "docs", "blog-drafts");
const outDir = join(draftsDir, "html");

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

marked.setOptions({ mangle: false, headerIds: false });

function stripFrontmatter(md) {
  const m = md.match(/^---\n[\s\S]*?\n---\n?/);
  return m ? md.slice(m[0].length).trim() : md.trim();
}

function slugFromFrontmatter(md, fallback) {
  const m = md.match(/^slug:\s*(.+)$/m);
  return m ? m[1].trim() : fallback;
}

const files = readdirSync(draftsDir).filter((f) => /^\d+.*\.md$/.test(f));
let count = 0;

for (const file of files) {
  const md = readFileSync(join(draftsDir, file), "utf8");
  const slug = slugFromFrontmatter(md, file.replace(/\.md$/, ""));
  const body = stripFrontmatter(md);
  const html = marked.parse(body).trim();
  writeFileSync(join(outDir, `${slug}.html`), html + "\n", "utf8");
  count++;
  console.log(`OK  ${file}  ->  html/${slug}.html`);
}

console.log(`\nConverted ${count} drafts to HTML in docs/blog-drafts/html/`);
