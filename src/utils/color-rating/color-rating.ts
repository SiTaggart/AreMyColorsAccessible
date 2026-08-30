export interface Accessibility {
  aa: boolean;
  aaa: boolean;
  aaaLarge: boolean;
  aaLarge: boolean;
}

export type OverallRating = "Yup" | "Kinda" | "Nope";
export type WcagRating = "AAA" | "AA" | "Fail";

export interface ColorRating {
  bold: WcagRating;
  large: WcagRating;
  overall: OverallRating;
  small: WcagRating;
}

const colorRating = (accessibility: Accessibility): ColorRating => {
  let small: WcagRating;
  let bold: WcagRating;
  let large: WcagRating;
  let overall: OverallRating = "Nope";

  if (accessibility.aaa) {
    small = "AAA";
  } else {
    small = accessibility.aa ? "AA" : "Fail";
  }

  if (accessibility.aaaLarge) {
    bold = "AAA";
    large = "AAA";
  } else {
    bold = accessibility.aaLarge ? "AA" : "Fail";
    large = bold;
  }

  if (small === "AAA" || small === "AA") {
    overall = "Yup";
  } else if (small === "Fail" && large === "AA") {
    overall = "Kinda";
  }

  return {
    bold,
    large,
    overall,
    small,
  };
};

export { colorRating };
