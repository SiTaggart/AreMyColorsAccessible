import { render, type RenderOptions, type RenderResult } from "@testing-library/react";
import { RouterContextProvider, createMemoryHistory } from "@tanstack/react-router";
import type { ReactElement, ReactNode } from "react";
import { getRouter } from "../router";

interface RenderWithRouterOptions extends Omit<RenderOptions, "wrapper"> {
  initialEntries?: Array<string>;
}

function renderWithRouter(
  ui: ReactElement,
  { initialEntries = ["/"], ...renderOptions }: RenderWithRouterOptions = {},
): RenderResult {
  const router = getRouter();

  function Wrapper({ children }: { children: ReactNode }): ReactElement {
    return (
      <RouterContextProvider history={createMemoryHistory({ initialEntries })} router={router}>
        {children}
      </RouterContextProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export { renderWithRouter };
