# Product

## Register

product

## Users

Self-hosters running qBittorrent on a home network — typically a NAS, homelab, or Docker host. They use Cascade from a laptop on the LAN or a phone over Tailscale/VPN, often glancing at it for a few seconds at a time to check what's downloading, what's stalled, and how much space is left. They're technical but not the audience for raw utilitarian tooling: they've already chosen self-hosted because they care about how their stack feels. Sessions are bursty (check in for 30 seconds, walk away) more than long-form, and a meaningful share of those check-ins happen on a phone in a dim room.

## Product Purpose

Cascade is a modern alternative Web UI for qBittorrent that feels like a polished consumer app instead of a self-hosted utility. It exists because the stock qBittorrent UI is dated and table-heavy, and the popular alternative (VueTorrent) is dense and desktop-shaped — neither treats mobile or visual craft as first-class. Success means a self-hoster opens Cascade on their phone, glances at their library state in under two seconds, and feels the same care they get from Plex or Overseerr. The interface should be the reason someone picks Cascade over the default UI even when functional parity is roughly equal.

## Brand Personality

Friendly, polished, mobile-native. Voice is calm and human — no jargon flexing, no clipped engineer-shorthand, no marketing exuberance either. Visually the app should feel like Plex/Overseerr's lineage of self-hosted tooling that doesn't look self-hosted: confident hierarchy, generous touch targets, considered surfaces. Emotionally the goal is quiet competence: the app is doing serious work, but it never makes you feel the seams of the underlying daemon.

## Anti-references

- **Default qBittorrent and the *arr stack (Sonarr/Radarr/Prowlarr).** Gray-on-gray utilitarian tables, dated chrome, zero visual hierarchy, table-of-everything information design. This is the look users are actively escaping by choosing Cascade.
- **Crypto / hacker dashboards.** Neon green on black, terminal LCD aesthetics, glowing borders, ASCII ornament. Tries hard and lands tacky.
- **Heavy SaaS marketing aesthetic.** Big purple gradients, glassmorphic cards, mascots, cute illustrations, gradient text. Cascade is a tool people open to do something, not a landing page.
- **Untouched shadcn slate template.** The default New York / slate combination read as "tutorial output" rather than a real product. Cascade ships on shadcn but should feel authored, not scaffolded.

## Design Principles

1. **Self-hosted, not self-hosted-looking.** Match consumer-app polish (Plex, Overseerr, modern iOS apps). Never accept "good enough for a homelab tool" as a quality bar.
2. **Mobile is a peer, not an afterthought.** Phone usage is a primary case, not a responsive courtesy. Touch targets, bottom sheets, swipe affordances, and thumb-zone layouts are first-class on every surface, designed at the same time as the desktop view.
3. **Glanceable in two seconds.** A user opening Cascade on their phone should read overall library state — what's active, what's stuck, free space — almost instantly. Hierarchy, color, and motion all serve this.
4. **Calm density.** Information-rich is fine; cluttered is not. Default to restrained color and breathable spacing. Earn density through typography and rhythm, not by cramming.
5. **Quietly capable.** Power-user features (filters, batch actions, keyboard shortcuts, dense modes) exist but stay out of the way until invoked. The first impression is approachable; the second impression is "oh, this can actually do everything."

## Accessibility & Inclusion

Target WCAG 2.1 AA. Color contrast meets AA in both themes. All interactive elements have visible focus rings and are keyboard reachable. `prefers-reduced-motion` is honored for any non-essential animation (transitions, polling-driven state changes, decorative motion). Default theme is dark (Plex/Overseerr lineage, dim-room phone use), with a fully maintained light mode — neither theme is a second-class citizen. No specific assistive-tech testing requirement is committed at this stage, but icon-only buttons should carry meaningful labels so screen-reader users aren't blocked.
