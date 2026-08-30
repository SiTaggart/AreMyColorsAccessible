import type { ContrastAlgorithm, HomePageQueryString, PalettePageQueryString } from "../types";

const searchString = (value: unknown): string | undefined =>
  typeof value === "string" ? value : undefined;

export const isContrastAlgorithm = (value: unknown): value is ContrastAlgorithm =>
  value === "wcag2" || value === "apca";

export const parseSiteSearch = (search: Record<string, unknown>): Partial<HomePageQueryString> => {
  const algorithm = search.algorithm;
  const background = searchString(search.background);
  const textColor = searchString(search.textColor);
  const isLight = search.isLight;

  return {
    ...(isContrastAlgorithm(algorithm) ? { algorithm } : {}),
    ...(background === undefined ? {} : { background }),
    ...(textColor === undefined ? {} : { textColor }),
    ...(typeof isLight === "boolean"
      ? { isLight }
      : isLight === "true" || isLight === "false"
        ? { isLight: isLight === "true" }
        : {}),
  };
};

export const parsePaletteSearch = (
  search: Record<string, unknown>,
): Partial<PalettePageQueryString> => {
  const algorithm = search.algorithm;
  const colors = search.colors;
  const parsedAlgorithm = isContrastAlgorithm(algorithm) ? { algorithm } : {};

  if (Array.isArray(colors)) {
    return {
      ...parsedAlgorithm,
      colors: colors.filter((color): color is string => typeof color === "string"),
    };
  }

  return typeof colors === "string" ? { ...parsedAlgorithm, colors: [colors] } : parsedAlgorithm;
};
