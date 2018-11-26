/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import FormInput from '..';

describe('FormInput', () => {

  it('renders without crashing', () => {
    ReactDOM.render(
      <FormInput />,
      document.createElement('div')
    );
  });

});
