---
name: non-technical-seo-changes
description: Safely make requested marketing copy, SEO metadata, blog, and internal-link changes in the TableTurnerr site while following its versioning, commit, and PR workflow.
---

# Non-technical SEO changes

Use this skill for content-led changes to the public marketing site. It is not for changes to product logic, authentication, database schemas, integrations, or deployment configuration.

## Before writing

Read these sources before making or revising business claims, positioning, target audiences, or SEO priorities:

- `dev-kit/SEO-Report.md`
- `dev-kit/TableTurnerr Business Overview.md`
- `dev-kit/Overall-Plan.md`

Inspect the target route and nearby components before editing. Preserve existing metadata patterns, page structure, accessibility, and internal-link conventions. Do not invent testimonials, customer results, pricing, certifications, integrations, or legal/compliance claims. If the requested claim cannot be supported by the source material, flag it rather than adding it.

## Allowed scope

Typical allowed files are marketing pages, blog posts, marketing components, metadata, sitemap/robots entries, and approved public assets. Keep the edit narrowly tied to the request.

Do not edit `.env*`, secrets, package dependencies, database migrations, API routes, auth, payment flows, analytics settings, Vercel configuration, or unrelated administrative/client portal code without explicit approval from a technical owner.

## Required Git workflow

1. Start from an up-to-date `main` branch and create `seo/<short-topic>`. Do not make content commits on `main` or `release`.
2. Make focused conventional commits: `docs(SEO): ...`, `feat(Marketing): ...`, or `fix(Marketing): ...`. Do not use generic messages such as `update site`.
3. Every completed request requires one root-version bump. `package.json` must use `X.Y.Z`; preserve the first two numbers and increase the last one. Keep it in a final commit by itself: `chore(version): bump root version to vX.Y.Z`.
4. Validate with `pnpm lint` and `pnpm build` when the local environment is configured. Summarize any failure honestly in the PR.
5. Push the SEO branch and open a PR to `main` using the repository template. Do not merge by bypassing checks or branch protection.
6. Production promotion is a separate PR from `main` to `release`. Never push to `release`, force-push, or use `--admin` to merge it.

## SEO quality checklist

- Match the primary search intent with a clear page title, H1, and useful body copy; avoid keyword stuffing.
- Write concise, accurate title tags and meta descriptions that match the page content.
- Use meaningful heading hierarchy and descriptive link text.
- Add internal links only when they help the reader and point to a real, relevant page.
- Preserve factual accuracy, legal/privacy wording, and accessible image alt text.
- Avoid duplicated copy across pages and do not use unverified superlatives or guarantees.

For a teammate's first setup and ready-to-paste agent request, use `docs/Non Technical SEO Start Off Prompt.md`.
