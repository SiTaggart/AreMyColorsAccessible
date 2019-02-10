export interface Levels {
  aa: boolean;
  aaLarge: boolean;
  aaa: boolean;
  aaaLarge: boolean;
}

export interface ColorCombinationTypes {
  accessibility?: Levels;
  color?: number[];
  contrast?: number;
  hex?: string;
  model?: string;
  valpha?: number;
}

export interface ColorCombosTypes {
  color: number[];
  combinations: ColorCombinationTypes[];
  hex: string;
  model: string;
  valpha: number;
  [key: number]: ColorCombosTypes;
}

export interface SiteData {
  background: string;
  textColor: string;
  isLight: boolean;
  colorCombos: ColorCombosTypes[];
}
