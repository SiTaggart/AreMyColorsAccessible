/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper } from 'enzyme';
import renderer from 'react-test-renderer';
import ColorCombos from 'color-combos';
import ColorMatrix, { ColorMatrixProps } from '..';

describe('ColorMatrix', (): void => {
  const onColorChangeMock: jest.Mock = jest.fn();
  const mockColorColorCombos = ColorCombos(['#fff', '#ccc', '#777', '#000']);
  let mockProps: ColorMatrixProps;
  let wrapper: ReactWrapper;

  if (mockColorColorCombos !== false) {
    mockProps = {
      colors: ['#fff', '#ccc', '#777', '#000'],
      colorCombos: mockColorColorCombos,
      onColorChange: onColorChangeMock,
    };
  }

  beforeEach((): void => {
    jest.clearAllMocks();
    wrapper = mount(<ColorMatrix {...mockProps} onColorChange={onColorChangeMock} />);
  });

  it('renders without crashing', (): void => {
    ReactDOM.render(<ColorMatrix {...mockProps} />, document.createElement('div'));
    const colorCard = renderer.create(<ColorMatrix {...mockProps} />).toJSON();
    expect(colorCard).toMatchSnapshot();
  });

  it('should call the onColorChange method when a color is changed in an input', (): void => {
    wrapper
      .find('#colorhex-0')
      .at(0)
      .simulate('change', { target: { value: '#ccc' } });
    expect(onColorChangeMock).toHaveBeenCalledWith('#ccc', 0);
  });

  it.skip('should call the onColorChange method when a color is changed in on a slider', (): void => {
    wrapper
      .find('#hsl-0-Lightness')
      .at(0)
      .simulate('change', { target: { value: '12' } });
    expect(onColorChangeMock).toHaveBeenCalledWith('#1F1F1F', 0);
  });
});
