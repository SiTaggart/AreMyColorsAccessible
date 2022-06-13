/* eslint-env jest */
/// <reference types="jest" />
import { expect } from '@jest/globals';
import { render } from '@testing-library/react';
import * as React from 'react';

import HomePage from '../pages';

describe('Home Page', (): void => {
  it('should render without crashing', (): void => {
    const { asFragment } = render(<HomePage />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render based on query string props', (): void => {
    const { asFragment } = render(
      <HomePage
        query={{
          background: '#5E38A8',
          isLight: false,
          textColor: '#eee',
          colorCombos: [],
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
