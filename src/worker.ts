import start from "@tanstack/react-start/server-entry";
import { corsHeaders, preflightResponse } from "../utils/http";

const isApiRequest = (request: Request): boolean =>
  new URL(request.url).pathname.startsWith("/api/");

const withCors = (response: Response): Response => {
  const headers = new Headers(response.headers);

  for (const [name, value] of Object.entries(corsHeaders)) {
    headers.set(name, value);
  }

  return new Response(response.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
  });
};

export default {
  async fetch(...args: Parameters<typeof start.fetch>): Promise<Response> {
    const [request] = args;

    if (isApiRequest(request) && request.method === "OPTIONS") {
      return preflightResponse();
    }

    const response = await start.fetch(...args);
    return isApiRequest(request) ? withCors(response) : response;
  },
};
