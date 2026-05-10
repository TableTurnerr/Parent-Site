"""
Tableturnerr — Reports Archive Manager

Interactive menu for browsing every (company, location, month) report under
`reports-archive/<slug>/<YYYY-MM>/`. Each row in Supabase `client_reports`
is unique on `(client_id, location_id, report_month)`; a single company
("Taco Delphia") can own multiple locations ("South Broad", "22nd & Walnut"),
each with its own monthly report served at `/report/<slug>/<YYYY-MM>`.

Capabilities
------------
* Browse local archive entries; status/visibility shown from `<slug>-meta.json`.
* Preview either JSON variant as static HTML via `scripts/render-report.js`
  (no dev server required).
* Push to Supabase with status + visibility prompts (draft/published/archived).
* Refetch a (slug, month) row from Supabase (overwrites local files).
* Start a new month folder for a client (seeded from the latest local month).
* Open the deployed `/report/<slug>/<YYYY-MM>` URL in the browser.
* Top-level: pull a report by (slug, month) from Supabase, or capture a fresh
  grader.owner.com report via `scripts/grader_cli.py capture`.

Usage:
    python scripts/manage_reports.py

Designed to be launched from `scripts/manage-reports.bat`, which sets the
required Windows UTF-8 env vars and keeps the cmd window open afterward.
"""

from __future__ import annotations

import datetime as _dt
import json
import os
import re
import shutil
import subprocess
import sys
import webbrowser
from pathlib import Path
from typing import Optional

try:
    from rich.console import Console
    from rich.panel import Panel
    from rich.table import Table
except ImportError:
    print("Missing 'rich'. Install: pip install -r scripts/requirements.txt")
    sys.exit(1)

try:
    import questionary
    from questionary import Choice, Style
except ImportError:
    print("Missing 'questionary'. Install: pip install -r scripts/requirements.txt")
    sys.exit(1)


MENU_STYLE = Style([
    ("qmark", "fg:#00afff bold"),
    ("question", "bold"),
    ("answer", "fg:#00d75f bold"),
    ("pointer", "fg:#00afff bold"),
    ("highlighted", "fg:#00afff bold"),
    ("selected", "fg:#00d75f"),
    ("instruction", "fg:#808080 italic"),
    ("text", ""),
    ("disabled", "fg:#808080 italic"),
])


def clear_screen() -> None:
    os.system("cls" if os.name == "nt" else "clear")


def show_header() -> None:
    console.print(Panel(
        "[bold]Tableturnerr — Reports Archive Manager[/bold]\n"
        "[dim]↑/↓ arrows · number keys · Enter to select · Ctrl-C to quit[/dim]",
        border_style="cyan", padding=(1, 2),
    ))


def pause(msg: str = "Press Enter to continue…") -> None:
    try:
        questionary.press_any_key_to_continue(msg, style=MENU_STYLE).ask()
    except (KeyboardInterrupt, EOFError):
        pass


REPO_ROOT = Path(__file__).resolve().parent.parent
ARCHIVE = REPO_ROOT / "reports-archive"
CACHE_DIR = REPO_ROOT / ".grader-cache"
SCRIPTS_DIR = REPO_ROOT / "scripts"
PUSH_SCRIPT = SCRIPTS_DIR / "push-report.js"
FETCH_SCRIPT = SCRIPTS_DIR / "fetch-report.js"
LIST_SCRIPT = SCRIPTS_DIR / "list-reports.js"
RENDER_SCRIPT = SCRIPTS_DIR / "render-report.js"
GRADER_CLI = SCRIPTS_DIR / "grader_cli.py"

STATUS_CHOICES = ["draft", "published", "archived"]
VISIBILITY_CHOICES = ["public", "unlisted", "private"]
STATUS_COLORS = {"published": "green", "draft": "yellow", "archived": "dim"}

console = Console()


def open_live_renderer(c: dict, variant: str) -> None:
    """Render the JSON variant via scripts/render-report.js into a self-contained HTML
    file (CSS + JS inlined) and open it in the default browser. No dev server required."""
    slug = c["slug"]
    json_path: Optional[Path] = c.get(f"{variant}_json")  # type: ignore[assignment]
    if not json_path or not Path(json_path).exists():
        console.print(f"[red]No {variant} JSON found for {slug}[/red]")
        return

    archive_dir: Path = c.get("dir") or (ARCHIVE / slug)
    out_path = archive_dir / f"{slug}-{variant}-report.html"
    title = f"{c['name']} — {'Internal' if variant == 'internal' else 'Client'} Report"

    renderer = Path(__file__).parent / "render-report.js"
    cmd = [
        "node",
        str(renderer),
        f"--input={json_path}",
        f"--output={out_path}",
        f"--title={title}",
    ]
    console.print(f"[dim]Rendering[/dim] [cyan]{out_path.name}[/cyan]")
    try:
        subprocess.run(cmd, check=True, shell=False)
    except subprocess.CalledProcessError as e:
        console.print(f"[red]render-report.js failed:[/red] {e}")
        return
    except FileNotFoundError:
        console.print("[red]Node.js not found on PATH. Install Node to render previews.[/red]")
        return

    webbrowser.open(out_path.as_uri())
    console.print(f"[green]✓[/green] Opened [dim]{out_path.name}[/dim] in browser")


# ────────────────────────── helpers ──────────────────────────

MONTH_RE = re.compile(r"^\d{4}-\d{2}$")
URL_PROTO_RE = re.compile(r"^https?://", re.IGNORECASE)


def _normalize_url(raw: str) -> str:
    """Strip protocol + trailing slash. The admin UI links via
    `https://${client_url}`, so storing a value that already has `https://`
    would produce a double-prefixed broken link."""
    if not raw:
        return ""
    u = str(raw).strip()
    u = URL_PROTO_RE.sub("", u)
    u = u.rstrip("/")
    return u


