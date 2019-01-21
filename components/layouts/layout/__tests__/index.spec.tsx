/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import Layout from '..';

describe('Layout', () => {
  it('renders without crashing', () => {
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

  it('should set full class with full variant', () => {
    const wrapper: ReactWrapper = mount(
      <Layout variant="full">
        <div>children</div>
      </Layout>
    );
    expect(wrapper.find('.layout').hasClass('layout--full')).toEqual(true);
  });

  it('should set large class with large variant', () => {
    const wrapper: ReactWrapper = mount(
      <Layout variant="large">
        <div>children</div>
      </Layout>
    );
    expect(wrapper.find('.layout').hasClass('layout--large')).toEqual(true);
  });

  it('should set small class with small variant', () => {
    const wrapper: ReactWrapper = mount(
      <Layout variant="small">
        <div>children</div>
      </Layout>
    );
    expect(wrapper.find('.layout').hasClass('layout--small')).toEqual(true);
  });
});
