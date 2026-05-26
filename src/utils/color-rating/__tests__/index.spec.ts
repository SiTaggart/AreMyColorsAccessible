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
