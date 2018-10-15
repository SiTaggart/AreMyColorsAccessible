/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import HslSlider from '..';

describe('hsl-slider', () => {
  let onChangeMock = null;
  beforeAll(() => {
    onChangeMock = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    ReactDOM.render(
      <HslSlider id="input-id" onChange={onChangeMock} value="#ccc" />,
      document.createElement('div')
    );
  });

  it('should set state with hsl of value', () => {
    const wrapper = shallow(<HslSlider id="input-id" onChange={onChangeMock} value="#ccc" />);
    expect(wrapper.instance().state).toEqual({ hue: 0, saturation: 0, lightness: 80 });
  });

  it('should call onchange callback', () => {
    const wrapper = mount(<HslSlider id="input-id" onChange={onChangeMock} value="#ccc" />);
    wrapper.find('#input-id-Hue').simulate('input', { target: { value: '60' } });
    expect(wrapper.instance().state.hue).toEqual(60);
    // fake it as its debounced
    wrapper.instance().updateColor();
    expect(onChangeMock).toBeCalledWith('#CCCCCC');
  });
});
