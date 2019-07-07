/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import ColorCard, { ColorCardProps } from '..';
import renderer from 'react-test-renderer';

describe('ColorCard', (): void => {
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

  it('renders without crashing', (): void => {
    ReactDOM.render(<ColorCard {...mockProps} />, document.createElement('div'));
    const colorCard = renderer.create(<ColorCard {...mockProps} />).toJSON();
    expect(colorCard).toMatchSnapshot();
  });

  it('should render a not important card', (): void => {
    const colorCard = renderer.create(<ColorCard {...mockProps} isNotImportant={true} />).toJSON();
    expect(colorCard).toMatchSnapshot();
  });
});
