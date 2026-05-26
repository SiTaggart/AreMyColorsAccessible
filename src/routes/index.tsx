import { createFileRoute } from "@tanstack/react-router";
import { Home } from "../components/home";
import { AppContainer } from "../components/layouts/app-container";
import { SiteDataProvider } from "../context/home";
import { parseSiteSearch } from "../utils/route-search";

export const Route = createFileRoute("/")({
  component: IndexPage,
  validateSearch: parseSiteSearch,
});

function IndexPage(): React.ReactElement {
  const search = Route.useSearch();

  return (
    <SiteDataProvider initialSiteData={search}>
      <AppContainer>
        <Home />
      </AppContainer>
    </SiteDataProvider>
  );
}
