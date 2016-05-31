import React, { Component, PropTypes } from 'react';
import './results.scss';

class Results extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let ratio = this.props.contrast.toFixed(2);
        let smallTextRating;
        let boldTextRating = this.props.accessibility.aaaLarge ? this.props.accessibility.aaaLarge : this.props.accessibility.aaLarge ;
        let largeTextRating = this.props.accessibility.aaaLarge ? this.props.accessibility.aaaLarge : this.props.accessibility.aaLarge ;

        if (this.props.accessibility.aaa) {
            smallTextRating = 'AAA';
        } else {
            smallTextRating = this.props.accessibility.aa ? 'AA' : 'Fail';
        }

        if (this.props.accessibility.aaaLarge) {
            boldTextRating = largeTextRating = 'AAA';
        } else {
            boldTextRating = this.props.accessibility.aaLarge ? 'AA' : 'Fail';
            largeTextRating = boldTextRating;
        }

        let overallRating;

        if ((smallTextRating === 'AAA' || smallTextRating === 'AA') && this.props.colorBrightness >= 125 && this.props.colorDifference >= 500) {
            overallRating = 'Yup';
        } else if ((smallTextRating === 'AAA' || smallTextRating === 'AA')) {
            overallRating = 'Yeah...';
        } else if (smallTextRating === 'Fail' && largeTextRating === 'AA') {
            overallRating = 'Kinda';
        } else {
            overallRating = 'Nope';
        }


        return (
            <div className="contrastResults">
                <h1 className="contrastResults-heading" aria-live="polite" aria-atomic="true">{overallRating}</h1>
                <div className="contrastResult">
                    <h2 className="contrastResult-rating">
                        {smallTextRating}
                    </h2>
                    <p className="contrastResult-desc">
                        {'Small Text (14pt) - 4.5'}
                    </p>
                </div>
                <div className="contrastResult">
                    <h2 className="contrastResult-rating">
                        {boldTextRating}
                    </h2>
                    <p className="contrastResult-desc">
                        <strong>{'Bold Text (14pt) - 3.0'}</strong>
                    </p>
                </div>
                <div className="contrastResult">
                    <h2 className="contrastResult-rating">
                        {largeTextRating}
                    </h2>
                    <p className="contrastResult-desc contrastResult-desc--large">
                        {'Large Text (18pt) - 3.0'}
                    </p>
                </div>
                <div className="contrastResult">
                    <h2 className="contrastResult-rating">
                        {ratio}
                    </h2>
                    <p className="contrastResult-desc">
                        {'Ratio'}
                    </p>
                </div>
                <div className="contrastResult">
                    <h2 className="contrastResult-rating">
                        {this.props.colorBrightness}
                    </h2>
                    <p className="contrastResult-desc">
                        {'Brightness >= 125'}
                    </p>
                </div>
                <div className="contrastResult">
                    <h2 className="contrastResult-rating">
                        {this.props.colorDifference}
                    </h2>
                    <p className="contrastResult-desc">
                        {'Difference >= 500'}
                    </p>
                </div>
            </div>
        );
    }
}

Results.propTypes = {
    accessibility: PropTypes.shape({
        aa: PropTypes.bool,
        aaa: PropTypes.bool,
        aaLarge: PropTypes.bool,
        aaaLarge: PropTypes.bool
    }),
    children: PropTypes.node,
    colorBrightness: PropTypes.number,
    colorDifference: PropTypes.number,
    contrast: PropTypes.number
};

export default Results;