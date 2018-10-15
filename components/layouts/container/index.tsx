import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './container.scss';

class Container extends Component {
  render() {
    return (
      <main className="container" {...this.props}>
        {this.props.children}
      </main>
    );
  }
}

Container.propTypes = {
  children: PropTypes.node
};

export default Container;
