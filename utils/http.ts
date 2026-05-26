export const corsHeaders = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Origin": "*",
};

export const jsonResponse = (body: unknown, init: ResponseInit = {}): Response =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
      ...init.headers,
    },
  });

export const preflightResponse = (): Response =>
  new Response(null, {
    headers: corsHeaders,
    status: 204,
  });

export const parseJsonBody = async (request: Request): Promise<unknown> => {
  const text = await request.text();
  if (!text) {
    return {};
  }
  return JSON.parse(text) as unknown;
};
