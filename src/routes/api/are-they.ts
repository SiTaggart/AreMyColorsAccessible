import { createFileRoute } from "@tanstack/react-router";
import { ensureColorsAreAnArrayOfTwo, getRating } from "../../utils/color-rating";
import { jsonResponse, parseJsonBody, preflightResponse } from "../../utils/http";
import { logger } from "../../utils/logger";

interface AreTheyBody {
  colors?: string | Array<string>;
}

type ReadBodyResult =
  | {
      body: AreTheyBody;
      ok: true;
    }
  | {
      ok: false;
    };

const readBody = async (request: Request): Promise<ReadBodyResult> => {
  const result = await parseJsonBody(request);

  if (!result.ok) {
    return { ok: false };
  }

  return {
    body:
      typeof result.body === "object" && result.body !== null ? (result.body as AreTheyBody) : {},
    ok: true,
  };
};

export const Route = createFileRoute("/api/are-they")({
  server: {
    handlers: {
      OPTIONS: async () => preflightResponse(),
      POST: async ({ request }) => {
        const result = await readBody(request);
        if (!result.ok) {
          logger.error("invalid json body");
          return jsonResponse(
            { message: "Error: request body must be valid JSON" },
            { status: 400 },
          );
        }

        const { body } = result;
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
