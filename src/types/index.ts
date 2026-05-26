import { ColorCombo } from "color-combos";

export type ColorPair = [string, string];
export interface Levels {
  aa: boolean;
  aaa: boolean;
  aaaLarge: boolean;
  aaLarge: boolean;
}

export interface SiteData {
  background: string;
  colorCombos: Array<ColorCombo>;
  isLight: boolean;
  textColor: string;
}

export interface PalettePageQueryString {
  colors: Array<string>;
}
