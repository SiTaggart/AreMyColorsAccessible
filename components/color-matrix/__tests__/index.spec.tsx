/* eslint-env jest */
/// <reference types="jest" />
import { expect } from '@jest/globals';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ColorCombos from 'color-combos';
import { ColorMatrix, ColorMatrixProps } from '..';

describe('ColorMatrix', (): void => {
  const onColorChangeMock: jest.Mock = jest.fn();
  const mockColorColorCombos = ColorCombos(['#fff', '#ccc', '#777', '#000']);
  let mockProps: ColorMatrixProps;

  if (mockColorColorCombos !== false) {
    mockProps = {
      colors: ['#fff', '#ccc', '#777', '#000'],
      colorCombos: mockColorColorCombos,
      onColorChange: onColorChangeMock,
    };
  }

  it('renders without crashing', (): void => {
    const { asFragment } = render(<ColorMatrix {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call the onColorChange method when a color is changed in an input', (): void => {
    const { getByTestId } = render(<ColorMatrix {...mockProps} />);
    fireEvent.change(getByTestId('colorhex-0'), { target: { value: '#ccc' } });
    expect(onColorChangeMock).toHaveBeenCalledWith('#ccc', 0);
  });

  it('should call the onColorChange method when a color is changed in on a slider', (): void => {
    const { getByTestId } = render(<ColorMatrix {...mockProps} />);
    fireEvent.change(getByTestId('hsl-0-Lightness'), { target: { value: '12' } });
    expect(onColorChangeMock).toHaveBeenCalledWith('#1F1F1F', 0);
  });
});
