import React, { Component, PropTypes } from 'react';
import './results.scss';

class Results extends Component {
    render() {
        return (
            <div className="contrastResults">
                <h1 className="contrastResults-heading">{'Nope'}</h1>
                <div className="contrastResult">
                    <h2 className="contrastResult-rating">
                        {'AAA'}
                    </h2>
                    <p className="contrastResult-desc">
                        {'Small Text (14pt)'}
                    </p>
                </div>
                <div className="contrastResult">
                    <h2 className="contrastResult-rating">
                        {'Fail'}
                    </h2>
                    <p className="contrastResult-desc">
                        <strong>{'Bold Text (14pt)'}</strong>
                    </p>
                </div>
                <div className="contrastResult">
                    <h2 className="contrastResult-rating">
                        {'AA'}
                    </h2>
                    <p className="contrastResult-desc contrastResult-desc--large">
                        {'Large Text (18pt)'}
                    </p>
                </div>
            </div>
        );
    }
}

Results.PropTypes = {
    children: PropTypes.node
};

export default Results;