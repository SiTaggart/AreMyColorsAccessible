import { createFileRoute } from '@tanstack/react-router';

import { ensureColorsAreAnArrayOfTwo, getRating } from '~/utils/color-rating';
import { jsonResponse, preflightResponse } from '~/utils/http';
import { logger } from '~/utils/logger';

const handle = async ({ request }: { request: Request }): Promise<Response> => {
  logger.info('url', { url: request.url });

  const raw = await request.text();
  logger.info('body', { body: raw });

  let colors: string | Array<string> | undefined;
  try {
    colors = raw ? (JSON.parse(raw) as { colors?: string | Array<string> }).colors : undefined;
  } catch {
    colors = undefined;
  }
  logger.info('colors', { colors });

  const colorsArray = colors === undefined ? false : ensureColorsAreAnArrayOfTwo(colors);

  if (colorsArray) {
    logger.info('color array', { colorsArray });
    const rating = getRating(colorsArray);
    logger.info('rating', { rating });
    return jsonResponse(rating);
  }

  logger.error('no array', { body: raw });
  return jsonResponse({ message: 'Error: must send a colors key with array of two colors' }, 500);
};

export const Route = createFileRoute('/api/are-they')({
  server: {
    handlers: {
      GET: handle,
      OPTIONS: preflightResponse,
      POST: handle,
    },
  },
});
