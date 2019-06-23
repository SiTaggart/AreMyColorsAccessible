import React, { ReactElement } from 'react';
import Container from '../layouts/container';
import Layout from '../layouts/layout';
import Results from '../results';
import ColorInputs from '../colorInputs';

const Home: React.FunctionComponent<{}> = (): ReactElement => {
  return (
    <Container variant="home">
      <Layout variant="small">
        <Results />
      </Layout>
      <Layout variant="large">
        <ColorInputs />
      </Layout>
    </Container>
  );
};

export default Home;
