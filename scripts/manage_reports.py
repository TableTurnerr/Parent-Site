"""
Tableturnerr — Reports Archive Manager

Interactive menu for browsing every client report in `reports-archive/`. Lets the
user pick a client, then choose an action: render either report as a temporary
HTML preview, or push both to Supabase via grader_cli.py share. Temp HTML files
are deleted when the script exits.

Usage:
    python scripts/manage_reports.py

Designed to be launched from `scripts/manage-reports.bat`, which sets the
required Windows UTF-8 env vars and keeps the cmd window open afterward.
"""

from __future__ import annotations

import atexit
import json
import os
import re
import subprocess
import sys
import tempfile
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
PUSH_SCRIPT = REPO_ROOT / "scripts" / "push-report.js"

console = Console()
_temp_files: list[Path] = []


def _cleanup_temp() -> None:
    for p in _temp_files:
        try:
            p.unlink(missing_ok=True)
        except Exception:
            pass


atexit.register(_cleanup_temp)


# ────────────────────────── markdown → html ──────────────────────────

CSS = """
:root { color-scheme: light; }
body { max-width: 880px; margin: 2rem auto; padding: 0 1.25rem 4rem;
       font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
       color: #1f2328; line-height: 1.55; background: #fff; }
h1, h2, h3, h4 { line-height: 1.25; margin-top: 1.8rem; }
h1 { font-size: 2rem; border-bottom: 1px solid #d0d7de; padding-bottom: .3rem; }
h2 { font-size: 1.5rem; border-bottom: 1px solid #d0d7de; padding-bottom: .3rem; }
h3 { font-size: 1.2rem; }
h4 { font-size: 1.05rem; color: #57606a; }
p { margin: .8rem 0; }
a { color: #0969da; }
strong { font-weight: 600; }
em { font-style: italic; }
hr { border: none; border-top: 1px solid #d0d7de; margin: 2rem 0; }
ul, ol { padding-left: 1.5rem; }
li { margin: .25rem 0; }
code { background: #eaeef2; padding: .15em .35em; border-radius: 4px;
       font-family: "SF Mono", Consolas, Menlo, monospace; font-size: .9em; }
pre { background: #f6f8fa; padding: 1rem; border-radius: 6px; overflow-x: auto; }
pre code { background: transparent; padding: 0; }
blockquote { margin: 1rem 0; padding: .25rem 1rem; color: #57606a;
             border-left: .25em solid #d0d7de; }
table { border-collapse: collapse; margin: 1rem 0; display: block;
        overflow-x: auto; max-width: 100%; }
th, td { border: 1px solid #d0d7de; padding: .45rem .85rem; }
th { background: #f6f8fa; font-weight: 600; text-align: left; }
tr:nth-child(2n) { background: #f6f8fa; }
.frontmatter, .branding-banner, .watermark-layer { display: none; }
.tt-banner { background: #0d0d0d; color: #fff; padding: .5rem 1rem;
             border-radius: 6px; margin-bottom: 1.5rem; font-size: .85rem;
             display: flex; justify-content: space-between; }
.tt-banner a { color: #fff; }
"""


def _esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _inline(s: str) -> str:
    # protect inline code first
    placeholders: dict[str, str] = {}

    def code_repl(m: re.Match) -> str:
        key = f"\x00C{len(placeholders)}\x00"
        placeholders[key] = f"<code>{_esc(m.group(1))}</code>"
        return key

    s = re.sub(r"`([^`\n]+)`", code_repl, s)
    s = _esc(s)
    s = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)",
               r'<a href="\2" target="_blank" rel="noopener">\1</a>', s)
    s = re.sub(r"\*\*([^*\n]+)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<!\*)\*([^*\n]+)\*(?!\*)", r"<em>\1</em>", s)
    s = re.sub(r"(?<![\w])_([^_\n]+)_(?![\w])", r"<em>\1</em>", s)
    for key, val in placeholders.items():
        s = s.replace(key, val)
    return s


