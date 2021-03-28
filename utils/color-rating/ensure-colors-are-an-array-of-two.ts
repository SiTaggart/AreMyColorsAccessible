import { ColorPair } from '../../types';

export const ensureColorsAreAnArrayOfTwo = (colors: string | string[]): ColorPair | false => {
  let arrayOfColors = colors;
  if (typeof colors === 'string') {
    try {
      arrayOfColors = JSON.parse(colors);
    } catch {
      return false;
    }
  }
  if (Array.isArray(arrayOfColors) && arrayOfColors.length === 2) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore this is definitely and array of 2
    return arrayOfColors;
  }
  return false;
};
