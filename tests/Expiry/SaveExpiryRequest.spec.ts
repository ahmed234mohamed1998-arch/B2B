// @ts-check
import { test, expect, request } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { APIUtils } from '../../utils/APIUtils';
let itemName="MEPA BRUFEN";

test('@smoke Submit Valid Order', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  const homePage = await loginPage.login('355218', 'Zxc@1234567');
  
  await page.locator('.action-card').filter({ hasText: 'منتهي الصلاحية' }).click();
  await page.getByPlaceholder('البحث عن أدوية لإضافتها إلى المرتجع').pressSequentially(itemName);
  await page.getByText(itemName).first().click();

  const itemCard = page.locator('.expiry-item-card').filter({ hasText: itemName });
  await itemCard.locator('.quantity-input').fill('2');

  await page.getByRole('button', {name: "حفظ طلب المرتجع"}).click();
  
  const [saveExpiryResponse] = await Promise.all([
    page.waitForResponse(res =>
      res.url().includes('/portal/expiry-request/submit') && res.status() === 200
    ),  await page.getByRole('button', {name: "حفظ الطلب"}).click()
  ])
  const responseBody = await saveExpiryResponse.json();
  const submittedRequestId = responseBody.data.referenceNumber;

  const orderLocator = page.locator('.order-number',{hasText: submittedRequestId});
  await expect(orderLocator).toBeVisible();

});
