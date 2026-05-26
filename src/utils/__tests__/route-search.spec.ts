import { parsePaletteSearch, parseSiteSearch } from "../route-search";

describe("parseSiteSearch", (): void => {
  it("keeps valid shared colour state from route search params", (): void => {
    expect(
      parseSiteSearch({
        background: "#000",
        isLight: "false",
        textColor: "#fff",
      }),
    ).toStrictEqual({
      background: "#000",
      isLight: false,
      textColor: "#fff",
    });
  });

  it("drops malformed boolean values instead of throwing during render", (): void => {
    expect(
      parseSiteSearch({
        background: "#000",
        isLight: "nope",
        textColor: "#fff",
      }),
    ).toStrictEqual({
      background: "#000",
      textColor: "#fff",
    });
  });
});

describe("parsePaletteSearch", (): void => {
  it("normalizes a single shared palette color to an array", (): void => {
    expect(parsePaletteSearch({ colors: "#fff" })).toStrictEqual({ colors: ["#fff"] });
  });

  it("filters repeated palette colors to strings", (): void => {
    expect(parsePaletteSearch({ colors: ["#fff", 123, "#000"] })).toStrictEqual({
      colors: ["#fff", "#000"],
    });
  });
});
