import { parseJsonBody, preflightResponse } from "../http";

describe("preflightResponse", (): void => {
  it("allows content-type when no request headers are specified", (): void => {
    const response = preflightResponse(new Request("https://example.com"));

    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Headers")).toBe("Content-Type");
  });

  it("preserves requested CORS headers", (): void => {
    const response = preflightResponse(
      new Request("https://example.com", {
        headers: {
          "Access-Control-Request-Headers": "authorization, content-type, x-api-key",
        },
      }),
    );

    expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
      "authorization, content-type, x-api-key",
    );
  });
});

describe("parseJsonBody", (): void => {
  it("returns an empty object for an empty body", async (): Promise<void> => {
    const result = await parseJsonBody(new Request("https://example.com"));

    expect(result).toStrictEqual({ body: {}, ok: true });
  });

  it("returns parsed JSON for a valid request body", async (): Promise<void> => {
    const result = await parseJsonBody(
      new Request("https://example.com", {
        body: JSON.stringify({ colors: ["#fff", "#000"] }),
        method: "POST",
      }),
    );

    expect(result).toStrictEqual({ body: { colors: ["#fff", "#000"] }, ok: true });
  });

  it("returns an invalid result for malformed JSON", async (): Promise<void> => {
    const result = await parseJsonBody(
      new Request("https://example.com", {
        body: "{",
        method: "POST",
      }),
    );

    expect(result).toStrictEqual({ error: "invalid-json", ok: false });
  });
});
