/* eslint-env jest */
/// <reference types="jest" />
import { expect } from '@jest/globals';

import { render } from '@testing-library/react';
import React from 'react';
import { FormControl } from '..';

describe('FormControl', (): void => {
  it('renders without crashing', (): void => {
    const { asFragment } = render(<FormControl>children</FormControl>);
    expect(asFragment()).toMatchSnapshot();
  });
});
