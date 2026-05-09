<!-- SEED: re-run /impeccable document once there's real custom design work in the code (not just untouched shadcn slate) to capture the actual tokens, components, and a sidecar. -->

---
name: Cascade
description: A modern, design-focused, mobile-friendly alternative Web UI for qBittorrent — friendly, polished, calm in a dim room.
---

# Design System: Cascade

## 1. Overview

**Creative North Star: "The Tidepool"**

Cascade is a tidepool: a small, contained, deeply colored window onto something bigger and busier underneath. The surface is calm; the life is real. On a phone in a dim room, the screen should feel like glancing into a clear, deep pool — you can see all the way down, nothing is straining for your attention, and the one thing you actually need to know surfaces immediately. The torrent daemon underneath is doing serious work; the tidepool above it is composed and quiet.

The system is **restrained and dark by default**, anchored to a single deep-teal accent that the name itself invites. Color is used sparingly and meaningfully: a teal pulse for healthy activity, the same teal for the only primary action on a screen, never as ornament. Typography is a single humanist sans that reads as friendly rather than engineered — the warmth keeps Cascade from drifting into "homelab utility" territory. Motion is responsive but not choreographed: the interface answers when you touch it, and polling-driven state changes move smoothly rather than snapping, but nothing performs for you.

Cascade explicitly rejects **the default qBittorrent / *arr-stack utilitarian look** (gray-on-gray tables, dated chrome, zero hierarchy), **crypto/hacker neon-on-black aesthetics** (terminal LCD, glowing borders, ASCII flourish), **heavy SaaS marketing aesthetics** (purple gradients, glassmorphism, mascots, gradient text), and the **untouched shadcn slate template** that reads as tutorial output. Cascade ships on shadcn but should feel authored, not scaffolded.

**Key Characteristics:**
- Dark default, calm composition, deep-teal as the only voice with permission to speak louder than neutrals.
- Mobile is a peer, not a responsive afterthought — every component is designed for thumb reach and bottom-sheet patterns first.
- Density earned through type and rhythm, never by cramming.
- Glanceable in two seconds: hierarchy and color exist to surface state instantly.

## 2. Colors

A restrained dark palette: warm-tinted dark neutrals as the canvas, a single deep-teal accent as the only saturated voice. Specific token values land at implementation; the doctrine below is normative.

### Primary
- **Tidepool Teal** *(anchor: `oklch(~70% 0.12 200)`; exact step values to be resolved during implementation)*: the only accent voice. Reserved for the primary action on a screen, in-progress healthy activity (active downloads), focus rings, and key data emphasis. Ships in 3-4 stepped lightnesses so it can carry both interactive states and progress fills without losing identity.

### Secondary
*Omitted — Cascade is single-accent on purpose. State semantics (warning, error, success-other-than-active) live in the Tertiary role below, not as competing brand colors.*

### Tertiary (state semantics only)
- **Warning Amber** *(value to be resolved at implementation)*: stalled torrents, queued-too-long, free-space pressure. Not a brand color — purely functional state.
- **Error Red** *(value to be resolved at implementation)*: failed torrents, error toasts, destructive confirmations. Tinted toward red-orange rather than pure red so it doesn't read as aggressive in a dark, calm context.

### Neutral
A 6-9 step ramp of warm-tinted dark neutrals (chroma ~0.005-0.01, hue biased toward the teal so neutrals and accent live on the same temperature axis). Light theme inverts the ramp; chroma reduces near the extremes. Specific step values to be resolved during implementation.

