import React, { Component, ReactElement } from 'react';
import ClassNames from 'classnames';
import './container.scss';

interface ContainerProps {
  children?: JSX.Element[] | JSX.Element;
  variant?: 'home' | 'about' | 'palette';
}

class Container extends Component<ContainerProps, {}> {
  public render(): ReactElement<HTMLMainElement> {
    return (
      <main
        className={ClassNames('container', {
          'container--about': this.props.variant === 'about',
          'container--home': this.props.variant === 'home',
          'container--palette': this.props.variant === 'palette'
        })}
      >
        {this.props.children}
      </main>
    );
  }
}
export default Container;
