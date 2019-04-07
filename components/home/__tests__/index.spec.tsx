/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import Home, { HomeProps } from '..';
import { ColorCombosTypes } from '../../../types';
import ColorCombos from '../../../utils/color-combos';

describe('Home', (): void => {
  let mockProps: HomeProps;
  let handleBackgroundColorInputChange: jest.Mock;
  let handleBackgroundColorSliderChange: jest.Mock;
  let handleTextColorInputChange: jest.Mock;
  let handleTextColorSliderChange: jest.Mock;
  let colorCombos: ColorCombosTypes[] | false;
  let wrapper: ReactWrapper;

  beforeAll(
    (): void => {
      colorCombos = ColorCombos(['#fff', '#000']);
      handleBackgroundColorInputChange = jest.fn();
      handleBackgroundColorSliderChange = jest.fn();
      handleTextColorInputChange = jest.fn();
      handleTextColorSliderChange = jest.fn();
      if (colorCombos !== false) {
        mockProps = {
          handleBackgroundColorInputChange: handleBackgroundColorInputChange,
          handleBackgroundColorSliderChange: handleBackgroundColorSliderChange,
          handleTextColorInputChange: handleTextColorInputChange,
          handleTextColorSliderChange: handleTextColorSliderChange,
          siteData: {
            background: '#000',
            colorCombos: colorCombos,
            isLight: false,
            textColor: '#fff'
          }
        };
      }
    }
  );

  beforeEach(
    (): void => {
      jest.clearAllMocks();
      wrapper = mount(<Home {...mockProps} />);
    }
  );

  it('renders without crashing', (): void => {
    ReactDOM.render(<Home {...mockProps} />, document.createElement('div'));
    const homeCmp = renderer.create(<Home {...mockProps} />).toJSON();
    expect(homeCmp).toMatchSnapshot();
  });

  it('should call the handleBackgroundColorInputChange prop when a background input change occurs', (): void => {
    wrapper
      .find('#textColor')
      .at(0)
      .simulate('change', { target: { value: '#ccc' } });
    expect(handleTextColorInputChange).toBeCalledWith('#ccc');
  });

  it('should call the handleBackgroundColorSliderChange prop when a background slider change occurs', (): void => {
    wrapper
      .find('#background')
      .at(0)
      .simulate('change', { target: { value: '#ccc' } });
    expect(handleBackgroundColorInputChange).toBeCalledWith('#ccc');
  });

  it('should call the handleTextColorInputChange prop when a text input change occurs', (): void => {
    wrapper
      .find('#textColor-hsl-Lightness')
      .at(0)
      .simulate('input', { target: { value: 12 } });
    expect(handleTextColorSliderChange).toBeCalledWith('#1F1F1F', 'textColor-hsl');
  });

  it('should call the handleTextColorSliderChange prop when a text slider change occurs', (): void => {
    wrapper
      .find('#background-hsl-Lightness')
      .at(0)
      .simulate('input', { target: { value: '90' } });
    expect(handleBackgroundColorSliderChange).toBeCalledWith('#E6E6E6', 'background-hsl');
  });
});
