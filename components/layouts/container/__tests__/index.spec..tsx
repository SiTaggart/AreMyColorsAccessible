/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import Container from '..';

describe('Container', () => {
  it('renders without crashing', () => {
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

  it('should set home class with home variant', () => {
    const wrapper: ReactWrapper = mount(
      <Container variant="home">
        <div>children</div>
      </Container>
    );
    expect(wrapper.find('.container').hasClass('container--home')).toEqual(true);
  });

  it('should set about class with about variant', () => {
    const wrapper: ReactWrapper = mount(
      <Container variant="about">
        <div>children</div>
      </Container>
    );
    expect(wrapper.find('.container').hasClass('container--about')).toEqual(true);
  });

  it('should set palette class with palette variant', () => {
    const wrapper: ReactWrapper = mount(
      <Container variant="palette">
        <div>children</div>
      </Container>
    );
    expect(wrapper.find('.container').hasClass('container--palette')).toEqual(true);
  });
});
