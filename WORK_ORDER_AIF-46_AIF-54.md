# Work Order — Rename two confusingly-named Neon databases (AIF-46, AIF-54)

Both databases are currently named `fionas_ass`. They are NOT the same database — different Neon projects, different hosts, confirmed isolated. But the shared name has already caused one false-alarm cross-contamination scare (2026-07-18) and one failed rename attempt that briefly broke production (2026-07-24). Read this whole doc before touching either one.

## ⚠️ What went wrong last time — do not repeat

On 2026-07-24, hcihytech's database was renamed directly via SQL (`ALTER DATABASE fionas_ass RENAME TO hcihytech;`) using only DB credentials, with no Vercel write access in that session. This broke production immediately: Vercel's `DATABASE_URL` (and every other Postgres/Neon env var referencing the db name) still pointed at `/fionas_ass`, which no longer existed post-rename. `/api/leads` started 500ing. Caught within ~1 minute via a live test POST, reverted immediately, confirmed restored. **The database is still named `fionas_ass` right now — nothing was actually renamed.**

**The fix must happen in one continuous pass, by whoever has BOTH:**
1. Direct DB credentials (to run the rename)
2. Vercel CLI write access for that project (to update every env var referencing the old db name, and redeploy)

Claude Code has working Vercel CLI credentials for both the `hcihytech` and Fiona.ink projects already used in this thread — use that session, not a DB-only connection.

## Workload 1 — Rename hcihytech's database (AIF-46)
**Priority:** Medium
Link: https://linear.app/aifrienddan-or-hcihy-tech/issue/AIF-46/hcihytechs-neon-database-is-confusingly-named-fionas-ass-same-label-as

**Steps:**
1. Connect to hcihytech's Neon instance (host `ep-blue-bird-akpnh28s-pooler.c-3.us-west-2.aws.neon.tech`, Neon project `late-boat-27209281`) via a maintenance database (`neondb` works) — do not connect directly to `fionas_ass` when renaming it.
2. Run `ALTER DATABASE fionas_ass RENAME TO hcihytech;`
3. **Immediately**, in the same session, update the Vercel Production env vars for the `hcihytech` project (`prj_fPFEaEuWr5MPVGppxagSRV4tAmOs`, team `hchy`) via `vercel env` CLI commands. Check ALL of these, not just `DATABASE_URL` — the local `.env` shows these all reference the db name:
   - `DATABASE_URL`
   - `DATABASE_URL_UNPOOLED`
   - `PGDATABASE`
   - `POSTGRES_DATABASE`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_URL_NO_SSL`
4. Redeploy production.
5. Test a real lead submission against `https://www.hcihytech.com/api/leads` (POST with name/email/message) and confirm `{"success":true}` before declaring done.
6. Comment the evidence on AIF-46 and move it to Done.

**If anything fails between step 2 and step 4:** immediately run `ALTER DATABASE hcihytech RENAME TO fionas_ass;` to revert, then re-test before doing anything else.

## Workload 2 — Rename Fiona.ink's database (AIF-54)
**Priority:** Low
Link: https://linear.app/aifrienddan-or-hcihy-tech/issue/AIF-54/fionaink-rename-neon-database-fionas-ass-real-name

**Steps:** Same pattern as Workload 1, applied to Fiona's separate Neon project.
1. Connect to Fiona's Neon instance (host `ep-billowing-haze-aknwhffx-pooler.c-3.us-west-2.aws.neon.tech`) via a maintenance database.
2. Run `ALTER DATABASE fionas_ass RENAME TO fionatats;` (or another real name — `fionatats.ink` is the live domain, so `fionatats` reads clean).
3. Immediately update whatever env vars reference this connection string on the Render service backing fionatats.ink (not Vercel — Fiona's backend is on Render, confirmed in AIF-30's close-out). Check Render's dashboard/CLI for every env var referencing the old db name.
4. Redeploy the Render service.
5. Test a real booking submission against fionatats.ink and confirm it writes to the DB.
6. Comment the evidence on AIF-54 and move it to Done.

## Definition of done (both)
- Both databases renamed away from `fionas_ass`.
- Every env var referencing either old name updated on the correct platform (Vercel for hcihytech, Render for Fiona.ink).
- Both apps redeployed and confirmed working via a real test submission, not just "no errors in the logs."
- Both tickets closed with evidence in comments.

## Do not do
- Do not rename either database from a session that only has DB credentials and no way to update the corresponding env vars in the same pass.
- Do not treat "the rename succeeded" as done — the env var update and redeploy are part of the same atomic operation, not a follow-up step.
