/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import FormLabel from '..';

describe('FormLabel', () => {

  it('renders without crashing', () => {
    ReactDOM.render(
      <FormLabel />,
      document.createElement('div')
    );
  });

});
