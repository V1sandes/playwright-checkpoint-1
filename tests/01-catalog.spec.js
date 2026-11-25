import { test, expect } from '@playwright/test';
import { CatalogPage } from '../pages/CatalogPage.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Задание 1', async ({ page }) => {
  const model = new CatalogPage(page);
  // BEGIN
  const productCards = page.locator('.card');
  const appleCard = productCards.filter({ hasText: 'Apple' });
  const lipstickCard = productCards.filter({ hasText: 'Red Lipstick' });

  await expect(appleCard.first()).toBeVisible();

  await model.search('Red Lipstick');

  await expect(lipstickCard).toBeVisible();
  await expect(appleCard).toHaveCount(0);
  // END
});

test('Задание 2', async ({ page }) => {
  const model = new CatalogPage(page);
  // BEGIN
  const productCards = page.locator('.card');
  const appleCard = productCards.filter({ hasText: 'Apple' });
  const essenceCard = productCards.filter({ hasText: 'Essence Mascara Lash Princess' });

  await expect(appleCard.first()).toBeVisible();

  await model.selectBrand('Essence');

  await expect(page.getByRole('checkbox', { name: 'Essence', exact: true })).toBeChecked();
  await expect(essenceCard).toBeVisible();
  await expect(appleCard).toHaveCount(0);
  // END
});

test('Задание 3', async ({ page }) => {
  const model = new CatalogPage(page);
  // BEGIN
  await model.openProduct('Red Lipstick');

  await expect(page).toHaveURL(/\/products\/4$/);
  await expect(page.getByRole('heading', { name: 'Red Lipstick' })).toBeVisible();
  // END
});

test('Задание 4', async ({ page }) => {
  const model = new CatalogPage(page);
  // BEGIN
  const productCards = page.locator('.card');
  const firstPageProduct = productCards.filter({ hasText: 'Essence Mascara Lash Princess' });

  await expect(firstPageProduct).toBeVisible();

  await model.nextPage();

  await expect(firstPageProduct).toHaveCount(0);
  await expect(productCards.first()).toBeVisible();
  // END
});

