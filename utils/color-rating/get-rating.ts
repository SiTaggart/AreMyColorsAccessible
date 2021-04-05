import ColorCombos from 'color-combos';
import { ColorPair } from '../../types';
import { colorRating, ColorRating } from './color-rating';

export interface GetRatingReturn extends ColorRating {
  contrast: string;
}
export const getRating = (colors: ColorPair): GetRatingReturn | false => {
  let colorCombos;
  try {
    colorCombos = ColorCombos(colors);
  } catch {
    return false;
  }
  if (colorCombos !== false) {
    const contrastRatio = `${colorCombos[0].combinations[0].contrast}: 1`;
    const rating = colorRating(colorCombos[0].combinations[0].accessibility);
    return { ...rating, contrast: contrastRatio };
  }
  return false;
};
