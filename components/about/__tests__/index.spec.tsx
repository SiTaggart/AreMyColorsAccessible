/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import About from '..';

describe('About', () => {
  it('renders without crashing', () => {
    ReactDOM.render(<About />, document.createElement('div'));
  });
});
