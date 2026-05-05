#!/usr/bin/env node
/**
 * render-report.js
 * Generates a self-contained HTML preview of a ClientReport JSON file.
 * No dev server required — produces one .html with CSS + JS inlined.
 *
 * Usage:
 *   node scripts/render-report.js --input=<path-to.json> [--output=<path.html>] [--title="…"]
 *
 * If --output is omitted, writes alongside the input with the same stem (.html).
 * Mirrors the section structure rendered by components/report/* so the same
 * report.css produces an identical look.
 */

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const CSS_PATH = path.join(repoRoot, "components", "report", "report.css");

const args = Object.fromEntries(
  process.argv.slice(2)
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const eq = a.indexOf("=");
      if (eq === -1) return [a.slice(2), "true"];
      return [a.slice(2, eq), a.slice(eq + 1)];
    })
);

const inputArg = args.input;
if (!inputArg) {
  console.error("Usage: node scripts/render-report.js --input=<file.json> [--output=<file.html>] [--title=\"…\"]");
  process.exit(1);
}

const inputPath = path.resolve(inputArg);
if (!fs.existsSync(inputPath)) {
  console.error(`Input not found: ${inputPath}`);
  process.exit(1);
}

const outputPath = args.output
  ? path.resolve(args.output)
  : inputPath.replace(/\.json$/i, ".html");

const titleOverride = args.title;

// ─── helpers ──────────────────────────────────────────────────────────────
const num2 = (i) => String(i).padStart(2, "0");

function escHtml(s) {
  if (s === null || s === undefined) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Tiny markdown subset matching components/report/inline.tsx:
// **bold**, *italic*, `code`, [text](url). HTML is escaped first.
function inline(text) {
  if (text === null || text === undefined) return "";
  let s = escHtml(text);
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  s = s.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );
  return s;
}

function paragraphs(arr, opts = {}) {
  if (!Array.isArray(arr) || arr.length === 0) return "";
  const style = opts.style ? ` style="${opts.style}"` : "";
  return arr.map((p) => `<p${style}>${inline(p)}</p>`).join("");
}

function toneForGrade(grade) {
  const c = (grade || "").charAt(0).toUpperCase();
  if (c === "A") return "green";
  if (c === "B") return "lime";
  if (c === "C") return "amber";
  if (c === "D") return "orange";
  return "rose";
}

function toneForScore(score) {
  if (score >= 80) return "green";
  if (score >= 60) return "lime";
  if (score >= 40) return "amber";
  if (score >= 25) return "orange";
  return "rose";
}

// ─── section renderers ────────────────────────────────────────────────────

function renderHero(hero, preparedDate) {
  const letter = (hero.overallGrade || "").charAt(0);
  const modifier = (hero.overallGrade || "").slice(1);
  const narrative = (hero.narrative || [])
    .map((p) => `<p>${inline(p)}</p>`)
    .join("");
  const score =
    typeof hero.graderScore === "number"
      ? `<span class="grade-score">${hero.graderScore}<small>/100</small></span>`
      : "";
  const loss =
    typeof hero.monthlyRevenueLoss === "number"
      ? `<div class="verdict-stat">
           <div class="verdict-stat-value">$${Number(hero.monthlyRevenueLoss).toLocaleString()}</div>
           <div class="verdict-stat-label">Estimated monthly revenue left on the table</div>
         </div>`
      : "";

  return `
<header class="hero">
  <div class="hero-eyebrow"><span>Digital Presence Report</span><span>${escHtml(preparedDate)}</span></div>
  <h1>${escHtml(hero.title || "")}</h1>
  ${hero.subtitle ? `<p class="hero-sub">${escHtml(hero.subtitle)}</p>` : ""}
  ${narrative ? `<div class="hero-narrative">${narrative}</div>` : ""}
  <div class="verdict">
    <div class="grade-card">
      <div class="grade-card-top"><span>Overall Grade</span><span>${escHtml(preparedDate)}</span></div>
      <div class="grade-letter"><span>${escHtml(letter)}</span>${modifier ? `<span class="grade-modifier">${escHtml(modifier)}</span>` : ""}</div>
      <div class="grade-card-bottom"><span>Online Presence</span>${score}</div>
    </div>
    <div class="verdict-body">
      <p class="verdict-headline"><strong>${inline(hero.verdict || "")}</strong></p>
      ${loss}
    </div>
  </div>
</header>`;
}

