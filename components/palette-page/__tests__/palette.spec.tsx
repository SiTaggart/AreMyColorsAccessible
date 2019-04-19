/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import PalettePage from '../';

describe('Palette Page', (): void => {
  it('renders without crashing', (): void => {
    ReactDOM.render(<PalettePage />, document.createElement('div'));
    const paletteCmp = renderer.create(<PalettePage />).toJSON();
    expect(paletteCmp).toMatchSnapshot();
  });
});
