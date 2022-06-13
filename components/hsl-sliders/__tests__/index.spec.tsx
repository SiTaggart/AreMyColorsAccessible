/* eslint-env jest */
/// <reference types="jest" />

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { HslSliders } from '..';

describe('hsl-slider', (): void => {
  const onChangeMock = jest.fn();

  it('renders without crashing', (): void => {
    const { asFragment } = render(
      <HslSliders id="input-id" onChange={onChangeMock} value="#ccc" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe('compact variant', (): void => {
    it('should render a compact variant', (): void => {
      const { asFragment } = render(
        <HslSliders id="input-id" onChange={onChangeMock} value="#ccc" variant="compact" />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render the slider input label as the first letter', (): void => {
      const { getByLabelText } = render(
        <HslSliders id="input-id" onChange={onChangeMock} value="#ccc" variant="compact" />
      );
      expect(getByLabelText('H')).not.toBeNull();
      expect(getByLabelText('S')).not.toBeNull();
      expect(getByLabelText('L')).not.toBeNull();
    });
  });

  it('should call onchange callback when hue changed', (): void => {
    const { getByTestId } = render(
      <HslSliders id="onchange-id" onChange={onChangeMock} value="red" />
    );
    fireEvent.change(getByTestId('onchange-id-Hue'), { target: { value: '100' } });
    expect(onChangeMock).toHaveBeenCalledWith('#55FF00', 'onchange-id');
  });

  it('should call onchange callback when saturation changed', (): void => {
    const { getByTestId } = render(
      <HslSliders id="onchange-id" onChange={onChangeMock} value="#EBADAD" />
    );
    fireEvent.change(getByTestId('onchange-id-Saturation'), { target: { value: '59' } });
    expect(onChangeMock).toHaveBeenCalledWith('#EAAEAE', 'onchange-id');
  });

  it('should call onchange callback when lightness changed', (): void => {
    const { getByTestId } = render(
      <HslSliders id="onchange-id" onChange={onChangeMock} value="#999999" />
    );
    fireEvent.change(getByTestId('onchange-id-Lightness'), { target: { value: '0' } });
    expect(onChangeMock).toHaveBeenCalledWith('#000000', 'onchange-id');
  });
});
