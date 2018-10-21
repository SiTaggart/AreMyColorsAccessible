import React, { Component, ReactNodeArray } from 'react';
import './layout-large.scss';

type LayoutLargeProps = {
  children?: ReactNodeArray;
};

class LayoutLarge extends Component<LayoutLargeProps, {}> {
  render() {
    return <div className="layout layout--large">{this.props.children}</div>;
  }
}
export default LayoutLarge;