function renderSidebar(report) {
  const hero = report.hero || {};
  const letter = (hero.overallGrade || "").charAt(0);
  const modifier = (hero.overallGrade || "").slice(1);
  const ratings = Array.isArray(report.ratings) ? report.ratings : [];

  const scoreList = ratings
    .map(
      (r) => `
      <li class="score-row">
        <div class="score-row-top">
          <span class="score-label">${escHtml(r.label)}</span>
          <span class="score-value">${escHtml(r.score)}</span>
        </div>
        <div class="score-track">
          <div class="score-fill" data-tone="${toneForScore(Number(r.score) || 0)}" style="width:${Math.max(2, Math.min(100, Number(r.score) || 0))}%"></div>
        </div>
      </li>`,
    )
    .join("");

  const scoreBlock = ratings.length
    ? `
    <div class="side-block">
      <div class="side-eyebrow"><span>Score Breakdown</span><span class="num">${ratings.length}</span></div>
      <ul class="score-list">${scoreList}</ul>
    </div>`
    : "";

  const score =
    typeof hero.graderScore === "number"
      ? `<span class="num">${hero.graderScore}/100</span><span>Online presence</span>`
      : `<span>Online presence</span>`;

  return `
<aside class="sidebar">
  <div class="side-block">
    <div class="side-eyebrow"><span>Verdict</span><span class="num">${escHtml(report.client?.preparedDate || "")}</span></div>
    <div class="side-grade">
      <div class="side-grade-letter">${escHtml(letter)}${modifier ? `<span>${escHtml(modifier)}</span>` : ""}</div>
      <div class="side-grade-meta">${score}</div>
    </div>
  </div>
  ${scoreBlock}
</aside>`;
}

function renderRail(sections) {
  if (!sections.length) return "";
  const items = sections
    .map(
      (s, i) => `
      <li>
        <a href="#${escHtml(s.id)}" data-rail-link="${escHtml(s.id)}">
          <span class="num">${num2(i + 1)}</span>
          <span>${escHtml(s.title || s.label || "")}</span>
        </a>
      </li>`,
    )
    .join("");
  return `
<aside class="rail">
  <div class="side-block">
    <div class="side-eyebrow"><span>Sections</span><span class="num">${num2(sections.length)}</span></div>
    <ul class="section-nav">${items}</ul>
  </div>
</aside>`;
}

// ── individual section bodies ──

function bodyScorecard(section) {
  const tiles = section.items
    .map(
      (it) => `
    <div class="scorecard-tile">
      <div class="scorecard-tile-top">
        <div class="scorecard-area">${escHtml(it.area)}</div>
        <div class="scorecard-grade" data-tone="${toneForGrade(it.grade)}">${escHtml(it.grade)}</div>
      </div>
      <p class="scorecard-summary">${inline(it.summary)}</p>
    </div>`,
    )
    .join("");
  return `
    <div class="scorecard-grid">${tiles}</div>
    ${section.footnote ? `<div class="callout">${inline(section.footnote)}</div>` : ""}`;
}

function bodyNarrative(section) {
  const body = (section.body || [])
    .map(
      (p) =>
        `<p style="font-size:16px;line-height:1.7;color:var(--rp-warm-900);margin:0 0 14px">${inline(p)}</p>`,
    )
    .join("");
  return `
    <div style="max-width:65ch">${body}</div>
    ${section.callout ? `<div class="callout">${inline(section.callout)}</div>` : ""}`;
}

