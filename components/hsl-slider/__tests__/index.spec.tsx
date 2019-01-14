/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import renderer from 'react-test-renderer';
import HslSlider from '..';

describe('hsl-slider', () => {
  let onChangeMock: jest.Mock;
  let wrapper: ShallowWrapper;

  beforeAll(() => {
    onChangeMock = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(<HslSlider id="input-id" onChange={onChangeMock} value="#ccc" />);
  });

  it('renders without crashing', () => {
    ReactDOM.render(
      <HslSlider id="input-id" onChange={onChangeMock} value="#ccc" />,
      document.createElement('div')
    );
    const hslSliderComp = renderer
      .create(<HslSlider id="input-id" onChange={onChangeMock} value="#ccc" />)
      .toJSON();
    expect(hslSliderComp).toMatchSnapshot();
  });

  it('should render a compact vaiant ', () => {
    const hslSliderComp = renderer
      .create(<HslSlider id="input-id" onChange={onChangeMock} value="#ccc" variant="compact" />)
      .toJSON();
    expect(hslSliderComp).toMatchSnapshot();
  });

  it('should call onchange callback when hue changed', () => {
    wrapper.find('#input-id-Hue').simulate('input', { target: { value: '60' } });
    expect(onChangeMock).toBeCalledWith('#CCCCCC', 'input-id');
  });

  it('should call onchange callback when saturation changed', () => {
    wrapper.find('#input-id-Saturation').simulate('input', { target: { value: '60' } });
    expect(onChangeMock).toBeCalledWith('#EBADAD', 'input-id');
  });

  it('should call onchange callback when lightness changed', () => {
    wrapper.find('#input-id-Lightness').simulate('input', { target: { value: '60' } });
    expect(onChangeMock).toBeCalledWith('#999999', 'input-id');
  });
});
