import { test, expect, type Page } from '@playwright/test';

const search = (page: Page): string => new URL(page.url()).search;

// Navigate and wait for client hydration before interacting: the inputs are
// server-rendered, so interacting before React attaches handlers would set the
// DOM value without firing onChange.
const open = async (page: Page, path = '/'): Promise<void> => {
  await page.goto(path);
  await page.waitForLoadState('networkidle');
};

test.describe('Homepage', () => {
  test('loads with the correct title', async ({ page }) => {
    await open(page);
    await expect(page).toHaveTitle('Are My Colours Accessible');
  });

  test('renders the overall rating heading', async ({ page }) => {
    await open(page);
    await expect(page.getByTestId('contrastResults-heading')).toContainText('Yup');
  });

  test('renders the default background color', async ({ page }) => {
    await open(page);
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(18, 118, 206)');
  });

  test('updates body color and rating from the text colour input', async ({ page }) => {
    await open(page);
    await page.locator('#textColor').fill('#ccc');

    await expect(page.locator('#textColor')).toHaveValue('#ccc');
    await expect(page.locator('body')).toHaveCSS('color', 'rgb(204, 204, 204)');
    await expect(page.getByTestId('contrastResults-heading')).toContainText('Nope');
    await expect
      .poll(() => search(page))
      .toBe(
        '?background=%231276CE&colorCombos=%5Bobject%20Object%5D&colorCombos=%5Bobject%20Object%5D&isLight=false&textColor=%23ccc'
      );
  });

  test('updates body color and rating from the background input', async ({ page }) => {
    await open(page);
    await page.locator('#background').fill('#ccc');

    await expect(page.locator('#background')).toHaveValue('#ccc');
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(204, 204, 204)');
    await expect(page.getByTestId('contrastResults-heading')).toContainText('Nope');
    await expect
      .poll(() => search(page))
      .toBe(
        '?background=%23ccc&colorCombos=%5Bobject%20Object%5D&colorCombos=%5Bobject%20Object%5D&isLight=true&textColor=%23FFFFFF'
      );
  });

  test('updates from the text colour lightness slider', async ({ page }) => {
    await open(page);
    await page.locator('#textColor-hsl-Lightness').fill('25');

    await expect(page.locator('#textColor')).toHaveValue('#404040');
    await expect(page.locator('body')).toHaveCSS('color', 'rgb(64, 64, 64)');
    await expect(page.getByTestId('contrastResults-heading')).toContainText('Nope');
  });

  test('updates from the background hue slider', async ({ page }) => {
    await open(page);
    await page.locator('#background-hsl-Hue').fill('25');

    await expect(page.locator('#background')).toHaveValue('#CE6012');
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(206, 96, 18)');
    await expect(page.getByTestId('contrastResults-heading')).toContainText('Kinda');
  });

  test('renders from query string parameters', async ({ page }) => {
    await open(
      page,
      '/?background=%23B9DDF8&colorCombos=%5Bobject%20Object%5D&colorCombos=%5Bobject%20Object%5D&isLight=true&textColor=%23B25334'
    );

    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(185, 221, 248)');
    await expect(page.locator('body')).toHaveCSS('color', 'rgb(178, 83, 52)');
    await expect(page.getByTestId('contrastResults-heading')).toContainText('Kinda');
    await expect(page.getByTestId('color-input-form')).toHaveCSS('color', 'rgb(52, 51, 52)');
    await expect(page.locator('#background')).toHaveValue('#B9DDF8');
    await expect(page.locator('#textColor')).toHaveValue('#B25334');
  });

  test.describe('footer navigation', () => {
    test('navigates to the about page', async ({ page }) => {
      await open(page);
      await page.locator('footer').getByRole('link', { name: 'About' }).click();
      await expect(page).toHaveURL(/\/about$/);
      await expect(page.locator('h1')).toContainText('Are my Colours Accessible?');
    });

    test('navigates to the palette page', async ({ page }) => {
      await open(page);
      await page.locator('footer').getByRole('link', { name: 'Palette' }).click();
      await expect(page).toHaveURL(/\/palette$/);
      await expect(page.locator('h1')).toContainText('Add the colours from your palette');
    });
  });
});
