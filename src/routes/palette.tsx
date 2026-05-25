import { createFileRoute } from '@tanstack/react-router';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/layout';
import { PalettePage } from '~/components/palette-page';
import { Footer } from '~/components/footer';
import { PaletteDataProvider } from '~/context/palette';

interface PaletteSearch {
  colors?: string[];
}

export const Route = createFileRoute('/palette')({
  validateSearch: (search: Record<string, unknown>): PaletteSearch => {
    const { colors } = search;
    if (colors === undefined) {
      return {};
    }
    return { colors: Array.isArray(colors) ? colors.map(String) : [String(colors)] };
  },
  head: () => ({
    meta: [{ title: 'Palette checker - Are My Colours Accessible' }],
  }),
  component: PaletteRoute,
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
