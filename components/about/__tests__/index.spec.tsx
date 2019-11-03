/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { About } from '..';

describe('About', (): void => {
  it('renders without crashing', (): void => {
    ReactDOM.render(<About />, document.createElement('div'));
    const aboutCmp = renderer.create(<About />).toJSON();
    expect(aboutCmp).toMatchSnapshot();
  });
});
