/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { PaletteDataProvider } from '../../../context/palette';
import PalettePage from '..';

describe('Palette Page', (): void => {
  it('renders without crashing', (): void => {
    ReactDOM.render(
      <PaletteDataProvider>
        <PalettePage />
      </PaletteDataProvider>,
      document.createElement('div')
    );
    const paletteCmp = renderer
      .create(
        <PaletteDataProvider>
          <PalettePage />
        </PaletteDataProvider>
      )
      .toJSON();
    expect(paletteCmp).toMatchSnapshot();
  });
});
