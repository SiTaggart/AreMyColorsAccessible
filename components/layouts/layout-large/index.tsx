import React, { Component, ReactNodeArray } from 'react';
import './layout-large.scss';

interface LayoutLargeProps {
  children?: ReactNodeArray;
}

class LayoutLarge extends Component<LayoutLargeProps, {}> {
  render() {
    return <div className="layout layout--large">{this.props.children}</div>;
  }
}
export default LayoutLarge;
