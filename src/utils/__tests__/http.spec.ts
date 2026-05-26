import { parseJsonBody } from "../http";

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
