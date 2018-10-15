import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './layout-large.scss';

class LayoutLarge extends Component {
  render() {
    return (
      <div className="layout layout--large" {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

LayoutLarge.propTypes = {
  children: PropTypes.node
};

export default LayoutLarge;
