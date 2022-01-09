/* eslint-env jest */
/// <reference types="jest" />

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Footer } from '..';

describe('Footer', (): void => {
  const mockProps = {
    styles: {
      footerLinks: {
        color: '#fff',
      },
    },
  };

  it('renders without crashing', (): void => {
    ReactDOM.render(<Footer />, document.createElement('div'));
    const footerComp = renderer.create(<Footer />).toJSON();
    expect(footerComp).toMatchSnapshot();
  });

  it('renders footerLink styles added', (): void => {
    const footerComp = renderer.create(<Footer {...mockProps} />).toJSON();
    expect(footerComp).toMatchSnapshot();
  });
});
