/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import HslSlider from '..';

describe('hsl-slider', () => {
  let onChangeMock: jest.Mock;
  let wrapper: ShallowWrapper;
  let instance: HslSlider;

  beforeAll(() => {
    onChangeMock = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(<HslSlider id="input-id" onChange={onChangeMock} value="#ccc" />);
    instance = wrapper.instance() as HslSlider;
  });

  it('renders without crashing', () => {
    ReactDOM.render(
      <HslSlider id="input-id" onChange={onChangeMock} value="#ccc" />,
      document.createElement('div')
    );
  });

  it('should set state with hsl of value', () => {
    expect(instance.state).toEqual({ hue: 0, saturation: 0, lightness: 80 });
  });

  it('should call onchange callback', () => {
    const wrapper: ReactWrapper = mount(
      <HslSlider id="input-id" onChange={onChangeMock} value="#ccc" />
    );
    wrapper.find('#input-id-Hue').simulate('input', { target: { value: '60' } });
    const instance = wrapper.instance() as HslSlider;
    expect(instance.state.hue).toEqual(60);
    // fake it as its debounced
    instance.updateColor();
    expect(onChangeMock).toBeCalledWith('#CCCCCC');
  });
});
