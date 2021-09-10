import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import qs from 'query-string';
import { initMiddleware } from '../../utils/init-middleware';
import { logger } from '../../utils/logger';
import { ensureColorsAreAnArrayOfTwo, getRating } from '../../utils/color-rating';
import type { GetRatingReturn } from '../../utils/color-rating';
import { ColorPair } from '../../types';

const getURL = (colors: ColorPair): string =>
  qs.stringify({
    background: colors[1],
    textColor: colors[0],
    isLight: true,
  });

const getSlashCommandResponse = (
  rating: GetRatingReturn,
  colors: ColorPair
): Record<string, unknown> => ({
  blocks: [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: rating.overall,
        emoji: true,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${colors[0]}* on *${colors[1]}* has a contrast ratio of *${rating.contrast}*. You will get the following WCAG ratings:`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Any old text: *${rating.small}*`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Bold text above 18px: *${rating.bold}*`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Large text over 24px: *${rating.large}*`,
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `:guide_dog: Tweak it <https://www.aremycolorsaccessible.com/?${getURL(
            colors
          )}|here>.`,
        },
      ],
    },
  ],
});

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

const returnColorRatingResponse = (slashText: string, res: NextApiResponse): void => {
  const colors = slashText.split(' ');
  logger.info('slash colors', { colors });
  const colorsArray = ensureColorsAreAnArrayOfTwo(colors);

  if (colorsArray) {
    logger.info('slash color array', { colorsArray });
    let rating;
    try {
      rating = getRating(colorsArray);
    } catch (error) {
      logger.error('slash get rating', { error });
    }
    logger.info('slash rating', { rating });
    if (!rating) {
      res.send({
        response_type: 'ephemeral',
        text: "Sorry, one of those don't seem to be a valid color.",
      });
    } else {
      res.json(getSlashCommandResponse(rating, colorsArray));
    }
  } else {
    logger.error('slash no array', { text: slashText });
    res.json({
      response_type: 'ephemeral',
      text: "Sorry, fellow color checker, that didn't work. Please try again with two, space separated hex or rgb colors.",
    });
  }
};

const returnHelpResponse = (res: NextApiResponse): void => {
  res.json({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Keep it simple, give me two colors with a space between and I'll tell you if they're an accessible combination. You can try something like:`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `/color-check #fff #000`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `/color-check rgb(255,255,255) rgb(0,0,0)`,
        },
      },
    ],
  });
};

// eslint-disable-next-line import/no-default-export
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  await cors(req, res);
  logger.info('slash body', { body: req.body });
  const slashText = req.body.text;
  if (slashText === 'help') {
    return returnHelpResponse(res);
  }
  return returnColorRatingResponse(slashText, res);
}
