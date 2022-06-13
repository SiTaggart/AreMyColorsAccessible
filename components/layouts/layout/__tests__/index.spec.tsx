/* eslint-env jest */
/// <reference types="jest" />

import { render } from '@testing-library/react';
import React from 'react';
import { Layout } from '..';

describe('Layout', (): void => {
  it('renders without crashing', (): void => {
    const { asFragment } = render(
      <Layout>
        <div>children</div>
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should set full class with full variant', (): void => {
    const { asFragment } = render(
      <Layout variant="full">
        <div>children</div>
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should set large class with large variant', (): void => {
    const { asFragment } = render(
      <Layout variant="large">
        <div>children</div>
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should set small class with small variant', (): void => {
    const { asFragment } = render(
      <Layout variant="small">
        <div>children</div>
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