def _url_match_key(raw: str) -> str:
    """Stronger normalization for matching cache files: also lowercases and
    strips a leading 'www.' so 'www.foo.com' and 'foo.com' compare equal."""
    u = _normalize_url(raw).lower()
    if u.startswith("www."):
        u = u[4:]
    return u


def _resolve_grader_cache(c: dict) -> Optional[Path]:
    """Find the grader-cache JSON for this report.

    The grader CLI writes `.grader-cache/<slug>.json` keyed off the company
    name typed during capture, but the report's slug can drift (multi-location
    splits, manual rename). When the slug-named file is missing we fall back
    to matching by URL so push-report still uploads grader_data — without it
    /admin/reports has no score to display."""
    by_slug = CACHE_DIR / f"{c['slug']}.json"
    if by_slug.exists():
        return by_slug

    if not CACHE_DIR.exists():
        return None
    target = _url_match_key(c.get("url") or "")
    if not target:
        return None

    matches: list[Path] = []
    for f in CACHE_DIR.glob("*.json"):
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
        except Exception:
            continue
        if _url_match_key(data.get("url") or "") == target:
            matches.append(f)
    if not matches:
        return None
    if len(matches) == 1:
        return matches[0]

    # Multi-location brands share a URL across cache files. Disambiguate using
    # the JSON's hero.graderScore.
    cj_path = c.get("client_json")
    if cj_path:
        try:
            cj = json.loads(Path(cj_path).read_text(encoding="utf-8"))
            hero_score = (cj.get("hero") or {}).get("graderScore")
            if hero_score is not None:
                for f in matches:
                    try:
                        d = json.loads(f.read_text(encoding="utf-8"))
                        if d.get("overallScore") == hero_score:
                            return f
                    except Exception:
                        continue
        except Exception:
            pass
    return matches[0]


def _default_month() -> str:
    now = _dt.datetime.now(tz=_dt.timezone.utc)
    return f"{now.year:04d}-{now.month:02d}"


def _read_meta(d: Path, slug: str) -> dict:
    f = d / f"{slug}-meta.json"
    if not f.exists():
        return {}
    try:
        return json.loads(f.read_text(encoding="utf-8"))
    except Exception:
        return {}


def _status_badge(status: Optional[str]) -> str:
    if not status:
        return "[dim]—[/dim]"
    color = STATUS_COLORS.get(status, "dim")
    return f"[{color}]{status}[/{color}]"


def fetch_supabase_index() -> dict[tuple[str, str], dict]:
    """Call list-reports.js and return a dict keyed by (slug, month) → row.

    The live Supabase listing is the source of truth for status/visibility,
    since local meta files can go stale (e.g. status changed via admin panel).
    Returns {} on any failure — callers degrade gracefully to local-only mode.
    """
    if not LIST_SCRIPT.exists():
        return {}
    try:
        result = subprocess.run(
            ["node", str(LIST_SCRIPT)],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
            timeout=30,
        )
    except FileNotFoundError:
        console.print("[yellow]⚠ Node.js not on PATH — Supabase status won't show.[/yellow]")
        return {}
    except subprocess.TimeoutExpired:
        console.print("[yellow]⚠ list-reports.js timed out — showing local-only status.[/yellow]")
        return {}
    if result.returncode != 0:
        msg = (result.stderr or "").strip().splitlines()[-1:] or ["(unknown error)"]
        console.print(f"[yellow]⚠ Could not load Supabase index: {msg[0]}[/yellow]")
        return {}
    try:
        rows = json.loads(result.stdout)
    except json.JSONDecodeError:
        return {}
    # Index by (client_slug, month) — client_slug is per-report (per-location for
    # multi-location brands), so it remains unique across companies.
    return {(r["client_slug"], r["report_month"]): r for r in rows}


def _prompt_month(default: Optional[str] = None) -> Optional[str]:
    """Ask for a YYYY-MM month, returning the normalized string or None on cancel."""
    default = default or _default_month()
    while True:
        ans = questionary.text(
            "Month (YYYY-MM)",
            default=default,
            style=MENU_STYLE,
            qmark="›",
        ).ask()
        if ans is None:
            return None
        ans = ans.strip()
        if MONTH_RE.match(ans):
            return ans
        console.print(f"[red]Invalid month '{ans}'. Use YYYY-MM (e.g. 2026-05).[/red]")


def _prompt_slug(default: str = "") -> Optional[str]:
    while True:
        ans = questionary.text(
            "Client slug (e.g. grumpys-burgers)",
            default=default,
            style=MENU_STYLE,
            qmark="›",
        ).ask()
        if ans is None:
            return None
        ans = ans.strip().lower()
        if re.match(r"^[a-z0-9][a-z0-9-]*$", ans):
            return ans
        console.print("[red]Slug must be lowercase alphanumerics + hyphens.[/red]")


def _prompt_status_visibility(
    default_status: str = "draft",
    default_visibility: str = "public",
) -> Optional[tuple[str, str]]:
    status = questionary.select(
        "Status",
        choices=[Choice(s, value=s) for s in STATUS_CHOICES],
        default=default_status,
        style=MENU_STYLE,
        qmark="›",
    ).ask()
    if status is None:
        return None
    visibility = questionary.select(
        "Visibility",
        choices=[Choice(v, value=v) for v in VISIBILITY_CHOICES],
        default=default_visibility,
        style=MENU_STYLE,
        qmark="›",
    ).ask()
    if visibility is None:
        return None
    return status, visibility


def _run_node(args: list[str]) -> int:
    try:
        return subprocess.run(args, cwd=REPO_ROOT).returncode
    except FileNotFoundError:
        console.print("[red]Node.js not found on PATH.[/red]")
        return 127


