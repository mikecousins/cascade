# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Cascade is a React-based alternative Web UI for [qBittorrent](https://www.qbittorrent.org/), inspired by VueTorrent. Phase 1 ships login + read-only torrent listing; actions, categories, RSS, and search are not yet implemented.

Requires Node 20.19+ and pnpm 10+.

## Commands

```bash
pnpm dev         # Vite dev server on :5173 (proxies /api → VITE_QBIT_URL)
pnpm build       # vite build → cascade/public/ + tsc --noEmit + postbuild (writes version.txt)
pnpm typecheck   # tsc -b --noEmit
pnpm lint        # eslint .
pnpm preview     # serve the production build
```

`.env.local` must set `VITE_QBIT_URL` to a running qBittorrent Web UI for `pnpm dev`.

## Architecture

### Two deployment modes (and why the dev proxy exists)

qBittorrent enforces strict `Origin`/`Referer` validation against its `Host` header, and browsers forbid setting those from JS. This forces two distinct runtime topologies:

- **Dev**: Vite dev server proxies `/api` to `VITE_QBIT_URL` and **rewrites `Origin`/`Referer` server-side** in `vite.config.ts`. Without this, every request 403s.
- **Production**: the build is served by qBittorrent itself as its "alternative Web UI" — same-origin, no rewrite needed.

Build output goes to `cascade/public/` (not `dist/`), matching the directory layout qBittorrent expects. `scripts/postbuild.mjs` then writes `cascade/public/version.txt` with `<package version>+<git short SHA>`.

### qBittorrent API layer (`src/lib/api/`)

All HTTP goes through `qbitFetch` / `qbitJson` / `qbitPostForm` in `client.ts`. Two non-obvious behaviors:

- **Cookie-based auth**: every request sets `credentials: "include"`. There's no token; the qBittorrent session cookie is the source of truth.
- **`QbitError` with `status: 403` is the "logged out" signal** and is handled in two places: `main.tsx`'s `QueryCache.onError` (clears `cascade-username` and navigates to `/login`), and `_authed.tsx`'s `beforeLoad` (redirects to `/login` before rendering). React Query also disables retries for 403 specifically.
- The login endpoint returns text `"Ok."` on success; anything else is `InvalidCredentialsError`. A 403 from `/auth/login` means `IpBannedError` (qBittorrent bans IPs after repeated failed logins).

The `localStorage["cascade-username"]` value is **display-only** (shown in the header). It is not auth state — never trust it for gating.

### Routing (TanStack Router, file-based)

Routes live in `src/routes/`. The router plugin generates `src/routeTree.gen.ts` at dev/build time — do not edit it.

- `__root.tsx` — root layout with devtools.
- `_authed.tsx` — pathless layout route that gates everything below it. Its `beforeLoad` calls `getVersion()`; on 403 it redirects to `/login`. New authed pages should be added as `_authed.<name>.tsx`.
- `login.tsx` — also has a `beforeLoad` that redirects to `/torrents` if a session already exists, so users don't see the form when already logged in.
- `index.tsx` — redirects `/` to `/torrents`.

Router context is typed via `createRootRouteWithContext<{ queryClient: QueryClient }>` and wired up in `main.tsx` after the `QueryClient` is constructed.

### Data fetching

TanStack Query is the only state owner for server data. Hooks live in `src/hooks/` and call functions from `src/lib/api/`. The torrent list polls every 2s with `placeholderData: (prev) => prev` to avoid flicker. When adding mutations, return cache invalidations through `queryClient.invalidateQueries` rather than reading state from elsewhere.

### UI

- shadcn/ui (New York style, slate base) — components in `src/components/ui/`, configured in `components.json`. When adding shadcn components, use the existing alias setup (`@/components/ui`, `@/lib/utils`, `@/hooks`).
- Tailwind CSS v4 via `@tailwindcss/vite` — there is no `tailwind.config.*`; theme tokens live in `src/styles/globals.css` as CSS variables. `next-themes` toggles a `class` on `<html>` (`dark` is the default).
- Path alias: `@/*` → `src/*` (configured in both `tsconfig.app.json` and `vite.config.ts`).

## Conventions worth knowing

- Native `fetch` only — do not add axios or another HTTP client. Cookie credentials and the dev proxy assume `fetch` semantics.
- TypeScript is strict with `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, and `erasableSyntaxOnly`. Type-only imports must use `import type`.
- New API endpoints go in `src/lib/api/<area>.ts` and are re-exported through `src/lib/api/index.ts` so consumers import from `@/lib/api`.
