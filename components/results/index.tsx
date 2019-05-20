import React, { Component, ReactElement } from 'react';
import styled from '@emotion/styled';
import { ColorCombinationTypes, Levels } from '../../types';
import { breakpoint } from '../../styles/utils';
import colorRating from '../../utils/color-rating';
import { Heading } from '../typography';

const ContrastResults = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  text-align: center;

  ${breakpoint('small')} {
    margin-bottom: 3rem;
  }

  ${breakpoint('medium')} {
    margin-bottom: 5rem;
  }
`;

const ContrastResultsHeading = styled(Heading)`
  font-size: 20vw;
  margin: 3rem 0;
  width: 100%;

  ${breakpoint('small')} {
    font-size: 18vw;
    margin: 4rem 0;
  }

  ${breakpoint('medium')} {
    font-size: 15vw;
    margin: 5rem 0;
  }

  ${breakpoint('xlarge')} {
    font-size: 9vw;
  }
`;

const ContrastResult = styled.div`
  flex: 1 1 auto;
  margin-bottom: 2rem;
  width: 50%;

  ${breakpoint('small')} {
    width: 25%;
  }
`;

const ContrastResultRating = styled(Heading)`
  font-size: 10vw;
  margin: 0;

  ${breakpoint('small')} {
    font-size: 6vw;
  }

  ${breakpoint('medium')} {
    font-size: 4vw;
  }

  ${breakpoint('xlarge')} {
    font-size: 3vw;
  }
`;

const ContrastResultDesc = styled.p<{ isLarge?: boolean }>`
  font-size: ${(props): string => (props.isLarge ? '18pt' : '14pt')};
  margin: 0;
`;

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
      <ContrastResult style={styles.seriouslyContainer}>
        <ContrastResultRating as="h2" data-test="contrastResults-seriously">
          {'Seriously?'}
        </ContrastResultRating>
      </ContrastResult>
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
      <ContrastResults>
        <ContrastResultsHeading
          aria-atomic="true"
          aria-live="polite"
          as="h1"
          data-test="contrastResults-heading"
        >
          {overallRating}
        </ContrastResultsHeading>
        <ContrastResult>
          <ContrastResultRating as="h2" data-test="contrastResult-rating-small">
            {smallTextRating}
          </ContrastResultRating>
          <ContrastResultDesc>
            Small Text - 4.5 <br />
            &lt; 14pt or 18px
          </ContrastResultDesc>
        </ContrastResult>
        <ContrastResult>
          <ContrastResultRating as="h2" data-test="contrastResult-rating-bold">
            {boldTextRating}
          </ContrastResultRating>
          <ContrastResultDesc>
            <strong>
              Bold Text - 3.0 <br />
              &gt; 14pt or 18px
            </strong>
          </ContrastResultDesc>
        </ContrastResult>
        <ContrastResult>
          <ContrastResultRating as="h2" data-test="contrastResult-rating-large">
            {largeTextRating}
          </ContrastResultRating>
          <ContrastResultDesc isLarge>
            Large Text - 3.0 <br />
            &gt; 18pt or 24px
          </ContrastResultDesc>
        </ContrastResult>
        <ContrastResult>
          <ContrastResultRating as="h2">{ratio}</ContrastResultRating>
          <ContrastResultDesc>{'Ratio'}</ContrastResultDesc>
        </ContrastResult>
        {areYouSerious}
      </ContrastResults>
    );
  }
}

export default Results;
