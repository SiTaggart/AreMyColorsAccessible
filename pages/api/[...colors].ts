import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { initMiddleware } from '../../utils/init-middleware';
import { ensureColorsAreAnArrayOfTwo, getRating } from '../../utils/color-rating';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

// eslint-disable-next-line import/no-default-export
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  await cors(req, res);

  const { colors } = req.query;
  const colorsArray = ensureColorsAreAnArrayOfTwo(colors);

  if (colorsArray) {
    res.json(getRating(colorsArray));
  } else {
    res.status(500).json({ message: 'Error: must send a colors key with array of two colors' });
  }
}
