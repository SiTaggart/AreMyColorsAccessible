/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import Footer from '..';

describe('Footer', () => {

  it('renders without crashing', () => {
    ReactDOM.render(
      <Footer />,
      document.createElement('div')
    );
  });

});
