# HCiHY Tech SEO Optimization Task

Repository:
AIFriendDan/hcihytech

Goal:
Improve technical SEO score without changing the visual brand/design.

## Rules
- Do not redesign the site.
- Preserve all HCiHY branding, components, animations, and styling.
- Use Next.js App Router conventions.
- Make complete working changes.
- Run a build check before finishing.

---

## Task 1 — Update app/layout.tsx

Modify metadata to include:

- metadataBase:
  https://hcihytech.com

- canonical:
  https://hcihytech.com

- improved title:
  "HCiHY Tech | IT Services & AI Consulting in Ventura County"

- improved description:
  "IT services, AI consulting, automation, and web solutions for Ventura County businesses. Get expert technology help from HCiHY Tech today."

Add:

- OpenGraph metadata
- Twitter card metadata
- og-image reference:

/og-image.png

Keep existing fonts and layout components unchanged.

---

## Task 2 — Fix homepage SEO heading

Find the current H1.

The current H1 only displays:

HCiHY

Change the semantic H1 to:

"IT Services & AI Consulting in Ventura County"

Important:
- Keep the HCiHY logo/acronym visually displayed.
- Do not remove branding.
- The H1 should become the SEO-focused heading.

The H1 is likely located in:

app/components/HchyHero.tsx

---

## Task 3 — Add LocalBusiness structured data

Add JSON-LD schema.

Use:

@type:
ProfessionalService

Name:
HCiHY Tech

URL:
https://hcihytech.com

Area served:
- Ventura County
- Ventura
- Oxnard
- Camarillo
- Santa Barbara

Services:
- IT Support
- Managed IT Services
- AI Consulting
- Automation Consulting
- Web Development

---

## Task 4 — Create robots.ts

Create:

app/robots.ts

Requirements:

Allow crawling.

Point sitemap to:

https://hcihytech.com/sitemap.xml

---

## Task 5 — Create sitemap.ts

Create:

app/sitemap.ts

Include:

https://hcihytech.com

Use current date as lastModified.

---

## Task 6 — Leads page

Find:

/leads

Add metadata:

robots:
- index: false
- follow: false

This page should not appear in Google.

---

## Task 7 — Validate

Before finishing:

Run:

npm run build

Fix any TypeScript or Next.js errors.

Provide summary:

- files changed
- SEO improvements made
- build result