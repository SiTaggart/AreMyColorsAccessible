import React, { Component } from 'react';
import './layout-small.scss';

interface LayoutSmallProps {
  children?: JSX.Element[] | JSX.Element;
}

class LayoutSmall extends Component<LayoutSmallProps, {}> {
  render() {
    return <div className="layout layout--small">{this.props.children}</div>;
  }
}

export default LayoutSmall;
