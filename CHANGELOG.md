# Changelog

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
