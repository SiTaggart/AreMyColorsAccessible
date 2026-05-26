import { createFileRoute } from "@tanstack/react-router";
import { About } from "../components/about";
import { AppContainer } from "../components/layouts/app-container";
import { SiteDataProvider } from "../context/home";
import { parseSiteSearch } from "../utils/route-search";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  validateSearch: parseSiteSearch,
});

function AboutPage(): React.ReactElement {
  const search = Route.useSearch();

  return (
    <SiteDataProvider initialSiteData={search}>
      <AppContainer>
        <About />
      </AppContainer>
    </SiteDataProvider>
  );
}
