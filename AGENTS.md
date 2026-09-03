# TableTurnerr agent instructions

## Non-technical SEO work

Use this workflow for requests to change marketing copy, service descriptions, metadata, blog content, internal links, structured data, or other SEO-facing content.

1. Read `.claude/skills/non-technical-seo-changes/SKILL.md` and the three business references it names before making claims or changing copy.
2. Work from a short-lived branch named `seo/<clear-topic>` created from the current `main`. Never commit directly to `main` or `release`.
3. Open a PR from the SEO branch to `main`. After it is merged, promote `main` to `release` with a separate PR. `release` is the production branch and must only change through a normal PR; never force-push or use an administrator bypass.
4. Every content or code change increments the final segment of the root `package.json` version. Versions use `X.Y.Z`: keep `X.Y` unchanged and increase `Z` (for example, `4.5.1` becomes `4.5.2`). Make that update the final, standalone commit: `chore(version): bump root version to vX.Y.Z`.
5. Use conventional project commit messages such as `docs(SEO): ...`, `feat(Marketing): ...`, `fix(Marketing): ...`, and the version message above. Keep commits focused; do not add co-author trailers.
6. Run `pnpm lint` and `pnpm build` before opening a PR when local configuration permits. Report any command that cannot run and why.

SEO work is limited to the requested marketing/content surface. Do not change authentication, billing, APIs, database migrations, analytics configuration, environment files, deployment settings, dependencies, or unrelated UI unless the requester explicitly asks for it.

Keep `.env.local`, credentials, and unrelated existing local changes private and untouched. Do not publish a production change yourself; create the PR and let the repository rules govern its merge.

For the first-time local setup procedure, see `docs/Non Technical SEO Start Off Prompt.md`.
