/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import {{pascalCase name}} from '../{{kebabCase name}}';

describe('{{pascalCase name}}', () => {

  it('renders without crashing', () => {
    ReactDOM.render(
      <{{pascalCase name}} />,
      document.createElement('div')
    );
  });

});
