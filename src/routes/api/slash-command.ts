import { createFileRoute } from '@tanstack/react-router';
import qs from 'query-string';
import { ensureColorsAreAnArrayOfTwo, getRating } from '~/utils/color-rating';
import type { GetRatingReturn } from '~/utils/color-rating';
import { logger } from '~/utils/logger';
import { jsonResponse, preflightResponse } from '~/utils/http';
import { ColorPair } from '~/types';

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

const returnColorRatingResponse = (slashText: string): Response => {
  const colors = slashText.split(' ');
  logger.info('slash colors', { colors });
  const colorsArray = ensureColorsAreAnArrayOfTwo(colors);

  if (colorsArray) {
    logger.info('slash color array', { colorsArray });
    const rating = getRating(colorsArray);
    logger.info('slash rating', { rating });
    if (rating) {
      return jsonResponse(getSlashCommandResponse(rating, colorsArray));
    }
    return jsonResponse({
      response_type: 'ephemeral',
      text: "Sorry, one of those don't seem to be a valid color.",
    });
  }

  logger.error('slash no array', { text: slashText });
  return jsonResponse({
    response_type: 'ephemeral',
    text: "Sorry, fellow color checker, that didn't work. Please try again with two, space separated hex or rgb colors.",
  });
};

const returnHelpResponse = (): Response =>
  jsonResponse({
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

const handlePost = async ({ request }: { request: Request }): Promise<Response> => {
  const form = await request.formData();
  const slashText = String(form.get('text') ?? '');
  logger.info('slash body', { text: slashText });

  if (slashText === 'help') {
    return returnHelpResponse();
  }
  return returnColorRatingResponse(slashText);
};

export const Route = createFileRoute('/api/slash-command')({
  server: {
    handlers: {
      OPTIONS: preflightResponse,
      POST: handlePost,
    },
  },
});
