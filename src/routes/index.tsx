import { createFileRoute } from '@tanstack/react-router';
import { Home } from '~/components/home';
import { AppContainer } from '~/components/layouts/app-container';
import { SiteDataProvider } from '~/context/home';
import type { SiteData } from '~/types';

interface HomeSearch {
  background?: string;
  textColor?: string;
  isLight?: string;
}

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): HomeSearch => {
    // Only include keys that are actually present in the URL. SiteDataProvider
    // treats any present `textColor` key as "hydrate from query" and parses
    // `isLight`, so emitting absent keys as `undefined` would break that check.
    const result: HomeSearch = {};
    if (typeof search.background === 'string') {
      result.background = search.background;
    }
    if (typeof search.textColor === 'string') {
      result.textColor = search.textColor;
    }
    if (typeof search.isLight === 'string') {
      result.isLight = search.isLight;
    }
    return result;
  },
  component: IndexPage,
});

function IndexPage(): React.ReactElement {
  const search = Route.useSearch();

  // SAFETY: SiteDataProvider treats this as the raw URL query (as the legacy
  // Next getInitialProps did): it parses `isLight` from its string form and
  // recomputes colorCombos, so the loose search shape is the expected input.
  return (
    <SiteDataProvider initialSiteData={search as unknown as SiteData}>
      <AppContainer>
        <Home />
      </AppContainer>
    </SiteDataProvider>
  );
}
