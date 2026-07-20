# Work Order — Fix missing leads table (AIF-45)

Linear: AIF-45 (Urgent, Ready to Execute) — team AiFriendDan | HCiHY Tech

## Objective

`/api/leads` is failing on every call with `PrismaClientKnownRequestError (P2021)` — the `public.leads` table doesn't exist. Inbound leads are silently dropping. Get a real lead write landing in the DB again.

## Root cause (confirmed)

No `.env` file exists in this repo. `prisma.config.ts` reads `process.env.DATABASE_URL`, finds nothing, and `prisma migrate deploy` fails before it can even create the missing table.

## Steps

1. Copy `.env.example` to `.env` in the repo root.
2. Fill in the 4 required values:
   - `DATABASE_URL` — real Neon/Postgres connection string for hcihytech (ask Dan if not already in hand — do not guess or reuse Fiona.ink's connection string, this is a different DB)
   - `ANTHROPIC_API_KEY`
   - `SLACK_WEBHOOK_URL`
   - `LEADS_PASSWORD`
3. Run `npx prisma migrate deploy` from the repo root. Confirm it completes without error and creates the `leads` table.
4. Verify end-to-end: submit a real test lead through `/api/leads` (or the site's lead form) and confirm a row lands in the `leads` table.
5. Confirm the Slack webhook still fires on a new lead (per AIF-5, DB write + Slack notification is the only verified delivery path — SMS/email are not wired).
6. Set the same env vars in Vercel (Project → Settings → Environment Variables → Production) so this doesn't only work locally. Redeploy.
7. Re-check Vercel runtime logs for `/api/leads` after redeploy — confirm no more P2021 errors.

## Definition of done

- `leads` table exists in production DB.
- A real test lead write succeeds and is visible in the DB.
- Slack notification fires on that test lead.
- Env vars are set in Vercel Production, not just local `.env`.
- AIF-45 moved to In Review in Linear with the evidence (per QA Closure Gate — engineering tickets don't jump straight to Done).

## Notes

- Related: AIF-9 (confirm Neon DB — leads stored correctly, no orphaned records) — still open, may be the same root gap this ticket just surfaced.
- Do not touch AiFriendDan.com's codebase/brand — this work order is scoped to hcihytech only.
