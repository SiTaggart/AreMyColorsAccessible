/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import PaletteInput from '..';

describe('PaletteInput', (): void => {
  const mockOnColorAdd: jest.Mock = jest.fn();

  it('renders without crashing', (): void => {
    ReactDOM.render(<PaletteInput onColorAdd={mockOnColorAdd} />, document.createElement('div'));
    const paletteInputCmp = renderer.create(<PaletteInput onColorAdd={mockOnColorAdd} />).toJSON();
    expect(paletteInputCmp).toMatchSnapshot();
  });

  it('should call the onColorAdd callback', (): void => {
    // TODO: Not sure how to do this with enzyme and making real DOM events fire
    // const wrapper: ReactWrapper = mount(<PaletteInput onColorAdd={mockOnColorAdd} />);
    // wrapper
    //   .find('#palette-form-input')
    //   .at(0)
    //   .simulate('input', { target: { value: '#ccc' } });
    // const inputNode = wrapper
    //   .find('#palette-form-input')
    //   .at(0)
    //   .getDOMNode();
    // inputNode.submit();
    // expect(mockOnColorAdd).toBeCalledWith('#ccc');
  });

  it('should render an error message when passed', (): void => {
    const paletteInputCmp = renderer
      .create(<PaletteInput errorMessage="I'm an error" onColorAdd={mockOnColorAdd} />)
      .toJSON();
    expect(paletteInputCmp).toMatchSnapshot();
  });
});
