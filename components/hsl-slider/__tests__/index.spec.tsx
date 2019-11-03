/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import renderer from 'react-test-renderer';
import { HSLSlider } from '..';

describe('hsl-slider', (): void => {
  let onChangeMock: jest.Mock;
  let wrapper: ShallowWrapper;

  beforeAll((): void => {
    onChangeMock = jest.fn();
  });

  beforeEach((): void => {
    jest.clearAllMocks();
    wrapper = shallow(
      <HSLSlider
        id="input-id"
        label="Test"
        max={20}
        min={100}
        onChange={onChangeMock}
        onInput={onChangeMock}
        symbol="%"
        value={30}
      />
    );
  });

  it('renders without crashing', (): void => {
    ReactDOM.render(
      <HSLSlider
        id="input-id"
        label="test"
        max={20}
        min={100}
        onChange={onChangeMock}
        onInput={onChangeMock}
        symbol="%"
        value={30}
      />,
      document.createElement('div')
    );
    const hslSliderComp = renderer
      .create(
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
      )
      .toJSON();
    expect(hslSliderComp).toMatchSnapshot();
  });

  describe('compact variant', (): void => {
    it('should render a compact variant ', (): void => {
      const hslSliderComp = renderer
        .create(
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
        )
        .toJSON();
      expect(hslSliderComp).toMatchSnapshot();
    });

    it('should render the slider input label as the first letter', (): void => {
      const newWrapper: ReactWrapper = mount(
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

      expect(
        newWrapper
          .find('[htmlFor="input-id"]')
          .at(0)
          .text()
      ).toBe('T');
    });
  });

  it('should call onchange callback when value changed with onChnage', (): void => {
    wrapper.find('#input-id').simulate('change', { target: { value: '60' } });
    expect(onChangeMock).toHaveBeenCalledWith({ target: { value: '60' } });
  });

  it('should call onchange callback when value changed with onInput', (): void => {
    wrapper.find('#input-id').simulate('input', { target: { value: '60' } });
    expect(onChangeMock).toHaveBeenCalledWith({ target: { value: '60' } });
  });
});
