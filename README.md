# Cascade

A modern, design-focused, mobile-friendly alternative web UI for [qBittorrent](https://www.qbittorrent.org/), inspired by [VueTorrent](https://github.com/VueTorrent/VueTorrent) but built on React.

> **Status**: early. Phase 1 ships login + read-only torrent listing. Actions, categories, RSS, search, and Docker-mod packaging are future work.

## Stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS v4 + shadcn/ui (Radix primitives)
- TanStack Query (server state, polling) + TanStack Router (file-based, type-safe)
- Zustand for tiny client state, `next-themes` for theme handling
- React Hook Form + Zod for the login form
- Native `fetch` with `credentials: 'include'` — no axios

## Getting started

Requires Node 20.19+ and pnpm 10+.

```bash
pnpm install
cp .env.example .env.local
# edit .env.local — point VITE_QBIT_URL at your qBittorrent Web UI
pnpm dev
```

Open http://localhost:5173 — you'll be redirected to `/login`.

### Why a dev proxy?

qBittorrent enforces strict `Referer`/`Origin` validation against its `Host` header. Browsers forbid setting these from JavaScript, so the Vite dev server **rewrites them server-side** in `vite.config.ts` before forwarding to qBittorrent. Without this, every dev request would 403.

In production (when served by qBittorrent itself as the alternative Web UI), the UI is same-origin and no rewrite is needed.

## Building & installing as alternative Web UI

```bash
pnpm build
```

Output goes to `cascade/public/`. To install:

1. Copy the `cascade/` directory somewhere readable by qBittorrent (e.g., `/config/cascade/` in a Docker setup).
2. In qBittorrent: **Tools → Options → Web UI → Use alternative Web UI** → set the path to `…/cascade/public/`.
3. Restart the Web UI.

Open qBittorrent's port directly in a browser. Cascade loads same-origin and the login flow works without proxy.

## Roadmap

- [x] Phase 1: scaffold, login, read-only torrent listing
- [ ] Torrent actions (add via magnet/file, pause/resume, delete, recheck)
- [ ] Categories, tags, trackers, peers, files panels
- [ ] Settings, RSS, search, logs
- [ ] Docker-mod packaging following LinuxServer.io conventions
- [ ] i18n
- [ ] PWA / installable on mobile

## License

TBD.
