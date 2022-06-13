/* eslint-env jest */
/// <reference types="jest" />
import { expect } from '@jest/globals';

import { render } from '@testing-library/react';
import React from 'react';
import { Container } from '..';

describe('Container', (): void => {
  it('renders without crashing', (): void => {
    const { asFragment } = render(
      <Container>
        <div>children</div>
      </Container>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should set home class with home variant', (): void => {
    const { asFragment } = render(
      <Container variant="home">
        <div>children</div>
      </Container>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should set about class with about variant', (): void => {
    const { asFragment } = render(
      <Container variant="about">
        <div>children</div>
      </Container>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should set palette class with palette variant', (): void => {
    const { asFragment } = render(
      <Container variant="palette">
        <div>children</div>
      </Container>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
