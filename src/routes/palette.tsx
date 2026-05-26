import { createFileRoute } from "@tanstack/react-router";
import { Container } from "../../components/layouts/container";
import { Layout } from "../../components/layouts/layout";
import { PalettePage } from "../../components/palette-page";
import { Footer } from "../../components/footer";
import { PaletteDataProvider } from "../../context/palette";
import type { PalettePageQueryString } from "../../types";

export const Route = createFileRoute("/palette")({
  component: Palette,
  head: () => ({
    meta: [{ title: "Palette checker - Are My Colours Accessible" }],
  }),
  validateSearch: (search: Record<string, unknown>) => search as Partial<PalettePageQueryString>,
});

function Palette(): React.ReactElement {
  const search = Route.useSearch();

  return (
    <PaletteDataProvider queryString={search as PalettePageQueryString}>
      <Container variant="palette">
        <Layout variant="full">
          <PalettePage />
        </Layout>
        <Footer />
      </Container>
    </PaletteDataProvider>
  );
}
