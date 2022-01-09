/* eslint-env jest */
/// <reference types="jest" />

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { PaletteInput } from '..';

describe('PaletteInput', (): void => {
  const mockOnColorAdd: jest.Mock = jest.fn();

  it('renders without crashing', (): void => {
    ReactDOM.render(<PaletteInput onColorAdd={mockOnColorAdd} />, document.createElement('div'));
    const paletteInputCmp = renderer.create(<PaletteInput onColorAdd={mockOnColorAdd} />).toJSON();
    expect(paletteInputCmp).toMatchSnapshot();
  });

  it('should render an error message when passed', (): void => {
    const paletteInputCmp = renderer
      .create(<PaletteInput errorMessage="I'm an error" onColorAdd={mockOnColorAdd} />)
      .toJSON();
    expect(paletteInputCmp).toMatchSnapshot();
  });
});
