import React, { Component, ReactElement } from 'react';
import { ColorCombinationTypes, Levels } from '../../types';
import colorRating from '../../utils/color-rating';
import './results.scss';

interface ResultsProps extends ColorCombinationTypes {
  isLight: boolean;
}

class Results extends Component<ResultsProps, {}> {
  private renderAreYouSerious(): ReactElement<HTMLDivElement> {
    let styles = {
      seriouslyContainer: {
        color: this.props.isLight ? '#343334' : '#fff'
      }
    };

    return (
      <div className="contrastResult" style={styles.seriouslyContainer}>
        <h2 className="contrastResult-rating">{'Seriously?'}</h2>
      </div>
    );
  }

  public render(): ReactElement<HTMLDivElement> {
    let contrast = 0;
    if (this.props.contrast) contrast = this.props.contrast;
    let accessibility: Levels = {
      aa: false,
      aaLarge: false,
      aaa: false,
      aaaLarge: false
    };
    if (this.props.accessibility) accessibility = this.props.accessibility;
    const ratio = parseFloat(contrast.toFixed(2));
    const colorRatings = colorRating(accessibility);
    let areYouSerious = null;
    let boldTextRating = colorRatings.bold;
    let largeTextRating = colorRatings.large;
    let overallRating = colorRatings.overall;
    let smallTextRating = colorRatings.small;

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

export default Results;
