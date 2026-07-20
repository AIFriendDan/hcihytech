# Dispatch Workload Package — 2026-07-18

Prepared for handoff to Claude Code while Dan is out. Each workload below is self-contained — no memory of today's chat required to execute correctly.

---

## Workload 1 — Pull hcihy-clients-vercelapps source, verify notify.js
**Priority:** 🔴 High (blocks Workload 2)
**Objective:** Get real, verified visibility into the existing notification pattern before anything gets built on top of it.
**Context:** Dan wants Kelsey Renee Beauty's new booking form (Workload 2) to reuse the notification system already built for `hcihy-clients-vercelapps` (the Glow-Up Pitch / onboarding project) rather than rebuilding from scratch. That project has no local folder and no git repo linked — confirmed via Vercel API (`framework: null`, no repo). It was deployed straight via Vercel CLI from a folder that no longer exists locally. Notion notes claim a working `/api/notify.js` wired to Resend (added 2026-06-19; Twilio SMS stubbed but never wired) — this needs verifying against the real code, not trusted from notes alone. Two other stale/conflicting docs were caught elsewhere today (a Neon DB naming scare, a StudioLash Drive-vs-Notion status conflict), so "verify, don't assume" is the standing rule right now.
**Steps:**
1. `vercel link` to project `hcihy-clients-vercelapps` (team HCHY, project ID `prj_4zvll5IBevC10crDSDjer3dTLZBm`). Confirm shell/working directory before running — no local folder currently exists for this project, so `vercel link` will need to create one or link into a fresh directory; state which path you're using.
2. `vercel pull` to grab the actual deployed source into that local folder.
3. Read `/api/notify.js` (or wherever the notification logic actually lives). Confirm: what triggers it, what recipient it emails, whether Resend is genuinely wired and working, and whether Twilio SMS is genuinely unwired (or if that note is also stale).
4. Document findings as a comment on Linear ticket AIF-49: https://linear.app/aifrienddan-or-hcihy-tech/issue/AIF-49/pull-hcihy-clients-vercelapps-source-verify-notifyjs-before-building
**Definition of done:** Real source pulled and readable, `notify.js` behavior confirmed and documented in the AIF-49 ticket, Workload 2 unblocked to proceed with an accurate reuse plan.

---