def md_to_html(md: str, title: str) -> str:
    # strip YAML frontmatter
    if md.startswith("---\n"):
        end = md.find("\n---", 4)
        if end != -1:
            md = md[end + 4:].lstrip("\n")

    lines = md.split("\n")
    out: list[str] = []
    i = 0

    in_html_block = False
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # raw HTML blocks (e.g. <div class="watermark-layer">) — pass through
        if stripped.startswith("<") and not stripped.startswith("<!--"):
            if re.match(r"<(div|section|article|header|footer|nav|aside|figure|table)\b", stripped):
                # skip the original branding/watermark divs (we have our own banner)
                if re.search(r'class="(watermark-layer|branding-banner)"', stripped):
                    # skip until closing tag for that element
                    depth = 1 if stripped.endswith("/>") or "</" in stripped else 1
                    if "</" in stripped or stripped.endswith("/>"):
                        i += 1
                        continue
                    i += 1
                    while i < len(lines) and "</" not in lines[i]:
                        i += 1
                    i += 1
                    continue
            out.append(line)
            i += 1
            continue

        # fenced code
        if stripped.startswith("```"):
            i += 1
            buf = []
            while i < len(lines) and not lines[i].lstrip().startswith("```"):
                buf.append(lines[i])
                i += 1
            i += 1
            out.append(f"<pre><code>{_esc(chr(10).join(buf))}</code></pre>")
            continue

        # hr
        if re.match(r"^---+\s*$", stripped):
            out.append("<hr>")
            i += 1
            continue

        # heading
        m = re.match(r"^(#{1,6})\s+(.*)$", stripped)
        if m:
            level = len(m.group(1))
            text = _inline(m.group(2))
            out.append(f"<h{level}>{text}</h{level}>")
            i += 1
            continue

        # table
        if "|" in stripped and i + 1 < len(lines) and re.match(r"^\s*\|?\s*[:\-| ]+\|", lines[i + 1]):
            header = [c.strip() for c in stripped.strip("|").split("|")]
            i += 2  # skip separator
            rows = []
            while i < len(lines) and "|" in lines[i] and lines[i].strip():
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                rows.append(cells)
                i += 1
            html_t = ['<table><thead><tr>']
            html_t.extend(f"<th>{_inline(h)}</th>" for h in header)
            html_t.append("</tr></thead><tbody>")
            for r in rows:
                html_t.append("<tr>")
                html_t.extend(f"<td>{_inline(c)}</td>" for c in r)
                html_t.append("</tr>")
            html_t.append("</tbody></table>")
            out.append("".join(html_t))
            continue

        # blockquote
        if stripped.startswith("> "):
            buf = []
            while i < len(lines) and lines[i].strip().startswith("> "):
                buf.append(lines[i].strip()[2:])
                i += 1
            out.append(f"<blockquote>{_inline(' '.join(buf))}</blockquote>")
            continue

        # ordered list
        if re.match(r"^\d+\.\s+", stripped):
            buf = []
            while i < len(lines) and re.match(r"^\s*\d+\.\s+", lines[i]):
                item = re.sub(r"^\s*\d+\.\s+", "", lines[i])
                buf.append(f"<li>{_inline(item)}</li>")
                i += 1
            out.append("<ol>" + "".join(buf) + "</ol>")
            continue

        # unordered list
        if re.match(r"^[-*+]\s+", stripped):
            buf = []
            while i < len(lines) and re.match(r"^\s*[-*+]\s+", lines[i]):
                item = re.sub(r"^\s*[-*+]\s+", "", lines[i])
                buf.append(f"<li>{_inline(item)}</li>")
                i += 1
            out.append("<ul>" + "".join(buf) + "</ul>")
            continue

        # blank line
        if not stripped:
            i += 1
            continue

        # paragraph (collect consecutive non-blank lines)
        buf = [line]
        i += 1
        while i < len(lines) and lines[i].strip() and not re.match(
            r"^(#{1,6}\s|---+\s*$|```|\d+\.\s|[-*+]\s|\|.+\||>\s)", lines[i].strip()
        ):
            buf.append(lines[i])
            i += 1
        out.append(f"<p>{_inline(' '.join(buf))}</p>")

    body = "\n".join(out)
    return f"""<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{_esc(title)}</title>
<style>{CSS}</style>
</head><body>
<div class="tt-banner">
  <span><strong>Tableturnerr</strong> — Report Preview</span>
  <a href="https://tableturnerr.com" target="_blank" rel="noopener">tableturnerr.com</a>
</div>
{body}
</body></html>
"""


