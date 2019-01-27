import React, { Component } from 'react';
import cx from 'classnames';
import './layout.scss';

interface LayoutProps {
  children?: JSX.Element[] | JSX.Element;
  variant?: 'large' | 'small' | 'full';
}

class Layout extends Component<LayoutProps, {}> {
  render() {
    return (
      <div
        className={cx('layout', {
          'layout--full': this.props.variant === 'full',
          'layout--large': this.props.variant === 'large',
          'layout--small': this.props.variant === 'small'
        })}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
