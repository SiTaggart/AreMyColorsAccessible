import type { NextApiRequest, NextApiResponse } from 'next';
import ColorCombos from 'color-combos';
import Cors from 'cors';
import { initMiddleware } from '../../utils/init-middleware';
import { colorRating, ColorRating } from '../../utils/color-rating';

type ColorPair = [string, string];

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

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

interface GetRatingReturn extends ColorRating {
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

// eslint-disable-next-line import/no-default-export
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  await cors(req, res);

  const { colors } = req.body;
  const colorsArray = ensureColorsAreAnArrayOfTwo(colors);

  if (colorsArray) {
    res.json(getRating(colorsArray));
  } else {
    res.status(500).json({ message: 'Error: must send a colors key with array of two colors' });
  }
}
