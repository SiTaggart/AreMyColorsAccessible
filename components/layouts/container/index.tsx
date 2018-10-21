import React, { Component, ReactChild } from 'react';
import ClassNames from 'classnames';
import './container.scss';

type ContainerProps = {
  children?: ReactChild;
  className?: string;
  style?: Object;
};

class Container extends Component<ContainerProps, {}> {
  render() {
    return (
      <main className={ClassNames('container', this.props.className)} style={this.props.style}>
        {this.props.children}
      </main>
    );
  }
}
export default Container;
