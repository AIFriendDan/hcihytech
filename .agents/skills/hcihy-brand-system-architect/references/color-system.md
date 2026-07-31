# HCiHY Approved Color Palette (Canon)

Source of truth: Dan's already-approved logo/brand sheet. These 7 colors are the entire brand palette — every future document (Color System doc, website tokens, social templates, merch) extends from these, it never invents new brand hues. No red. No orange.

**Locked by Dan's explicit instruction:** this image-derived palette overrides any narrower color list stated elsewhere (including earlier written brand notes that only mentioned navy/blue/green/white/black). Violet Spark is a fully approved primary-tier brand color, not a placeholder or pending accent — treat it with the same confidence as the other six.

**Also settled:** Danger/Error UI uses a dedicated **Error Red `#E5484D`** — a narrow, confirmed exception to "no red." This is a *system-only* color: valid for destructive-action buttons, form/validation errors, and failed states inside product/website UI, and nowhere else. It never appears in the logo, marketing, social, or any brand-facing surface — those stay on the 7-color palette above with zero red or orange. See Document 03, Section 3 for the full scope and contrast data (4.15:1 on Navy, 3.91:1 on White — pass AA for large text/UI, pair with an icon + label for small text). Any request to use red outside this exact scope needs a fresh decision from Dan, not an extension of this one.

| Name | Hex | RGB | HSL | Role |
|---|---|---|---|---|
| Deep Graphite Navy | `#0A1F44` | rgb(10, 31, 68) | hsl(218, 74%, 15%) | Primary dark background / graphite base |
| Signal Blue | `#0589FF` | rgb(5, 137, 255) | hsl(208, 100%, 51%) | Primary brand blue (wordmark "HCI") |
| Cyan Glass | `#00D4FF` | rgb(0, 212, 255) | hsl(190, 100%, 50%) | Glass/chrome highlight, glow accents |
| Emerald Link | `#39FF9C` | rgb(57, 255, 156) | hsl(150, 100%, 61%) | Chain-link accent, "Help" highlight |
| Volt Green | `#A8FF00` | rgb(168, 255, 0) | hsl(80, 100%, 50%) | Wordmark "HY", energy accent |
| Violet Spark | `#8E5CFF` | rgb(142, 92, 255) | hsl(258, 100%, 68%) | Secondary/tertiary accent, premium touch |
| Chrome Silver | `#C0C6D4` | rgb(192, 198, 212) | hsl(222, 19%, 79%) | Metal/chrome surfaces, light-mode neutral |

Plus **pure black** and **pure white** as the extreme neutrals (backgrounds and text).

## CSS variables (starter — expand in the full Color System doc)
```css
:root {
  --hcihy-navy: #0A1F44;
  --hcih