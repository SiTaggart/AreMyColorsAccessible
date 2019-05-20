/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import renderer from 'react-test-renderer';
import HslSlider from '..';

describe('hsl-slider', (): void => {
  let onChangeMock: jest.Mock;
  let wrapper: ShallowWrapper;

  beforeAll(
    (): void => {
      onChangeMock = jest.fn();
    }
  );

  beforeEach(
    (): void => {
      jest.clearAllMocks();
      wrapper = shallow(<HslSlider id="input-id" onChange={onChangeMock} value="#ccc" />);
    }
  );

  it('renders without crashing', (): void => {
    ReactDOM.render(
      <HslSlider id="input-id" onChange={onChangeMock} value="#ccc" />,
      document.createElement('div')
    );
    const hslSliderComp = renderer
      .create(<HslSlider id="input-id" onChange={onChangeMock} value="#ccc" />)
      .toJSON();
    expect(hslSliderComp).toMatchSnapshot();
  });

  describe('compact variant', (): void => {
    it('should render a compact variant ', (): void => {
      const hslSliderComp = renderer
        .create(<HslSlider id="input-id" onChange={onChangeMock} value="#ccc" variant="compact" />)
        .toJSON();
      expect(hslSliderComp).toMatchSnapshot();
    });

    it('should render the slider input label as the first letter', (): void => {
      const wrapper: ReactWrapper = mount(
        <HslSlider id="input-id" onChange={onChangeMock} value="#ccc" variant="compact" />
      );

      expect(
        wrapper
          .find('[htmlFor="input-id-Hue"]')
          .at(0)
          .text()
      ).toBe('H');

      expect(
        wrapper
          .find('[htmlFor="input-id-Saturation"]')
          .at(1)
          .text()
      ).toBe('S');

      expect(
        wrapper
          .find('[htmlFor="input-id-Lightness"]')
          .at(2)
          .text()
      ).toBe('L');
    });
  });

  it('should call onchange callback when hue changed', (): void => {
    wrapper.find('#input-id-Hue').simulate('input', { target: { value: '60' } });
    expect(onChangeMock).toBeCalledWith('#CCCCCC', 'input-id');
  });

  it('should call onchange callback when saturation changed', (): void => {
    wrapper.find('#input-id-Saturation').simulate('input', { target: { value: '60' } });
    expect(onChangeMock).toBeCalledWith('#EBADAD', 'input-id');
  });

  it('should call onchange callback when lightness changed', (): void => {
    wrapper.find('#input-id-Lightness').simulate('input', { target: { value: '60' } });
    expect(onChangeMock).toBeCalledWith('#999999', 'input-id');
  });
});
