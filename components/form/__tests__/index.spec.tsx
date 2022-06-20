/* eslint-env jest */
/// <reference types="jest" />
import { expect } from '@jest/globals';

import { render } from '@testing-library/react';
import React from 'react';
import { Form } from '..';

describe('Form', (): void => {
  it('renders without crashing', (): void => {
    const { asFragment } = render(<Form>children</Form>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render inline styles when past', (): void => {
    const { asFragment } = render(<Form style={{ backgroundColor: '#fff' }}>children</Form>);
    expect(asFragment()).toMatchSnapshot();
  });
});
