import React from 'react';
import { NextPage, NextPageContext } from 'next';
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
  query: {};
}
export const Palette: NextPage<PalettePageProps> = ({
  query
}: PalettePageProps): React.ReactElement => {
  return (
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
};

Palette.getInitialProps = async ({
  query
}: NextPageContext): Promise<{
  query: {};
}> => {
  return { query };
};

export default Palette;
