/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import ColorCombos, { ColorCombosTypes } from 'color-combos';
import { ColorInputs } from '..';
import * as HomeContext from '../../../context/home';

describe('ColorInputs', (): void => {
  let colorCombos: ColorCombosTypes[] | false;
  let mockContext: HomeContext.HomeContextInterface;
  let handleBackgroundColorInputChange: jest.Mock;
  let handleTextColorInputChange: jest.Mock;
  let wrapper: ReactWrapper;

  jest
    .spyOn(HomeContext, 'useSiteData')
    .mockImplementation((): HomeContext.HomeContextInterface => mockContext);

  beforeAll((): void => {
    handleBackgroundColorInputChange = jest.fn();
    handleTextColorInputChange = jest.fn();
  });

  beforeEach((): void => {
    jest.clearAllMocks();
    colorCombos = ColorCombos(['#fff', '#000']);
    if (colorCombos !== false) {
      mockContext = {
        siteData: {
          background: '#000',
          colorCombos,
          isLight: false,
          textColor: '#fff',
        },
        handleBackgroundColorInputChange,
        handleTextColorInputChange,
      };
    }
    wrapper = mount(<ColorInputs />);
  });

  it('renders without crashing', (): void => {
    ReactDOM.render(<ColorInputs />, document.createElement('div'));
    const colorCard = renderer.create(<ColorInputs />).toJSON();
    expect(colorCard).toMatchSnapshot();
  });

  it('should call the handleTextColorInputChange callback on text color change', (): void => {
    wrapper
      .find('#textColor')
      .at(0)
      .simulate('change', { target: { value: '#ccc' } });
    expect(handleTextColorInputChange).toHaveBeenCalledWith('#ccc');
  });

  it('should call the handleBackgroundColorInputChange callback on background color change', (): void => {
    wrapper
      .find('#background')
      .at(0)
      .simulate('change', { target: { value: '#ccc' } });
    expect(handleBackgroundColorInputChange).toHaveBeenCalledWith('#ccc');
  });

  it.skip('should call the handleTextColorInputChange callback on text color slider change', (): void => {
    wrapper
      .find('#textColor-hsl-Lightness')
      .at(0)
      .simulate('input', { target: { value: 12 } });
    expect(handleTextColorInputChange).toHaveBeenCalledWith('#1F1F1F', 'textColor-hsl');
  });

  it.skip('should call the handleBackgroundColorInputChange callback on background color slider change', (): void => {
    wrapper
      .find('#background-hsl-Lightness')
      .at(0)
      .simulate('input', { target: { value: '90' } });
    expect(handleBackgroundColorInputChange).toHaveBeenCalledWith('#E6E6E6', 'background-hsl');
  });
});
