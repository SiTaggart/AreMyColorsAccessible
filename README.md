# Are My Colours Accessible

![Checks](https://github.com/SiTaggart/AreMyColorsAccessible/workflows/Checks/badge.svg)

A colour contrast checker built with [TanStack Start](https://tanstack.com/start) and deployed to
[Cloudflare Workers](https://workers.cloudflare.com).

## Tech Stack

- TanStack Start, TanStack Router, Vite, React 19
- Cloudflare Workers via `@cloudflare/vite-plugin` and Wrangler
- Bun for dependency management and scripts
- Emotion and Twilio Paste for styling
- Oxlint and Oxfmt for linting and formatting
- Vitest for unit tests
- Playwright for browser tests

## Prerequisites

- Node.js >= 22.12, matching `.nvmrc`
- Bun >= 1.3

## Getting Started

```sh
bun install
bun run dev
```

The dev server runs on http://localhost:3000.

## Scripts

| Script                   | Description                          |
| ------------------------ | ------------------------------------ |
| `bun run dev`            | Start the Vite dev server            |
| `bun run build`          | Build for production and type-check  |
| `bun run typecheck`      | Run `tsgo --noEmit`                  |
| `bun run lint`           | Lint with Oxlint                     |
| `bun run format`         | Format with Oxfmt                    |
| `bun run format:check`   | Check formatting without writing     |
| `bun run test`           | Run unit tests with Vitest           |
| `bun run e2e`            | Run browser tests with Playwright    |
| `bun run smoke`          | Build and smoke-test routes and APIs |
| `bun run deploy:dry-run` | Build and validate Worker output     |
| `bun run deploy`         | Build and deploy to Cloudflare       |

## API

`POST https://www.aremycolorsaccessible.com/api/are-they`

```json
{ "colors": ["#fff", "#000"] }
```

Returns the WCAG ratings and contrast ratio for the colour pair. See `/api-page` for full docs.
