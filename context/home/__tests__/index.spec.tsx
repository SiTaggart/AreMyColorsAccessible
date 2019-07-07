/* eslint-env jest */

import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { HomeContext, useSiteData, SiteDataProvider } from '../';

describe('AppContainer', (): void => {
  let ChildComponent: React.FunctionComponent<{}> = (): ReactElement<HTMLDivElement> => {
    return <div />;
  };
  it('renders without crashing', (): void => {
    ReactDOM.render(
      <SiteDataProvider
        initialSiteData={{
          background: '#000',
          textColor: '#fff',
          isLight: false,
          colorCombos: []
        }}
      >
        <ChildComponent />
      </SiteDataProvider>,
      document.createElement('div')
    );
  });
});
