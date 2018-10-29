/* eslint-env jest */

import React, { SFC } from 'react';
import ReactDOM from 'react-dom';
import { shallow, ShallowWrapper } from 'enzyme';
import LayoutShared from '..';
import { HomeProps } from 'components/home';

describe('Layout Shared', () => {
  let ChildComponent: SFC<HomeProps>;
  let wrapper: ShallowWrapper;
  let instance: LayoutShared;

  beforeAll(() => {
    ChildComponent = function ChildComponent() {
      return <div />;
    };
  });

  beforeEach(() => {
    wrapper = shallow(
      <LayoutShared title="are my colors accessible">
        {props => <ChildComponent {...props} />}
      </LayoutShared>
    );

    instance = wrapper.instance() as LayoutShared;
  });

  it('renders without crashing', () => {
    ReactDOM.render(
      <LayoutShared title="are my colors accessible">
        {props => <ChildComponent {...props} />}
      </LayoutShared>,
      document.createElement('div')
    );
  });

  it('should clone children with props', () => {
    expect(wrapper.find('ChildComponent').getElement().props.siteData).toEqual({
      background: '#1276CE',
      isLight: false,
      textColor: '#FFFFFF'
    });
    expect(typeof wrapper.find('ChildComponent').getElement().props.setBackgroundColor).toBe(
      'function'
    );
    expect(typeof wrapper.find('ChildComponent').getElement().props.setTextColorColor).toBe(
      'function'
    );
  });

  it('should set state with queryParams', () => {
    window.history.pushState(
      {},
      'Test Title',
      '/?background=%235E38A8&isLight=false&textColor=%23FFFFFF'
    );
    const newwrapper = shallow(
      <LayoutShared title="are my colors accessible">
        {props => <ChildComponent {...props} />}
      </LayoutShared>
    );
    expect(newwrapper.instance().state).toEqual({
      siteData: { background: '#5E38A8', isLight: false, textColor: '#FFFFFF' }
    });
  });

  it('should update state when setBackgorundColor is called with a hex', () => {
    instance.setBackgroundColor('#000');
    expect(instance.state.siteData.background).toEqual('#000');
  });

  it('should update state with isLight when setBackgroundColor is called with a light color', () => {
    instance.setBackgroundColor('#ccc');
    expect(instance.state.siteData.isLight).toEqual(true);
  });

  it('should update state when setTextColorColor is called with a hex', () => {
    instance.setTextColorColor('#fefefe');
    expect(instance.state.siteData.textColor).toEqual('#fefefe');
  });

  it('should update the url with the state when updateHash is called', () => {
    instance.setBackgroundColor('#777');
    instance.setTextColorColor('#ddd');
    instance.updateHash();
    expect(window.location.search).toEqual('?background=%23777&isLight=false&textColor=%23ddd');
  });
});
