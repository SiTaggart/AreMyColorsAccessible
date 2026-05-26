export const corsHeaders = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Origin": "*",
};

const requestedCorsHeaders = (request: Request): string =>
  request.headers.get("Access-Control-Request-Headers") ??
  corsHeaders["Access-Control-Allow-Headers"];

export const jsonResponse = (body: unknown, init: ResponseInit = {}): Response =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
      ...init.headers,
    },
  });

export const preflightResponse = (request: Request): Response =>
  new Response(null, {
    headers: {
      ...corsHeaders,
      "Access-Control-Allow-Headers": requestedCorsHeaders(request),
    },
    status: 204,
  });

export type JsonBodyParseResult =
  | {
      body: unknown;
      ok: true;
    }
  | {
      error: "invalid-json";
      ok: false;
    };

export const parseJsonBody = async (request: Request): Promise<JsonBodyParseResult> => {
  const text = await request.text();
  if (!text) {
    return { body: {}, ok: true };
  }

  try {
    return { body: JSON.parse(text) as unknown, ok: true };
  } catch {
    return { error: "invalid-json", ok: false };
  }
};
