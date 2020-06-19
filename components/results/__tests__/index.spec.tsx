/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { SiteDataProvider } from '../../../context/home';
import { Results } from '..';

describe('Results', (): void => {
  it('renders without crashing', (): void => {
    ReactDOM.render(
      <SiteDataProvider>
        <Results />
      </SiteDataProvider>,
      document.createElement('div')
    );
    const resultsCmp = renderer
      .create(
        <SiteDataProvider>
          <Results />
        </SiteDataProvider>
      )
      .toJSON();
    expect(resultsCmp).toMatchSnapshot();
  });

  it('should render a triple a result correctly', (): void => {
    const { getByTestId } = render(
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
    expect(getByTestId('contrastResults-heading').textContent).toBe('Yup');
    expect(getByTestId('contrastResult-rating-small').textContent).toEqual('AAA');
    expect(getByTestId('contrastResult-rating-bold').textContent).toEqual('AAA');
    expect(getByTestId('contrastResult-rating-large').textContent).toEqual('AAA');
  });

  it('should render a large text triple a result correctly', (): void => {
    const { getByTestId } = render(
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
    expect(getByTestId('contrastResults-heading').textContent).toBe('Yup');
    expect(getByTestId('contrastResult-rating-small').textContent).toEqual('AA');
    expect(getByTestId('contrastResult-rating-bold').textContent).toEqual('AAA');
    expect(getByTestId('contrastResult-rating-large').textContent).toEqual('AAA');
  });

  it('should render a large text double a result correctly', (): void => {
    const { getByTestId } = render(
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
    expect(getByTestId('contrastResults-heading').textContent).toBe('Kinda');
    expect(getByTestId('contrastResult-rating-small').textContent).toEqual('Fail');
    expect(getByTestId('contrastResult-rating-bold').textContent).toEqual('AA');
    expect(getByTestId('contrastResult-rating-large').textContent).toEqual('AA');
  });

  it('should render a nope a result correctly', (): void => {
    const { getByTestId } = render(
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
    expect(getByTestId('contrastResults-heading').textContent).toBe('Nope');
    expect(getByTestId('contrastResult-rating-small').textContent).toEqual('Fail');
    expect(getByTestId('contrastResult-rating-bold').textContent).toEqual('Fail');
    expect(getByTestId('contrastResult-rating-large').textContent).toEqual('Fail');
  });

  it('should render a seriously? a result correctly', (): void => {
    const { getByTestId } = render(
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

    expect(getByTestId('contrastResults-seriously')).not.toBeNull();
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
