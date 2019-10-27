import React, { ReactElement } from 'react';
import { NextPage, NextPageContext } from 'next';
import Home from '../components/home';
import AppContainer from '../components/layouts/app-container';
import { SiteDataProvider } from '../context/home';
import { SiteData } from '../types';

interface IndexPageProps {
  query?: {};
}

const Index: NextPage<IndexPageProps> = ({
  query,
}: IndexPageProps): ReactElement<HTMLDivElement> => {
  return (
    <SiteDataProvider initialSiteData={query as SiteData}>
      <AppContainer>
        <Home />
      </AppContainer>
    </SiteDataProvider>
  );
};

Index.getInitialProps = async ({
  query,
}: NextPageContext): Promise<{
  query: {};
}> => {
  return { query };
};
export default Index;
