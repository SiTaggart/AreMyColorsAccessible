import { createFileRoute } from "@tanstack/react-router";
import { ensureColorsAreAnArrayOfTwo, getRating } from "../../../utils/color-rating";
import { jsonResponse, parseJsonBody, preflightResponse } from "../../../utils/http";
import { logger } from "../../../utils/logger";

interface AreTheyBody {
  colors?: string | Array<string>;
}

const readBody = async (request: Request): Promise<AreTheyBody> => {
  const body = await parseJsonBody(request);
  return typeof body === "object" && body !== null ? (body as AreTheyBody) : {};
};

export const Route = createFileRoute("/api/are-they")({
  server: {
    handlers: {
      OPTIONS: async () => preflightResponse(),
      POST: async ({ request }) => {
        const body = await readBody(request);
        logger.info("body", { body });
        const colorsArray = body.colors ? ensureColorsAreAnArrayOfTwo(body.colors) : false;

        if (!colorsArray) {
          logger.error("no array", { body });
          return jsonResponse(
            { message: "Error: must send a colors key with array of two colors" },
            { status: 500 },
          );
        }

        const rating = getRating(colorsArray);
        logger.info("rating", { rating });
        return jsonResponse(rating);
      },
    },
  },
});
