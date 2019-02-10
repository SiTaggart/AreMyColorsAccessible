import React, { ReactElement } from 'react';
import About from '../components/about';
import AppContainer from '../components/layouts/app-container';

const AboutPage = (): ReactElement<HTMLDivElement> => (
  <AppContainer>{() => <About />}</AppContainer>
);

export default AboutPage;
