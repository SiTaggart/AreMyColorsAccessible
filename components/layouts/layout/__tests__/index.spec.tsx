/* eslint-env jest */
/// <reference types="jest" />

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Layout } from '..';

describe('Layout', (): void => {
  it('renders without crashing', (): void => {
    ReactDOM.render(
      <Layout>
        <div>children</div>
      </Layout>,
      document.createElement('div')
    );
    const layoutCmp = renderer
      .create(
        <Layout>
          <div>children</div>
        </Layout>
      )
      .toJSON();
    expect(layoutCmp).toMatchSnapshot();
  });

  it('should set full class with full variant', (): void => {
    const layoutCmp = renderer
      .create(
        <Layout variant="full">
          <div>children</div>
        </Layout>
      )
      .toJSON();
    expect(layoutCmp).toMatchSnapshot();
  });

  it('should set large class with large variant', (): void => {
    const layoutCmp = renderer
      .create(
        <Layout variant="large">
          <div>children</div>
        </Layout>
      )
      .toJSON();
    expect(layoutCmp).toMatchSnapshot();
  });

  it('should set small class with small variant', (): void => {
    const layoutCmp = renderer
      .create(
        <Layout variant="small">
          <div>children</div>
        </Layout>
      )
      .toJSON();
    expect(layoutCmp).toMatchSnapshot();
  });
});
