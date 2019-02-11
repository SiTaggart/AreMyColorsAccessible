import React, { ReactElement } from 'react';
import Home from '../components/home';
import AppContaienr from '../components/layouts/app-container';

const Index = (): ReactElement<HTMLDivElement> => (
  <AppContaienr>{props => <Home {...props} />}</AppContaienr>
);

export default Index;
