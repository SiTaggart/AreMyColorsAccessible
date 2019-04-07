/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Results from '..';

describe('About', (): void => {
  it('renders without crashing', (): void => {
    ReactDOM.render(
      <Results
        accessibility={{ aa: true, aaa: true, aaLarge: true, aaaLarge: true }}
        contrast={20}
        isLight={false}
      />,
      document.createElement('div')
    );
  });

  it('should render a triple a result correctly', (): void => {
    const wrapper = shallow(
      <Results
        accessibility={{ aa: true, aaa: true, aaLarge: true, aaaLarge: true }}
        contrast={20}
        isLight={false}
      />
    );
    expect(
      wrapper
        .find('.contrastResults-heading')
        .shallow()
        .text()
    ).toBe('Yup');

    expect(wrapper.find('.contrastResult-rating').get(0)).toEqual(
      <h2 className="contrastResult-rating">AAA</h2>
    );

    expect(wrapper.find('.contrastResult-rating').get(1)).toEqual(
      <h2 className="contrastResult-rating">AAA</h2>
    );

    expect(wrapper.find('.contrastResult-rating').get(2)).toEqual(
      <h2 className="contrastResult-rating">AAA</h2>
    );
  });

  it('should render a large text triple a result correctly', (): void => {
    const wrapper = shallow(
      <Results
        accessibility={{ aa: true, aaa: false, aaLarge: true, aaaLarge: true }}
        contrast={4.5}
        isLight={false}
      />
    );
    expect(
      wrapper
        .find('.contrastResults-heading')
        .shallow()
        .text()
    ).toBe('Yup');

    expect(wrapper.find('.contrastResult-rating').get(0)).toEqual(
      <h2 className="contrastResult-rating">AA</h2>
    );

    expect(wrapper.find('.contrastResult-rating').get(1)).toEqual(
      <h2 className="contrastResult-rating">AAA</h2>
    );

    expect(wrapper.find('.contrastResult-rating').get(2)).toEqual(
      <h2 className="contrastResult-rating">AAA</h2>
    );
  });

  it('should render a large text double a result correctly', (): void => {
    const wrapper = shallow(
      <Results
        accessibility={{ aa: false, aaa: false, aaLarge: true, aaaLarge: false }}
        contrast={4}
        isLight={false}
      />
    );
    expect(
      wrapper
        .find('.contrastResults-heading')
        .shallow()
        .text()
    ).toBe('Kinda');

    expect(wrapper.find('.contrastResult-rating').get(0)).toEqual(
      <h2 className="contrastResult-rating">Fail</h2>
    );

    expect(wrapper.find('.contrastResult-rating').get(1)).toEqual(
      <h2 className="contrastResult-rating">AA</h2>
    );

    expect(wrapper.find('.contrastResult-rating').get(2)).toEqual(
      <h2 className="contrastResult-rating">AA</h2>
    );
  });

  it('should render a nope a result correctly', (): void => {
    const wrapper = shallow(
      <Results
        accessibility={{ aa: false, aaa: false, aaLarge: false, aaaLarge: false }}
        contrast={3}
        isLight={false}
      />
    );
    expect(
      wrapper
        .find('.contrastResults-heading')
        .shallow()
        .text()
    ).toBe('Nope');

    expect(wrapper.find('.contrastResult-rating').get(0)).toEqual(
      <h2 className="contrastResult-rating">Fail</h2>
    );

    expect(wrapper.find('.contrastResult-rating').get(1)).toEqual(
      <h2 className="contrastResult-rating">Fail</h2>
    );

    expect(wrapper.find('.contrastResult-rating').get(2)).toEqual(
      <h2 className="contrastResult-rating">Fail</h2>
    );
  });

  it('should render a seriously? a result correctly', (): void => {
    const wrapper = shallow(
      <Results
        accessibility={{ aa: false, aaa: false, aaLarge: false, aaaLarge: false }}
        contrast={1.2}
        isLight={false}
      />
    );

    expect(wrapper.find('.contrastResult-rating').get(4)).toEqual(
      <h2 className="contrastResult-rating">Seriously?</h2>
    );
  });

  it('should set the font color of seriously? to #343334 on light backgrounds', (): void => {
    const wrapper = shallow(
      <Results
        accessibility={{ aa: false, aaa: false, aaLarge: false, aaaLarge: false }}
        contrast={1.2}
        isLight
      />
    );
    expect(
      wrapper
        .find('.contrastResult')
        .at(4)
        .prop('style')!.color
    ).toEqual('#343334');
  });
});
