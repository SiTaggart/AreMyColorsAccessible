import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { Container } from '../components/layouts/container';
import { Layout } from '../components/layouts/layout';
import { PalettePage } from '../components/palette-page';
import { Footer } from '../components/footer';
import { PaletteDataProvider } from '../context/palette';
import { PalettePageQueryString } from '../types';

interface PalettePageProps {
  query: {};
}
const Palette: NextPage<PalettePageProps> = ({ query }: PalettePageProps): React.ReactElement => (
  <>
    <Head>
      <title>Palette checker - Are My Colours Accessible</title>
    </Head>
    <PaletteDataProvider queryString={query as PalettePageQueryString}>
      <Container variant="palette">
        <Layout variant="full">
          <PalettePage />
        </Layout>
        <Footer />
      </Container>
    </PaletteDataProvider>
  </>
);

Palette.getInitialProps = async ({
  query,
}: NextPageContext): Promise<{
  query: {};
}> => ({ query });

// eslint-disable-next-line import/no-default-export
export default Palette;
