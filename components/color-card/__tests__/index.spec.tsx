/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import ColorCard from '..';

describe('ColorCard', () => {

  it('renders without crashing', () => {
    ReactDOM.render(
      <ColorCard />,
      document.createElement('div')
    );
  });

});
