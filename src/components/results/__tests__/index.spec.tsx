import { render } from '@testing-library/react';

import { Results } from '..';
import { SiteDataProvider } from '../../../context/home';

describe('Results', (): void => {
  it('renders without crashing', (): void => {
    const { asFragment } = render(
      <SiteDataProvider>
        <Results />
      </SiteDataProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a triple a result correctly', (): void => {
    const { getByTestId } = render(
      <SiteDataProvider
        initialSiteData={{
          background: '#000',
          colorCombos: [],
          isLight: true,
          textColor: '#fff',
        }}
      >
        <Results />
      </SiteDataProvider>,
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
          colorCombos: [],
          isLight: true,
          textColor: '#fff',
        }}
      >
        <Results />
      </SiteDataProvider>,
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
          colorCombos: [],
          isLight: true,
          textColor: '#666',
        }}
      >
        <Results />
      </SiteDataProvider>,
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
          colorCombos: [],
          isLight: true,
          textColor: '#555',
        }}
      >
        <Results />
      </SiteDataProvider>,
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
          colorCombos: [],
          isLight: true,
          textColor: '#111',
        }}
      >
        <Results />
      </SiteDataProvider>,
    );

    expect(getByTestId('contrastResults-seriously')).not.toBeNull();
  });

  it('should set the font color of seriously? to #343334 on light backgrounds', (): void => {
    const { asFragment } = render(
      <SiteDataProvider
        initialSiteData={{
          background: '#000',
          colorCombos: [],
          isLight: true,
          textColor: '#191920',
        }}
      >
        <Results />
      </SiteDataProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
