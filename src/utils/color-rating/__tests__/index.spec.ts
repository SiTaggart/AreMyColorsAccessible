import { apcaRating } from "../apca-rating";
import { colorRating } from "../color-rating";

describe("utils/colorRating", (): void => {
  it("should return a AAA small rating", (): void => {
    const mockRating = {
      aa: true,
      aaa: true,
      aaaLarge: true,
      aaLarge: true,
    };
    expect(colorRating(mockRating)).toStrictEqual({
      bold: "AAA",
      large: "AAA",
      overall: "Yup",
      small: "AAA",
    });
  });

  it("should return a AA small rating", (): void => {
    const mockRating = {
      aa: true,
      aaa: false,
      aaaLarge: true,
      aaLarge: true,
    };
    expect(colorRating(mockRating)).toStrictEqual({
      bold: "AAA",
      large: "AAA",
      overall: "Yup",
      small: "AA",
    });
  });

  it("should return a AA large rating", (): void => {
    const mockRating = {
      aa: false,
      aaa: false,
      aaaLarge: false,
      aaLarge: true,
    };
    expect(colorRating(mockRating)).toStrictEqual({
      bold: "AA",
      large: "AA",
      overall: "Kinda",
      small: "Fail",
    });
  });

  it("should return a fail rating", (): void => {
    const mockRating = {
      aa: false,
      aaa: false,
      aaaLarge: false,
      aaLarge: false,
    };
    expect(colorRating(mockRating)).toStrictEqual({
      bold: "Fail",
      large: "Fail",
      overall: "Nope",
      small: "Fail",
    });
  });
});

describe("utils/apcaRating", (): void => {
  it.each([
    {
      bodyText: true,
      expected: "Yup",
      largeText: true,
    },
    {
      bodyText: false,
      expected: "Kinda",
      largeText: true,
    },
    {
      bodyText: false,
      expected: "Nope",
      largeText: false,
    },
  ] as const)(
    "returns $expected from the readability results",
    ({ bodyText, expected, largeText }): void => {
      expect(
        apcaRating({
          lc: 60,
          readability: {
            bodyText: { meets: bodyText, thresholdLc: 75 },
            largeText: { meets: largeText, thresholdLc: 45 },
          },
        }).overall,
      ).toBe(expected);
    },
  );

  it.each([
    { expected: true, lc: 14.99 },
    { expected: true, lc: -14.99 },
    { expected: false, lc: 15 },
    { expected: false, lc: -15 },
  ])("sets showSeriously to $expected for Lc $lc", ({ expected, lc }): void => {
    expect(
      apcaRating({
        lc,
        readability: {
          bodyText: { meets: false, thresholdLc: 75 },
          largeText: { meets: false, thresholdLc: 45 },
        },
      }).showSeriously,
    ).toBe(expected);
  });
});
