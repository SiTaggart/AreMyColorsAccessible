import React, { ReactElement } from 'react';
import Home from '../components/home';
import AppContainer from '../components/layouts/app-container';
import { SiteDataProvider } from '../context/home';
import { SiteData } from '../types';

interface IndexPageProps {
  query: SiteData;
}

const Index: React.FC<IndexPageProps> = ({
  query
}: {
  query: SiteData;
}): ReactElement<HTMLDivElement> => {
  return (
    <SiteDataProvider initialSiteData={query}>
      <AppContainer>
        <Home />
      </AppContainer>
    </SiteDataProvider>
  );
};

// @ts-ignore
Index.getInitialProps = async ({
  query
}: {
  query: SiteData;
}): Promise<{
  query: SiteData;
}> => {
  return { query };
};
export default Index;
