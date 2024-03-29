/* eslint-env jest */
/// <reference types="jest" />
import { expect } from '@jest/globals';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { HSLSlider } from '..';

describe('hsl-slider', (): void => {
  const onChangeMock = jest.fn();

  it('renders without crashing', (): void => {
    const { asFragment } = render(
      <HSLSlider
        id="input-id"
        label="test"
        max={20}
        min={100}
        onChange={onChangeMock}
        onInput={onChangeMock}
        symbol="%"
        value={30}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe('compact variant', (): void => {
    it('should render a compact variant', (): void => {
      const { asFragment } = render(
        <HSLSlider
          id="input-id"
          label="test"
          max={20}
          min={100}
          onChange={onChangeMock}
          onInput={onChangeMock}
          symbol="%"
          value={30}
          variant="compact"
        />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render the slider input label as the first letter', (): void => {
      const { getByLabelText } = render(
        <HSLSlider
          id="input-id"
          label="Test"
          max={20}
          min={100}
          onChange={onChangeMock}
          onInput={onChangeMock}
          symbol="%"
          value={30}
          variant="compact"
        />
      );
      expect(getByLabelText('T')).not.toBeNull();
    });
  });

  it('should call onchange callback when value changed with onChnage', (): void => {
    const { getByTestId } = render(
      <HSLSlider
        id="onchange-test"
        label="Test"
        max={20}
        min={100}
        onChange={onChangeMock}
        onInput={onChangeMock}
        symbol="%"
        value={30}
      />
    );
    fireEvent.change(getByTestId('onchange-test'), { target: { value: '60' } });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('should call onchange callback when value changed with onInput', (): void => {
    const onInputMock = jest.fn();
    const { getByTestId } = render(
      <HSLSlider
        id="oninput-test"
        label="Test"
        max={20}
        min={100}
        onChange={onInputMock}
        onInput={onInputMock}
        symbol="%"
        value={30}
      />
    );
    fireEvent.change(getByTestId('oninput-test'), { target: { value: '60' } });
    expect(onInputMock).toHaveBeenCalled();
  });
});
