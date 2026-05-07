// @ts-check
import { test, expect, request } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { APIUtils } from '../../utils/APIUtils';
import { CartPage } from '../../Pages/CartPage';
import { SaveOrderSuccessPage } from '../../Pages/SaveOrderSuccessPage';
let token;
let itemName="BRUFEN 100MG 150ML SUSP";

test('@smoke Submit Valid Order', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  const homePage = await loginPage.login('355218', 'Zxc@1234567');
  
  await homePage.waitForLoaded();
  const cartPage: CartPage = await homePage.openCart();
  await cartPage.searchForItem(itemName);
  await cartPage.addItem(itemName);
  await cartPage.setItemQuantity(itemName,10);
  await cartPage.addItem(itemName);
  await cartPage.pressEscape();
  
  let successPage: SaveOrderSuccessPage;

  const [saveOrderResponse] = await Promise.all([
  page.waitForResponse(res =>
    res.url().includes('portal/submit-online-order') && res.status() === 200
  ),
  successPage = await cartPage.saveOrder()
]);

const responseBody = await saveOrderResponse.json();

  await successPage.waitForLoaded();
  await expect(successPage.successMessage).toBeVisible();
  expect(await successPage.getOrderNumber()).toBe(responseBody.data.orderReferenceId);
});
