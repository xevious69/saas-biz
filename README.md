# SaaS Biz

A reusable, preview-first foundation for SaaS products.

## Stack

- Next.js, React, strict TypeScript, Tailwind CSS
- PostgreSQL, Supabase Auth and Storage
- Vitest and Playwright
- GitHub Actions, CodeQL, dependency review, and Dependabot
- Portable standalone Docker image

## Local development

Prerequisites: Node.js 22+, pnpm, Docker, and the Supabase CLI.

```bash
cp .env.example .env.local
supabase start
supabase db reset --local
pnpm install
pnpm dev
```

Run all application checks:

```bash
pnpm check
pnpm test:e2e
```

## Release flow

1. Create a feature branch and make a focused change locally.
2. Run `pnpm check` and relevant browser tests.
3. Push the branch and open a pull request.
4. CI, CodeQL, dependency review, and the hosting preview must pass.
5. Review the preview with synthetic data.
6. Merge after approval; deploy the same reviewed revision to production.

Use separate Supabase projects for staging and production. Preview and local environments
must never connect to the production database. Put production secrets in the deployment
provider, not in GitHub source files or local templates.

## Environment setup

- **Local:** Supabase CLI and synthetic seed data.
- **Preview:** one hosting preview and isolated database branch per pull request.
- **Staging:** a permanent app and dedicated Supabase project for integrations and migrations.
- **Production:** protected deployment environment and dedicated database.

Before enabling automatic production deployment, configure GitHub's `production`
environment with required reviewers and store production secrets only in the deployment
platform or environment-scoped secret store.
