/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Form from '..';

describe('Form', () => {
  it('renders without crashing', () => {
    ReactDOM.render(<Form>children</Form>, document.createElement('div'));
    const formCmp = renderer.create(<Form>children</Form>).toJSON();
    expect(formCmp).toMatchSnapshot();
  });
  it('should render inline styles when past', () => {
    const formCmp = renderer
      .create(<Form style={{ backgroundColor: '#fff' }}>children</Form>)
      .toJSON();
    expect(formCmp).toMatchSnapshot();
  });
});
