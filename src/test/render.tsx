import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from '@tanstack/react-router';
import { render, type RenderResult } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

// Components that use TanStack Router's <Link> need a router in context. This
// mounts the component as the root route of a throwaway in-memory router so it
// can render (and snapshot) without the full app route tree. The router resolves
// its initial matches asynchronously, so callers must await this helper.
export async function renderWithRouter(ui: ReactNode): Promise<RenderResult> {
  const rootRoute = createRootRoute({ component: () => ui as ReactElement });
  const router = createRouter({
    history: createMemoryHistory({ initialEntries: ['/'] }),
    routeTree: rootRoute,
  });

  await router.load();

  // SAFETY: test-only router is not the app's registered router instance.
  return render(<RouterProvider router={router as never} />);
}
