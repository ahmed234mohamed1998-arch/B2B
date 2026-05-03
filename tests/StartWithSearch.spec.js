// @ts-check
import { test, expect } from '@playwright/test';


test('Start with Search Item', async ({ page }) => {
  await page.goto('https://pharmacyapp-qa.ibnsina-pharma.com/login');

  // Click the get started link.
  await page.locator("[name$='username']").fill('355218');
  await page.locator("[name$='password']").fill('Zxc@1234567');

  await page.locator("button[type='submit']").click();

  await page.locator(".mdc-label",{ hasText: 'يبدأ ب' }).click();
  await page.getByPlaceholder("البحث عن أدوية لإضافتها إلى السلة").pressSequentially("rufen");
  await expect(page.locator("h4",{ hasText: 'لا توجد نتائج' })).toBeVisible();

});
