/* eslint-env jest */
/// <reference types="jest" />
import { expect } from '@jest/globals';

import { render } from '@testing-library/react';
import React from 'react';
import { FormLabel } from '..';

describe('FormLabel', (): void => {
  it('renders without crashing', (): void => {
    const { asFragment } = render(<FormLabel htmlFor="input-id">children</FormLabel>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should create a large label style with variant large', (): void => {
    const { asFragment } = render(
      <FormLabel htmlFor="input-id" variant="large">
        children
      </FormLabel>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
