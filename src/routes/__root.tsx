import "normalize.css";
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { Global } from "@emotion/react";
import type { ReactNode } from "react";
import { globalStyles } from "../../styles/global";
import { seo } from "../../seo";

const description =
  "Make sure the colours you choose in your designs are accessible to people of all abilities, by choosing colour combinations that pass WCAG 2.0 recommendated colour contrast ratio guidelines.";

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: [
      { charSet: "utf8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...seo({
        title: "Are My Colours Accessible",
        description,
      }),
    ],
  }),
  notFoundComponent: NotFound,
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

function NotFound(): React.ReactElement {
  return <main>Page not found</main>;
}
