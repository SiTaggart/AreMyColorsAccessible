import { ColorCombo } from 'color-combos';

export interface Levels {
  aa: boolean;
  aaLarge: boolean;
  aaa: boolean;
  aaaLarge: boolean;
}

export interface SiteData {
  background: string;
  textColor: string;
  isLight: boolean;
  colorCombos: ColorCombo[];
}

export interface PalettePageQueryString {
  colors: string[];
}
