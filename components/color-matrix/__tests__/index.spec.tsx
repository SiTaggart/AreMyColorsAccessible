/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper } from 'enzyme';
import renderer from 'react-test-renderer';
import ColorMatrix, { ColorMatrixProps } from '..';
import ColorCombos from '../../../utils/color-combos';

describe('ColorMatrix', () => {
  const onColorChangeMock: jest.Mock = jest.fn();
  const mockColorColorCombos = ColorCombos(['#fff', '#ccc', '#777', '#000']);
  let mockProps: ColorMatrixProps;
  let wrapper: ReactWrapper;

  if (mockColorColorCombos !== false) {
    mockProps = {
      colors: ['#fff', '#ccc', '#777', '#000'],
      colorCombos: mockColorColorCombos,
      onColorChange: onColorChangeMock
    };
  }

  it('renders without crashing', () => {
    ReactDOM.render(<ColorMatrix {...mockProps} />, document.createElement('div'));
    const colorCard = renderer.create(<ColorMatrix {...mockProps} />).toJSON();
    expect(colorCard).toMatchSnapshot();
  });

  it('should call the onColorChange method when a color is changed in an input', () => {
    wrapper = mount(<ColorMatrix {...mockProps} />);
    wrapper
      .find('#colorhex-0')
      .at(0)
      .simulate('change', { target: { value: '#ccc' } });
    expect(onColorChangeMock).toBeCalledWith('#ccc', 0);
  });

  it('should call the onColorChange method when a color is changed in on a slider', () => {
    wrapper = mount(<ColorMatrix {...mockProps} />);
    wrapper
      .find('#hsl-0-Lightness')
      .at(0)
      .simulate('input', { target: { value: '12' } });
    expect(onColorChangeMock).toBeCalledWith('#1F1F1F', 0);
  });
});
