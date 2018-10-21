import React, { Component, ReactNodeArray } from 'react';
import './layout-small.scss';

type LayoutSmallProps = {
  children?: ReactNodeArray;
};

class LayoutSmall extends Component<LayoutSmallProps, {}> {
  render() {
    return <div className="layout layout--small">{this.props.children}</div>;
  }
}

export default LayoutSmall;
