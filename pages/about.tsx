import React, { ReactElement } from 'react';
import { About } from '../components/about';
import { AppContainer } from '../components/layouts/app-container';
import { SiteData } from '../types';
import { SiteDataProvider } from '../context/home';

interface AboutPageProps {
  query: SiteData;
}
const AboutPage: React.FC<AboutPageProps> = ({
  query,
}: AboutPageProps): ReactElement<HTMLDivElement> => (
  <SiteDataProvider initialSiteData={query}>
    <AppContainer>
      <About />
    </AppContainer>
  </SiteDataProvider>
);

// eslint-disable-next-line import/no-default-export
export default AboutPage;
