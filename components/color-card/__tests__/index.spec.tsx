/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ColorCard, { ColorCardProps } from '..';

describe('ColorCard', (): void => {
  const mockProps: ColorCardProps = {
    accessibility: {
      aa: true,
      aaLarge: true,
      aaa: true,
      aaaLarge: true,
    },
    color: '#000',
    contrast: 21,
  };

  it('renders without crashing', (): void => {
    ReactDOM.render(<ColorCard {...mockProps} />, document.createElement('div'));
    const colorCard = renderer.create(<ColorCard {...mockProps} />).toJSON();
    expect(colorCard).toMatchSnapshot();
  });

  it('should render a not important card', (): void => {
    const colorCard = renderer.create(<ColorCard {...mockProps} isNotImportant />).toJSON();
    expect(colorCard).toMatchSnapshot();
  });
});
