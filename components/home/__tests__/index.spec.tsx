/* eslint-env jest */
/// <reference types="jest" />
import { expect } from '@jest/globals';

import { render } from '@testing-library/react';
import React from 'react';
import { Home } from '..';
import { SiteDataProvider } from '../../../context/home';

describe('Home', (): void => {
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
        <Home />
      </SiteDataProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
