import type { ApcaAccessibility, Combination } from "color-combos";
import type { ContrastAlgorithm } from "../../types";
import { apcaRating, colorRating, type ColorRating, type OverallRating } from "../color-rating";

export type ContrastDisplayVariant = "full" | "compact";
export type ContrastDisplayHeading = OverallRating | "Unavailable";

export interface ContrastDisplayRow {
  label: string;
  meets: boolean;
  requirement?: string;
  value: string;
}

export interface ContrastDisplayResult {
  heading: ContrastDisplayHeading;
  metricLabel: "Contrast Ratio" | "APCA Lc";
  metricValue: string;
  rows: Array<ContrastDisplayRow>;
  showSeriously: boolean;
}

type ReadabilityKey = keyof ApcaAccessibility["readability"];

interface ReadabilityRowDefinition {
  compactLabel: string;
  fullLabel: string;
  key: ReadabilityKey;
}

const readabilityRows: Array<ReadabilityRowDefinition> = [
  { compactLabel: "Fluent", fullLabel: "Fluent Text", key: "fluentText" },
  { compactLabel: "Body", fullLabel: "Body Text", key: "bodyText" },
  { compactLabel: "Content", fullLabel: "Content Text", key: "contentText" },
  { compactLabel: "Large", fullLabel: "Large Text", key: "largeText" },
  { compactLabel: "Minimum", fullLabel: "Minimum Text", key: "minimumText" },
  { compactLabel: "Non-Text", fullLabel: "Non-Text", key: "nonText" },
];

const compactReadabilityKeys = new Set<ReadabilityKey>(["bodyText", "contentText", "largeText"]);

const roundMetric = (value: number): number => Number.parseFloat(value.toFixed(2));

const getWcagRows = (
  rating: ColorRating,
  variant: ContrastDisplayVariant,
): Array<ContrastDisplayRow> => {
  if (variant === "compact") {
    return [
      {
        label: "Small",
        meets: rating.small !== "Fail",
        value: rating.small,
      },
      {
        label: "Large",
        meets: rating.large !== "Fail",
        value: rating.large,
      },
    ];
  }

  return [
    {
      label: "Small Text",
      meets: rating.small !== "Fail",
      requirement: "AA: 4.5 AAA: 7.0",
      value: rating.small,
    },
    {
      label: "Bold Text 18px and over",
      meets: rating.bold !== "Fail",
      requirement: "AA: 3.0 AAA: 4.5",
      value: rating.bold,
    },
    {
      label: "Large Text 24px and over",
      meets: rating.large !== "Fail",
      requirement: "AA: 3.0 AAA: 4.5",
      value: rating.large,
    },
  ];
};

const getApcaRows = (
  apca: ApcaAccessibility,
  variant: ContrastDisplayVariant,
): Array<ContrastDisplayRow> =>
  readabilityRows
    .filter(({ key }) => variant === "full" || compactReadabilityKeys.has(key))
    .map(({ compactLabel, fullLabel, key }) => {
      const result = apca.readability[key];
      return {
        label: variant === "full" ? fullLabel : compactLabel,
        meets: result.meets,
        requirement: `|Lc| ≥ ${result.thresholdLc}`,
        value: result.meets ? "Pass" : "Fail",
      };
    });

const getContrastDisplayResult = (
  combination: Combination,
  algorithm: ContrastAlgorithm,
  variant: ContrastDisplayVariant,
): ContrastDisplayResult => {
  if (algorithm === "wcag2") {
    const rating = colorRating(combination.accessibility);
    const ratio = roundMetric(combination.contrast);
    return {
      heading: rating.overall,
      metricLabel: "Contrast Ratio",
      metricValue: `${ratio} : 1`,
      rows: getWcagRows(rating, variant),
      showSeriously: ratio < 1.3,
    };
  }

  if (combination.apca === undefined) {
    return {
      heading: "Unavailable",
      metricLabel: "APCA Lc",
      metricValue: "Unavailable",
      rows: [],
      showSeriously: false,
    };
  }

  const rating = apcaRating(combination.apca);
  const lc = roundMetric(combination.apca.lc);
  return {
    heading: rating.overall,
    metricLabel: "APCA Lc",
    metricValue: `${lc >= 0 ? "+" : ""}${lc}`,
    rows: getApcaRows(combination.apca, variant),
    showSeriously: rating.showSeriously,
  };
};

export { getContrastDisplayResult };
