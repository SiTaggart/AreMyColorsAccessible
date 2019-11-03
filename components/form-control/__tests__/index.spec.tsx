/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { FormControl } from '..';

describe('FormControl', (): void => {
  it('renders without crashing', (): void => {
    ReactDOM.render(<FormControl>children</FormControl>, document.createElement('div'));
    const formControlCmp = renderer.create(<FormControl>children</FormControl>).toJSON();
    expect(formControlCmp).toMatchSnapshot();
  });
});
