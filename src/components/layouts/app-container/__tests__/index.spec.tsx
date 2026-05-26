import React, { ReactElement } from 'react';

import { renderWithRouter } from '~/test/render';

import { AppContainer } from '..';
import { SiteDataProvider } from '../../../../context/home';

describe('AppContainer', (): void => {
  let ChildComponent: React.FunctionComponent = (): ReactElement<HTMLDivElement> => <div />;

  beforeAll((): void => {
    // eslint-disable-next-line react/display-name
    ChildComponent = (): ReactElement => <div />;
  });

  it('renders without crashing', async (): Promise<void> => {
    const { asFragment } = await renderWithRouter(
      <SiteDataProvider
        initialSiteData={{
          background: '#000',
          colorCombos: [],
          isLight: false,
          textColor: '#fff',
        }}
      >
        <AppContainer>
          <ChildComponent />
        </AppContainer>
      </SiteDataProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('changes the footer link colors based on isLight prop', async (): Promise<void> => {
    const { asFragment } = await renderWithRouter(
      <SiteDataProvider
        initialSiteData={{
          background: '#fff',
          colorCombos: [],
          isLight: true,
          textColor: '#000',
        }}
      >
        <AppContainer>
          <ChildComponent />
        </AppContainer>
      </SiteDataProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
