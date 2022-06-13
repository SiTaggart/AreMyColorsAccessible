/* eslint-env jest */
/// <reference types="jest" />

import { render } from '@testing-library/react';
import React from 'react';
import { Footer } from '..';

describe('Footer', (): void => {
  const mockProps = {
    styles: {
      footerLinks: {
        color: '#fff',
      },
    },
  };

  it('renders without crashing', (): void => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders footerLink styles added', (): void => {
    const { asFragment } = render(<Footer {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
