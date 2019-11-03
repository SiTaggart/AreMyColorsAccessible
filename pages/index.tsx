import React, { ReactElement } from 'react';
import { NextPage, NextPageContext } from 'next';
import { Home } from '../components/home';
import { AppContainer } from '../components/layouts/app-container';
import { SiteDataProvider } from '../context/home';
import { SiteData } from '../types';

interface IndexPageProps {
  query?: {};
}

const Index: NextPage<IndexPageProps> = ({
  query,
}: IndexPageProps): ReactElement<HTMLDivElement> => (
  <SiteDataProvider initialSiteData={query as SiteData}>
    <AppContainer>
      <Home />
    </AppContainer>
  </SiteDataProvider>
);

Index.getInitialProps = async ({
  query,
}: NextPageContext): Promise<{
  query: {};
}> => ({ query });

// eslint-disable-next-line import/no-default-export
export default Index;
