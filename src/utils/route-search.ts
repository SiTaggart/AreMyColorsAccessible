import type { PalettePageQueryString, SiteData } from "../types";

const searchString = (value: unknown): string | undefined =>
  typeof value === "string" ? value : undefined;

export const parseSiteSearch = (search: Record<string, unknown>): Partial<SiteData> => {
  const background = searchString(search.background);
  const textColor = searchString(search.textColor);
  const isLight = search.isLight;

  return {
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
  const colors = search.colors;

  if (Array.isArray(colors)) {
    return { colors: colors.filter((color): color is string => typeof color === "string") };
  }

  return typeof colors === "string" ? { colors: [colors] } : {};
};