def fetch_from_supabase(slug: str, month: Optional[str]) -> int:
    """Run fetch-report.js for the given (slug, month). Pulls into reports-archive/<slug>/<YYYY-MM>/."""
    cmd = ["node", str(FETCH_SCRIPT), f"--slug={slug}"]
    if month:
        cmd.append(f"--month={month}")
    console.print(f"[dim]$ {' '.join(cmd)}[/dim]")
    rc = _run_node(cmd)
    if rc != 0:
        console.print("[red]✗ fetch-report.js failed[/red]")
    return rc


def capture_grader_report() -> int:
    """Hand off to grader_cli.py capture. Runs in this terminal; user drives Chrome."""
    cmd = [sys.executable, str(GRADER_CLI), "capture"]
    console.print(f"[dim]$ {' '.join(cmd)}[/dim]")
    try:
        return subprocess.run(cmd, cwd=REPO_ROOT).returncode
    except FileNotFoundError:
        console.print("[red]Could not run grader_cli.py.[/red]")
        return 127


def start_new_month(c: dict) -> Optional[Path]:
    """Create reports-archive/<slug>/<YYYY-MM>/ for a new month, optionally seeded
    from the client's latest existing month. Returns the new dir or None on cancel."""
    slug = c["slug"]
    client_root = ARCHIVE / slug
    existing_months = sorted(
        [d.name for d in client_root.iterdir()
         if d.is_dir() and MONTH_RE.match(d.name)],
        reverse=True,
    ) if client_root.exists() else []

    default = _default_month()
    if existing_months and existing_months[0] == default:
        # Bump to next month so we don't collide.
        y, m = map(int, default.split("-"))
        nm = m + 1
        ny = y + (nm - 1) // 12
        nm = ((nm - 1) % 12) + 1
        default = f"{ny:04d}-{nm:02d}"

    month = _prompt_month(default)
    if month is None:
        return None

    new_dir = client_root / month
    if new_dir.exists():
        console.print(f"[yellow]Folder already exists:[/yellow] {new_dir}")
        return new_dir

    seed = questionary.confirm(
        f"Seed {month}/ from latest existing month "
        f"({existing_months[0] if existing_months else 'none'})?",
        default=bool(existing_months),
        style=MENU_STYLE,
        qmark="›",
    ).ask()
    if seed is None:
        return None

    new_dir.mkdir(parents=True, exist_ok=True)

    if seed and existing_months:
        src = client_root / existing_months[0]
        copied = 0
        for f in src.iterdir():
            if not f.is_file():
                continue
            # Don't drag along the meta — it's tied to a specific Supabase row.
            if f.name == f"{slug}-meta.json":
                continue
            shutil.copy2(f, new_dir / f.name)
            copied += 1
        console.print(f"[green]✓[/green] Copied {copied} file(s) from "
                      f"[dim]{src.name}/[/dim] → [dim]{month}/[/dim]")
    else:
        console.print(f"[green]✓[/green] Created empty folder [dim]{new_dir}[/dim]")

    return new_dir


# ────────────────────────── client picker ──────────────────────────


def discover_clients(supabase_index: Optional[dict[tuple[str, str], dict]] = None) -> list[dict]:
    """Yield one entry per (slug, month) — union of local archive + Supabase rows.

    Each entry has an "origin" field:
        "local"     — files on disk only, never pushed
        "supabase"  — exists on Supabase but no local copy yet
        "both"      — files on disk AND a Supabase row exist for this (slug, month)

    Status/visibility come from the live Supabase index when available, falling
    back to the local meta file otherwise. Legacy flat-layout entries (no month
    subfolder) are included for backward compat.
    """
    supabase_index = supabase_index or {}
    entries: dict[tuple[str, str], dict] = {}

    if ARCHIVE.exists():
        for client_dir in sorted(ARCHIVE.iterdir()):
            if not client_dir.is_dir():
                continue
            slug = client_dir.name
            month_dirs = sorted(
                (d for d in client_dir.iterdir() if d.is_dir() and MONTH_RE.match(d.name)),
                key=lambda d: d.name,
                reverse=True,
            )
            report_dirs = month_dirs or [client_dir]
            for d in report_dirs:
                month = d.name if d in month_dirs else ""
                client_json = d / f"{slug}-client-report.json"
                internal_json = d / f"{slug}-internal-report.json"
                if not (client_json.exists() or internal_json.exists()):
                    continue
                name = slug.replace("-", " ").title()
                url = ""
                meta = _read_meta(d, slug)
                if meta:
                    name = meta.get("client_name") or name
                    url = meta.get("client_url") or ""
                # Source-of-truth for URL: the client-report JSON's `client.url`.
                # Normalize to bare host (no protocol/trailing slash) since the
                # admin UI links via `https://${client_url}`.
                if client_json.exists():
                    try:
                        cj = json.loads(client_json.read_text(encoding="utf-8"))
                        json_url = (cj.get("client") or {}).get("url") or ""
                        if json_url:
                            url = _normalize_url(json_url)
                    except Exception:
                        pass
                if not url:
                    cache_file = CACHE_DIR / f"{slug}.json"
                    if cache_file.exists():
                        try:
                            data = json.loads(cache_file.read_text(encoding="utf-8"))
                            url = _normalize_url(data.get("url", ""))
                        except Exception:
                            pass

                live = supabase_index.get((slug, month)) if month else None
                if live:
                    name = live.get("client_name") or name
                    url = live.get("client_url") or url
                    status = live.get("status")
                    visibility = live.get("visibility")
                    origin = "both"
                else:
                    status = meta.get("status")
                    visibility = meta.get("visibility")
                    origin = "local"

                # Pull canonical company / location names from the live row when
                # available, otherwise fall back to the local meta snapshot.
                company_name = (live or {}).get("company_name") or meta.get("company_name")
                company_slug = (live or {}).get("company_slug") or meta.get("company_slug")
                location_name = (live or {}).get("location_name") or meta.get("location_name")
                location_slug = (live or {}).get("location_slug") or meta.get("location_slug")

                # Final fallback: read directly from the JSON's meta block.
                if (not company_name or not location_name) and client_json.exists():
                    try:
                        cj = json.loads(client_json.read_text(encoding="utf-8"))
                        cj_meta = cj.get("meta") or {}
                        company_name = company_name or cj_meta.get("companyName")
                        company_slug = company_slug or cj_meta.get("companySlug")
                        location_name = location_name or cj_meta.get("locationName")
                        location_slug = location_slug or cj_meta.get("locationSlug")
                    except Exception:
                        pass

                entries[(slug, month)] = {
                    "slug": slug,
                    "month": month,
                    "dir": d,
                    "name": name,
                    "company_name": company_name,
                    "company_slug": company_slug,
                    "location_name": location_name,
                    "location_slug": location_slug,
                    "url": url,
                    "status": status,
                    "visibility": visibility,
                    "meta": meta,
                    "supabase_row": live,
                    "origin": origin,
                    "client_json": client_json if client_json.exists() else None,
                    "internal_json": internal_json if internal_json.exists() else None,
                }

    # Add Supabase-only entries (exist on Supabase but no local copy yet).
    for (slug, month), row in supabase_index.items():
        if (slug, month) in entries:
            continue
        name = row.get("client_name") or slug.replace("-", " ").title()
        entries[(slug, month)] = {
            "slug": slug,
            "month": month,
            "dir": ARCHIVE / slug / month if month else ARCHIVE / slug,
            "name": name,
            "company_name": row.get("company_name"),
            "company_slug": row.get("company_slug"),
            "location_name": row.get("location_name"),
            "location_slug": row.get("location_slug"),
            "url": row.get("client_url") or "",
            "status": row.get("status"),
            "visibility": row.get("visibility"),
            "meta": {},
            "supabase_row": row,
            "origin": "supabase",
            "client_json": None,
            "internal_json": None,
        }

    # Group by company so siblings (e.g. Taco Delphia's two locations) sort
    # together. Ties broken by location, then month.
    return sorted(
        entries.values(),
        key=lambda e: (
            (e.get("company_name") or e["slug"]).lower(),
            (e.get("location_name") or "").lower(),
            e.get("month") or "",
        ),
    )


