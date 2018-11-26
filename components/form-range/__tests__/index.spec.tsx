/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import FormRange from '..';

describe('FormRange', () => {

  it('renders without crashing', () => {
    ReactDOM.render(
      <FormRange />,
      document.createElement('div')
    );
  });

});
