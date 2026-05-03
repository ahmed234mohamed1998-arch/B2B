// @ts-check
import { test, expect } from '@playwright/test';


test('@smoke Submit Valid Order', async ({ page }) => {
  await page.goto('https://pharmacyapp-qa.ibnsina-pharma.com/login');

  // Click the get started link.
  await page.locator("[name$='username']").fill('355218');
  await page.locator("[name$='password']").fill('Zxc@1234567');

  await page.locator("button[type='submit']").click();

  await page.locator(".quick-order-btn__text").click();
  await page.getByPlaceholder("البحث عن أدوية لإضافتها إلى السلة").fill("brufen 200mg");
  await page.getByText('BRUFEN 200MG 30 TAB').click();
  await page.locator(".modal-actions .confirm-btn").click();

  await page.locator(".quantity-input").fill("10");
  await page.getByText("تنفيذ الطلبية").click();
  await expect( page.getByText("تم استقبال طلبيتك وسيتم تحضيره في أقرب وقت")).toBeVisible();
  await expect( page.locator(".user-profile-card")).toBeVisible();

});
