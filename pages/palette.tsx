import React from 'react';
import Container from '../components/layouts/container';
import Layout from '../components/layouts/layout';
import Head from 'next/head';
import PalettePage from '../components/palette-page';
import Footer from '../components/footer';
import { PaletteDataProvider } from '../context/palette';

export interface PalettePageQueryString {
  colors: string[];
}
interface PalettePageProps {
  query: PalettePageQueryString;
}
export const Palette: React.FC<PalettePageProps> = ({
  query
}: PalettePageProps): React.ReactElement => {
  return (
    <>
      <Head>
        <title>Palette checker - Are My Colours Accessible</title>
      </Head>
      <PaletteDataProvider queryString={query}>
        <Container variant="palette">
          <Layout variant="full">
            <PalettePage />
          </Layout>
          <Footer />
        </Container>
      </PaletteDataProvider>
    </>
  );
};

// @ts-ignore
Palette.getInitialProps = async ({
  query
}: {
  query: {};
}): Promise<{
  query: {};
}> => {
  return { query };
};

export default Palette;
