/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Home from '..';

describe('About', () => {
  let siteData = {};
  let wrapper = null;

  beforeAll(() => {
    siteData = {
      background: '#000',
      isLight: false,
      textColor: '#fff'
    };
  });

  beforeEach(() => {
    wrapper = shallow(<Home siteData={siteData} />);
  });

  it('renders without crashing', () => {
    ReactDOM.render(<Home siteData={siteData} />, document.createElement('div'));
  });

  it('should return the color info', () => {
    expect(
      wrapper
        .instance()
        .getColorInfo('#000', '#777')
        .contrast.toFixed(2)
    ).toBe('4.69');

    expect(
      wrapper
        .instance()
        .getColorInfo('#000', '#666')
        .contrast.toFixed(2)
    ).toBe('3.66');

    expect(
      wrapper
        .instance()
        .getColorInfo('#000', '#444')
        .contrast.toFixed(2)
    ).toBe('2.16');
  });
});