def pick_client(clients: list[dict]) -> Optional[object]:
    """Return one of: a client dict, the sentinels '__fetch__' / '__capture__'
    (top-level actions), or None on Quit / Ctrl-C."""
    if clients:
        table = Table(show_header=True, header_style="bold cyan", box=None, padding=(0, 2))
        table.add_column("Company")
        table.add_column("Location")
        table.add_column("Slug", style="dim")
        table.add_column("Month", style="dim")
        table.add_column("Origin", justify="center")
        table.add_column("Status")
        table.add_column("Visibility")
        table.add_column("Client JSON", justify="center")
        table.add_column("Internal JSON", justify="center")

        last_company = None
        for c in clients:
            visibility = c.get("visibility")
            origin = c.get("origin", "local")
            origin_cell = {
                "both":     "[green]synced[/green]",
                "local":    "[yellow]local only[/yellow]",
                "supabase": "[cyan]supabase only[/cyan]",
            }.get(origin, origin)
            if visibility:
                visibility_cell = f"[yellow]{visibility}[/yellow]"
            elif origin == "local":
                visibility_cell = "[yellow italic](not pushed)[/yellow italic]"
            else:
                visibility_cell = "[dim]—[/dim]"
            if c.get("status"):
                status_cell = _status_badge(c.get("status"))
            elif origin == "local":
                status_cell = "[yellow italic](not pushed)[/yellow italic]"
            else:
                status_cell = "[dim]—[/dim]"

            company_name = c.get("company_name") or c["name"]
            location_name = c.get("location_name") or "[dim]—[/dim]"
            # Repeat company on first row of each group; dim subsequent rows so
            # multi-location brands read as a single block.
            company_cell = (
                f"[bold]{company_name}[/bold]" if company_name != last_company
                else f"[dim]{company_name}[/dim]"
            )
            last_company = company_name

            table.add_row(
                company_cell,
                location_name,
                c["slug"],
                c.get("month") or "[dim]—[/dim]",
                origin_cell,
                status_cell,
                visibility_cell,
                "[green]✓[/green]" if c.get("client_json") else "[dim]—[/dim]",
                "[green]✓[/green]" if c.get("internal_json") else "[dim]—[/dim]",
            )
        console.print(Panel(table, title="[bold]Reports Archive[/bold]",
                            border_style="cyan", padding=(1, 1)))
    else:
        console.print(Panel(
            "[yellow]No local reports yet.[/yellow]\n"
            "[dim]Use 'Fetch from Supabase' or 'Capture grader report' below.[/dim]",
            border_style="yellow", padding=(1, 2),
        ))

    choices: list[Choice] = []
    for c in clients:
        month_part = f"  ·  [{c['month']}]" if c.get("month") else ""
        status = c.get("status")
        status_part = f"  ·  [{status}]" if status else ""
        origin = c.get("origin")
        origin_tag = {
            "supabase": "  ·  (supabase only)",
            "local":    "  ·  (local only)",
        }.get(origin, "")
        # Surface company → location for multi-location brands so picking the
        # right report is unambiguous in the dropdown.
        company_name = c.get("company_name") or c["name"]
        location_name = c.get("location_name")
        label = (
            f"{company_name} → {location_name}"
            if location_name and location_name != "Main"
            else company_name
        )
        choices.append(Choice(
            title=f"{label}  ·  {c['slug']}{month_part}{status_part}{origin_tag}",
            value=c,
        ))

    if choices:
        choices.append(questionary.Separator(" "))
        choices.append(Choice(
            title="Bulk actions on multiple reports…",
            value="__bulk__", shortcut_key="m",
        ))
        choices.append(questionary.Separator(" "))
    choices.append(Choice(
        title="Generate a Client + Internal Report using Claude…",
        value="__generate__", shortcut_key="g",
    ))
    choices.append(Choice(
        title="Capture a new grader report (Owner.com)…",
        value="__capture__", shortcut_key="c",
    ))
    choices.append(Choice(
        title="Fetch a report from Supabase…",
        value="__fetch__", shortcut_key="f",
    ))
    choices.append(Choice(title="Quit", value="__quit__", shortcut_key="q"))

    pick = questionary.select(
        "Pick a report  (or a top-level action)",
        choices=choices,
        use_shortcuts=True,
        use_arrow_keys=True,
        use_jk_keys=False,
        style=MENU_STYLE,
        qmark="›",
        instruction="(↑/↓ or number key)",
    ).ask()
    if pick is None or pick == "__quit__":
        return None
    if pick in ("__fetch__", "__capture__", "__generate__", "__bulk__"):
        return pick
    if isinstance(pick, dict):
        return pick
    return None


