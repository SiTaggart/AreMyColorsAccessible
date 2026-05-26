import { createRouter } from '@tanstack/react-router';
import qs from 'query-string';

import { routeTree } from './routeTree.gen';

// The app reads and writes URL search state in `query-string` format (repeated
// keys for arrays, e.g. `?colors=a&colors=b`, and flat scalar pairs like
// `?background=...&isLight=false`). Slack deep links and shareable URLs depend
// on this exact shape, so the router parses/serializes search with the same lib
// rather than TanStack's default JSON encoding.
export function getRouter() {
  const router = createRouter({
    defaultNotFoundComponent: () => (
      <main style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h1>404 — Page not found</h1>
        <p>
          <a href="/">Go back home</a>
        </p>
      </main>
    ),
    defaultPreload: 'intent',
    parseSearch: (search) => qs.parse(search) as Record<string, unknown>,
    routeTree,
    scrollRestoration: true,
    stringifySearch: (search) => {
      const stringified = qs.stringify(search as Record<string, string>);
      return stringified ? `?${stringified}` : '';
    },
  });

  return router;
}
