/* eslint-env jest */
/// <reference types="jest" />

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Form } from '..';

describe('Form', (): void => {
  it('renders without crashing', (): void => {
    ReactDOM.render(<Form>children</Form>, document.createElement('div'));
    const formCmp = renderer.create(<Form>children</Form>).toJSON();
    expect(formCmp).toMatchSnapshot();
  });
  it('should render inline styles when past', (): void => {
    const formCmp = renderer
      .create(<Form style={{ backgroundColor: '#fff' }}>children</Form>)
      .toJSON();
    expect(formCmp).toMatchSnapshot();
  });
});
