/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import ColorMatrix from '..';

describe('ColorMatrix', () => {

  it('renders without crashing', () => {
    ReactDOM.render(
      <ColorMatrix />,
      document.createElement('div')
    );
  });

});
