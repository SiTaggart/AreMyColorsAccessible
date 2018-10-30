import React, { Component } from 'react';
import './layout-large.scss';

interface LayoutLargeProps {
  children?: JSX.Element[] | JSX.Element;
}

class LayoutLarge extends Component<LayoutLargeProps, {}> {
  render() {
    return <div className="layout layout--large">{this.props.children}</div>;
  }
}
export default LayoutLarge;
