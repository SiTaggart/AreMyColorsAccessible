/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { SiteDataProvider } from '../../../context/home';
import Results from '..';

describe('Results', (): void => {
  it('renders without crashing', (): void => {
    ReactDOM.render(
      // @ts-ignore
      <SiteDataProvider initialSiteData={{}}>
        <Results />
      </SiteDataProvider>,
      document.createElement('div')
    );
  });

  it('should render a triple a result correctly', (): void => {
    const wrapper = mount(
      <SiteDataProvider initialSiteData={{}}>
        <Results />
      </SiteDataProvider>
    );
    expect(wrapper.find('[data-test="contrastResults-heading"]').text()).toBe('Yup');

    expect(wrapper.find('[data-test="contrastResult-rating-small"]').text()).toEqual('AAA');

    expect(wrapper.find('[data-test="contrastResult-rating-bold"]').text()).toEqual('AAA');

    expect(wrapper.find('[data-test="contrastResult-rating-large"]').text()).toEqual('AAA');
  });

  it('should render a large text triple a result correctly', (): void => {
    const wrapper = mount(
      <SiteDataProvider initialSiteData={{}}>
        <Results />
      </SiteDataProvider>
    );
    expect(wrapper.find('[data-test="contrastResults-heading"]').text()).toBe('Yup');

    expect(wrapper.find('[data-test="contrastResult-rating-small"]').text()).toEqual('AA');

    expect(wrapper.find('[data-test="contrastResult-rating-bold"]').text()).toEqual('AAA');

    expect(wrapper.find('[data-test="contrastResult-rating-large"]').text()).toEqual('AAA');
  });

  it('should render a large text double a result correctly', (): void => {
    const wrapper = mount(
      <SiteDataProvider initialSiteData={{}}>
        <Results />
      </SiteDataProvider>
    );
    expect(wrapper.find('[data-test="contrastResults-heading"]').text()).toBe('Kinda');

    expect(wrapper.find('[data-test="contrastResult-rating-small"]').text()).toEqual('Fail');

    expect(wrapper.find('[data-test="contrastResult-rating-bold"]').text()).toEqual('AA');

    expect(wrapper.find('[data-test="contrastResult-rating-large"]').text()).toEqual('AA');
  });

  it('should render a nope a result correctly', (): void => {
    const wrapper = mount(
      <SiteDataProvider initialSiteData={{}}>
        <Results />
      </SiteDataProvider>
    );
    expect(wrapper.find('[data-test="contrastResults-heading"]').text()).toBe('Nope');

    expect(wrapper.find('[data-test="contrastResult-rating-small"]').text()).toEqual('Fail');

    expect(wrapper.find('[data-test="contrastResult-rating-bold"]').text()).toEqual('Fail');

    expect(wrapper.find('[data-test="contrastResult-rating-large"]').text()).toEqual('Fail');
  });

  it('should render a seriously? a result correctly', (): void => {
    const wrapper = mount(
      <SiteDataProvider initialSiteData={{}}>
        <Results />
      </SiteDataProvider>
    );

    expect(wrapper.find('[data-test="contrastResults-seriously"]')).toHaveLength(1);
  });

  it('should set the font color of seriously? to #343334 on light backgrounds', (): void => {
    const resultsCmp = renderer
      .create(
        <SiteDataProvider initialSiteData={{}}>
          <Results />
        </SiteDataProvider>
      )
      .toJSON();
    expect(resultsCmp).toMatchSnapshot();
  });
});
