/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Home from '..';
import { SiteDataProvider } from '../../../context/home';

describe('Home', (): void => {
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
        <Home />
      </SiteDataProvider>,
      document.createElement('div')
    );
    const homeCmp = renderer
      .create(
        <SiteDataProvider
          initialSiteData={{
            background: '#000',
            textColor: '#fff',
            isLight: false,
            colorCombos: [],
          }}
        >
          <Home />
        </SiteDataProvider>
      )
      .toJSON();
    expect(homeCmp).toMatchSnapshot();
  });
});
