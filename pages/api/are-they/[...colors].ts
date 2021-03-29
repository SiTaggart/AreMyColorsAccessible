import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { initMiddleware } from '../../../utils/init-middleware';
import { ensureColorsAreAnArrayOfTwo, getRating } from '../../../utils/color-rating';
import { logger } from '../../../utils/logger';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

// eslint-disable-next-line import/no-default-export
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  await cors(req, res);
  logger.info('url', { url: req.url });

  const { colors } = req.query;
  logger.info('query', { query: req.query });
  const colorsArray = ensureColorsAreAnArrayOfTwo(colors);

  if (colorsArray) {
    logger.info('color array', { colorsArray });
    let rating;
    try {
      rating = getRating(colorsArray);
    } catch (error) {
      logger.error('get rating', { error });
    }
    logger.info('rating', { rating });
    res.json(rating);
  } else {
    logger.error('no array', { query: req.query });
    res.status(500).json({ message: 'API Error: must send a colors key with array of two colors' });
  }
}
