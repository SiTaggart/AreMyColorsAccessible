/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import ColorInputs, { ColorInputsProps } from '..';
import ColorCombos from '../../../utils/color-combos';
import { ColorCombosTypes } from '../../../types';

describe('ColorInputs', () => {
  let colorCombos: Array<ColorCombosTypes> | false;
  let mockProps: ColorInputsProps;
  let handleBackgroundColorInputChange: jest.Mock;
  let handleBackgroundColorSliderChange: jest.Mock;
  let handleTextColorInputChange: jest.Mock;
  let handleTextColorSliderChange: jest.Mock;
  let wrapper: ReactWrapper;

  beforeAll(() => {
    handleBackgroundColorInputChange = jest.fn();
    handleBackgroundColorSliderChange = jest.fn();
    handleTextColorInputChange = jest.fn();
    handleTextColorSliderChange = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    colorCombos = ColorCombos(['#fff', '#000']);
    if (colorCombos !== false) {
      mockProps = {
        background: '#000',
        colorCombos: colorCombos,
        handleBackgroundColorInputChange: handleBackgroundColorInputChange,
        handleBackgroundColorSliderChange: handleBackgroundColorSliderChange,
        handleTextColorInputChange: handleTextColorInputChange,
        handleTextColorSliderChange: handleTextColorSliderChange,
        isLight: false,
        textColor: '#fff'
      };
    }
    wrapper = mount(<ColorInputs {...mockProps} />);
  });

  it('renders without crashing', () => {
    ReactDOM.render(<ColorInputs {...mockProps} />, document.createElement('div'));
    const colorCard = renderer.create(<ColorInputs {...mockProps} />).toJSON();
    expect(colorCard).toMatchSnapshot();
  });

  it('should call the handleTextColorInputChange callback on text color change', () => {
    wrapper
      .find('#textColor')
      .at(0)
      .simulate('change', { target: { value: '#ccc' } });
    expect(handleTextColorInputChange).toBeCalledWith('#ccc');
  });

  it('should call the handleBackgroundColorInputChange callback on background color change', () => {
    wrapper
      .find('#background')
      .at(0)
      .simulate('change', { target: { value: '#ccc' } });
    expect(handleBackgroundColorInputChange).toBeCalledWith('#ccc');
  });

  it('should call the handleTextColorSliderChange callback on text color slider change', () => {
    console.log('wrapper log', wrapper);
    wrapper
      .find('#textColor-hsl-Lightness')
      .at(0)
      .simulate('input', { target: { value: 12 } });
    mount(<ColorInputs {...mockProps} />).update();
    expect(handleTextColorSliderChange).toBeCalledWith('#1F1F1F', 'textColor-hsl');
  });

  it('should call the handleBackgroundColorSliderChange callback on background color change', () => {
    wrapper
      .find('#background-hsl-Lightness')
      .at(0)
      .simulate('input', { target: { value: '90' } });
    expect(handleBackgroundColorSliderChange).toBeCalledWith('#E6E6E6', 'background-hsl');
  });
});
