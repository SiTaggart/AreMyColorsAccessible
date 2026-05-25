import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import { Global } from '@emotion/react';
import type { ReactNode } from 'react';
import { globalStyles } from '~/styles/global';
import { seo } from '~/utils/seo';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...seo({
        title: 'Are My Colours Accessible',
        description:
          'Make sure the colours you choose in your designs are accessible to people of all abilities, by choosing colour combinations that pass WCAG 2.0 recommendated colour contrast ratio guidelines.',
      }),
    ],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
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
