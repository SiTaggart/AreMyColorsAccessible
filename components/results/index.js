import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './results.scss';

class Results extends Component {
  renderAreYouSerious() {
    let styles = {
      seriouslyContainer: {
        color: this.props.isLight ? '#222' : '#fff'
      }
    };
    return (
      <div className="contrastResult" style={styles.seriouslyContainer}>
        <h2 className="contrastResult-rating">{'Seriously?'}</h2>
      </div>
    );
  }

  render() {
    const ratio = this.props.contrast.toFixed(2);
    let areYouSerious = false;
    let boldTextRating = '';
    let largeTextRating = '';
    let overallRating = 'Nope';
    let smallTextRating = '';

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

    if (smallTextRating === 'AAA' || smallTextRating === 'AA') {
      overallRating = 'Yup';
    } else if (smallTextRating === 'Fail' && largeTextRating === 'AA') {
      overallRating = 'Kinda';
    }

    if (ratio < 1.3) {
      areYouSerious = this.renderAreYouSerious();
    }

    return (
      <div className="contrastResults">
        <h1 aria-atomic="true" aria-live="polite" className="contrastResults-heading">
          {overallRating}
        </h1>
        <div className="contrastResult">
          <h2 className="contrastResult-rating">{smallTextRating}</h2>
          <p className="contrastResult-desc">
            Small Text - 4.5 <br />
            &lt; 14pt or 18px
          </p>
        </div>
        <div className="contrastResult">
          <h2 className="contrastResult-rating">{boldTextRating}</h2>
          <p className="contrastResult-desc">
            <strong>
              Bold Text - 3.0 <br />
              &gt; 14pt or 18px
            </strong>
          </p>
        </div>
        <div className="contrastResult">
          <h2 className="contrastResult-rating">{largeTextRating}</h2>
          <p className="contrastResult-desc contrastResult-desc--large">
            Large Text - 3.0 <br />
            &gt; 18pt or 24px
          </p>
        </div>
        <div className="contrastResult">
          <h2 className="contrastResult-rating">{ratio}</h2>
          <p className="contrastResult-desc">{'Ratio'}</p>
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
  }).isRequired,
  contrast: PropTypes.number.isRequired,
  isLight: PropTypes.bool.isRequired
};

export default Results;
