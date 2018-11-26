export interface Levels {
  aa: boolean;
  aaLarge: boolean;
  aaa: boolean;
  aaaLarge: boolean;
}

export interface ColorCombinationTypes {
  accessibility: Levels;
  color: Array<number>;
  contrast: number;
  hex: string;
  model: string;
  valpha: number;
}

export interface ColorCombosTypes {
  color: Array<number>;
  combinations: Array<ColorCombinationTypes>;
  hex: string;
  model: string;
  valpha: number;
  [key: number]: ColorCombosTypes;
}

export interface SiteData {
  background: string;
  textColor: string;
  isLight: boolean;
}