# ────────────────────────── action menu ──────────────────────────

def push_to_supabase(c: dict, status: str, visibility: str) -> int:
    # Try the JSON's `client.url` first (source of truth), then the discovered
    # `c["url"]`, and only prompt as a last resort. Always normalize.
    url = ""
    cj_path = c.get("client_json")
    if cj_path:
        try:
            cj = json.loads(Path(cj_path).read_text(encoding="utf-8"))
            url = _normalize_url((cj.get("client") or {}).get("url") or "")
        except Exception:
            pass
    if not url:
        url = _normalize_url(c.get("url") or "")
    if not url:
        prompted = questionary.text(
            "Website URL (e.g. example.com)", style=MENU_STYLE, qmark="›"
        ).ask() or ""
        url = _normalize_url(prompted)

    company_name = c.get("company_name") or c["name"]
    location_name = c.get("location_name")
    location_slug = c.get("location_slug")

    summary = Table.grid(padding=(0, 2))
    summary.add_row("[dim]Company[/dim]",                company_name)
    summary.add_row("[dim]Location[/dim]",               location_name or "[dim](inferred)[/dim]")
    summary.add_row("[dim]Display name[/dim]",           c["name"])
    summary.add_row("[dim]Slug[/dim]",                   c["slug"])
    summary.add_row("[dim]Month[/dim]",                  c.get("month") or "[dim](current)[/dim]")
    summary.add_row("[dim]URL[/dim]",                    url or "[dim](none)[/dim]")
    summary.add_row("[dim]Client report (json)[/dim]",   str(c.get("client_json"))   if c.get("client_json")   else "[dim](skip)[/dim]")
    summary.add_row("[dim]Internal report (json)[/dim]", str(c.get("internal_json")) if c.get("internal_json") else "[dim](skip)[/dim]")
    summary.add_row("[dim]Status[/dim]",                 _status_badge(status))
    summary.add_row("[dim]Visibility[/dim]",             f"[yellow]{visibility}[/yellow]")
    console.print(Panel(summary, title="[bold]Pushing to Supabase[/bold]",
                        border_style="cyan", padding=(1, 2)))

    cmd = [
        "node", str(PUSH_SCRIPT),
        # Pass the brand-level company name (not the per-location display name) so
        # push-report.js doesn't need to strip "<Brand> — <Location>" itself.
        f"--client={company_name}",
        f"--slug={c['slug']}",
        f"--url={url}",
        f"--status={status}",
        f"--visibility={visibility}",
    ]
    if location_name:
        cmd.append(f"--location-name={location_name}")
    if location_slug:
        cmd.append(f"--location-slug={location_slug}")
    if c.get("month"):
        cmd.append(f"--month={c['month']}")
    if c.get("client_json"):
        cmd.append(f"--client-report-json={c['client_json']}")
    if c.get("internal_json"):
        cmd.append(f"--internal-report-json={c['internal_json']}")
    grader_json = _resolve_grader_cache(c)
    if grader_json is not None:
        cmd.append(f"--grader={grader_json}")
        if grader_json.name != f"{c['slug']}.json":
            console.print(f"[dim]Using grader cache[/dim] [cyan]{grader_json.name}[/cyan] "
                          f"[dim](matched by URL)[/dim]")
    else:
        console.print(
            "[yellow]⚠ No grader cache found for this report — "
            "[bold]grader_data will be empty[/bold] and the score "
            "won't show in /admin/reports.[/yellow]"
        )
        expected = CACHE_DIR / f"{c['slug']}.json"
        url_hint = c.get("url") or "(none)"
        console.print(f"[dim]  Looked for [cyan]{expected}[/cyan] "
                      f"and any *.json under .grader-cache/ matching url="
                      f"[cyan]{url_hint}[/cyan].[/dim]")
        proceed = questionary.confirm(
            "Push anyway (without grader_data)?",
            default=False, style=MENU_STYLE, qmark="›",
        ).ask()
        if not proceed:
            console.print("[dim]Aborted. Run grader_cli.py capture (or rename a cache file to "
                          f"{c['slug']}.json) then retry.[/dim]")
            return 1

    rc = subprocess.run(cmd, cwd=REPO_ROOT).returncode
    if rc != 0:
        console.print("[red]✗ push-report failed[/red]")
        return rc

    month_path = f"/{c['month']}" if c.get("month") else ""
    local_url = f"http://localhost:3000/report/{c['slug']}{month_path}"
    prod_url = f"https://tableturnerr.com/report/{c['slug']}{month_path}"
    links = Table.grid(padding=(0, 2))
    links.add_row("[dim]Local[/dim]", f"[cyan]{local_url}[/cyan]")
    links.add_row("[dim]Prod[/dim]",  f"[cyan]{prod_url}[/cyan]"
                  + ("" if status == "published" else " [dim](after publishing)[/dim]"))
    links.add_row("[dim]Admin[/dim]", "[cyan]http://localhost:3000/admin/reports[/cyan]")
    console.print(Panel(links, title="[bold green]✓ Pushed[/bold green]",
                        border_style="green", padding=(1, 2)))
    return 0


