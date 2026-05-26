import { test, expect, type Page } from "@playwright/test";

const search = (page: Page): string => new URL(page.url()).search;

const open = async (page: Page): Promise<void> => {
  await page.goto("/palette");
  await page.waitForLoadState("networkidle");
};

const enterColors = async (page: Page, value: string): Promise<void> => {
  const input = page.locator("#palette-form-input");
  await input.fill(value);
  await input.press("Enter");
};

test.describe("Palette", () => {
  test("loads with the correct title", async ({ page }) => {
    await open(page);
    await expect(page).toHaveTitle("Palette checker - Are My Colours Accessible");
  });

  test("adds multiple colors to the matrix", async ({ page }) => {
    await open(page);
    await enterColors(page, "#ccc #fff #000");

    await expect(page.locator('thead [data-testid="colorMatrix-th"]')).toHaveCount(3);
    await expect(page.locator('tbody [data-testid="colorMatrix-tr"]')).toHaveCount(3);
    await expect.poll(() => search(page)).toBe("?colors=%23ccc&colors=%23fff&colors=%23000");
  });

  test("shows an error for an invalid color", async ({ page }) => {
    await open(page);
    await enterColors(page, "dhfhfu");

    await expect(page.locator("#error-message-label-palette-form-input")).toContainText(
      "Please enter valid colors as comma or space separated hex values",
    );
  });

  test("updates matrix results when a hex input changes", async ({ page }) => {
    await open(page);
    await enterColors(page, "orange blue pink red");

    await page.locator("#colorhex-0").fill("brown");
    await expect(page.locator("#hsl-0-Hue")).toHaveValue("0");
    await expect(page.locator("#hsl-0-Saturation")).toHaveValue("59");
    await expect(page.locator("#hsl-0-Lightness")).toHaveValue("41");
    await expect(
      page.locator(
        'tbody [data-testid="colorMatrix-tr"]:nth-child(1) > [data-testid="colorMatrix-th"]',
      ),
    ).toContainText("#A52A2A");
    await expect.poll(() => search(page)).toBe("?colors=brown&colors=blue&colors=pink&colors=red");
  });

  test("updates matrix results when the hue slider changes", async ({ page }) => {
    await open(page);
    await enterColors(page, "orange blue pink red");

    await page.locator("#hsl-1-Hue").fill("25");
    await expect(page.locator("#colorhex-1")).toHaveValue("#FF6A00");
    await expect(
      page.locator(
        'tbody [data-testid="colorMatrix-tr"]:nth-child(2) > [data-testid="colorMatrix-th"]',
      ),
    ).toContainText("#FF6A00");
    await expect
      .poll(() => search(page))
      .toBe("?colors=orange&colors=%23FF6A00&colors=pink&colors=red");
  });
});
