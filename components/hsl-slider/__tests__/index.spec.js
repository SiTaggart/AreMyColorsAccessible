/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, render } from 'enzyme';
import HslSlider from '../index';

describe('hsl-slider', () => {
  it('renders without crashing', () => {
    ReactDOM.render(<HslSlider id="input-id" />, document.createElement('div'));
  });

  it('should render with class', () => {
    const rendered = shallow(<HslSlider id="input-id" />);
    expect(rendered.hasClass('form-hsl-sliders')).toBe(true);
  });
});
