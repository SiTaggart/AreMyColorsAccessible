/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, ShallowWrapper } from 'enzyme';
import Home from '..';
import { SiteData } from 'types';

describe('About', () => {
  let siteData: SiteData;
  let setBackgroundColor: jest.Mock;
  let setTextColor: jest.Mock;
  let wrapper: ShallowWrapper;
  let instance: Home;

  beforeAll(() => {
    siteData = {
      background: '#000',
      isLight: false,
      textColor: '#fff'
    };
    setBackgroundColor = jest.fn();
    setTextColor = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(
      <Home
        setBackgroundColor={setBackgroundColor}
        setTextColorColor={setTextColor}
        siteData={siteData}
      />
    );
    instance = wrapper.instance() as Home;
  });

  it('renders without crashing', () => {
    ReactDOM.render(
      <Home
        setBackgroundColor={setBackgroundColor}
        setTextColorColor={setTextColor}
        siteData={siteData}
      />,
      document.createElement('div')
    );
  });

  it('should return the color info', () => {
    expect(instance.getColorInfo('#000', '#777').contrast!.toFixed(2)).toBe('4.69');

    expect(instance.getColorInfo('#000', '#666').contrast!.toFixed(2)).toBe('3.66');

    expect(instance.getColorInfo('#000', '#444').contrast!.toFixed(2)).toBe('2.16');
  });
});
