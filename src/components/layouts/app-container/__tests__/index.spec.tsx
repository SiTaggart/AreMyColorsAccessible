import React, { ReactElement } from 'react';
import { AppContainer } from '..';
import { SiteDataProvider } from '../../../../context/home';
import { renderWithRouter } from '~/test/render';

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
          textColor: '#fff',
          isLight: false,
          colorCombos: [],
        }}
      >
        <AppContainer>
          <ChildComponent />
        </AppContainer>
      </SiteDataProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('changes the footer link colors based on isLight prop', async (): Promise<void> => {
    const { asFragment } = await renderWithRouter(
      <SiteDataProvider
        initialSiteData={{
          background: '#fff',
          textColor: '#000',
          isLight: true,
          colorCombos: [],
        }}
      >
        <AppContainer>
          <ChildComponent />
        </AppContainer>
      </SiteDataProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
