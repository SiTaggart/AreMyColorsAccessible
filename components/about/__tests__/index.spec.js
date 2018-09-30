/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import About from '../index';

describe('About', () => {
  let siteData = {
    isLight: false
  };

  it('renders without crashing', () => {
    ReactDOM.render(<About siteData={siteData} />, document.createElement('div'));
  });

  it('should set the font color to white by default', () => {
    const rendered = shallow(<About siteData={siteData} />);
    expect(rendered.find('.about').prop('style').color).toBe('#fff');
  });

  it('should set the font color to #222 on light backgrounds', () => {
    siteData.isLight = true;
    const rendered = shallow(<About siteData={siteData} />);
    expect(rendered.find('.about').prop('style').color).toBe('#222');
  });
});
