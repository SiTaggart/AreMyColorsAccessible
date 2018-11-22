/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import PaletteInput from '..';

describe('PaletteInput', () => {

  it('renders without crashing', () => {
    ReactDOM.render(
      <PaletteInput />,
      document.createElement('div')
    );
  });

});
