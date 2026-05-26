import { createFileRoute } from "@tanstack/react-router";
import { Home } from "../../components/home";
import { AppContainer } from "../../components/layouts/app-container";
import { SiteDataProvider } from "../../context/home";
import type { SiteData } from "../../types";

export const Route = createFileRoute("/")({
  component: IndexPage,
  validateSearch: (search: Record<string, unknown>) => search as Partial<SiteData>,
});

function IndexPage(): React.ReactElement {
  const search = Route.useSearch();

  return (
    <SiteDataProvider initialSiteData={search as SiteData}>
      <AppContainer>
        <Home />
      </AppContainer>
    </SiteDataProvider>
  );
}
