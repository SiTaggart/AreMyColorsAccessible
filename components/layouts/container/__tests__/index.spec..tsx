/* eslint-env jest */
/// <reference types="jest" />

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Container } from '..';

describe('Container', (): void => {
  it('renders without crashing', (): void => {
    ReactDOM.render(
      <Container>
        <div>children</div>
      </Container>,
      document.createElement('div')
    );
    const containerCmp = renderer
      .create(
        <Container>
          <div>children</div>
        </Container>
      )
      .toJSON();
    expect(containerCmp).toMatchSnapshot();
  });

  it('should set home class with home variant', (): void => {
    const containerCmp = renderer
      .create(
        <Container variant="home">
          <div>children</div>
        </Container>
      )
      .toJSON();
    expect(containerCmp).toMatchSnapshot();
  });

  it('should set about class with about variant', (): void => {
    const containerCmp = renderer
      .create(
        <Container variant="about">
          <div>children</div>
        </Container>
      )
      .toJSON();
    expect(containerCmp).toMatchSnapshot();
  });

  it('should set palette class with palette variant', (): void => {
    const containerCmp = renderer
      .create(
        <Container variant="palette">
          <div>children</div>
        </Container>
      )
      .toJSON();
    expect(containerCmp).toMatchSnapshot();
  });
});
