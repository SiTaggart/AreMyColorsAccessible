/* eslint-env jest */
/// <reference types="jest" />
import { expect } from '@jest/globals';

import { render } from '@testing-library/react';
import React from 'react';
import { PaletteInput } from '..';

describe('PaletteInput', (): void => {
  const mockOnColorAdd: jest.Mock = jest.fn();

  it('renders without crashing', (): void => {
    const { asFragment } = render(<PaletteInput onColorAdd={mockOnColorAdd} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render an error message when passed', (): void => {
    const { asFragment } = render(
      <PaletteInput errorMessage="I'm an error" onColorAdd={mockOnColorAdd} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