## Workload 2 — Build custom booking form for Kelsey Renee Beauty
**Priority:** 🟡 Medium (blocked by Workload 1 — do not start until it's done)
**Objective:** Give Kelsey a simple, free booking page instead of pointing her to Vagaro ($26/mo after free trial).
**Context:** Kelsey Bell rents a booth at StudioLash and operates her own brand, "Kelsey Renee Beauty." She's a grandfathered-in free customer — no payment terms, no contract, nothing to formalize on the money side. [DAN DECISION, 2026-07-18]: build in-house instead of paying for a third-party booking tool. This reuses the same stack as her existing Glow-Up Pitch and onboarding form (HTML/Vercel), and per Dan should reuse whatever notification pattern Workload 1 verifies, rather than a new one.
**Steps:**
1. Confirm Workload 1 is complete and its findings are documented on AIF-49 before starting.
2. Build a basic "pick a day, submit a time, get a confirmation" form. No calendar sync, no automated reminders, no payment processing needed — keep it simple.
3. Wire it to the verified notification pattern from Workload 1 (Resend email at minimum; Twilio SMS only if Workload 1 confirms it's actually functional).
4. Deploy to the `studio-lash` Vercel project (project ID `prj_P5Wif0I8zN6RryU4ZsztNJ1WNf1y`, team HCHY).
5. Document evidence (live URL, a test submission confirming notification fired) as a comment on Linear ticket AIF-48: https://linear.app/aifrienddan-or-hcihy-tech/issue/AIF-48/build-custom-booking-form-for-kelsey-renee-beauty-skip-vagaro
**Definition of done:** Booking form live, wired to a confirmed-working notification pipeline, test submission verified end-to-end.

---

## Workload 3 — Close out AIF-9 (confirm Neon DB — leads stored correctly)
**Priority:** 🟡 Medium
**Objective:** Verify hcihytech's leads table is genuinely healthy now that AIF-45 fixed the missing-table issue, and close the ticket.
**Context:** AIF-9 has been open and unstarted, asking someone to confirm the Neon DB stores leads correctly with no orphaned records. Today's AIF-45 fix (created the missing `leads` table, verified a real write + Slack notification end-to-end) likely already answers this, but AIF-9 itself was never explicitly checked or closed.
**Steps:**
1. Query the `leads` table in hcihytech's production Neon DB (project `late-boat-27209281`, "neon-lime-clock").
2. Confirm: no orphaned records, schema matches what's expected, today's test lead(s) are present and clean.
3. If confirmed clean, close AIF-9 with a comment noting it was resolved as part of AIF-45's fix. Link: https://linear.app/aifrienddan-or-hcihy-tech/issue/AIF-9/confirm-neon-db-leads-stored-correctly-no-orphaned-records
4. If anything looks off, leave AIF-9 open and document exactly what's wrong instead of closing it.
**Definition of done:** AIF-9 either closed with verification evidence, or left open with a specific documented problem — not left ambiguous.

---

## Workload 4 — Rename hcihytech's Neon database (cosmetic)
**Priority:** 🟢 Low
**Objective:** Rename the database inside hcihytech's own Neon project away from `fionas_ass` so it stops causing false-alarm scares.
**Context:** hcihytech has its own fully isolated Neon project (`late-boat-27209281`, "neon-lime-clock", host `ep-blue-bird-akpnh28s-pooler...neon.tech`) — confirmed separate from Fiona.ink's Neon project (different host: `ep-billowing-haze-aknwhffx-pooler...neon.tech`). The database *inside* hcihytech's project is just unfortunately also named `fionas_ass` — a naming collision, not shared infrastructure. This caused a real scare earlier today (tracked in AIF-46) before being resolved as a false alarm. No data risk, purely hygiene. Note: hand-editing the `DATABASE_URL` env var in Vercel will NOT work — it's owned by the Vercel↔Neon integration and will resync back. The database itself needs to be renamed at the source.
**Steps:**
1. Connect to hcihytech's production Neon DB directly (via `psql` or the Prisma connection already working from today's migration work).
2. Run `ALTER DATABASE fionas_ass RENAME TO hcihytech;` (or a comparably sane name — confirm no active connections will break; this may require reconnecting after rename).
3. Update the local `.env` / Vercel env vars if the exact database name is referenced anywhere outside the connection string itself (unlikely, but check `prisma.config.ts` and any hardcoded references).
4. Confirm the app still connects and functions after the rename (a quick health check / test lead submission is enough).
5. Document the rename as a comment on AIF-46 and close it: https://linear.app/aifrienddan-or-hcihy-tech/issue/AIF-46/hcihytechs-neon-database-is-confusingly-named-fionas-ass-same-label-as
**Definition of done:** Database renamed, app confirmed still working, AIF-46 closed with evidence.

---

## Priority order

1. Workload 1 — Verify notify.js (blocks Workload 2)
2. Workload 3 — Close out AIF-9
3. Workload 2 — Build booking form (after Workload 1)
4. Workload 4 — Rename Neon database (cosmetic, do last or skip if time-constrained)

## Concurrency guidance — read before starting

Use parallel subagents where it's safe, but not blindly across all 4 workloads.

- **Safe to run in parallel:** Workload 1 and Workload 3. They touch completely different systems — Workload 1 is `hcihy-clients-vercelapps` (a separate Vercel project, no shared database), Workload 3 is a read-only query against hcihytech's `leads` table. No conflict, dispatch both as concurrent subagents.
- **Must run sequentially, not in parallel:** Workload 3 and Workload 4. Both touch hcihytech's production Neon database — Workload 3 queries the `leads` table, Workload 4 renames the database that table lives in. Running these concurrently risks a race condition (a rename mid-query can error or worse). Workload 4 must not start until Workload 3 is fully done.
- **Workload 2** already has a hard dependency on Workload 1 finishing first, per its own block above — that stays true whether or not Workload 1 ran in parallel with anything else.

Net effect: Workload 1 + Workload 3 can start together as parallel subagents. Once Workload 3 finishes, Workload 4 can start. Once Workload 1 finishes, Workload 2 can start. Workload 2 and Workload 4 have no conflict with each other and can run in parallel with each other once their respective blockers clear.

---

## Not included in this package (needs Dan directly, not dispatchable)

- **AIF-45** — In Review, waiting on Dan's own QA sign-off before it can move to Done. Nothing for Claude Code to do here.
- **AIF-38** (Willow & Rise / Taylor) — needs Dan to personally re-contact Taylor, a friend, over Instagram DM or in person.
- **AIF-35** (Kelsey's booking link + updated photo) — waiting on Kelsey directly, nothing to execute until she sends them.
- **AIF-44** (dgarzawork Gmail / AiFriendDan Outlook / new HCiHY email) — needs Dan to click through OAuth in claude.ai connector settings.
- **AIF-47** (incident.io connector 404 bug) — needs Dan to file a support ticket with incident.io directly.

## What I filled in / assumptions made

- Workload 1's "local folder" step is new — Dan hasn't specified where `vercel link` should create it. Flagged explicitly in the steps rather than guessing a path; whoever executes should state the path used.
- Workload 3 (AIF-9) wasn't explicitly requested today, but it was flagged mid-conversation as a natural close-alongside-AIF-45 item — included since it's quick and already has the verification method it needs (query the table that AIF-45 just fixed).
- Workload 4's rename method (SQL `ALTER DATABASE` instead of the Vercel dashboard) is based on today's finding that hand-editing Vercel's integration-owned env var doesn't stick — this is the correct alternate path, not something previously confirmed to work, so Claude Code should verify the app still connects after the rename before closing it out.
