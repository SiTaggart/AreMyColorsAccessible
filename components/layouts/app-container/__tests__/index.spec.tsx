/* eslint-env jest */
/// <reference types="jest" />
import { expect } from '@jest/globals';

import { render } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { AppContainer } from '..';
import { SiteDataProvider } from '../../../../context/home';

describe('AppContainer', (): void => {
  let ChildComponent: React.FunctionComponent = (): ReactElement<HTMLDivElement> => <div />;

  beforeAll((): void => {
    // eslint-disable-next-line react/display-name
    ChildComponent = (): JSX.Element => <div />;
  });

  it('renders without crashing', (): void => {
    const { asFragment } = render(
      <SiteDataProvider
        initialSiteData={{
          background: '#000',
          textColor: '#fff',
          isLight: false,
          colorCombos: [],
        }}
      >
        <AppContainer title="are my colors accessible">
          <ChildComponent />
        </AppContainer>
      </SiteDataProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('changes the footer link colors based on isLight prop', (): void => {
    const { asFragment } = render(
      <SiteDataProvider
        initialSiteData={{
          background: '#fff',
          textColor: '#000',
          isLight: true,
          colorCombos: [],
        }}
      >
        <AppContainer title="are my colors accessible">
          <ChildComponent />
        </AppContainer>
      </SiteDataProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
