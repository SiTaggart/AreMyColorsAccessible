import { Global } from '@emotion/react';
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import type { ReactNode } from 'react';

import { globalStyles } from '~/styles/global';
import { seo } from '~/utils/seo';

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { content: 'width=device-width, initial-scale=1', name: 'viewport' },
      ...seo({
        description:
          'Make sure the colours you choose in your designs are accessible to people of all abilities, by choosing colour combinations that pass WCAG 2.0 recommendated colour contrast ratio guidelines.',
        title: 'Are My Colours Accessible',
      }),
    ],
  }),
  shellComponent: RootDocument,
});

function RootComponent(): React.ReactElement {
  return (
    <>
      <Global styles={globalStyles} />
      <Outlet />
    </>
  );
}

function RootDocument({ children }: { children: ReactNode }): React.ReactElement {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
