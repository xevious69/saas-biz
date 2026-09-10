# Environments

| Stage | Application | Database | Data |
| --- | --- | --- | --- |
| Local | `http://127.0.0.1:3000` | Supabase CLI | Synthetic seed data |
| Preview | Vercel pull-request deployment | Supabase preview branch when enabled | Synthetic only |
| Staging | Vercel staging deployment | `saas-biz-staging` | Synthetic only |
| Production | Vercel production deployment | `saas-biz-production` | Customer data |

## Supabase projects

- Staging ref: `agncfigwnhvhuwtsaajs` ([dashboard](https://supabase.com/dashboard/project/agncfigwnhvhuwtsaajs))
- Production ref: `jukifgcizdyisxaozdrq` ([dashboard](https://supabase.com/dashboard/project/jukifgcizdyisxaozdrq))
- Region: Frankfurt (`eu-central-1`)

The local CLI is linked to staging. Keep `supabase/.temp/` uncommitted because it contains
machine-specific link state. Apply every database change through a new migration and validate
it locally before pushing to either remote project.

## Deployment policy

- Pull requests create preview deployments and must pass all required checks.
- Staging deploys automatically after merge and uses staging-only credentials.
- Production uses production-only credentials and requires the GitHub production-environment approval.
- Never copy production customer data into local, preview, or staging environments.
