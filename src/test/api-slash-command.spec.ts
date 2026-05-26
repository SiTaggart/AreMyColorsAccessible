import { readSlashText } from "../routes/api/slash-command";

describe("readSlashText", (): void => {
  it("reads text from a URL-encoded Slack payload", async (): Promise<void> => {
    const request = new Request("https://example.com/api/slash-command", {
      body: new URLSearchParams({ text: "#fff #000" }),
      headers: { "content-type": "application/x-www-form-urlencoded" },
      method: "POST",
    });

    await expect(readSlashText(request)).resolves.toBe("#fff #000");
  });

  it("reads text from a JSON payload", async (): Promise<void> => {
    const request = new Request("https://example.com/api/slash-command", {
      body: JSON.stringify({ text: "help" }),
      headers: { "content-type": "application/json" },
      method: "POST",
    });

    await expect(readSlashText(request)).resolves.toBe("help");
  });

  it("returns an empty string for malformed JSON", async (): Promise<void> => {
    const request = new Request("https://example.com/api/slash-command", {
      body: "{",
      headers: { "content-type": "application/json" },
      method: "POST",
    });

    await expect(readSlashText(request)).resolves.toBe("");
  });
});
