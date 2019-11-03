/* eslint-env jest */

import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { AppContainer } from '..';
import { SiteDataProvider } from '../../../../context/home';

describe('AppContainer', (): void => {
  let ChildComponent: React.FunctionComponent<{}> = (): ReactElement<HTMLDivElement> => <div />;

  beforeAll((): void => {
    ChildComponent = function ChildComponentFn(): JSX.Element {
      return <div />;
    };
  });

  it('renders without crashing', (): void => {
    ReactDOM.render(
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
      </SiteDataProvider>,
      document.createElement('div')
    );

    const appContainerCmp = renderer
      .create(
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
      )
      .toJSON();
    expect(appContainerCmp).toMatchSnapshot();
  });

  it('changes the footer link colors based on isLight prop', (): void => {
    const appContainerCmp = renderer
      .create(
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
      )
      .toJSON();
    expect(appContainerCmp).toMatchSnapshot();
  });
});
