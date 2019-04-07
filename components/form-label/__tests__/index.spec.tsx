/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
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

  it('should set create a large label style with isLarge', (): void => {
    const wrapper: ReactWrapper = mount(
      <FormLabel htmlFor="input-id" isLarge>
        children
      </FormLabel>
    );
    expect(wrapper.find('label').hasClass('form-label--large')).toEqual(true);
  });
});
