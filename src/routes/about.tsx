import { createFileRoute } from "@tanstack/react-router";
import { About } from "../components/about";
import { AppContainer } from "../components/layouts/app-container";
import { SiteDataProvider } from "../context/home";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage(): React.ReactElement {
  return (
    <SiteDataProvider>
      <AppContainer>
        <About />
      </AppContainer>
    </SiteDataProvider>
  );
}
