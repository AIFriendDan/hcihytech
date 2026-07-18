# Changelog

## [v1.5.3] — 2026-07-18

**Task:** AIF-46 — rename hcihytech's Neon database away from `fionas_ass` (cosmetic hygiene).
**Branch:** main
**Status:** Attempted and reverted. Database is back to `fionas_ass` — original state, no data loss, no lasting outage. **AIF-46 stays open** — this needs a different approach before it's safe to retry.

**What happened:**
- Connected directly to Neon (unpooled, `postgres` maintenance DB) and ran `ALTER DATABASE fionas_ass RENAME TO hcihytech`. Had to `pg_terminate_backend()` one idle pgbouncer connection first (Postgres refuses a rename while any session holds the target DB) — succeeded, confirmed via `pg_database` listing.
- Re-pulled Vercel's Production `DATABASE_URL` immediately after to check whether the Vercel↔Neon integration had synced the new name. **It had not** — `DATABASE_URL` still resolved to `fionas_ass`, which no longer existed.
- Tested that exact connection string: `database "fionas_ass" does not exist`. This is the same value the live production `/api/leads` function uses — meaning any request landing during this window would have failed the same way.
- **Reverted immediately**: renamed `hcihytech` back to `fionas_ass` on Neon, confirmed via both pooled and unpooled connections that the app's actual `DATABASE_URL` connects again and the `leads` table/data (2 rows, same as pre-rename) is intact.
- Checked Vercel's `get_runtime_errors` for the project over the prior 30 minutes: **zero runtime errors** — the ~1-minute broken window did not appear to catch live traffic, but this was closer to a real outage than the work order anticipated.

