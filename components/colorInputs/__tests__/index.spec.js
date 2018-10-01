/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import ColorInputs from '../index';

describe('About', () => {
  let setBackgroundColor;
  let setTextColor;
  let wrapper;

  beforeAll(() => {
    setBackgroundColor = jest.fn();
    setTextColor = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = mount(
      <ColorInputs
        background="#000"
        isLight={false}
        setBackgroundColor={setBackgroundColor}
        setTextColorColor={setTextColor}
        textColor="#fff"
      />
    );
  });

  it('renders without crashing', () => {
    ReactDOM.render(
      <ColorInputs background="#000" isLight={false} textColor="#fff" />,
      document.createElement('div')
    );
  });

  it('should call the setTextColorColor callback on text color change', () => {
    wrapper.find('#textColor').simulate('change', { target: { value: '#ccc' } });
    expect(setTextColor).toBeCalledWith('#ccc');
  });

  it('should call the setTextColorColor callback on text color change', () => {
    wrapper.find('#background').simulate('change', { target: { value: '#ccc' } });
    expect(setBackgroundColor).toBeCalledWith('#ccc');
  });
});
