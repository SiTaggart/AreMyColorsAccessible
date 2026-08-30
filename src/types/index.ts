import { ColorCombo } from "color-combos";

export type ContrastAlgorithm = "wcag2" | "apca";
export type ColorPair = [string, string];
export interface Levels {
  aa: boolean;
  aaa: boolean;
  aaaLarge: boolean;
  aaLarge: boolean;
}

export interface HomePageQueryString {
  algorithm?: ContrastAlgorithm;
  background?: string;
  isLight?: boolean;
  textColor?: string;
}

export interface SiteData {
  algorithm: ContrastAlgorithm;
  background: string;
  colorCombos: Array<ColorCombo>;
  isLight: boolean;
  textColor: string;
}

export interface PalettePageQueryString {
  algorithm?: ContrastAlgorithm;
  colors: Array<string>;
}