def open_as_html(md_path: Path, title: str) -> None:
    html = md_to_html(md_path.read_text(encoding="utf-8"), title)
    fd, tmp = tempfile.mkstemp(prefix=f"tt-report-{md_path.stem}-", suffix=".html")
    os.close(fd)
    tmp_path = Path(tmp)
    tmp_path.write_text(html, encoding="utf-8")
    _temp_files.append(tmp_path)
    webbrowser.open(tmp_path.as_uri())
    console.print(f"[green]✓[/green] Opened [dim]{md_path.name}[/dim] in browser "
                  f"[dim](temp file deletes when this menu exits)[/dim]")


# ────────────────────────── client picker ──────────────────────────

def discover_clients() -> list[dict]:
    if not ARCHIVE.exists():
        return []
    clients = []
    for d in sorted(ARCHIVE.iterdir()):
        if not d.is_dir():
            continue
        slug = d.name
        client_md = d / f"{slug}-client-report.md"
        client_json = d / f"{slug}-client-report.json"
        internal_md = d / f"{slug}-internal-report.md"
        if not (client_md.exists() or internal_md.exists() or client_json.exists()):
            continue
        # try to recover client name + url from grader cache
        name = slug.replace("-", " ").title()
        url = ""
        cache_file = CACHE_DIR / f"{slug}.json"
        if cache_file.exists():
            try:
                data = json.loads(cache_file.read_text(encoding="utf-8"))
                url = data.get("url", "")
            except Exception:
                pass
        clients.append({
            "slug": slug,
            "name": name,
            "url": url,
            "client": client_md if client_md.exists() else None,
            "client_json": client_json if client_json.exists() else None,
            "internal": internal_md if internal_md.exists() else None,
        })
    return clients


def pick_client(clients: list[dict]) -> Optional[dict]:
    if not clients:
        console.print("[yellow]No reports found in reports-archive/[/yellow]")
        pause()
        return None

    table = Table(show_header=True, header_style="bold cyan", box=None, padding=(0, 2))
    table.add_column("Client")
    table.add_column("Slug", style="dim")
    table.add_column("MD", justify="center")
    table.add_column("JSON", justify="center")
    table.add_column("Internal", justify="center")

    for c in clients:
        table.add_row(
            c["name"], c["slug"],
            "[green]✓[/green]" if c["client"] else "[dim]—[/dim]",
            "[green]✓[/green]" if c.get("client_json") else "[dim]—[/dim]",
            "[green]✓[/green]" if c["internal"] else "[dim]—[/dim]",
        )
    console.print(Panel(table, title="[bold]Reports Archive[/bold]",
                        border_style="cyan", padding=(1, 1)))

    choices: list[Choice] = []
    for c in clients:
        marks = []
        if c["client"]:
            marks.append("client")
        if c["internal"]:
            marks.append("internal")
        suffix = f"  ({', '.join(marks)})" if marks else ""
        choices.append(Choice(title=f"{c['name']}  ·  {c['slug']}{suffix}", value=c))
    choices.append(Choice(title="Quit", value=None, shortcut_key="q"))

    pick = questionary.select(
        "Pick a client",
        choices=choices,
        use_shortcuts=True,
        use_arrow_keys=True,
        use_jk_keys=False,
        style=MENU_STYLE,
        qmark="›",
        instruction="(↑/↓ or number key)",
    ).ask()
    return pick


