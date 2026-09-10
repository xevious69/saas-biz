<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository operating rules

## Workflow

- Work on a feature branch or isolated worktree. Do not commit directly to `main`.
- Keep changes small and focused. Review `git diff` before committing.
- Do not merge pull requests, deploy production, alter repository protections, or change production secrets without explicit user approval.
- Explain any new dependency before adding it.

## Required checks

- Run `pnpm check` before finishing application changes.
- Run `pnpm test:e2e` when a user-facing or critical workflow changes.
- Add or update meaningful tests for changed behavior and security boundaries.
- Never weaken or skip a check merely to make CI pass.

## Architecture

- Keep the application a modular monolith until scaling requirements justify a split.
- Keep business logic outside React components and database access on the server.
- Validate untrusted input with Zod at system boundaries.
- Prefer server components; use client components only for browser interactivity.

## Database and security

- Store every schema change in a new file under `supabase/migrations/`.
- Never edit a migration that has been applied to a shared environment.
- Use expand-and-contract migrations for destructive or incompatible schema changes.
- Never point local or CI tests at production or use real customer data in tests.
- Never expose service-role keys, secrets, or privileged database clients to browser code.
- Verify authentication, authorization, tenant isolation, and Row Level Security for every new data-access path.
