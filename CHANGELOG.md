# Changelog

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
