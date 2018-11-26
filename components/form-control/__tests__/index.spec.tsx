/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import FormControl from '..';

describe('FormControl', () => {

  it('renders without crashing', () => {
    ReactDOM.render(
      <FormControl />,
      document.createElement('div')
    );
  });

});
