import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './layout-small.scss';

class LayoutSmall extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="layout layout--small" {...this.props}>
                {this.props.children}
            </div>
        );
    }
}

LayoutSmall.propTypes = {
    children: PropTypes.node
};

export default LayoutSmall;
