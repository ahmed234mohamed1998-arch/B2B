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

  const dateInput = itemCard.locator('mat-form-field input');
await dateInput.fill('05/2026');
await dateInput.press('Enter');


  await page.getByRole('button', { name: 'MAY' }).locator('span').first().click();
  await page.getByRole('button', { name: '3' }).locator('span').first().click();

  await page.getByRole('button', { name: 'تسجيل طلب المرتجع' }).click();
  await expect(page.getByText('تم استقبال طلب المرتجع وسيتم استلامه مع أقرب طلبية أدوية')).toBeVisible();
});
