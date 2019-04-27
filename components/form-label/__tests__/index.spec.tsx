/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import FormLabel from '..';

describe('FormLabel', (): void => {
  it('renders without crashing', (): void => {
    ReactDOM.render(
      <FormLabel htmlFor="input-id">children</FormLabel>,
      document.createElement('div')
    );
    const formLabelCmp = renderer
      .create(<FormLabel htmlFor="input-id">children</FormLabel>)
      .toJSON();
    expect(formLabelCmp).toMatchSnapshot();
  });

  it('should create a large label style with variant large', (): void => {
    const formLabelCmp = renderer
      .create(
        <FormLabel htmlFor="input-id" variant="large">
          children
        </FormLabel>
      )
      .toJSON();
    expect(formLabelCmp).toMatchSnapshot();
  });
});
