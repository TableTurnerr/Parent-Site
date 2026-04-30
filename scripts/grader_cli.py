#!/usr/bin/env python3
"""
grader_cli.py
Interactive CLI for capturing grader.owner.com reports + post-report sharing menu.

Usage:
  python scripts/grader_cli.py capture [--company "Name"] [--url "site.com"]
  python scripts/grader_cli.py share   --slug <slug> --client "Name" --url "site.com" \
                                       --client-report "/path/to/<slug>-client-report.md" \
                                       --internal-report "/path/to/<slug>-internal-report.md"
  python scripts/grader_cli.py fetch   --slug <slug>     # pulls existing reports from Supabase

Capture flow:
  1. Prompts for company name + website URL (if not given as flags)
  2. Launches the user's real Chrome with --remote-debugging-port=9222 to grader.owner.com
  3. User completes any CAPTCHA + submits the URL
  4. Script polls via CDP until the report is detected (URL change or score visible)
  5. Auto-saves HTML + extracts JSON to .grader-cache/<slug>.{html,json}
  6. Prints  READY:<slug>:<json-path>  on its own line so the parent (Claude) can detect completion

Share flow:
  Re-launched after Claude finishes the markdown report. Offers: view locally / push to Supabase / both.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
import time
import webbrowser
from pathlib import Path

try:
    from rich.console import Console
    from rich.panel import Panel
    from rich.prompt import Prompt, IntPrompt
    from rich.progress import Progress, SpinnerColumn, TextColumn, TimeElapsedColumn
    from rich.table import Table
except ImportError:
    print("Missing dependency: rich. Install with: pip install rich", file=sys.stderr)
    sys.exit(1)

try:
    from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout
except ImportError:
    print("Missing dependency: playwright. Install with: pip install playwright", file=sys.stderr)
    sys.exit(1)


REPO_ROOT = Path(__file__).resolve().parent.parent
CACHE_DIR = REPO_ROOT / ".grader-cache"
CDP_PORT = 9222
GRADER_URL = "https://grader.owner.com/"

console = Console()


# ────────────────────────────── helpers ──────────────────────────────
def slugify(name: str) -> str:
    s = name.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def normalize_url(url: str) -> str:
    return re.sub(r"^https?://", "", url).rstrip("/")


def find_chrome() -> str | None:
    candidates = [
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        os.path.join(os.environ.get("LOCALAPPDATA", ""), r"Google\Chrome\Application\chrome.exe"),
    ]
    for p in candidates:
        if p and Path(p).exists():
            return p
    return None


def banner(title: str, subtitle: str = "") -> None:
    body = f"[bold cyan]{title}[/bold cyan]"
    if subtitle:
        body += f"\n[dim]{subtitle}[/dim]"
    console.print(Panel(body, border_style="cyan", padding=(1, 2)))


# ────────────────────────────── capture ──────────────────────────────
def try_prefill_url(page, normalized_url: str) -> bool:
    selectors = [
        'input[type="url"]',
        'input[name="url"]',
        'input[placeholder*="website" i]',
        'input[placeholder*="url" i]',
        'input[placeholder*="enter" i]',
        'input[placeholder*="domain" i]',
        'input[type="text"]',
    ]
    for sel in selectors:
        try:
            el = page.query_selector(sel)
            if el:
                page.click(sel)
                page.fill(sel, normalized_url)
                return True
        except Exception:
            continue
    return False


REPORT_READY_JS = r"""
() => {
  // Strategy 1: URL changed to a /report/<id> path
  if (/\/report\/[A-Za-z0-9-]+/.test(window.location.href)) return true;

  // Strategy 2: Look for any visible "<num> / 100" pattern
  const text = document.body.innerText || "";
  if (/\b\d{1,3}\s*\/\s*100\b/.test(text)) return true;

  // Strategy 3: Score-shaped element with a 0-100 number
  const candidates = document.querySelectorAll(
    '[class*="overall-score"], [class*="overall"] [class*="score"], [class*="grade-score"], [class*="total-score"]'
  );
  for (const el of candidates) {
    const t = (el.innerText || "").trim();
    const m = t.match(/\b(\d{1,3})\b/);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n >= 0 && n <= 100) return true;
    }
  }

  return false;
}
"""


# Owner.com renders the full report behind a phone-verification "unlock" modal.
# The data is already in the DOM — we just need to strip the overlay before
# capturing HTML so downstream parsers and previews see the actual report.
STRIP_UNLOCK_JS = r"""
() => {
  let removed = 0;

  // Remove the modal itself by id
  const modal = document.getElementById('unlock-report-challenge');
  if (modal) {
    // Walk up to the fixed-position overlay container (z-101 / backdrop-blur)
    let container = modal;
    for (let i = 0; i < 6 && container.parentElement; i++) {
      const p = container.parentElement;
      const cls = (p.className || '').toString();
      if (/\bfixed\b/.test(cls) && /\bz-\d+\b/.test(cls)) {
        container = p;
        break;
      }
      container = p;
    }
    container.remove();
    removed += 1;
  }

  // Catch-all: any remaining backdrop-blur overlays
  document.querySelectorAll('div.fixed.inset-0, [class*="backdrop-blur"]').forEach((el) => {
    const cls = (el.className || '').toString();
    if (/\bfixed\b/.test(cls) || /backdrop-blur/.test(cls)) {
      el.remove();
      removed += 1;
    }
  });

  // Re-enable scrolling if the modal locked it
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';

  return removed;
}
"""


EXTRACT_JS = r"""
(url) => {
  // grader.owner.com renders a fairly stable text layout we can mine from innerText.
  // Sample shape:
  //   64
  //   of 100
  //   Online health grade
  //   Fair
  //   Search results
  //   Fair
  //   25 of 40
  //   Guest experience
  //   Fair
  //   24 of 40
  //   Local listings
  //   Fair
  //   15 of 20
  //
  //   Pure Pizza on The Plaza
  //   pureontheplaza.com
  //   You could be losing ~$2,429/month due to 7 problems
  //   <issue 1>
  //   <issue 2>
  //   ...
  //   You're ranking below N competitors
  //   <competitor name>
  //   <rating>
  //   <rank>th
  //   ...

  const text = (document.body.innerText || "").replace(/\r/g, "");
  const lines = text.split("\n").map((l) => l.trim());
  // Compact (blank-stripped) view used wherever blank rows would break tuple-style parsing.
  const cLines = lines.filter((l) => l.length > 0);

  // ---------- overall score ----------
  let overallScore = null;
  // Pattern A: "<num>\nof 100"
  const mOverall = text.match(/\b(\d{1,3})\s*\n\s*of\s*100\b/);
  if (mOverall) {
    const n = parseInt(mOverall[1], 10);
    if (n >= 0 && n <= 100) overallScore = n;
  }
  // Pattern B: "<num> / 100" or "<num> out of 100"
  if (overallScore === null) {
    const m =
      text.match(/\b(\d{1,3})\s*\/\s*100\b/) ||
      text.match(/\b(\d{1,3})\s*out\s*of\s*100\b/i);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n >= 0 && n <= 100) overallScore = n;
    }
  }

  // ---------- overall grade label ----------
  let overallGrade = null;
  const idxGradeLabel = lines.findIndex((l) => /^Online health grade$/i.test(l));
  if (idxGradeLabel !== -1 && lines[idxGradeLabel + 1]) {
    overallGrade = lines[idxGradeLabel + 1];
  }

  // ---------- categories ----------
  // Look for a category-name line, then optional grade word, then "X of Y".
  const knownCategories = [
    "Search results",
    "Guest experience",
    "Local listings",
    "Website",
    "Reviews",
    "Social media",
    "Performance",
    "Content",
  ];
  const categories = {};
  for (let i = 0; i < lines.length; i++) {
    const name = lines[i];
    if (!knownCategories.includes(name)) continue;
    // Look ahead up to 3 lines for "<num> of <num>"
    for (let j = 1; j <= 3 && i + j < lines.length; j++) {
      const m = lines[i + j].match(/^(\d{1,3})\s+of\s+(\d{1,3})$/);
      if (m) {
        const score = parseInt(m[1], 10);
        const max = parseInt(m[2], 10);
        const grade = lines[i + 1] && /^(Excellent|Good|Fair|Poor|Needs work)$/i.test(lines[i + 1])
          ? lines[i + 1]
          : null;
        const key = name.toLowerCase().replace(/\s+/g, "_");
        categories[key] = { name, score, max, grade, issues: [] };
        break;
      }
    }
  }

  // ---------- problems / recommendations ----------
  // The line "You could be losing ~$X/month due to N problems" introduces a list.
  const topRecommendations = [];
  let problemCount = null;
  const idxProblems = lines.findIndex((l) =>
    /You\s+could\s+be\s+losing.*due\s+to\s+\d+\s+problem/i.test(l)
  );
  if (idxProblems !== -1) {
    const m = lines[idxProblems].match(/due\s+to\s+(\d+)\s+problem/i);
    if (m) problemCount = parseInt(m[1], 10);
    // Capture the next non-empty lines as the problem list, up to a likely terminator.
    const stopRe = /(You're\s+ranking\s+below|Best\s+\w+\s+in|^#1:)/i;
    for (let i = idxProblems + 1; i < lines.length && topRecommendations.length < (problemCount || 10); i++) {
      const l = lines[i];
      if (!l) continue;
      if (stopRe.test(l)) break;
      // Skip pure-noise lines (single words, ratings, ranks)
      if (/^\d+(\.\d+)?$/.test(l)) continue;
      if (/^\d+(st|nd|rd|th)$/i.test(l)) continue;
      if (l.length < 12) continue;
      topRecommendations.push(l);
    }
  }

  // ---------- competitors ----------
  // Pattern: "<name>\n<rating like 4.7>\n<rank like 1st>"
  const competitors = [];
  const idxRankC = cLines.findIndex((l) =>
    /You're\s+ranking\s+below\s+\d+\s+competitor/i.test(l)
  );
  if (idxRankC !== -1) {
    let i = idxRankC + 1;
    while (i < cLines.length - 2 && competitors.length < 12) {
      const name = cLines[i];
      const rating = cLines[i + 1];
      const rank = cLines[i + 2];
      if (/^Best\s+/i.test(name)) break;
      if (
        name &&
        /^\d+(\.\d+)?$/.test(rating) &&
        /^\d+(st|nd|rd|th)$/i.test(rank)
      ) {
        competitors.push({ name, rating: parseFloat(rating), rank });
        i += 3;
      } else {
        i += 1;
      }
    }
  }

  // ---------- revenue loss ----------
  let estimatedRevenueLoss = null;
  const rev =
    text.match(/\$[\d,]+(?:\.\d{2})?\s*(?:per\s*month|\/month|monthly)/i) ||
    text.match(/~?\$[\d,]+(?:\.\d{2})?\s*\/\s*mo/i);
  if (rev) estimatedRevenueLoss = rev[0].replace(/^~/, "");

  // ---------- ranking opportunities ----------
  // "Best <thing> in <area>\n#1: <leader>\n[2nd] map result\nUnranked organic" etc.
  const rankingOpportunities = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^Best\s+(.+?)\s+in\s+(.+)$/i);
    if (!m) continue;
    const query = m[0];
    let leader = null;
    const ld = (lines[i + 1] || "").match(/^#1:\s*(.+)$/);
    if (ld) leader = ld[1];
    // Look for nearest "Unranked" or rank words within next 6 lines
    const window = lines.slice(i + 1, i + 7).join(" | ");
    const ranked = !/Unranked/i.test(window);
    rankingOpportunities.push({ query, leader, ranked });
  }

  return {
    url,
    reportUrl: window.location.href,
    gradedAt: new Date().toISOString(),
    overallScore,
    overallGrade,
    categories,
    problemCount,
    topRecommendations,
    competitors,
    rankingOpportunities,
    estimatedRevenueLoss,
    fullPageText: text.slice(0, 12000),
  };
}
"""


def cmd_capture(args: argparse.Namespace) -> int:
    banner("📊  Grader Capture", "Real Chrome • CDP • auto-extract")

    company = args.company or Prompt.ask("[bold]Company / restaurant name[/bold]")
    raw_url = args.url or Prompt.ask("[bold]Website URL[/bold]")
    if not company.strip() or not raw_url.strip():
        console.print("[red]Both company name and URL are required.[/red]")
        return 1

    slug = slugify(company)
    normalized = normalize_url(raw_url)

    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    json_path = CACHE_DIR / f"{slug}.json"
    html_path = CACHE_DIR / f"{slug}.html"

    info = Table.grid(padding=(0, 2))
    info.add_row("[dim]Company[/dim]", f"[bold]{company}[/bold]")
    info.add_row("[dim]Slug[/dim]", slug)
    info.add_row("[dim]URL[/dim]", normalized)
    info.add_row("[dim]Output[/dim]", str(json_path))
    console.print(info)
    console.print()

    chrome_path = find_chrome()
    if not chrome_path:
        console.print("[red]✗ Could not find Google Chrome.[/red] Install Chrome or add it to PATH.")
        return 1
    console.print(f"[green]✓[/green] Chrome: [dim]{chrome_path}[/dim]")

    profile_dir = Path(tempfile.gettempdir()) / "chrome-grader-profile"
    profile_dir.mkdir(parents=True, exist_ok=True)

    chrome_proc = subprocess.Popen(
        [
            chrome_path,
            f"--remote-debugging-port={CDP_PORT}",
            f"--user-data-dir={profile_dir}",
            "--no-first-run",
            "--no-default-browser-check",
            "--start-maximized",
            GRADER_URL,
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    console.print(f"[green]✓[/green] Launched Chrome → {GRADER_URL}")
    console.print()

    try:
        with sync_playwright() as pw:
            browser = None
            with Progress(
                SpinnerColumn(),
                TextColumn("[cyan]Connecting to Chrome via CDP[/cyan]"),
                TimeElapsedColumn(),
                console=console,
                transient=True,
            ) as progress:
                progress.add_task("connect", total=None)
                deadline = time.time() + 25
                while time.time() < deadline:
                    try:
                        browser = pw.chromium.connect_over_cdp(f"http://localhost:{CDP_PORT}")
                        break
                    except Exception:
                        time.sleep(0.5)

            if not browser:
                console.print(
                    "[red]✗ Could not connect to Chrome on port 9222.[/red]\n"
                    "  Close ALL Chrome windows (incl. system tray) and try again."
                )
                chrome_proc.terminate()
                return 1
            console.print("[green]✓[/green] CDP connected")

            context = browser.contexts[0] if browser.contexts else browser.new_context()
            pages = context.pages
            page = next((p for p in pages if "grader.owner.com" in p.url), pages[0] if pages else None)
            if not page:
                console.print("[red]✗ No page found in the Chrome instance.[/red]")
                return 1

            try:
                page.wait_for_load_state("load", timeout=30000)
            except PWTimeout:
                pass
            page.wait_for_timeout(1500)

            if try_prefill_url(page, normalized):
                console.print(f"[green]✓[/green] Pre-filled URL field with [cyan]{normalized}[/cyan]")
            else:
                console.print(f"[yellow]ℹ[/yellow]  Could not pre-fill — type the URL manually: [cyan]{normalized}[/cyan]")

            console.print()
            console.print(Panel(
                "[bold yellow]Action required in Chrome:[/bold yellow]\n"
                "  1. Submit the URL ([dim]click 'Grade my website' / press Enter[/dim])\n"
                "  2. Solve any CAPTCHA / verification\n"
                "  3. Wait — this script will [bold green]auto-detect[/bold green] when the report is ready",
                border_style="yellow",
                padding=(1, 2),
            ))

            with Progress(
                SpinnerColumn(),
                TextColumn("[cyan]Waiting for report to load[/cyan] [dim](polling every 2s, up to 5 min)[/dim]"),
                TimeElapsedColumn(),
                console=console,
            ) as progress:
                progress.add_task("wait", total=None)
                deadline = time.time() + 300
                ready = False
                while time.time() < deadline:
                    try:
                        active = context.pages
                        page = next((p for p in active if "grader.owner.com" in p.url), page)
                        if page.evaluate(REPORT_READY_JS):
                            ready = True
                            break
                    except Exception:
                        pass
                    time.sleep(2)

            if not ready:
                console.print("[red]✗ Timed out waiting for the report (5 min).[/red]")
                console.print("  If the report IS visible, re-run capture and submit faster.")
                return 1

            console.print(f"[green]✓[/green] Report detected at [dim]{page.url}[/dim]")
            page.wait_for_timeout(3000)

            try:
                stripped = page.evaluate(STRIP_UNLOCK_JS)
                if stripped:
                    console.print(f"[green]✓[/green] Stripped {stripped} unlock-modal overlay element(s) before capture")
                    page.wait_for_timeout(300)
            except Exception as e:
                console.print(f"[yellow]ℹ[/yellow]  Could not strip unlock modal: {e}")

            html = page.content()
            html_path.write_text(html, encoding="utf-8")
            console.print(f"[green]✓[/green] HTML saved → [dim]{html_path}[/dim]")

            data = page.evaluate(EXTRACT_JS, normalized)
            json_path.write_text(json.dumps(data, indent=2), encoding="utf-8")
            console.print(f"[green]✓[/green] JSON saved → [dim]{json_path}[/dim]")

            summary = Table.grid(padding=(0, 2))
            score_label = data.get("overallScore")
            if score_label is not None and data.get("overallGrade"):
                score_label = f"{score_label} / 100  ({data['overallGrade']})"
            elif score_label is None:
                score_label = "not extracted"
            summary.add_row("[dim]Overall score[/dim]", f"[bold]{score_label}[/bold]")
            cats = data.get("categories", {}) or {}
            if cats:
                cat_lines = []
                for k, v in cats.items():
                    if isinstance(v, dict) and "score" in v and "max" in v:
                        cat_lines.append(f"{v.get('name', k)} {v['score']}/{v['max']}")
                    else:
                        cat_lines.append(k)
                summary.add_row("[dim]Categories[/dim]", ", ".join(cat_lines))
            else:
                summary.add_row("[dim]Categories[/dim]", "[dim]none[/dim]")
            summary.add_row("[dim]Problems[/dim]", str(data.get("problemCount") or len(data.get("topRecommendations", []))))
            summary.add_row("[dim]Recommendations[/dim]", str(len(data.get("topRecommendations", []))))
            summary.add_row("[dim]Competitors[/dim]", str(len(data.get("competitors", []))))
            summary.add_row("[dim]Ranking opportunities[/dim]", str(len(data.get("rankingOpportunities", []))))
            if data.get("estimatedRevenueLoss"):
                summary.add_row("[dim]Revenue loss[/dim]", data["estimatedRevenueLoss"])
            console.print()
            console.print(Panel(summary, title="[bold green]Captured[/bold green]", border_style="green"))

            try:
                browser.close()
            except Exception:
                pass

    finally:
        try:
            chrome_proc.terminate()
        except Exception:
            pass

    # Sentinel line for the parent process (Claude) to detect completion.
    # Must be on its own line, machine-readable, last meaningful output.
    print(f"READY:{slug}:{json_path}")
    return 0


# ────────────────────────────── share ──────────────────────────────
def cmd_share(args: argparse.Namespace) -> int:
    banner(f"🚀  Share Reports — {args.client}", f"slug: {args.slug}")

    client_path = Path(args.client_report) if args.client_report else None
    internal_path = Path(args.internal_report) if args.internal_report else None

    if client_path and not client_path.exists():
        console.print(f"[red]✗ Client report not found:[/red] {client_path}")
        return 1
    if internal_path and not internal_path.exists():
        console.print(f"[red]✗ Internal report not found:[/red] {internal_path}")
        return 1
    if not client_path and not internal_path:
        console.print("[red]Provide --client-report and/or --internal-report.[/red]")
        return 1

    summary = Table.grid(padding=(0, 2))
    summary.add_row("[dim]Client report[/dim]",   str(client_path)   if client_path   else "[dim](unchanged)[/dim]")
    summary.add_row("[dim]Internal report[/dim]", str(internal_path) if internal_path else "[dim](unchanged)[/dim]")
    summary.add_row("[dim]Status[/dim]",          args.status)
    summary.add_row("[dim]Visibility[/dim]",      args.visibility)
    console.print(summary)

    menu = Table(show_header=False, box=None, padding=(0, 2))
    menu.add_row("[bold cyan]1[/bold cyan]", "View the client report locally")
    menu.add_row("[bold cyan]2[/bold cyan]", "View the internal report locally")
    menu.add_row("[bold cyan]3[/bold cyan]", "Push both to Supabase + get a share link")
    menu.add_row("[bold cyan]4[/bold cyan]", "Push + view client report")
    menu.add_row("[bold cyan]5[/bold cyan]", "Exit")
    console.print(Panel(menu, title="[bold]What's next?[/bold]", border_style="cyan", padding=(1, 1)))

    choice = IntPrompt.ask("Choose", choices=["1", "2", "3", "4", "5"], default=3)

    if choice == 1 and client_path:
        webbrowser.open(client_path.resolve().as_uri())
        console.print(f"[green]✓[/green] Opened [dim]{client_path}[/dim]")
        return 0
    if choice == 2 and internal_path:
        webbrowser.open(internal_path.resolve().as_uri())
        console.print(f"[green]✓[/green] Opened [dim]{internal_path}[/dim]")
        return 0
    if choice == 5:
        return 0

    push_args = [
        "node",
        str(REPO_ROOT / "scripts" / "push-report.js"),
        f"--client={args.client}",
        f"--slug={args.slug}",
        f"--url={args.url}",
        f"--status={args.status}",
        f"--visibility={args.visibility}",
    ]
    if client_path:
        push_args.append(f"--client-report={client_path}")
    if internal_path:
        push_args.append(f"--internal-report={internal_path}")
    grader_json = CACHE_DIR / f"{args.slug}.json"
    if grader_json.exists():
        push_args.append(f"--grader={grader_json}")

    console.print()
    console.print(f"[dim]$ {' '.join(push_args)}[/dim]")
    rc = subprocess.call(push_args, cwd=REPO_ROOT)
    if rc != 0:
        console.print("[red]✗ push-report.js failed[/red]")
        return rc

    if choice == 4 and client_path:
        webbrowser.open(client_path.resolve().as_uri())

    local_url = f"http://localhost:3000/report/{args.slug}"
    prod_url = f"https://tableturnerr.com/report/{args.slug}"
    console.print()
    console.print(Panel(
        f"[bold]Client share links[/bold]\n"
        f"  Local: [cyan]{local_url}[/cyan]\n"
        f"  Prod:  [cyan]{prod_url}[/cyan] [dim](after publishing)[/dim]\n\n"
        f"Status: [yellow]{args.status}[/yellow]  Visibility: [yellow]{args.visibility}[/yellow]\n"
        f"Internal report is admin-only at [cyan]http://localhost:3000/admin/reports[/cyan]",
        border_style="green",
        padding=(1, 2),
    ))
    return 0


# ────────────────────────────── fetch ──────────────────────────────
def cmd_fetch(args: argparse.Namespace) -> int:
    banner(f"⬇️   Fetch Report — {args.slug}", "Pull existing report from Supabase for editing")

    archive_dir = REPO_ROOT / "reports-archive" / args.slug
    fetch_args = [
        "node",
        str(REPO_ROOT / "scripts" / "fetch-report.js"),
        f"--slug={args.slug}",
        f"--archive={archive_dir}",
    ]
    console.print(f"[dim]$ {' '.join(fetch_args)}[/dim]")
    rc = subprocess.call(fetch_args, cwd=REPO_ROOT)
    if rc != 0:
        console.print("[red]✗ fetch-report.js failed[/red]")
        return rc

    console.print()
    console.print(Panel(
        f"[bold]Edit locally, then push back with:[/bold]\n"
        f"  python scripts/grader_cli.py share \\\n"
        f"    --slug {args.slug} \\\n"
        f"    --client \"<Client Name>\" \\\n"
        f"    --url \"<site.com>\" \\\n"
        f"    --client-report \"{archive_dir / f'{args.slug}-client-report.md'}\" \\\n"
        f"    --internal-report \"{archive_dir / f'{args.slug}-internal-report.md'}\"",
        border_style="cyan",
        padding=(1, 2),
    ))
    print(f"FETCHED:{args.slug}:{archive_dir}")
    return 0


# ────────────────────────────── main ──────────────────────────────
def main() -> int:
    parser = argparse.ArgumentParser(prog="grader_cli")
    sub = parser.add_subparsers(dest="cmd", required=True)

    cap = sub.add_parser("capture", help="Capture a grader.owner.com report")
    cap.add_argument("--company", help="Company / restaurant name (prompted if omitted)")
    cap.add_argument("--url", help="Website URL (prompted if omitted)")

    sh = sub.add_parser("share", help="Post-report share menu (view / push / both)")
    sh.add_argument("--slug", required=True)
    sh.add_argument("--client", required=True)
    sh.add_argument("--url", required=True)
    sh.add_argument("--client-report",   dest="client_report",   help="Path to <slug>-client-report.md")
    sh.add_argument("--internal-report", dest="internal_report", help="Path to <slug>-internal-report.md")
    sh.add_argument("--status",     default="draft",  choices=["draft", "published", "archived"])
    sh.add_argument("--visibility", default="public", choices=["public", "unlisted", "private"])

    fe = sub.add_parser("fetch", help="Fetch an existing report from Supabase into reports-archive/<slug>/")
    fe.add_argument("--slug", required=True)

    args = parser.parse_args()

    try:
        if args.cmd == "capture":
            return cmd_capture(args)
        if args.cmd == "share":
            return cmd_share(args)
        if args.cmd == "fetch":
            return cmd_fetch(args)
    except KeyboardInterrupt:
        console.print("\n[yellow]Interrupted.[/yellow]")
        return 130

    return 1


if __name__ == "__main__":
    sys.exit(main())
