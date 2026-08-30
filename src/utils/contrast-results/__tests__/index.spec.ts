import ColorCombos, { type Combination } from "color-combos";
import { getContrastDisplayResult } from "..";

const colorCombos = ColorCombos(["#fff", "#000"]);
if (colorCombos === false) {
  throw new Error("Expected test colors to produce combinations");
}

const baseCombination = colorCombos[0]?.combinations[0];
if (baseCombination === undefined) {
  throw new Error("Expected test combination to include APCA data");
}
const baseApca = baseCombination.apca;
if (baseApca === undefined) {
  throw new Error("Expected test combination to include APCA data");
}

const wcagCombination: Combination = {
  accessibility: {
    aa: true,
    aaa: false,
    aaaLarge: true,
    aaLarge: true,
  },
  contrast: 4.658_034_537_943_552,
  hex: "#000000",
};

describe("getContrastDisplayResult", (): void => {
  it("preserves the full WCAG ratings and ratio", (): void => {
    expect(getContrastDisplayResult(wcagCombination, "wcag2", "full")).toStrictEqual({
      heading: "Yup",
      metricLabel: "Contrast Ratio",
      metricValue: "4.66 : 1",
      rows: [
        {
          label: "Small Text",
          meets: true,
          requirement: "AA: 4.5 AAA: 7.0",
          value: "AA",
        },
        {
          label: "Bold Text 18px and over",
          meets: true,
          requirement: "AA: 3.0 AAA: 4.5",
          value: "AAA",
        },
        {
          label: "Large Text 24px and over",
          meets: true,
          requirement: "AA: 3.0 AAA: 4.5",
          value: "AAA",
        },
      ],
      showSeriously: false,
    });
  });

  it("uses only small and large rows for compact WCAG results", (): void => {
    expect(getContrastDisplayResult(wcagCombination, "wcag2", "compact").rows).toStrictEqual([
      { label: "Small", meets: true, value: "AA" },
      { label: "Large", meets: true, value: "AAA" },
    ]);
  });

  it("derives the APCA heading from readability results", (): void => {
    const combination: Combination = {
      ...baseCombination,
      apca: {
        ...baseApca,
        lc: 80,
        readability: {
          ...baseApca.readability,
          bodyText: {
            ...baseApca.readability.bodyText,
            meets: false,
          },
          largeText: {
            ...baseApca.readability.largeText,
            meets: true,
          },
        },
      },
    };

    const result = getContrastDisplayResult(combination, "apca", "full");
    expect(result.heading).toBe("Kinda");
    expect(result.metricLabel).toBe("APCA Lc");
    expect(result.metricValue).toBe("+80");
    expect(result.rows.map(({ label }) => label)).toStrictEqual([
      "Fluent Text",
      "Body Text",
      "Content Text",
      "Large Text",
      "Minimum Text",
      "Non-Text",
    ]);
    expect(JSON.stringify(result)).not.toMatch(/\bAA(?:A)?\b/);
  });

  it("uses only Body, Content, and Large rows for compact APCA results", (): void => {
    const result = getContrastDisplayResult(baseCombination, "apca", "compact");
    expect(result.rows.map(({ label }) => label)).toStrictEqual(["Body", "Content", "Large"]);
  });

  it.each([
    { expected: "+45.68", lc: 45.678 },
    { expected: "-45.68", lc: -45.678 },
  ])("formats signed APCA Lc as $expected", ({ expected, lc }): void => {
    const combination: Combination = {
      ...baseCombination,
      apca: {
        ...baseApca,
        lc,
      },
    };
    expect(getContrastDisplayResult(combination, "apca", "full").metricValue).toBe(expected);
  });

  it("keeps Seriously as an overlay at the WCAG boundary", (): void => {
    expect(
      getContrastDisplayResult({ ...wcagCombination, contrast: 1.29 }, "wcag2", "full")
        .showSeriously,
    ).toBe(true);
    expect(
      getContrastDisplayResult({ ...wcagCombination, contrast: 1.3 }, "wcag2", "full")
        .showSeriously,
    ).toBe(false);
  });

  it("keeps Seriously as an overlay at the APCA boundary", (): void => {
    const getResult = (lc: number) =>
      getContrastDisplayResult(
        {
          ...baseCombination,
          apca: {
            ...baseApca,
            lc,
          },
        },
        "apca",
        "full",
      );

    expect(getResult(14.99).showSeriously).toBe(true);
    expect(getResult(-14.99).showSeriously).toBe(true);
    expect(getResult(15).showSeriously).toBe(false);
    expect(getResult(-15).showSeriously).toBe(false);
  });

  it("returns Unavailable when APCA data is missing", (): void => {
    expect(getContrastDisplayResult(wcagCombination, "apca", "full")).toStrictEqual({
      heading: "Unavailable",
      metricLabel: "APCA Lc",
      metricValue: "Unavailable",
      rows: [],
      showSeriously: false,
    });
  });
});
