import React from 'react';
import Container from '../components/layouts/container';
import Layout from '../components/layouts/layout';
import Head from 'next/head';
import PalettePage from '../components/palette-page';
import Footer from '../components/footer';

export const Palette: React.FC<{}> = (): React.ReactElement => {
  return (
    <>
      <Head>
        <title>Palette checker - Are My Colours Accessible</title>
      </Head>
      <Container variant="palette">
        <Layout variant="full">
          <PalettePage />
        </Layout>
        <Footer />
      </Container>
    </>
  );
};

export default Palette;