def action_menu(c: dict) -> bool:
    """Return True to keep the manager open, False to exit."""
    while True:
        clear_screen()
        show_header()

        meta = c.get("meta") or {}
        company_name = c.get("company_name") or c["name"]
        location_name = c.get("location_name")
        header = f"[bold]{company_name}[/bold]"
        if location_name and location_name != company_name:
            header += f"  →  [bold cyan]{location_name}[/bold cyan]"
        info_lines = [header]
        meta_bits = []
        if c.get("month"):
            meta_bits.append(c["month"])
        if c.get("status"):
            meta_bits.append(f"status={c['status']}")
        if c.get("visibility"):
            meta_bits.append(f"visibility={c['visibility']}")
        if meta_bits:
            info_lines.append(f"[dim]{'  ·  '.join(meta_bits)}[/dim]")
        info_lines.append(f"[dim]{c['slug']}[/dim]")
        if c.get("url"):
            info_lines.append(f"[dim]{c['url']}[/dim]")
        ids = []
        if meta.get("report_id"):   ids.append(f"report:{meta['report_id'][:8]}…")
        if meta.get("company_id"):  ids.append(f"company:{meta['company_id'][:8]}…")
        if meta.get("location_id"): ids.append(f"location:{meta['location_id'][:8]}…")
        if ids:
            info_lines.append(f"[dim]{'  ·  '.join(ids)}[/dim]")
        if meta.get("fetched_at"):
            info_lines.append(f"[dim]fetched_at: {meta['fetched_at']}[/dim]")
        console.print(Panel(
            "\n".join(info_lines), border_style="green", padding=(1, 2),
        ))

        has_client_json = bool(c.get("client_json"))
        has_internal_json = bool(c.get("internal_json"))
        has_month = bool(c.get("month"))
        is_published = (c.get("status") == "published")

        choices = [
            Choice(title="Preview client report (static HTML · no dev server needed)",
                   value="view-client-json",
                   disabled=None if has_client_json else "no client JSON yet"),
            Choice(title="Preview internal report (static HTML · no dev server needed)",
                   value="view-internal-json",
                   disabled=None if has_internal_json else "no internal JSON yet"),
            questionary.Separator(" "),
            Choice(title="Push to Supabase…  (prompts for status + visibility)",
                   value="push"),
            Choice(title="Refetch from Supabase  (overwrite local files)",
                   value="refetch",
                   disabled=None if has_month else "no month — fetch first"),
            Choice(title="Open published URL in browser",
                   value="open-prod",
                   disabled=None if is_published else "row is not published"),
            questionary.Separator(" "),
            Choice(title="Start a new month for this client…", value="new-month"),
            Choice(title="Open archive folder in Explorer", value="explorer"),
            Choice(title="Back to client list", value="back", shortcut_key="b"),
            Choice(title="Quit", value="quit", shortcut_key="q"),
        ]

        pick = questionary.select(
            "Choose an action",
            choices=choices,
            use_shortcuts=True,
            use_arrow_keys=True,
            use_jk_keys=False,
            style=MENU_STYLE,
            qmark="›",
            instruction="(↑/↓ or number key)",
        ).ask()

        if pick is None or pick == "quit":
            return False
        if pick == "back":
            return True
        if pick == "view-client-json":
            open_live_renderer(c, variant="client")
            pause()
        elif pick == "view-internal-json":
            open_live_renderer(c, variant="internal")
            pause()
        elif pick == "push":
            sv = _prompt_status_visibility(
                default_status=c.get("status") or "draft",
                default_visibility=c.get("visibility") or "public",
            )
            if sv is not None:
                status, visibility = sv
                push_to_supabase(c, status=status, visibility=visibility)
            pause()
        elif pick == "refetch":
            confirm = questionary.confirm(
                f"Overwrite local files in {c['dir']} with the live row?",
                default=False, style=MENU_STYLE, qmark="›",
            ).ask()
            if confirm:
                fetch_from_supabase(c["slug"], c.get("month"))
                # The dict in our hand is now stale — caller will refresh on next loop.
                return True
            pause()
        elif pick == "open-prod":
            month_path = f"/{c['month']}" if c.get("month") else ""
            webbrowser.open(f"https://tableturnerr.com/report/{c['slug']}{month_path}")
            console.print(f"[green]✓[/green] Opened "
                          f"[cyan]https://tableturnerr.com/report/{c['slug']}{month_path}[/cyan]")
            pause()
        elif pick == "new-month":
            new_dir = start_new_month(c)
            if new_dir is not None:
                console.print(f"[dim]Re-open the manager (or 'Back to client list') to "
                              f"see the new month entry.[/dim]")
            pause()
            return True  # Bounce back so the picker re-discovers entries.
        elif pick == "explorer":
            archive_dir = c.get("dir") or (ARCHIVE / c["slug"])
            os.startfile(str(archive_dir))  # type: ignore[attr-defined]


# ────────────────────────── bulk mode ──────────────────────────

def _bulk_pick(clients: list[dict], prompt: str) -> list[dict]:
    """Show a checkbox multi-select. Returns the selected entries (may be empty)."""
    if not clients:
        console.print("[yellow]No reports to pick from.[/yellow]")
        pause()
        return []
    choices = []
    for c in clients:
        origin = c.get("origin", "local")
        origin_tag = {
            "supabase": " (supabase only)",
            "local":    " (local only)",
            "both":     "",
        }.get(origin, "")
        status = c.get("status") or "—"
        month = c.get("month") or "—"
        title = f"{c['name']:<32} · {month} · {status}{origin_tag}"
        choices.append(Choice(title=title, value=c))
    selections = questionary.checkbox(
        prompt,
        choices=choices,
        style=MENU_STYLE,
        qmark="›",
        instruction="(space to toggle, ‘a’ all, ‘i’ invert, enter to confirm)",
    ).ask()
    return selections or []