function bodyTable(section) {
  const rows = section.rows
    .map((row) => {
      const cells = row
        .map((cell, j) => {
          const isFirst = j === 0;
          const isNum = j > 0 && /^[~\d$*]/.test(String(cell));
          const cls = isFirst && section.emphasizeFirstColumn ? "emphasize" : isNum ? "num" : "";
          return `<td${cls ? ` class="${cls}"` : ""}>${inline(cell)}</td>`;
        })
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");
  const heads = section.headers.map((h) => `<th>${escHtml(h)}</th>`).join("");
  return `
    <div class="report-table-wrap">
      <table class="report-table">
        <thead><tr>${heads}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    ${section.callout ? `<div class="callout">${inline(section.callout)}</div>` : ""}`;
}

function bodyReviews(section) {
  const tiles = (section.platforms || [])
    .map(
      (p) => `
      <div class="review-tile">
        <div class="review-platform">${escHtml(p.platform)}</div>
        <div class="review-rating">${escHtml(p.rating ?? "—")}</div>
        <div class="review-stars">★★★★☆</div>
        <div class="review-count">${escHtml(p.reviews ?? "—")} reviews</div>
      </div>`,
    )
    .join("");
  const loved = (section.loved && section.loved.length)
    ? `<div class="reviews-col loved"><h4><span class="pip"></span> What Customers Love</h4><ul>${section.loved.map((l) => `<li>${inline(l)}</li>`).join("")}</ul></div>`
    : "";
  const complaints = (section.complaints && section.complaints.length)
    ? `<div class="reviews-col complaints"><h4><span class="pip"></span> Common Complaints</h4><ul>${section.complaints.map((l) => `<li>${inline(l)}</li>`).join("")}</ul></div>`
    : "";
  const split = loved || complaints ? `<div class="reviews-split">${loved}${complaints}</div>` : "";
  return `
    <div class="reviews-grid">${tiles}</div>
    ${split}
    ${section.recommendation ? `<div class="callout"><strong>Our recommendation. </strong>${inline(section.recommendation)}</div>` : ""}`;
}

function bodyProblems(section) {
  const items = (section.items || [])
    .map((it, i) => {
      const number = it.number ?? i + 1;
      const body = (it.body || []).map((p) => `<p>${inline(p)}</p>`).join("");
      const bullets = (it.bullets && it.bullets.length)
        ? `<ul>${it.bullets.map((b) => `<li>${inline(b)}</li>`).join("")}</ul>`
        : "";
      return `
        <div class="problem rp-collapsible-problem" data-collapsible="problem">
          <button type="button" class="rp-problem-toggle" aria-expanded="false">
            <div class="problem-num"><span>${num2(number)}</span>Problem</div>
            <div class="rp-problem-headline">
              <h3>${escHtml(it.title)}</h3>
              <span class="rp-expand-indicator rp-expand-indicator-sm" aria-hidden="true">
                <span class="rp-expand-icon"><span class="rp-chev rp-chev-1"></span><span class="rp-chev rp-chev-2"></span></span>
                <span class="rp-expand-label">Click to Expand</span>
              </span>
            </div>
          </button>
          <div class="rp-problem-body" hidden aria-hidden="true">${body}${bullets}</div>
        </div>`;
    })
    .join("");
  return `<div>${items}</div>`;
}

function bodyCompetition(section) {
  const list = (section.competitors || [])
    .map(
      (c, i) => `
      <div class="competitor-row${c.isYou ? " is-you" : ""}">
        <div class="competitor-rank">${escHtml(c.rank ?? `#${i + 1}`)}</div>
        <div class="competitor-name">${escHtml(c.name)}${c.isYou ? '<span class="you-tag">You</span>' : ""}</div>
        <div class="competitor-style">${escHtml(c.style ?? "—")}</div>
        <div class="competitor-rating">${c.rating ? escHtml(c.rating) + "★" : "—"}</div>
        <div class="competitor-known">${c.knownFor ? inline(c.knownFor) : "—"}</div>
      </div>`,
    )
    .join("");

  let searchTable = "";
  if (section.searchPosition && section.searchPosition.length) {
    const rows = section.searchPosition
      .map(
        (r) => `<tr><td class="emphasize">${escHtml(r.search)}</td><td class="num">${inline(r.map)}</td><td class="num">${inline(r.organic)}</td></tr>`,
      )
      .join("");
    searchTable = `
      <h3 class="section-sub">Where you currently rank for key searches</h3>
      <div class="report-table-wrap">
        <table class="report-table">
          <thead><tr><th>Search</th><th>Map Pack</th><th>Organic</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }

  let rivals = "";
  if (section.rivalCallouts && section.rivalCallouts.length) {
    rivals = `<div class="rival-grid">${section.rivalCallouts
      .map(
        (r) =>
          `<div class="rival"><h4>${escHtml(r.title)}</h4>${(r.body || []).map((p) => `<p>${inline(p)}</p>`).join("")}</div>`,
      )
      .join("")}</div>`;
  }

  let winLose = "";
  if (section.winLose && section.winLose.length) {
    const win = section.winLose
      .filter((w) => w.winning)
      .map(
        (w) =>
          `<li class="wl-item"><div class="wl-area">${escHtml(w.area)}</div><div class="wl-detail">${inline(w.winning ?? "")}</div></li>`,
      )
      .join("");
    const lose = section.winLose
      .filter((w) => w.losing)
      .map(
        (w) =>
          `<li class="wl-item"><div class="wl-area">${escHtml(w.area)}</div><div class="wl-detail">${inline(w.losing ?? "")}</div></li>`,
      )
      .join("");
    winLose = `
      <div class="win-lose">
        <div class="wl-col win"><h4>Where You Win</h4><ul class="wl-list">${win}</ul></div>
        <div class="wl-col lose"><h4>Where You Lose</h4><ul class="wl-list">${lose}</ul></div>
      </div>`;
  }

  let opportunity = "";
  if (section.opportunity) {
    const op = section.opportunity;
    const rows = (op.rows || [])
      .map(
        (r) =>
          `<tr><td class="emphasize">${escHtml(r.opportunity)}</td><td>${inline(r.competition)}</td><td>${inline(r.canOwn)}</td></tr>`,
      )
      .join("");
    opportunity = `
      <h3 class="section-sub">The opportunity nobody is competing for</h3>
      ${op.intro ? `<p class="section-intro" style="font-size:15px;margin-bottom:20px">${inline(op.intro)}</p>` : ""}
      <div class="report-table-wrap">
        <table class="report-table">
          <thead><tr><th>Opportunity</th><th>Competition</th><th>Can You Own It?</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      ${op.bottomLine ? `<div class="callout">${inline(op.bottomLine)}</div>` : ""}`;
  }

  return `
    <div class="competitor-list">${list}</div>
    ${searchTable}
    ${rivals}
    ${winLose}
    ${opportunity}`;
}

function bodyKeywords(section) {
  const groups = (section.groups || [])
    .map((group, i) => {
      const headers = (group.table?.headers || []).map((h) => `<th>${escHtml(h)}</th>`).join("");
      const rows = (group.table?.rows || [])
        .map(
          (row) =>
            `<tr>${row
              .map((c, ci) => {
                const cls = ci === 0 ? "emphasize" : ci === 1 ? "num" : "";
                return `<td${cls ? ` class="${cls}"` : ""}>${inline(c)}</td>`;
              })
              .join("")}</tr>`,
        )
        .join("");
      return `
        <div class="kw-group" data-collapsible="kw">
          <button type="button" class="kw-summary" aria-expanded="false">
            <span class="kw-index">${num2(i + 1)}</span>
            <div>
              <div class="kw-label">${escHtml(group.label)}</div>
              <p class="kw-summary-text">${inline(group.summary)}</p>
            </div>
            ${group.highlight ? `<span class="kw-highlight">${escHtml(group.highlight)}</span>` : ""}
            <span class="kw-chevron" aria-hidden="true"></span>
          </button>
          <div class="kw-body" hidden>
            ${group.intro ? `<p class="kw-body-intro">${inline(group.intro)}</p>` : ""}
            <div class="report-table-wrap">
              <table class="report-table">
                <thead><tr>${headers}</tr></thead>
                <tbody>${rows}</tbody>
              </table>
            </div>
            ${group.takeaway ? `<div class="kw-takeaway">${inline(group.takeaway)}</div>` : ""}
          </div>
        </div>`;
    })
    .join("");

  let totals = "";
  if (section.totals) {
    const headers = section.totals.headers.map((h) => `<th>${escHtml(h)}</th>`).join("");
    const rows = section.totals.rows
      .map(
        (row) =>
          `<tr>${row
            .map(
              (c, ci) =>
                `<td class="${ci === 0 ? "emphasize" : "num"}">${inline(c)}</td>`,
            )
            .join("")}</tr>`,
      )
      .join("");
    totals = `
      <h3 class="section-sub">The total opportunity</h3>
      <div class="kw-totals">
        <table class="report-table">
          <thead><tr>${headers}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      ${section.totals.summary ? `<div class="callout">${inline(section.totals.summary)}</div>` : ""}`;
  }

  return `<div class="kw-groups">${groups}</div>${totals}`;
}

function bodyActionPlan(section) {
  const rows = (section.items || [])
    .map(
      (it) => `
      <tr>
        <td class="ap-priority">${num2(it.priority)}</td>
        <td><span class="ap-category" data-cat="${escHtml(it.category)}">${escHtml(it.category)}</span></td>
        <td class="ap-action">${inline(it.action)}</td>
        <td class="ap-impact">${inline(it.impact)}</td>
        <td class="ap-timeline">${escHtml(it.timeline)}</td>
      </tr>`,
    )
    .join("");
  return `
    <table class="ap-table">
      <thead><tr><th>#</th><th>Type</th><th>Action</th><th>Impact</th><th>Timeline</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function bodySuccessMetrics(section) {
  const rows = (section.items || [])
    .map(
      (m) => `
      <div class="metric-row">
        <div class="metric-name">${escHtml(m.metric)}</div>
        <div class="metric-now">${escHtml(m.now)}</div>
        <div class="metric-target">${escHtml(m.target)}</div>
      </div>`,
    )
    .join("");
  return `
    <div class="metrics-list">${rows}</div>
    ${section.callout ? `<div class="callout">${inline(section.callout)}</div>` : ""}`;
}

function renderCta(section, index) {
  const body = (section.body || []).map((p) => `<p>${inline(p)}</p>`).join("");
  const primary = section.primary
    ? `<a class="rp-btn rp-btn-primary" href="${escHtml(section.primary.href ?? "https://tableturnerr.com/contact")}">${escHtml(section.primary.label)}<span class="rp-btn-arrow">→</span></a>`
    : "";
  const secondary = section.secondary
    ? `<a class="rp-btn rp-btn-secondary" href="${escHtml(section.secondary.href ?? "https://tableturnerr.com")}">${escHtml(section.secondary.label)}</a>`
    : "";
  const actions = primary || secondary ? `<div class="cta-actions">${primary}${secondary}</div>` : "";
  return `
<section class="section" id="${escHtml(section.id)}">
  <div class="section-num"><span>Section ${num2(index)}</span></div>
  <div class="cta-block">
    <div class="cta-block-eyebrow">Tableturnerr · Restaurant marketing, done right</div>
    <h2>${escHtml(section.title)}</h2>
    ${body}
    ${actions}
  </div>
</section>`;
}

function renderSection(section, index) {
  if (section.type === "cta") return renderCta(section, index);

  let body = "";
  switch (section.type) {
    case "narrative": body = bodyNarrative(section); break;
    case "scorecard": body = bodyScorecard(section); break;
    case "table": body = bodyTable(section); break;
    case "reviews": body = bodyReviews(section); break;
    case "problems": body = bodyProblems(section); break;
    case "competition": body = bodyCompetition(section); break;
    case "keywords": body = bodyKeywords(section); break;
    case "actionPlan": body = bodyActionPlan(section); break;
    case "successMetrics": body = bodySuccessMetrics(section); break;
    default: body = "";
  }

  const defaultOpen = section.type === "problems";
  const intro = typeof section.intro === "string" ? section.intro : "";

  return `
<section class="section rp-collapsible${defaultOpen ? " is-open" : ""}" id="${escHtml(section.id)}" data-collapsible="section">
  <button type="button" class="rp-collapsible-toggle" aria-expanded="${defaultOpen}" aria-controls="${escHtml(section.id)}-body">
    <div class="rp-collapsible-head">
      <div class="section-num"><span>Section ${num2(index)}</span></div>
      <h2>${escHtml(section.title)}</h2>
      ${intro ? `<p class="section-intro">${inline(intro)}</p>` : ""}
    </div>
    <span class="rp-expand-indicator" aria-hidden="true">
      <span class="rp-expand-icon"><span class="rp-chev rp-chev-1"></span><span class="rp-chev rp-chev-2"></span></span>
      <span class="rp-expand-label">${defaultOpen ? "Click to Collapse" : "Click to Expand"}</span>
    </span>
  </button>
  <div id="${escHtml(section.id)}-body" class="rp-collapsible-body"${defaultOpen ? "" : " hidden aria-hidden=\"true\""}>
    ${body}
  </div>
</section>`;
}

// ─── inlined client-side JS for collapsibles + section nav ────────────────
const RUNTIME_JS = `
(function () {
  function bindCollapsible(root, kind) {
    var toggle = root.querySelector(kind === "section" ? ".rp-collapsible-toggle" : kind === "problem" ? ".rp-problem-toggle" : ".kw-summary");
    var body = root.querySelector(kind === "section" ? ".rp-collapsible-body" : kind === "problem" ? ".rp-problem-body" : ".kw-body");
    if (!toggle || !body) return;
    toggle.addEventListener("click", function () {
      var isOpen = root.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      if (isOpen) {
        body.removeAttribute("hidden");
        body.removeAttribute("aria-hidden");
      } else {
        body.setAttribute("hidden", "");
        body.setAttribute("aria-hidden", "true");
      }
      var label = toggle.querySelector(".rp-expand-label");
      if (label) label.textContent = isOpen ? "Click to Collapse" : "Click to Expand";
    });
  }

  document.querySelectorAll('[data-collapsible="section"]').forEach(function (el) { bindCollapsible(el, "section"); });
  document.querySelectorAll('[data-collapsible="problem"]').forEach(function (el) { bindCollapsible(el, "problem"); });
  document.querySelectorAll('[data-collapsible="kw"]').forEach(function (el) { bindCollapsible(el, "kw"); });

  var railLinks = Array.prototype.slice.call(document.querySelectorAll("[data-rail-link]"));
  function syncActive() {
    var y = window.scrollY + 200;
    var current = railLinks[0] ? railLinks[0].getAttribute("data-rail-link") : null;
    railLinks.forEach(function (a) {
      var id = a.getAttribute("data-rail-link");
      var el = document.getElementById(id);
      if (el && el.offsetTop <= y) current = id;
    });
    railLinks.forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("data-rail-link") === current);
    });
  }
  if (railLinks.length) {
    syncActive();
    window.addEventListener("scroll", syncActive, { passive: true });
  }
})();
`;

// ─── compose ──────────────────────────────────────────────────────────────

const json = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
if (!json || json.version !== 1) {
  console.warn(`Warning: input does not look like a v1 ClientReport (version=${json?.version})`);
}

const css = fs.readFileSync(CSS_PATH, "utf-8");
const sections = Array.isArray(json.sections) ? json.sections : [];
const navSections = sections.map((s) => ({ id: s.id, title: s.title }));
const heroHtml = renderHero(json.hero || {}, json.client?.preparedDate || "");
const sidebarHtml = renderSidebar(json);
const railHtml = renderRail(navSections);
const sectionsHtml = sections.map((s, i) => renderSection(s, i + 1)).join("\n");
const title = titleOverride || `${json.client?.name || "Client"} — Digital Presence Report`;
const preparedBy = json.client?.preparedBy || "Tableturnerr";

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex,nofollow" />
<title>${escHtml(title)}</title>
<style>
  body { margin: 0; background: #F7F3ED; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif; }
  .preview-banner { background:#1F1D1A; color:#F7F3ED; padding:10px 18px; font-size:12px; letter-spacing:0.04em; text-transform:uppercase; display:flex; justify-content:space-between; gap:12px; }
  .preview-banner a { color:#E8B89A; text-decoration:none; }
${css}
/* ── Static-preview overrides: there's no fixed Navbar on this page, so
   reset the sticky offsets that report.css bakes in for the Next.js shell. ── */
.report-page .meta-strip { top: 0 !important; }
@media (min-width: 768px) { .report-page .meta-strip { top: 0 !important; } }
.report-page .sidebar,
.report-page .rail {
  top: 60px !important;
  max-height: calc(100vh - 60px) !important;
  padding-top: 32px !important;
}
@media (min-width: 768px) {
  .report-page .sidebar,
  .report-page .rail {
    top: 60px !important;
    max-height: calc(100vh - 60px) !important;
  }
}
.report-page .main { padding-top: 32px !important; }
.report-page .section { scroll-margin-top: 80px !important; }
/* Belt-and-suspenders: hidden body should never display, even if a stylesheet
   tries to override the [hidden] UA rule. */
.report-page [hidden] { display: none !important; }

/* Problems section: report.css defines the legacy non-collapsible .problem grid
   AFTER .rp-collapsible-problem at equal specificity, so the legacy rules win
   and break expansion. Force the collapsible variant to win. */
.report-page .problem.rp-collapsible-problem {
  display: block !important;
  grid-template-columns: none !important;
  gap: 0 !important;
  padding: 0 !important;
}
.report-page .rp-collapsible-problem .rp-problem-body {
  display: block;
  padding: 0 0 28px 80px;
  max-width: none;
}
.report-page .rp-collapsible-problem .rp-problem-body[hidden] {
  display: none !important;
}
@media (max-width: 768px) {
  .report-page .rp-collapsible-problem .rp-problem-body { padding: 0 0 20px 54px; }
}

/* Replace the arrowhead chevrons with the same + / − icon used in the
   keywords area. chev-1 = horizontal bar, chev-2 = vertical bar; on is-open
   we fade chev-2 so the icon collapses from "+" to "−". */
.report-page .rp-expand-icon { width: 14px; height: 14px; }
.report-page .rp-chev {
  position: absolute;
  background: currentColor;
  border-radius: 0;
  transition: opacity 0.3s, transform 0.3s cubic-bezier(.2,.8,.2,1);
}
.report-page .rp-chev-1 {
  top: 6.25px; left: 0;
  width: 14px; height: 1.5px;
  transform: none !important;
  transform-origin: center !important;
}
.report-page .rp-chev-2 {
  top: 0; left: 6.25px;
  width: 1.5px; height: 14px;
  transform: none !important;
  transform-origin: center !important;
}
/* Scope to the toggle button that BELONGS to this container, so opening a
   parent section doesn't flip every nested problem's chevron. */
.report-page .rp-collapsible.is-open > .rp-collapsible-toggle .rp-chev-1,
.report-page .rp-collapsible-problem.is-open > .rp-problem-toggle .rp-chev-1 {
  transform: none !important;
}
.report-page .rp-collapsible.is-open > .rp-collapsible-toggle .rp-chev-2,
.report-page .rp-collapsible-problem.is-open > .rp-problem-toggle .rp-chev-2 {
  transform: none !important;
  opacity: 0;
}
.report-page .rp-collapsible-problem.is-open .rp-expand-indicator {
  background: var(--rp-accent);
}
</style>
</head>
<body>
<div class="preview-banner">
  <span><strong>Tableturnerr</strong> — Local Preview · ${escHtml(json.client?.name || "")}</span>
  <span>${escHtml(json.client?.url || "")}</span>
</div>
<div class="report-page">
  <div class="meta-strip">
    <div class="meta-strip-inner">
      <div class="meta-strip-text">
        Digital Presence Report
        <span class="dot"></span>
        Prepared for ${escHtml(json.client?.name || "")}
        <span class="dot"></span>
        ${escHtml(json.client?.preparedDate || "")}
      </div>
      <div class="meta-strip-right">
        <span class="meta-strip-by">By ${escHtml(preparedBy)}</span>
      </div>
    </div>
  </div>
  <div class="shell">
    ${sidebarHtml}
    <main class="main">
      ${heroHtml}
      ${sectionsHtml}
    </main>
    ${railHtml}
  </div>
</div>
<script>${RUNTIME_JS}</script>
</body>
</html>`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, html, "utf-8");
console.log(outputPath);