**Root cause of the near-incident:** the work order's warning — "hand-editing `DATABASE_URL` in Vercel won't work, it's owned by the integration and will resync back" — implies the integration *does* resync automatically from Neon's actual state. In practice, a raw `ALTER DATABASE` executed directly against Postgres (bypassing Neon's control plane / API) does not appear to trigger that resync, at least not within the ~2 minutes I waited. Vercel's env var stayed stale, pointed at a database name that had just stopped existing.

**Files touched:** none (reverted). `.env` locally still reads `fionas_ass` (matches Vercel, unchanged).

**Commands run (Bash, `C:\Users\danimal\Documents\project_workspace\hcihytech`):**
- Direct `pg` client scripts (temp, deleted after use) against `DATABASE_URL_UNPOOLED` pointed at Neon's `postgres` maintenance DB — used to list databases, check `pg_stat_activity`, terminate the blocking backend, run the rename, then run the revert.
- `vercel env pull .env --environment=production --yes` (twice — before and after rename attempt) to check Vercel's live value.
- `mcp__plugin_vercel_vercel__get_runtime_errors` (project `prj_fPFEaEuWr5MPVGppxagSRV4tAmOs`, team `team_3XUJhFkWeqoND2cgHZHEoxN3`, `since: 30m`) — confirmed no production errors during/after the window.

**Decisions made:**
- Prioritized reverting over investigating further once the stale-connection-string risk was confirmed — a cosmetic rename isn't worth carrying real outage risk while root-causing the sync gap.
- Did not attempt the rename a second way (e.g. via Neon's console/API or Vercel's Storage tab UI) in this session — that's a different mechanism than the raw-SQL approach the work order specified, and untested here.

**Follow-ups / needs Dan's attention:**
- **AIF-46 is still open.** The database is named `fionas_ass` again, exactly as before this session.
- Before retrying: rename it through Neon's own console/API or Vercel's **Storage tab** (Project → Storage → the Neon integration) instead of a raw SQL `ALTER DATABASE`, if those surfaces are what actually notifies Vercel's integration to resync `DATABASE_URL`. Raw SQL against Postgres directly does not appear to do this reliably.
- If a raw-SQL rename is still preferred, budget for `DATABASE_URL` in Vercel to go stale until manually confirmed/synced — don't leave it renamed without immediately re-pulling and re-testing the exact production env var, the way this session caught it.
- Linear: same as AIF-9 above — Linear connector unreachable this session, so AIF-46 couldn't be commented on directly. Flagging for Dan to leave it open with this note, or re-run once Linear is reachable.

## [v1.5.2] — 2026-07-18

**Task:** AIF-9 — confirm Neon DB stores leads correctly, no orphaned records.
**Branch:** main
**Status:** Verified clean. Ticket should be closed — Linear unreachable this session (see below), Dan needs to close manually or re-run once Linear connector is authorized.

**What changed (verification, no code changes):**
- Queried hcihytech's production `leads` table directly via Prisma client (pooled connection pulled fresh from Vercel Production env, `DATABASE_URL` on host `ep-blue-bird-akpnh28s-pooler...`, project `late-boat-27209281`).
- Row count: 2 — both are AIF-45's own e2e test leads (`source: aif-45-e2e-test`, `source: aif-45-prod-e2e-test`), fully populated, no nulls in required fields (`name`, `email`, `source`, `id` all present on both).
- Compared live `information_schema.columns` against `prisma/schema.prisma`'s `Lead` model — exact match on every column, type, and nullability.
- Compared live `pg_indexes` against the model's `@@index` directives — both present (`leads_email_idx`, `leads_status_idx`) plus the PK (`leads_pkey`).
- No orphaned records found (orphan check: any row missing a required field — zero matches).

**Files touched:** none (read-only verification). Temp script `_check_leads_tmp.mjs` written to repo root and deleted after use.

**Commands run (Bash, `C:\Users\danimal\Documents\project_workspace\hcihytech`):**
- `find` to locate the repo (no `.env` present locally — confirmed via `.gitignore`'s `.env*` entry that it's intentionally git-ignored, not missing).
- `vercel env pull .env --environment=production --yes` — repo already linked to Vercel project `hchy/hcihytech`.
- Node script using `@prisma/client` + `@prisma/adapter-pg` to run `prisma.lead.count()`, `prisma.lead.findMany()`, and raw `information_schema`/`pg_indexes` queries.

**Decisions made:**
- Did not delete the two test lead rows — AIF-45's changelog already flagged this as an optional follow-up, left in place since they're harmless and clearly source-tagged; deleting them wasn't in scope for AIF-9 (verification, not cleanup).
- Closing AIF-9 in Linear was attempted but the Linear connector (`claude_ai_Linear` per prior session memory) was not available in this session's tool list — `plugin:productivity:linear` shows as requiring authorization. **Flagging for Dan: please close AIF-9 with a comment referencing AIF-45's fix and this verification, or re-authorize the Linear connector so a future session can do it.** Link: https://linear.app/aifrienddan-or-hcihy-tech/issue/AIF-9/confirm-neon-db-leads-stored-correctly-no-orphaned-records

**Follow-ups:**
- None — DB is clean. Proceeding to Workload 4 (Neon DB rename) per today's Dispatch package, sequentially after this verification to avoid a race on the shared connection.

## [v1.5.1] — 2026-07-18

**Task:** AIF-45 — fix missing `public.leads` table (P2021 on every `/api/leads` call).
**Branch:** main
**Status:** Shipped — `leads` table created in hcihytech's production Neon DB, verified end-to-end.

**What changed:**
- Generated and applied the missing initial Prisma migration (`prisma/migrations/20260718192331_init/migration.sql`), creating the `leads` table per `prisma/schema.prisma` (indexes on `email` and `status`).
- Confirmed with a real POST to `/api/leads`: row landed in the DB, queried back via Prisma client to verify.

**Files touched:** `prisma/migrations/20260718192331_init/migration.sql` (new), `prisma/migrations/migration_lock.toml` (new).

**Commands run (PowerShell/Bash, `C:\Users\danimal\Documents\project_workspace\hcihytech`):**
- `npx vercel env pull .env --environment=production` — pulled hcihytech's Production env vars (project `hchy/hcihytech`).
- `npx prisma migrate reset --force` — Prisma's own agent-safety gate blocked this destructive command until Dan gave explicit written consent (captured via `PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION`); cleared only Neon's auto-created `playing_with_neon` demo table, confirming the DB was otherwise empty.
- `npx prisma migrate dev --name init` — generated and applied the migration.
- `npx prisma migrate deploy` — confirmed idempotent, no pending migrations.
- `npm run dev`, then `curl -X POST http://localhost:3001/api/leads` with a real test payload (`source: aif-45-e2e-test`) — returned `{"success":true}`; verified the row in Postgres via a throwaway Prisma-client script (deleted after use).

**Decisions made:**
- **False alarm on the DB, resolved:** initially flagged `DATABASE_URL` resolving to a database literally named `fionas_ass` as a suspected cross-brand mixup with Fiona.ink. Independently verified against Fiona.ink's actual logged connection string (AIF-30 Linear comment, 2026-07-13): different host (`ep-billowing-haze-aknwhffx-pooler...` vs hcihytech's `ep-blue-bird-akpnh28s-pooler...`) — different Neon project (`late-boat-27209281`, confirmed single-project-scoped in Vercel's Neon integration access control), genuinely isolated. The `fionas_ass` database name on hcihytech's own project is a cosmetic copy/paste leftover from setup, not a shared database. Worth a follow-up to rename it for clarity, no functional risk.
- Refused to run `prisma migrate reset --force` without Dan's explicit consent even after he'd already said "proceed" earlier in the thread — Prisma's own safety gate requires consent captured at the point of the specific dangerous command, not implied from earlier conversation.
- Slack verification (below) required testing against the live Vercel deployment, not local dev, because Vercel's "Sensitive" env var type is write-only by design (never readable via `vercel env pull`/dashboard, even by the owner) — this is not a bug, it's how Vercel scopes secrets like webhook URLs.

**Slack notification (AIF-5 delivery path):**
- Found `SLACK_WEBHOOK_URL` set in Vercel Production but with an *empty* value — `lib/slack.ts`'s `if (!webhookUrl) return` silently no-ops on empty string, so no error, no message, nothing in logs.
- Dan supplied the real webhook URL. Set via `vercel env rm` + `vercel env add` (CLI, not dashboard, after the dashboard edit didn't persist for `DATABASE_URL` earlier in this same session).
- Vercel marked it **Type: Sensitive** — a write-only env var type, never readable again via `vercel env pull`/dashboard by design (not a bug). Local testing of the Slack path was therefore impossible; verified against the live production deployment instead.
- Redeployed to Production (`npx vercel --prod`, commit `684b33c`, deployment `dpl_DdivPzVjAkoionShG9jauNNsGwoN`, aliased to `www.hcihytech.com`). POSTed a real test lead to `https://www.hcihytech.com/api/leads` (`source: aif-45-prod-e2e-test`) — `200 {"success":true}`, row confirmed in prod DB, and Dan confirmed the Slack message landed in **#HCiHY Leads** with correct field values and timestamp.

**Follow-ups:**
- Rename the `fionas_ass` database on hcihytech's Neon project (`late-boat-27209281`) to something brand-correct — cosmetic only, no functional impact, but confusing/risky-looking for the next person who finds it.
- Delete the two test lead rows (`source: aif-45-e2e-test` local, `aif-45-prod-e2e-test` production) from the `leads` table if a clean table is wanted before real traffic — left in place since they're harmless and clearly source-tagged.

## [v1.5.0] — 2026-07-17

**Task:** AIF-27 — HCiHY brand migration (code-level pass). Split hcihytech.com off the shared AiFriendDan black/red/white identity onto HCiHY's own chrome/navy/blue/cyan/emerald/volt/violet system.
**Branch:** main
**Status:** Shipped — committed `91ae5ae`, pushed to origin/main.

**What changed:**
- New HCiHY design token system in `app/globals.css`: full 7-color palette (Deep Graphite Navy, Signal Blue, Cyan Glass, Emerald Link, Volt Green, Violet Spark, Chrome Silver) as CSS vars + semantic aliases (success/info/warning/danger, incl. the narrow Error Red `#E5484D` exception for destructive UI only), wired into Tailwind v4 via `@theme inline`, plus shared component classes (`btn-hcihy-primary/secondary`, `hcihy-card`, `hcihy-badge`, `hcihy-input`).
- Typography swapped in `app/layout.tsx`: Poppins removed (now reserved for AiFriendDan only) in favor of Space Grotesk (headline), Inter (body), JetBrains Mono (code) via `next/font/google`. Eurostile stays in the CSS fallback chain per the Typography doc but isn't self-hosted (licensed/logo-only font) — falls through to Space Grotesk.
- All red/orange accents removed across every component and the `/leads` internal dashboard, remapped by role: Signal Blue = primary CTAs/headline emphasis, Emerald = success/checkmarks, Volt = badges, Violet = AI-Services section accent, Cyan = info/focus rings, Chrome = borders.
- Wordmark now uses the Logo Standards Manual's split-color treatment ("HCi" in Signal Blue, "HY" in Volt Green) in header, footer, and Why-Us heading. Tagline corrected to "How Can i Help You?" (lowercase i is intentional brand styling per the Brand Bible).
- Primary buttons use Navy text on Signal Blue background (~4.75:1, passes AA) instead of white-on-blue (~3.5:1, fails AA) — caught by computing actual WCAG contrast rather than assuming white text was safe. Badges use Navy-on-Volt (~13:1). Error text is paired with an icon since Error Red only clears AA at large-text/UI size.
- Fixed an unrelated JSX bug found during QA: text on the same line immediately after a closing `</span>` was silently losing its leading space in this Next.js version; fixed with explicit `{' '}` tokens in `OurPhilosophy.tsx` and `WhyChooseUs.tsx`.

**Files touched:** `app/globals.css`, `app/layout.tsx`, `app/leads/page.tsx`, and every file under `app/components/`.

**Commands run:** `npx tsc --noEmit` (clean), `npm run lint` (clean), `npm run dev` + Chrome MCP screenshot QA across every section (hero, about, philosophy, pricing, social media, IT services, why-us, contact form, chat widget, footer) — all from `C:\Users\danimal\Documents\project_workspace\hcihytech` in PowerShell/Bash.

**Decisions made:**
- Pulled the authoritative spec from the linked Notion pages (Brand Bible, Logo Standards, Color System, Typography) rather than relying only on the ticket's flat hex list, since Notion had gradients/contrast data/semantic roles the ticket didn't include.
- Scoped this pass to code only; logo mark redesign and social/email asset regeneration (ticket items 3 and 7) deferred to a follow-up since they're design work, not code edits.
- Left `.claude/settings.local.json` (a pre-existing unrelated local change) out of this commit to keep it scoped to the brand migration.

**Follow-ups:**
- Logo mark (chrome/glass chain-link "H") and social/email asset regeneration — ticket items 3 and 7 of AIF-27 — not started.
- No accessibility audit tooling (e.g. axe) was run; contrast was verified by manual WCAG calculation against the Notion Color System doc's documented ratios, not automated scan.

## [v1.4.0] — 2026-07-11

**Task:** Serve the lead-processing-agent tool at hcihytech.com/leads instead of its old aifrienddan.com subdomain.
**Branch:** main
**Status:** Shipped — hcihytech.com/leads confirmed live and functional.

**What changed:**
- Made hcihytech the default app in a new Vercel Microfrontends group; `lead-processing-agent` is the child app routed at `/leads`, `/leads/:path*`, and `/leads-assets/:path*` (asset prefix).
- This keeps the two projects as fully separate codebases/repos/Vercel projects — nothing merged, no shared code. hcihytech's own site content and routes are unaffected.

**Files touched:** `next.config.ts`, `microfrontends.json` (new), `package.json`/lockfile.

**Decisions made:**
- Chose path-based routing (`hcihytech.com/leads`) over a subdomain, per Dan's explicit preference.
- lead-processing-agent's own `hcihy.aifrienddan.com` domain was removed as part of this same change (tracked in that repo's own CHANGELOG) — no aifrienddan.com association remains anywhere in this flow.

**Follow-ups:**
- The `/leads` page is currently lead-processing-agent's bare-bones default dev UI, not a polished internal tool. Design pass requested by Dan, not yet started.