- **Canvas** *(darkest, dark theme background)*: the page surface. Slightly warmer than pure slate so the interface doesn't read as cold.
- **Surface** *(one step lighter)*: cards, sheets, panels. Always tonally lighter than canvas, never with a heavy border.
- **Surface raised** *(two steps lighter)*: hover targets, active selection backgrounds, sticky headers when scrolled.
- **Border / divider**: a single neutral step, used at 1px max. Side-stripe accents are forbidden (see Don'ts).
- **Foreground (primary text)**, **muted foreground (secondary text)**, **subtle foreground (tertiary text)**: 3-step typographic hierarchy on color alone, before any size/weight changes.

### Named Rules

**The One Voice Rule.** Tidepool Teal is the only saturated color on a given screen. State colors (amber, red) are functional and must read as state, never as palette. If a screen feels colorful, it has too many voices — pull all but one back to neutral.

**The Tinted-Neutral Rule.** Never `#000` or `#fff`. Never an untinted slate. Every neutral carries a hint of the teal hue (chroma ~0.005-0.01) so the accent and neutrals live on the same temperature axis. The shadcn default slate (cool, hue ~286) is forbidden as a starting point.

**The Two-Theme-Equal Rule.** Light theme is not an afterthought. Both themes ship at AA contrast and are equally cared-for. The dim-room phone case is the design center; the bright-laptop daytime case is co-equal in quality.

## 3. Typography

**Display Font:** *[humanist sans, single family — to be chosen at implementation; Inter, Geist, Manrope, or Soehne all in-character]*
**Body Font:** *Same family — Cascade uses a single sans throughout.*
**Numeric Font:** *Same family with `font-variant-numeric: tabular-nums` enabled wherever speeds, sizes, ratios, or counts appear. Tabular figures are non-negotiable for data columns; mono substitution is unnecessary and adds noise.*

**Character:** Warm and humanist over geometric or technical. Cascade should read as "friendly application" rather than "engineering tool." The font should have proper open counters, a soft 'a', and meaningful weight differentiation across at least 4 weights (Regular / Medium / Semibold / Bold). No grotesque, no monospace-as-display.

### Hierarchy

A modular type scale of ~1.25 between steps, anchored at 14-15px body. All sizes to be resolved during implementation.

- **Display** *(700, ~32-40px, line-height 1.1)*: empty states, marketing-adjacent surfaces (login screen tagline). Used sparingly.
- **Headline** *(600, ~24px, line-height 1.2)*: page-level titles ("Torrents", "Settings"). One per screen.
- **Title** *(600, ~18px, line-height 1.3)*: section headers, sheet titles, modal titles.
- **Body** *(400, ~14-15px, line-height 1.5, max line length 65-75ch in long-form contexts)*: torrent names, descriptions, body copy.
- **Label** *(500, ~12-13px, line-height 1.4, no all-caps)*: chips, table column headers, status pill text. **Letter-spacing stays at default — no tracked-out small caps**, which would drift toward the SaaS marketing aesthetic Cascade rejects.

### Named Rules

**The Tabular Numbers Rule.** Every number that lives in a column or compares to another number — sizes, speeds, ratios, ETAs, percentages, peer counts — uses tabular figures. Anything less makes the data jitter when polling refreshes the values.

**The Single-Voice Type Rule.** One family, full stop. No display/body pairings, no mono-as-accent. Hierarchy comes from weight + scale + color, never from family-mixing.

## 4. Elevation

Cascade is **flat-by-default, with restrained ambient elevation on floating surfaces**. The system primarily uses tonal layering — Surface sits one step lighter than Canvas, Surface raised one step lighter still. Shadows are reserved for surfaces that genuinely lift off the page (toasts, popovers, dropdowns, mobile bottom sheets), and even then the shadow is soft and ambient, never structural.

### Shadow Vocabulary *(values to be resolved during implementation)*

- **Ambient lift** *(soft, low-y, ~24px blur, low alpha)*: popovers, toasts, dropdowns, hover state on interactive cards. Diffuse, atmospheric — should feel like the surface is *floating slightly*, not stamped.
- **Sheet shadow** *(directional, top-edge emphasis, slightly stronger alpha)*: mobile bottom sheets and side drawers. Just enough separation that the sheet reads as a layer above the canvas.

### Named Rules

**The Flat-At-Rest Rule.** Surfaces are flat at rest. Shadows appear only as a response to state (focus, lift, sheet, toast). A torrent row in its default state has zero shadow — only tonal contrast against the canvas.

**The No-Glass Rule.** No `backdrop-filter: blur` as decoration. Glassmorphism is forbidden. The only legitimate use of `backdrop-filter` is on mobile sheet scrims, and only when the underlying canvas has visible content worth dimming.

## 5. Components

*Omitted in seed mode — components beyond untouched shadcn defaults don't exist yet. Re-run `/impeccable document` after a real pass at the torrent list, login screen, and app shell to capture variants, states, and signature components (the torrent row in particular is the signature surface and deserves its own entry).*

## 6. Do's and Don'ts

### Do:
- **Do** anchor every screen to the Tidepool Teal accent and use it on ≤10% of the surface. The One Voice Rule is the single most important visual decision in this system.
- **Do** tint every neutral toward the teal hue (chroma ~0.005-0.01). Cascade's neutrals and accent live on the same temperature axis.
- **Do** use a single humanist sans family throughout, with tabular figures enabled on every numeric value that lives in a column or refreshes during polling.
- **Do** design every component for thumb-reach and mobile-first patterns (bottom sheets, swipe affordances, generous touch targets) before scaling up to desktop.
- **Do** earn information density through typographic hierarchy and rhythm — varying spacing, weight, and color — not by cramming more content into the same box.
- **Do** keep surfaces flat at rest; let elevation respond to state (focus, lift, sheet, toast) rather than decorate.
- **Do** honor `prefers-reduced-motion`. Polling-driven state changes especially should snap rather than animate when reduced motion is set.
- **Do** maintain WCAG 2.1 AA contrast in both themes. Light theme is co-equal, not a courtesy.

### Don't:
- **Don't** ship the untouched shadcn slate palette. The default New York / slate combination reads as tutorial output and is an explicit anti-reference in PRODUCT.md.
- **Don't** drift into the **default qBittorrent / *arr stack** look: gray-on-gray utilitarian tables, dated chrome, zero hierarchy, table-of-everything information design. This is the look users are escaping.
- **Don't** drift into **crypto / hacker dashboard** aesthetics: neon green on black, terminal LCD treatments, glowing borders, ASCII ornament. Tries hard, lands tacky.
- **Don't** drift into **heavy SaaS marketing aesthetics**: purple gradients, glassmorphic cards, mascots, illustrations of cute characters, gradient text. Cascade is a tool, not a landing page.
- **Don't** use `#000` or `#fff` anywhere. Don't use untinted slate.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe on rows, cards, or alerts. This is a banned pattern at the skill level and would clash hard with the calm aesthetic.
- **Don't** use gradient text (`background-clip: text`) for emphasis. Use a solid color and weight.
- **Don't** stack a second saturated accent next to Tidepool Teal. State colors (amber, red) are functional, not part of the palette.
- **Don't** introduce a second type family. No serif display, no mono accent, no editorial pairing.
- **Don't** animate CSS layout properties. Transform and opacity only. No bounce or elastic easing.
- **Don't** treat mobile as a responsive cleanup pass. Every screen is co-designed for phone and desktop from the start.
- **Don't** use modal as the first answer to "where should this UI go." Inline expansion, bottom sheets, popovers, and progressive disclosure all come first.
