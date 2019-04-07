/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Footer from '..';

xdescribe('Footer', (): void => {
  const mockProps = {
    styles: {
      footerLinks: {
        color: '#fff'
      }
    }
  };

  it('renders without crashing', (): void => {
    ReactDOM.render(<Footer {...mockProps} />, document.createElement('div'));
    const footerComp = renderer.create(<Footer {...mockProps} />).toJSON();
    expect(footerComp).toMatchSnapshot();
  });
});
