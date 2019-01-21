/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper } from 'enzyme';
import renderer from 'react-test-renderer';
import PaletteInput from '..';

describe('PaletteInput', () => {
  const mockOnColorAdd: jest.Mock = jest.fn();

  it('renders without crashing', () => {
    ReactDOM.render(<PaletteInput onColorAdd={mockOnColorAdd} />, document.createElement('div'));
    const paletteInputCmp = renderer.create(<PaletteInput onColorAdd={mockOnColorAdd} />).toJSON();
    expect(paletteInputCmp).toMatchSnapshot();
  });

  it('should call the onColorAdd callback', () => {
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

  it('should render an error message when passed', () => {
    const wrapper: ReactWrapper = mount(
      <PaletteInput errorMessage="I'm an error" onColorAdd={mockOnColorAdd} />
    );
    expect(wrapper.find('#error-message-label-palette-form-input').text()).toEqual("I'm an error");
  });
});
