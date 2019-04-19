import React, { ReactFragment } from 'react';

import Container from '../components/layouts/container';
import Layout from '../components/layouts/layout';
import Head from 'next/head';
import PalettePage from '../components/palette-page';
import Footer from '../components/footer';

class Palette extends React.Component<{}, {}> {
  public render(): ReactFragment {
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
  }
}

export default Palette;
