import React, { Component, PropTypes } from 'react';
import './results.scss';

class Results extends Component {

    constructor(props) {
        super(props);
    }

    renderAreYouSerious() {
        let styles = {
            seriouslyContainer: {
                color: this.props.isLight ? '#222' : '#fff'
            }
        };
        return(
            <div className="contrastResult" style={styles.seriouslyContainer}>
                <h2 className="contrastResult-rating">
                    {'Seriously?'}
                </h2>
            </div>
        );
    }

    render() {
        const ratio = this.props.contrast.toFixed(2);
        let areYouSerious = false;
        let boldTextRating = this.props.accessibility.aaaLarge ? this.props.accessibility.aaaLarge : this.props.accessibility.aaLarge ;
        let largeTextRating = this.props.accessibility.aaaLarge ? this.props.accessibility.aaaLarge : this.props.accessibility.aaLarge ;
        let overallRating;
        let smallTextRating;

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

        if ((smallTextRating === 'AAA' || smallTextRating === 'AA')) {
            overallRating = 'Yup';
        } else if (smallTextRating === 'Fail' && largeTextRating === 'AA') {
            overallRating = 'Kinda';
        } else {
            overallRating = 'Nope';
        }

        if(ratio < 1.3) {
            areYouSerious = this.renderAreYouSerious();
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
                {areYouSerious}
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
    contrast: PropTypes.number,
    isLight: PropTypes.bool
};

export default Results;