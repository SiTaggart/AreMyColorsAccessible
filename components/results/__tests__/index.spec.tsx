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
      <SiteDataProvider initialSiteData={{}}>
        <Results />
      </SiteDataProvider>,
      document.createElement('div')
    );
    const resultsCmp = renderer
      .create(
        <SiteDataProvider initialSiteData={{}}>
          <Results />
        </SiteDataProvider>
      )
      .toJSON();
    expect(resultsCmp).toMatchSnapshot();
  });

  it('should render a triple a result correctly', (): void => {
    const wrapper = mount(
      <SiteDataProvider
        initialSiteData={{
          background: '#000',
          textColor: '#fff',
          isLight: true,
          colorCombos: [],
        }}
      >
        <Results />
      </SiteDataProvider>
    );
    expect(
      wrapper
        .find('[data-test="contrastResults-heading"]')
        .at(0)
        .text()
    ).toBe('Yup');

    expect(
      wrapper
        .find('[data-test="contrastResult-rating-small"]')
        .at(0)
        .text()
    ).toEqual('AAA');

    expect(
      wrapper
        .find('[data-test="contrastResult-rating-bold"]')
        .at(0)
        .text()
    ).toEqual('AAA');

    expect(
      wrapper
        .find('[data-test="contrastResult-rating-large"]')
        .at(0)
        .text()
    ).toEqual('AAA');
  });

  it('should render a large text triple a result correctly', (): void => {
    const wrapper = mount(
      <SiteDataProvider
        initialSiteData={{
          background: '#666',
          textColor: '#fff',
          isLight: true,
          colorCombos: [],
        }}
      >
        <Results />
      </SiteDataProvider>
    );
    expect(
      wrapper
        .find('[data-test="contrastResults-heading"]')
        .at(0)
        .text()
    ).toBe('Yup');

    expect(
      wrapper
        .find('[data-test="contrastResult-rating-small"]')
        .at(0)
        .text()
    ).toEqual('AA');

    expect(
      wrapper
        .find('[data-test="contrastResult-rating-bold"]')
        .at(0)
        .text()
    ).toEqual('AAA');

    expect(
      wrapper
        .find('[data-test="contrastResult-rating-large"]')
        .at(0)
        .text()
    ).toEqual('AAA');
  });

  it('should render a large text double a result correctly', (): void => {
    const wrapper = mount(
      <SiteDataProvider
        initialSiteData={{
          background: '#000',
          textColor: '#666',
          isLight: true,
          colorCombos: [],
        }}
      >
        <Results />
      </SiteDataProvider>
    );
    expect(
      wrapper
        .find('[data-test="contrastResults-heading"]')
        .at(0)
        .text()
    ).toBe('Kinda');

    expect(
      wrapper
        .find('[data-test="contrastResult-rating-small"]')
        .at(0)
        .text()
    ).toEqual('Fail');

    expect(
      wrapper
        .find('[data-test="contrastResult-rating-bold"]')
        .at(0)
        .text()
    ).toEqual('AA');

    expect(
      wrapper
        .find('[data-test="contrastResult-rating-large"]')
        .at(0)
        .text()
    ).toEqual('AA');
  });

  it('should render a nope a result correctly', (): void => {
    const wrapper = mount(
      <SiteDataProvider
        initialSiteData={{
          background: '#000',
          textColor: '#555',
          isLight: true,
          colorCombos: [],
        }}
      >
        <Results />
      </SiteDataProvider>
    );
    expect(
      wrapper
        .find('[data-test="contrastResults-heading"]')
        .at(0)
        .text()
    ).toBe('Nope');

    expect(
      wrapper
        .find('[data-test="contrastResult-rating-small"]')
        .at(0)
        .text()
    ).toEqual('Fail');

    expect(
      wrapper
        .find('[data-test="contrastResult-rating-bold"]')
        .at(0)
        .text()
    ).toEqual('Fail');

    expect(
      wrapper
        .find('[data-test="contrastResult-rating-large"]')
        .at(0)
        .text()
    ).toEqual('Fail');
  });

  it('should render a seriously? a result correctly', (): void => {
    const wrapper = mount(
      <SiteDataProvider
        initialSiteData={{
          background: '#000',
          textColor: '#111',
          isLight: true,
          colorCombos: [],
        }}
      >
        <Results />
      </SiteDataProvider>
    );

    expect(wrapper.find('[data-test="contrastResults-seriously"]').at(0)).toHaveLength(1);
  });

  it('should set the font color of seriously? to #343334 on light backgrounds', (): void => {
    const resultsCmp = renderer
      .create(
        <SiteDataProvider
          initialSiteData={{
            background: '#000',
            textColor: '#191920',
            isLight: true,
            colorCombos: [],
          }}
        >
          <Results />
        </SiteDataProvider>
      )
      .toJSON();
    expect(resultsCmp).toMatchSnapshot();
  });
});
