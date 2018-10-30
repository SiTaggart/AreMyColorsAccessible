import React, { Component } from 'react';
import ClassNames from 'classnames';
import './container.scss';

interface ContainerProps {
  children?: JSX.Element[] | JSX.Element;
  className?: string;
  style?: Object;
}

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
