import { createFileRoute } from '@tanstack/react-router';

import { Footer } from '~/components/footer';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/layout';
import { PalettePage } from '~/components/palette-page';
import { PaletteDataProvider } from '~/context/palette';

interface PaletteSearch {
  colors?: Array<string>;
}

export const Route = createFileRoute('/palette')({
  component: PaletteRoute,
  head: () => ({
    meta: [{ title: 'Palette checker - Are My Colours Accessible' }],
  }),
  validateSearch: (search: Record<string, unknown>): PaletteSearch => {
    const { colors } = search;
    if (colors === undefined) {
      return {};
    }
    return { colors: Array.isArray(colors) ? colors.map(String) : [String(colors)] };
  },
});

function PaletteRoute(): React.ReactElement {
  const { colors } = Route.useSearch();
  const queryString = colors && colors.length > 0 ? { colors } : undefined;

  return (
    <PaletteDataProvider queryString={queryString}>
      <Container variant="palette">
        <Layout variant="full">
          <PalettePage />
        </Layout>
        <Footer />
      </Container>
    </PaletteDataProvider>
  );
}
