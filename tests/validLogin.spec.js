// @ts-check
import { test, expect } from '@playwright/test';

test('@smoke has title', async ({ page }) => {
  await page.goto('https://pharmacyapp-qa.ibnsina-pharma.com/login');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/B2B Portal/);
});

test('@smoke get started link', async ({ page }) => {
  await page.goto('https://pharmacyapp-qa.ibnsina-pharma.com/login');

  // Click the get started link.
  await page.locator("[name$='username']").fill('355218');
  await page.locator("[name$='password']").fill('Zxc@1234567');

  await page.locator("button[type='submit']").click();

  // Expects page to have a heading with the name of Installation.
  await expect(page).toHaveTitle("Dashboard | Pharmacy Portal");
});
