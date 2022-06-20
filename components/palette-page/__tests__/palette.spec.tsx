/* eslint-env jest */
/// <reference types="jest" />
import { expect } from '@jest/globals';

import React from 'react';
import { render } from '@testing-library/react';
import { PaletteDataProvider } from '../../../context/palette';
import { PalettePage } from '..';

describe('Palette Page', (): void => {
  it('renders without crashing', (): void => {
    const { asFragment } = render(
      <PaletteDataProvider>
        <PalettePage />
      </PaletteDataProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
