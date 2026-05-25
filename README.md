# Are My Colours Accessible

![Checks](https://github.com/SiTaggart/AreMyColorsAccessible/workflows/Checks/badge.svg)

A colour contrast checker built with [TanStack Start](https://tanstack.com/start) and deployed to
[Cloudflare Workers](https://workers.cloudflare.com).

## Tech stack

- **TanStack Start** (TanStack Router + Vite) for routing, SSR, and server routes
- **Cloudflare Workers** runtime via `@cloudflare/vite-plugin` and Wrangler
- **Bun** for dependency management and scripts
- **Emotion** + **Twilio Paste** for styling and components
- **Oxlint** + **Oxfmt** for linting and formatting
- **Vitest** for unit tests, **Playwright** for end-to-end tests

## Prerequisites

- Node.js >= 22.12 (see `.nvmrc`)
- [Bun](https://bun.sh) >= 1.3

## Getting started

```sh
bun install
bun run dev
```

The dev server runs on http://localhost:3000.

## Scripts

| Script                   | Description                            |
| ------------------------ | -------------------------------------- |
| `bun run dev`            | Start the Vite dev server              |
| `bun run build`          | Build for production and type-check    |
| `bun run typecheck`      | Run `tsc --noEmit`                     |
| `bun run lint`           | Lint with Oxlint                       |
| `bun run format`         | Format with Oxfmt                      |
| `bun run format:check`   | Check formatting without writing       |
| `bun run test`           | Run unit tests with Vitest             |
| `bun run e2e`            | Run end-to-end tests with Playwright   |
| `bun run preview`        | Preview the production build           |
| `bun run smoke`          | Build and smoke-test routes and APIs   |
| `bun run deploy:dry-run` | Build and validate without deploying   |
| `bun run deploy`         | Build and deploy to Cloudflare Workers |

## API

`POST https://www.aremycolorsaccessible.com/api/are-they`

```json
{ "colors": ["#fff", "#000"] }
```

Returns the WCAG ratings and contrast ratio for the colour pair. See `/api-page` for full docs.

## Deployment

```sh
bun run deploy
```

This builds the app and runs `wrangler deploy`. Configure logging by setting the optional
`DATADOG_API_KEY`, `DATADOG_APP_NAME`, and `CF_ENV` secrets with `wrangler secret put`.
