/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import renderer from 'react-test-renderer';
import { HslSliders } from '..';

describe('hsl-slider', (): void => {
  const onChangeMock: jest.Mock = jest.fn();
  let wrapper: ShallowWrapper;

  beforeEach((): void => {
    jest.clearAllMocks();
    wrapper = shallow(<HslSliders id="input-id" onChange={onChangeMock} value="#ccc" />);
  });

  it('renders without crashing', (): void => {
    ReactDOM.render(
      <HslSliders id="input-id" onChange={onChangeMock} value="#ccc" />,
      document.createElement('div')
    );
    const hslSlidersComp = renderer
      .create(<HslSliders id="input-id" onChange={onChangeMock} value="#ccc" />)
      .toJSON();
    expect(hslSlidersComp).toMatchSnapshot();
  });

  describe('compact variant', (): void => {
    it('should render a compact variant ', (): void => {
      const hslSlidersComp = renderer
        .create(<HslSliders id="input-id" onChange={onChangeMock} value="#ccc" variant="compact" />)
        .toJSON();
      expect(hslSlidersComp).toMatchSnapshot();
    });

    it('should render the slider input label as the first letter', (): void => {
      const newWrapper: ReactWrapper = mount(
        <HslSliders id="input-id" onChange={onChangeMock} value="#ccc" variant="compact" />
      );

      expect(
        newWrapper
          .find('[htmlFor="input-id-Hue"]')
          .at(0)
          .text()
      ).toBe('H');

      expect(
        newWrapper
          .find('[htmlFor="input-id-Saturation"]')
          .at(1)
          .text()
      ).toBe('S');

      expect(
        newWrapper
          .find('[htmlFor="input-id-Lightness"]')
          .at(2)
          .text()
      ).toBe('L');
    });
  });

  it('should call onchange callback when hue changed', (): void => {
    wrapper.find('#input-id-Hue').simulate('input', { target: { value: '60' } });
    expect(onChangeMock).toHaveBeenCalledWith('#CCCCCC', 'input-id');
  });

  it('should call onchange callback when saturation changed', (): void => {
    wrapper.find('#input-id-Saturation').simulate('input', { target: { value: '60' } });
    expect(onChangeMock).toHaveBeenCalledWith('#EBADAD', 'input-id');
  });

  it('should call onchange callback when lightness changed', (): void => {
    wrapper.find('#input-id-Lightness').simulate('input', { target: { value: '60' } });
    expect(onChangeMock).toHaveBeenCalledWith('#999999', 'input-id');
  });
});