def bulk_mode(clients: list[dict]) -> bool:
    """Multi-select reports and apply a bulk action. Returns True to keep manager open."""
    clear_screen()
    show_header()
    console.print(Panel(
        "[bold]Bulk actions[/bold]\n"
        "[dim]Pick an action, then choose which reports it should apply to.[/dim]",
        border_style="cyan", padding=(1, 2),
    ))

    pickable_for_push      = [c for c in clients if c.get("client_json") or c.get("internal_json")]
    pickable_for_refetch   = [c for c in clients if c.get("month") and c.get("origin") in ("both", "supabase")]
    pickable_for_status    = [c for c in clients if c.get("origin") in ("both", "supabase")]

    action = questionary.select(
        "Choose a bulk action",
        choices=[
            Choice(title=f"Push to Supabase  (re-upload content · {len(pickable_for_push)} eligible)",
                   value="push",
                   disabled=None if pickable_for_push else "no reports with local JSON"),
            Choice(title=f"Update status/visibility only  ({len(pickable_for_status)} eligible)",
                   value="status",
                   disabled=None if pickable_for_status else "no Supabase rows to update"),
            Choice(title=f"Refetch from Supabase  (overwrite local · {len(pickable_for_refetch)} eligible)",
                   value="refetch",
                   disabled=None if pickable_for_refetch else "no Supabase rows to fetch"),
            questionary.Separator(" "),
            Choice(title="Back", value="back", shortcut_key="b"),
        ],
        style=MENU_STYLE,
        qmark="›",
        instruction="(↑/↓ or number key)",
    ).ask()

    if action is None or action == "back":
        return True

    if action == "push":
        picks = _bulk_pick(pickable_for_push, "Select reports to push to Supabase")
        if not picks:
            return True
        sv = _prompt_status_visibility()
        if sv is None:
            return True
        status, visibility = sv
        confirm = questionary.confirm(
            f"Push {len(picks)} report(s) with status={status}, visibility={visibility}?",
            default=True, style=MENU_STYLE, qmark="›",
        ).ask()
        if not confirm:
            return True
        ok, fail = 0, 0
        for c in picks:
            console.print(f"\n[bold cyan]→ {c['name']}[/bold cyan]  [dim]{c['slug']} · {c.get('month') or '(current)'}[/dim]")
            rc = push_to_supabase(c, status=status, visibility=visibility)
            if rc == 0:
                ok += 1
            else:
                fail += 1
        console.print(f"\n[bold]Bulk push done.[/bold] [green]{ok} ok[/green] · [red]{fail} failed[/red]")
        pause()
        return True

    if action == "status":
        picks = _bulk_pick(pickable_for_status, "Select reports to update status/visibility on")
        if not picks:
            return True
        sv = _prompt_status_visibility()
        if sv is None:
            return True
        status, visibility = sv
        confirm = questionary.confirm(
            f"Update {len(picks)} row(s) → status={status}, visibility={visibility}?  "
            f"(content not re-uploaded)",
            default=True, style=MENU_STYLE, qmark="›",
        ).ask()
        if not confirm:
            return True
        ok, fail = 0, 0
        for c in picks:
            url = _normalize_url(c.get("url") or "")
            month = c.get("month") or ""
            company_name = c.get("company_name") or c["name"]
            location_name = c.get("location_name")
            location_slug = c.get("location_slug")
            console.print(f"\n[bold cyan]→ {c['name']}[/bold cyan]  [dim]{c['slug']} · {month or '(current)'}[/dim]")
            cmd = [
                "node", str(PUSH_SCRIPT),
                f"--client={company_name}",
                f"--slug={c['slug']}",
                f"--url={url}",
                f"--status={status}",
                f"--visibility={visibility}",
            ]
            if location_name: cmd.append(f"--location-name={location_name}")
            if location_slug: cmd.append(f"--location-slug={location_slug}")
            if month:
                cmd.append(f"--month={month}")
            rc = subprocess.run(cmd, cwd=REPO_ROOT).returncode
            if rc == 0:
                ok += 1
            else:
                fail += 1
        console.print(f"\n[bold]Bulk status update done.[/bold] [green]{ok} ok[/green] · [red]{fail} failed[/red]")
        pause()
        return True

    if action == "refetch":
        picks = _bulk_pick(pickable_for_refetch, "Select reports to refetch from Supabase")
        if not picks:
            return True
        confirm = questionary.confirm(
            f"Overwrite local files for {len(picks)} report(s) with live Supabase rows?",
            default=False, style=MENU_STYLE, qmark="›",
        ).ask()
        if not confirm:
            return True
        ok, fail = 0, 0
        for c in picks:
            console.print(f"\n[bold cyan]→ {c['name']}[/bold cyan]  [dim]{c['slug']} · {c.get('month')}[/dim]")
            rc = fetch_from_supabase(c["slug"], c.get("month"))
            if rc == 0:
                ok += 1
            else:
                fail += 1
        console.print(f"\n[bold]Bulk refetch done.[/bold] [green]{ok} ok[/green] · [red]{fail} failed[/red]")
        pause()
        return True

    return True


# ────────────────────────── main ──────────────────────────

