# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Paristake UI — a Vue 3 sports betting and casino web application for the Kenyan market. Built with Vite, managed with pnpm, deployed via Docker/Nginx to GKE (Google Kubernetes Engine) through GitLab CI.

## Commands

- **Install dependencies:** `pnpm install`
- **Dev server:** `pnpm dev` (runs on port 5079)
- **Production build:** `pnpm run build`
- **Preview build:** `pnpm preview`
- **Lint:** `npx eslint src/`

No test framework is configured.

## Architecture

### Tech Stack
- **Vue 3** (Composition API with `<script setup>`) + **Vue Router** + **Pinia** (with persisted state)
- **Vite** with auto-imports (`unplugin-auto-import`): Vue APIs (`ref`, `computed`, `watch`, etc.), `axios`, `storeToRefs`, and all composables from `./composables/**` are available globally without imports
- **unplugin-vue-components**: components are auto-registered (no manual imports needed in templates)
- **Tailwind CSS 3** with dark mode via `[data-theme="dark"]` selector, plus shadcn-vue (JS variant, no TypeScript)
- **@unhead/vue** for dynamic SEO meta/head management per route

### Path Alias
`@` maps to `./src` (configured in `vite.config.js`)

### Key Directories

- **`src/stores/`** — Pinia stores (~50 stores). Major ones: `login.js`, `betslip.js`, `sports.js`, `casino.js`, `matches.js`, `live-matches.js`, `modal.js`. Many use `pinia-plugin-persistedstate`.
- **`src/composables/`** — Reusable composition functions (~60+). Auto-imported by Vite, so they're usable anywhere without explicit imports. Key ones: `useBetslip.js`, `useTax.js`, `useThemeSwitch.js`, `useModalTypes.js`, `useMixpanel.js`.
- **`src/services/API.js`** — Axios factory that creates instances from env-configured base URLs. Multiple backend services: matches, auth, bet, casino, virtual, affiliate, CMS, kiron-lite.
- **`src/router/index.js`** — All routes defined in a single file. Uses `meta.requiresAuth` for auth gating (redirects to login modal, not a page). Route `afterEach` handles dynamic SEO meta and JSON-LD schemas.
- **`src/views/`** — Page-level components. Some routes use layout wrappers (`WithSibarAndBetslip`, `CasinoLayout`, `CrashIndex`, `TheAuth`).
- **`src/components/ui/`** — shadcn-vue components (button, toast). Added via `npx shadcn-vue@latest add <component>`.

### Environment Variables
All prefixed with `VITE_`. The `.env` file is committed (not gitignored) and contains real dev/prod API URLs. For Docker production builds, `.env.production` uses placeholder constants that get replaced at runtime by `docker/config/app/entrypoint.sh` via `sed`.

Key env vars: `VITE_MATCHES_URL`, `VITE_AUTH_URL`, `VITE_BET_URL`, `VITE_CASINO_URL`, `VITE_VIRTUAL_URL`, `VITE_APP_VERSION`.

### Deployment
- **GitLab CI** (`.gitlab-ci.yml`): two stages — `build-and-push` (Docker image to GCP Artifact Registry) and `deploy` (Helm to GKE)
- **Branches:** `main` → production, `devel` → development
- **Docker** (`docker/Dockerfile`): multi-stage build (Node + pnpm → Nginx Alpine). `APP_VERSION` passed as build arg.
- **Helm chart** lives in `paristake-ui/` directory

### Conventions
- JavaScript only (no TypeScript) — `components.json` confirms `"typescript": false`
- ESLint with `vue3-recommended` + Prettier
- `vue/multi-word-component-names` rule is disabled
- Production builds drop `console` and `debugger` statements via esbuild
- Custom Vite plugin serves `/version.json` for app version checking
- Mixpanel analytics integrated as a Vue plugin
