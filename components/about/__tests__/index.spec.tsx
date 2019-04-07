/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import About from '..';

describe('About', (): void => {
  it('renders without crashing', (): void => {
    ReactDOM.render(<About />, document.createElement('div'));
  });
});