def top_level_fetch(supabase_index: dict[tuple[str, str], dict]) -> None:
    """Pick a (slug, month) from Supabase and fetch it into reports-archive/."""
    if not supabase_index:
        console.print("[yellow]No Supabase rows available "
                      "(check that list-reports.js works and .env.local is set).[/yellow]")
        # Fall back to manual entry.
        slug = _prompt_slug()
        if not slug:
            return
        use_default = questionary.confirm(
            "Pull the latest month for this client?",
            default=True, style=MENU_STYLE, qmark="›",
        ).ask()
        month = None if use_default else _prompt_month()
        if not use_default and month is None:
            return
        fetch_from_supabase(slug, month)
        pause()
        return

    rows = sorted(
        supabase_index.values(),
        key=lambda r: (r["client_slug"], r["report_month"]),
    )

    table = Table(show_header=True, header_style="bold cyan", box=None, padding=(0, 2))
    table.add_column("Client")
    table.add_column("Slug", style="dim")
    table.add_column("Month", style="dim")
    table.add_column("Status")
    table.add_column("Visibility")
    table.add_column("Updated", style="dim")
    for r in rows:
        updated = (r.get("updated_at") or "")[:10]
        table.add_row(
            r.get("client_name") or r["client_slug"],
            r["client_slug"],
            r["report_month"],
            _status_badge(r.get("status")),
            f"[yellow]{r.get('visibility') or '—'}[/yellow]",
            updated,
        )
    console.print(Panel(table, title="[bold]Supabase Reports[/bold]",
                        border_style="cyan", padding=(1, 1)))

    choices = [
        Choice(
            title=f"{r.get('client_name') or r['client_slug']}  ·  {r['client_slug']}  ·  [{r['report_month']}]  ·  [{r.get('status') or '—'}]",
            value=r,
        )
        for r in rows
    ]
    choices.append(questionary.Separator(" "))
    choices.append(Choice(title="Cancel", value=None, shortcut_key="b"))

    pick = questionary.select(
        "Pick a report to fetch",
        choices=choices,
        use_shortcuts=False,
        use_arrow_keys=True,
        style=MENU_STYLE,
        qmark="›",
    ).ask()
    if not pick:
        return
    fetch_from_supabase(pick["client_slug"], pick["report_month"])
    pause()


def top_level_capture() -> None:
    capture_grader_report()
    console.print()
    console.print("[dim]The grader JSON is now in .grader-cache/. Use 'Capture' or "
                  "'Fetch' workflows to populate reports-archive/.[/dim]")
    pause()


def top_level_generate() -> None:
    """Spawn Claude Code in a new window and have it run /generate-client-report
    for the requested restaurant. The skill drives the capture + report writing;
    the manager stays open so the user can push / preview when Claude finishes."""
    console.print(
        "[dim]Enter the restaurant name, the website URL, or both. "
        "At least one is required — Claude will ask for whatever's missing.[/dim]"
    )

    name_ans = questionary.text(
        "Restaurant / client name (e.g. Grumpy's Burgers) — leave blank if unknown",
        style=MENU_STYLE, qmark="›",
    ).ask()
    if name_ans is None:  # Ctrl-C
        return
    name = name_ans.strip()

    url_ans = questionary.text(
        "Website URL (e.g. grumpys-burgers.com) — leave blank if unknown",
        style=MENU_STYLE, qmark="›",
    ).ask()
    if url_ans is None:
        return
    url = url_ans.strip()

    if not name and not url:
        console.print("[red]Need at least a name or a URL — nothing entered, cancelling.[/red]")
        pause()
        return

    if name and url:
        prompt = f"/generate-client-report Generate a report for {name} — website: {url}"
        label = name
    elif name:
        prompt = f"/generate-client-report Generate a report for {name}"
        label = name
    else:
        prompt = f"/generate-client-report Generate a report for the restaurant at {url}"
        label = url

    summary = Table.grid(padding=(0, 2))
    summary.add_row("[dim]Client[/dim]",  name or "[dim](will be requested by the skill)[/dim]")
    summary.add_row("[dim]URL[/dim]",     url or "[dim](will be requested by the skill)[/dim]")
    summary.add_row("[dim]cwd[/dim]",     str(REPO_ROOT))
    summary.add_row("[dim]prompt[/dim]",  f"[cyan]{prompt}[/cyan]")
    console.print(Panel(summary, title="[bold]Launching Claude Code[/bold]",
                        border_style="cyan", padding=(1, 2)))

    if shutil.which("claude") is None:
        console.print("[red]✗ `claude` not found on PATH.[/red]")
        console.print("[dim]Install Claude Code, then run this prompt yourself in a terminal "
                      f"in {REPO_ROOT}:[/dim]")
        console.print(f"  [cyan]claude \"{prompt}\"[/cyan]")
        pause()
        return

    try:
        if os.name == "nt":
            # Spawn a detached cmd window so this manager keeps running.
            # `start` needs a title arg; embedded quotes in the prompt are escaped.
            safe_prompt = prompt.replace('"', '\\"')
            cmd_str = f'start "Claude Code — {label}" cmd /k claude "{safe_prompt}"'
            subprocess.Popen(cmd_str, cwd=str(REPO_ROOT), shell=True)
        else:
            subprocess.Popen(["claude", prompt], cwd=str(REPO_ROOT))
        console.print(f"[green]✓[/green] Launched Claude Code in a new window for "
                      f"[bold]{label}[/bold].")
        console.print(
            "[dim]Switch to that window — Claude drives the grader capture and writes both "
            "JSON reports into reports-archive/<slug>/<YYYY-MM>/. Come back here when it's "
            "done to preview or push.[/dim]"
        )
    except Exception as e:
        console.print(f"[red]✗ Failed to launch Claude Code:[/red] {e}")
        console.print(f"[dim]Run manually in {REPO_ROOT}:[/dim]")
        console.print(f"  [cyan]claude \"{prompt}\"[/cyan]")

    pause()


def main() -> int:
    while True:
        clear_screen()
        show_header()
        supabase_index = fetch_supabase_index()
        clients = discover_clients(supabase_index)
        pick = pick_client(clients)
        if pick is None:
            return 0
        if pick == "__fetch__":
            top_level_fetch(supabase_index)
            continue
        if pick == "__capture__":
            top_level_capture()
            continue
        if pick == "__generate__":
            top_level_generate()
            continue
        if pick == "__bulk__":
            bulk_mode(clients)
            continue
        # pick is a client dict
        if not action_menu(pick):
            return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        console.print("\n[dim]Cancelled.[/dim]")
        sys.exit(0)
