import React, { ReactElement } from "react";
import { useSiteData } from "../../context/home";
import { getContrastDisplayResult } from "../../utils/contrast-results";
import {
  ContrastResult,
  ContrastResultDesc,
  ContrastResultRating,
  ContrastResults,
  ContrastResultsHeading,
} from "./styled";

interface AreYouSeriousProps {
  isLight: boolean;
}
const AreYouSerious: React.FC<AreYouSeriousProps> = ({
  isLight,
}: AreYouSeriousProps): ReactElement => {
  const styles = {
    seriouslyContainer: {
      color: isLight ? "#343334" : "#fff",
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

const wcagRowTestIds: Record<string, string> = {
  "Bold Text 18px and over": "contrastResult-rating-bold",
  "Large Text 24px and over": "contrastResult-rating-large",
  "Small Text": "contrastResult-rating-small",
};

const getRowTestId = (label: string): string =>
  wcagRowTestIds[label] ??
  `contrastResult-rating-${label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;

const Results: React.FC = (): ReactElement => {
  const { siteData } = useSiteData();
  const colorInfo = siteData.colorCombos[0].combinations[0];
  const result = getContrastDisplayResult(colorInfo, siteData.algorithm, "full");

  return (
    <ContrastResults>
      <ContrastResultsHeading
        aria-atomic="true"
        aria-live="polite"
        as="h1"
        data-testid="contrastResults-heading"
      >
        {result.heading}
      </ContrastResultsHeading>
      {result.rows.map((row) => {
        const description = (
          <>
            {row.label}
            {row.requirement && (
              <>
                {row.label !== "Small Text" && " "}
                <br />
                {row.requirement}
              </>
            )}
          </>
        );
        return (
          <ContrastResult key={row.label}>
            <ContrastResultDesc isLarge={row.label === "Large Text 24px and over"}>
              {row.label === "Bold Text 18px and over" ? (
                <strong>{description}</strong>
              ) : (
                description
              )}
            </ContrastResultDesc>
            <ContrastResultRating as="h2" data-testid={getRowTestId(row.label)}>
              {row.value}
            </ContrastResultRating>
          </ContrastResult>
        );
      })}
      <ContrastResult>
        <ContrastResultDesc>{result.metricLabel}</ContrastResultDesc>
        <ContrastResultRating as="h2">{result.metricValue}</ContrastResultRating>
      </ContrastResult>
      {result.showSeriously && <AreYouSerious isLight={siteData.isLight} />}
    </ContrastResults>
  );
};

export { Results };
