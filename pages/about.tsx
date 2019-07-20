import React, { ReactElement } from 'react';
import About from '../components/about';
import AppContainer from '../components/layouts/app-container';
import { SiteData } from '../types';
import { SiteDataProvider } from '../context/home';

interface AboutPageProps {
  query: SiteData;
}
const AboutPage: React.FC<AboutPageProps> = (
  props: AboutPageProps
): ReactElement<HTMLDivElement> => (
  <SiteDataProvider initialSiteData={props.query}>
    <AppContainer>
      <About />
    </AppContainer>
  </SiteDataProvider>
);

export default AboutPage;
