import React, { ReactElement } from 'react';
import { colorRating } from '../../utils/color-rating';
import { useSiteData } from '../../context/home';
import {
  ContrastResult,
  ContrastResultRating,
  ContrastResults,
  ContrastResultsHeading,
  ContrastResultDesc,
} from './styled';

interface AreYouSeriousProps {
  isLight: boolean;
}
const AreYouSerious: React.FC<AreYouSeriousProps> = ({
  isLight,
}: AreYouSeriousProps): ReactElement => {
  const styles = {
    seriouslyContainer: {
      color: isLight ? '#343334' : '#fff',
    },
  };

  return (
    <ContrastResult style={styles.seriouslyContainer}>
      <ContrastResultRating as="h2" data-testid="contrastResults-seriously">
        Seriously?
      </ContrastResultRating>
    </ContrastResult>
  );
};

const Results: React.FC = (): ReactElement => {
  const { siteData } = useSiteData();
  const colorInfo = siteData.colorCombos[0].combinations[0];
  const contrast = colorInfo.contrast ? colorInfo.contrast : 0;
  const accessibility = colorInfo.accessibility
    ? colorInfo.accessibility
    : {
        aa: false,
        aaLarge: false,
        aaa: false,
        aaaLarge: false,
      };
  const ratio = Number.parseFloat(contrast.toFixed(2));
  const colorRatings = colorRating(accessibility);
  const areYouSerious = ratio < 1.3 ? true : undefined;
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
        data-testid="contrastResults-heading"
      >
        {overallRating}
      </ContrastResultsHeading>
      <ContrastResult>
        <ContrastResultDesc>
          Small Text
          <br />
          AA: 4.5 AAA: 7.0
        </ContrastResultDesc>
        <ContrastResultRating as="h2" data-testid="contrastResult-rating-small">
          {smallTextRating}
        </ContrastResultRating>
      </ContrastResult>
      <ContrastResult>
        <ContrastResultDesc>
          <strong>
            Bold Text 18px and over <br />
            AA: 3.0 AAA: 4.5
          </strong>
        </ContrastResultDesc>
        <ContrastResultRating as="h2" data-testid="contrastResult-rating-bold">
          {boldTextRating}
        </ContrastResultRating>
      </ContrastResult>
      <ContrastResult>
        <ContrastResultDesc isLarge>
          Large Text 24px and over <br />
          AA: 3.0 AAA: 4.5
        </ContrastResultDesc>
        <ContrastResultRating as="h2" data-testid="contrastResult-rating-large">
          {largeTextRating}
        </ContrastResultRating>
      </ContrastResult>
      <ContrastResult>
        <ContrastResultDesc>Contrast Ratio</ContrastResultDesc>
        <ContrastResultRating as="h2">{`${ratio} : 1`}</ContrastResultRating>
      </ContrastResult>
      {areYouSerious && <AreYouSerious isLight={siteData.isLight} />}
    </ContrastResults>
  );
};

export { Results };
