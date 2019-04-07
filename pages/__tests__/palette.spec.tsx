/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Palette from '../palette';

describe('Palette Page', (): void => {
  it('renders without crashing', (): void => {
    ReactDOM.render(<Palette />, document.createElement('div'));
    const paletteCmp = renderer.create(<Palette />).toJSON();
    expect(paletteCmp).toMatchSnapshot();
  });
});
