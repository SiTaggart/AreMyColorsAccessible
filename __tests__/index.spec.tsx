/* eslint-env jest */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import HomePage from '../pages';

describe('Home Page', (): void => {
  it('should render without crashing', (): void => {
    ReactDOM.render(
      // @ts-ignore
      <HomePage />,
      document.createElement('div')
    );

    const homeCmp = renderer
      .create(
        // @ts-ignore
        <HomePage />
      )
      .toJSON();
    expect(homeCmp).toMatchSnapshot();
  });

  it('should render based on query string props', (): void => {
    const homeCmp = renderer
      .create(
        <HomePage
          query={{
            background: '#5E38A8',
            isLight: false,
            textColor: '#eee',
            colorCombos: []
          }}
        />
      )
      .toJSON();
    expect(homeCmp).toMatchSnapshot();
  });
});
