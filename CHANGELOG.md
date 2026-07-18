# Changelog

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
