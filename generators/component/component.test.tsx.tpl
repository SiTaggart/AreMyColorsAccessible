/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import { {{pascalCase name}} } from '..';

describe('{{pascalCase name}}', (): void => {

  it('renders without crashing', (): void => {
    ReactDOM.render(
      <{{pascalCase name}} />,
      document.createElement('div')
    );
  });

});
