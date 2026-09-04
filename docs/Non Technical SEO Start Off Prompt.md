# Non Technical SEO Start Off Prompt

Copy everything below into Codex or another local AI coding agent for a teammate's first setup. Replace the text in square brackets only where needed.

```text
You are setting up the TableTurnerr parent site locally for a non-technical SEO manager. Work carefully and explain results in plain language.

Repository: https://github.com/TableTurnerr/Parent-Site.git
Preferred local folder: [choose a folder you own, for example C:\\Users\\YourName\\Desktop\\MyCode]

First-time setup:
1. Confirm that Git, Node.js 20 or newer, Python 3, and GitHub CLI (`gh`) are available. Tell me exactly what is missing; do not install system software without asking.
2. Clone the repository if it is not already present. If it is present, use that copy and inspect `git status` before changing anything.
3. In the repository, enable the package manager version recorded by the project and install every project dependency:
   - `corepack enable`
   - `pnpm install --frozen-lockfile`
   - `python -m pip install -r scripts/requirements.txt`
4. Do not copy, create, print, commit, or upload secrets. If the site needs environment variables for a local check, tell me to create my own `.env.local` from `.env.example`; never ask me to paste a real secret into chat.
5. Read `AGENTS.md`, then `.claude/skills/non-technical-seo-changes/SKILL.md`, and then these business references before changing any public copy:
   - `dev-kit/SEO-Report.md`
   - `dev-kit/TableTurnerr Business Overview.md`
   - `dev-kit/Overall-Plan.md`

Rules for every future SEO/content request:
- I will describe the desired copy, page, keyword, or link change in plain language. Keep changes limited to that request's marketing/SEO surface. Never alter app logic, database, authentication, APIs, pricing, analytics, deployment, dependencies, or environment files unless I explicitly ask.
- Start from the latest `main`, make a branch called `seo/<short-topic>`, and never commit directly to `main` or `release`.
- Make changes locally first. Do not stage, commit, push, open a pull request, or change the version while I am reviewing a draft.
- After each requested change, run `powershell -ExecutionPolicy Bypass -File scripts/start-seo-preview.ps1` from the repository. Give me the exact `PREVIEW_URL` it prints, normally `http://localhost:3000`, and a plain-language summary of what changed. This script starts one local dev server or reuses the existing one; do not start `pnpm dev` separately or run another copy on a different port.
- Wait for my explicit instruction to publish the currently previewed work. “Publish these changes” or “Submit this for review” is clear confirmation. “Looks good,” “review it,” or a request for another edit is not permission to push; ask me to confirm if uncertain.
- Only after I explicitly confirm publication: run `pnpm lint` and `pnpm build` when possible; report failures clearly; make focused commits in the existing style (`docs(SEO): ...`, `feat(Marketing): ...`, or `fix(Marketing): ...`); then update root `package.json` to a valid `X.Y.Z` version by increasing only the final number. Put the version update in the final commit: `chore(version): bump root version to vX.Y.Z`.
- After confirmation, push only the SEO branch and open a pull request to `main`, using the PR template. In this workflow, publishing means creating that review PR; it does not mean merging it. Never force-push, bypass protections, or push directly to `release`.
- A production release must be a separate pull request from `main` to `release`, created only when asked. Do not merge with an admin bypass.
- Do not invent customer results, testimonials, certifications, compliance promises, pricing, or product capabilities. Ask when a claim is unsupported.

After setup, show me: the repository location, active branch, whether dependencies installed successfully, and the exact plain-language request you need from me for my first SEO change. Do not make a content change yet unless I include one in this message.
```

## Release protection (one-time repository owner step)

GitHub must enforce the PR-only rule; local instructions alone cannot prevent a direct push. A repository owner should authenticate GitHub CLI with `gh auth login` and run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/configure-release-protection.ps1
```

The script requires pull requests and the `SEO Content Governance` check on `release`, blocks direct/force pushes and deletion, applies the rule to administrators, and requires resolved PR conversations. It deliberately requires no human approval count so an AI-created PR can still be merged normally after checks pass.
