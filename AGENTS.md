# TableTurnerr agent instructions

## Non-technical SEO work

Use this workflow for requests to change marketing copy, service descriptions, metadata, blog content, internal links, structured data, or other SEO-facing content.

1. Read `.claude/skills/non-technical-seo-changes/SKILL.md` and the three business references it names before making claims or changing copy.
2. Work from a short-lived branch named `seo/<clear-topic>` created from the current `main`. Never commit directly to `main` or `release`.
3. Make requested edits locally first. Run `powershell -ExecutionPolicy Bypass -File scripts/start-seo-preview.ps1` and give the manager the reported `http://localhost:3000` URL. The script reuses an existing listener on that port so it does not start duplicate dev servers.
4. Do not stage, commit, push, open a PR, or change the version until the manager explicitly confirms that the currently previewed changes should be published. Treat comments such as “looks good” as a request for changes or review, not publication. Ask for a clear confirmation if needed.
5. After explicit publication confirmation, run `pnpm lint` and `pnpm build` when local configuration permits. Report any command that cannot run and why. Then create focused commits, including the required final version commit.
6. Every published content or code change increments the final segment of the root `package.json` version. Versions use `X.Y.Z`: keep `X.Y` unchanged and increase `Z` (for example, `4.5.1` becomes `4.5.2`). Make that update the final, standalone commit: `chore(version): bump root version to vX.Y.Z`.
7. Use conventional project commit messages such as `docs(SEO): ...`, `feat(Marketing): ...`, `fix(Marketing): ...`, and the version message above. Keep commits focused; do not add co-author trailers.
8. Push the SEO branch and open a PR from the SEO branch to `main` only after that confirmation. After it is merged, promote `main` to `release` with a separate PR only when explicitly asked. `release` is the production branch and must only change through a normal PR; never force-push or use an administrator bypass.

SEO work is limited to the requested marketing/content surface. Do not change authentication, billing, APIs, database migrations, analytics configuration, environment files, deployment settings, dependencies, or unrelated UI unless the requester explicitly asks for it.

Keep `.env.local`, credentials, and unrelated existing local changes private and untouched. “Publish” in this workflow means submit the SEO branch for review, not merge it or release it to production. Do not publish a production change yourself; create the PR and let the repository rules govern its merge.

For the first-time local setup procedure, see `docs/Non Technical SEO Start Off Prompt.md`.
