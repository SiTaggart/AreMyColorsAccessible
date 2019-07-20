import React, { ReactElement } from 'react';
import colorRating from '../../utils/color-rating';
import { useSiteData } from '../../context/home';
import {
  ContrastResult,
  ContrastResultRating,
  ContrastResults,
  ContrastResultsHeading,
  ContrastResultDesc
} from './styled';

interface AreYouSeriousProps {
  isLight: boolean;
}
const AreYouSerious: React.FC<AreYouSeriousProps> = ({
  isLight
}: AreYouSeriousProps): ReactElement => {
  const styles = {
    seriouslyContainer: {
      color: isLight ? '#343334' : '#fff'
    }
  };

  return (
    <ContrastResult style={styles.seriouslyContainer}>
      <ContrastResultRating as="h2" data-test="contrastResults-seriously">
        Seriously?
      </ContrastResultRating>
    </ContrastResult>
  );
};

const Results: React.FC<{}> = (): ReactElement => {
  const { siteData } = useSiteData();
  const colorInfo = siteData.colorCombos[0].combinations[0];
  const contrast = colorInfo.contrast ? colorInfo.contrast : 0;
  const accessibility = colorInfo.accessibility
    ? colorInfo.accessibility
    : {
        aa: false,
        aaLarge: false,
        aaa: false,
        aaaLarge: false
      };
  const ratio = parseFloat(contrast.toFixed(2));
  const colorRatings = colorRating(accessibility);
  const areYouSerious = ratio < 1.3 ? true : null;
  const boldTextRating = colorRatings.bold;
  const largeTextRating = colorRatings.large;
  const overallRating = colorRatings.overall;
  const smallTextRating = colorRatings.small;

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
        <ContrastResultDesc>Ratio</ContrastResultDesc>
      </ContrastResult>
      {areYouSerious && <AreYouSerious isLight={siteData.isLight} />}
    </ContrastResults>
  );
};

export default Results;
