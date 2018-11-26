/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import Form from '..';

describe('Form', () => {

  it('renders without crashing', () => {
    ReactDOM.render(
      <Form />,
      document.createElement('div')
    );
  });

});