# ────────────────────────── action menu ──────────────────────────

def push_to_supabase(c: dict, status: str = "draft", visibility: str = "public") -> int:
    url = c["url"] or questionary.text(
        "Website URL (e.g. example.com)", style=MENU_STYLE, qmark="›"
    ).ask() or ""

    summary = Table.grid(padding=(0, 2))
    summary.add_row("[dim]Client[/dim]",          c["name"])
    summary.add_row("[dim]Slug[/dim]",            c["slug"])
    summary.add_row("[dim]URL[/dim]",             url or "[dim](none)[/dim]")
    summary.add_row("[dim]Client report (md)[/dim]",   str(c["client"])      if c["client"]            else "[dim](skip)[/dim]")
    summary.add_row("[dim]Client report (json)[/dim]", str(c.get("client_json")) if c.get("client_json") else "[dim](skip)[/dim]")
    summary.add_row("[dim]Internal report[/dim]",      str(c["internal"])    if c["internal"]          else "[dim](skip)[/dim]")
    summary.add_row("[dim]Status[/dim]",          f"[yellow]{status}[/yellow]")
    summary.add_row("[dim]Visibility[/dim]",      f"[yellow]{visibility}[/yellow]")
    console.print(Panel(summary, title="[bold]Pushing to Supabase[/bold]",
                        border_style="cyan", padding=(1, 2)))

    cmd = [
        "node", str(PUSH_SCRIPT),
        f"--client={c['name']}",
        f"--slug={c['slug']}",
        f"--url={url}",
        f"--status={status}",
        f"--visibility={visibility}",
    ]
    if c["client"]:
        cmd.append(f"--client-report={c['client']}")
    if c.get("client_json"):
        cmd.append(f"--client-report-json={c['client_json']}")
    if c["internal"]:
        cmd.append(f"--internal-report={c['internal']}")
    grader_json = CACHE_DIR / f"{c['slug']}.json"
    if grader_json.exists():
        cmd.append(f"--grader={grader_json}")

    rc = subprocess.run(cmd, cwd=REPO_ROOT).returncode
    if rc != 0:
        console.print("[red]✗ push-report failed[/red]")
        return rc

    local_url = f"http://localhost:3000/report/{c['slug']}"
    prod_url = f"https://tableturnerr.com/report/{c['slug']}"
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
        console.print(Panel(
            f"[bold]{c['name']}[/bold]\n[dim]{c['slug']}[/dim]"
            + (f"\n[dim]{c['url']}[/dim]" if c["url"] else ""),
            border_style="green", padding=(1, 2),
        ))

        choices = [
            Choice(title="View client report (rendered HTML)", value="view-client",
                   disabled=None if c["client"] else "missing"),
            Choice(title="View internal report (rendered HTML)", value="view-internal",
                   disabled=None if c["internal"] else "missing"),
            Choice(title="Push both to Supabase  ·  draft / public", value="push-draft"),
            Choice(title="Push as published  ·  published / public", value="push-pub"),
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
        if pick == "view-client":
            open_as_html(c["client"], f"{c['name']} — Client Report")
            pause()
        elif pick == "view-internal":
            open_as_html(c["internal"], f"{c['name']} — Internal Report")
            pause()
        elif pick == "push-draft":
            push_to_supabase(c, status="draft", visibility="public")
            pause()
        elif pick == "push-pub":
            push_to_supabase(c, status="published", visibility="public")
            pause()
        elif pick == "explorer":
            archive_dir = ARCHIVE / c["slug"]
            os.startfile(str(archive_dir))  # type: ignore[attr-defined]


# ────────────────────────── main ──────────────────────────

def main() -> int:
    while True:
        clear_screen()
        show_header()
        clients = discover_clients()
        c = pick_client(clients)
        if not c:
            return 0
        if not action_menu(c):
            return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        console.print("\n[dim]Cancelled.[/dim]")
        sys.exit(0)
