import type { ApcaAccessibility } from "color-combos";
import type { OverallRating } from "./color-rating";

export interface ApcaRatingInput {
  lc: ApcaAccessibility["lc"];
  readability: Pick<ApcaAccessibility["readability"], "contentText" | "largeText">;
}

export interface ApcaRating {
  overall: OverallRating;
  showSeriously: boolean;
}

const apcaRating = ({ lc, readability }: ApcaRatingInput): ApcaRating => {
  let overall: OverallRating = "Nope";

  if (readability.contentText.meets) {
    overall = "Yup";
  } else if (readability.largeText.meets) {
    overall = "Kinda";
  }

  return {
    overall,
    showSeriously: Math.abs(lc) < 15,
  };
};

export { apcaRating };
