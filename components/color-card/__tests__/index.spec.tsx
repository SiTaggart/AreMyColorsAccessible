/* eslint-env jest */
/// <reference types="jest" />
import { expect } from '@jest/globals';

import { render } from '@testing-library/react';
import React from 'react';
import { ColorCard, ColorCardProps } from '..';

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
    const { asFragment } = render(<ColorCard {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a not important card', (): void => {
    const { asFragment } = render(<ColorCard {...mockProps} isNotImportant />);
    expect(asFragment()).toMatchSnapshot();
  });
});
