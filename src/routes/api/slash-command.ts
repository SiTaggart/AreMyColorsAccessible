import { createFileRoute } from "@tanstack/react-router";
import qs from "query-string";
import {
  ensureColorsAreAnArrayOfTwo,
  getRating,
  type GetRatingReturn,
} from "../../utils/color-rating";
import { jsonResponse, preflightResponse } from "../../utils/http";
import { logger } from "../../utils/logger";
import type { ColorPair } from "../../types";

const getURL = (colors: ColorPair): string =>
  qs.stringify({
    background: colors[1],
    isLight: true,
    textColor: colors[0],
  });

const getSlashCommandResponse = (
  rating: GetRatingReturn,
  colors: ColorPair,
): Record<string, unknown> => ({
  blocks: [
    {
      text: {
        type: "plain_text",
        text: rating.overall,
        emoji: true,
      },
      type: "header",
    },
    {
      text: {
        type: "mrkdwn",
        text: `*${colors[0]}* on *${colors[1]}* has a contrast ratio of *${rating.contrast}*. You will get the following WCAG ratings:`,
      },
      type: "section",
    },
    {
      text: {
        type: "mrkdwn",
        text: `Any old text: *${rating.small}*`,
      },
      type: "section",
    },
    {
      text: {
        type: "mrkdwn",
        text: `Bold text above 18px: *${rating.bold}*`,
      },
      type: "section",
    },
    {
      text: {
        type: "mrkdwn",
        text: `Large text over 24px: *${rating.large}*`,
      },
      type: "section",
    },
    {
      type: "divider",
    },
    {
      elements: [
        {
          type: "mrkdwn",
          text: `Tweak it <https://www.aremycolorsaccessible.com/?${getURL(colors)}|here>.`,
        },
      ],
      type: "context",
    },
  ],
});

const getHelpResponse = (): Record<string, unknown> => ({
  blocks: [
    {
      text: {
        type: "mrkdwn",
        text: `Keep it simple, give me two colors with a space between and I'll tell you if they're an accessible combination. You can try something like:`,
      },
      type: "section",
    },
    {
      text: {
        type: "mrkdwn",
        text: `/color-check #fff #000`,
      },
      type: "section",
    },
    {
      text: {
        type: "mrkdwn",
        text: `/color-check rgb(255,255,255) rgb(0,0,0)`,
      },
      type: "section",
    },
  ],
});

const getColorRatingResponse = (slashText: string): Record<string, unknown> => {
  const colors = slashText.split(" ");
  logger.info("slash colors", { colors });
  const colorsArray = ensureColorsAreAnArrayOfTwo(colors);

  if (!colorsArray) {
    logger.error("slash no array", { text: slashText });
    return {
      response_type: "ephemeral",
      text: "Sorry, fellow color checker, that didn't work. Please try again with two, space separated hex or rgb colors.",
    };
  }

  const rating = getRating(colorsArray);
  logger.info("slash rating", { rating });

  if (!rating) {
    return {
      response_type: "ephemeral",
      text: "Sorry, one of those don't seem to be a valid color.",
    };
  }

  return getSlashCommandResponse(rating, colorsArray);
};

const readSlashText = async (request: Request): Promise<string> => {
  const text = await request.text();
  const params = new URLSearchParams(text);
  return params.get("text") ?? "";
};

export const Route = createFileRoute("/api/slash-command")({
  server: {
    handlers: {
      OPTIONS: async () => preflightResponse(),
      POST: async ({ request }) => {
        const slashText = await readSlashText(request);
        logger.info("slash body", { text: slashText });
        return jsonResponse(
          slashText === "help" ? getHelpResponse() : getColorRatingResponse(slashText),
        );
      },
    },
  },
});
