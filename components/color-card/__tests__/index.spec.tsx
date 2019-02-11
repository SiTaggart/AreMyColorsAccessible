/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper } from 'enzyme';
import ColorCard, { ColorCardProps } from '..';
import renderer from 'react-test-renderer';

describe('ColorCard', () => {
  const mockProps: ColorCardProps = {
    accessibility: {
      aa: true,
      aaLarge: true,
      aaa: true,
      aaaLarge: true
    },
    background: '#fff',
    color: '#000',
    contrast: 21
  };

  it('renders without crashing', () => {
    ReactDOM.render(<ColorCard {...mockProps} />, document.createElement('div'));
    const colorCard = renderer.create(<ColorCard {...mockProps} />).toJSON();
    expect(colorCard).toMatchSnapshot();
  });

  it('should set the style prop on the color swatch div', () => {
    let wrapper: ReactWrapper = mount(<ColorCard {...mockProps} />);
    expect(wrapper.find('.colorCard-swatch').prop('style')).toHaveProperty(
      'backgroundColor',
      '#fff'
    );
    expect(wrapper.find('.colorCard-swatch').prop('style')).toHaveProperty('color', '#000');
  });

  it('should set the colorCard--nope class when overall rating is "Nope"', () => {
    const failingProps: ColorCardProps = {
      ...mockProps,
      accessibility: {
        aa: false,
        aaLarge: false,
        aaa: false,
        aaaLarge: false
      }
    };
    let wrapper: ReactWrapper = mount(<ColorCard {...failingProps} />);
    expect(wrapper.find('.colorCard').hasClass('colorCard--nope')).toEqual(true);
  });
});
