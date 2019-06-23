/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Results from '..';

describe('Results', (): void => {
  it('renders without crashing', (): void => {
    ReactDOM.render(<Results />, document.createElement('div'));
  });

  it('should render a triple a result correctly', (): void => {
    const wrapper = shallow(<Results />);
    expect(wrapper.find('[data-test="contrastResults-heading"]').text()).toBe('Yup');

    expect(wrapper.find('[data-test="contrastResult-rating-small"]').text()).toEqual('AAA');

    expect(wrapper.find('[data-test="contrastResult-rating-bold"]').text()).toEqual('AAA');

    expect(wrapper.find('[data-test="contrastResult-rating-large"]').text()).toEqual('AAA');
  });

  it('should render a large text triple a result correctly', (): void => {
    const wrapper = shallow(<Results />);
    expect(wrapper.find('[data-test="contrastResults-heading"]').text()).toBe('Yup');

    expect(wrapper.find('[data-test="contrastResult-rating-small"]').text()).toEqual('AA');

    expect(wrapper.find('[data-test="contrastResult-rating-bold"]').text()).toEqual('AAA');

    expect(wrapper.find('[data-test="contrastResult-rating-large"]').text()).toEqual('AAA');
  });

  it('should render a large text double a result correctly', (): void => {
    const wrapper = shallow(<Results />);
    expect(wrapper.find('[data-test="contrastResults-heading"]').text()).toBe('Kinda');

    expect(wrapper.find('[data-test="contrastResult-rating-small"]').text()).toEqual('Fail');

    expect(wrapper.find('[data-test="contrastResult-rating-bold"]').text()).toEqual('AA');

    expect(wrapper.find('[data-test="contrastResult-rating-large"]').text()).toEqual('AA');
  });

  it('should render a nope a result correctly', (): void => {
    const wrapper = shallow(<Results />);
    expect(wrapper.find('[data-test="contrastResults-heading"]').text()).toBe('Nope');

    expect(wrapper.find('[data-test="contrastResult-rating-small"]').text()).toEqual('Fail');

    expect(wrapper.find('[data-test="contrastResult-rating-bold"]').text()).toEqual('Fail');

    expect(wrapper.find('[data-test="contrastResult-rating-large"]').text()).toEqual('Fail');
  });

  it('should render a seriously? a result correctly', (): void => {
    const wrapper = shallow(<Results />);

    expect(wrapper.find('[data-test="contrastResults-seriously"]')).toHaveLength(1);
  });

  it('should set the font color of seriously? to #343334 on light backgrounds', (): void => {
    const resultsCmp = renderer.create(<Results />).toJSON();
    expect(resultsCmp).toMatchSnapshot();
  });
});
