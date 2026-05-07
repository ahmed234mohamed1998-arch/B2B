// @ts-check
import { test, expect, request } from '@playwright/test';
import {LoginPage} from '../../Pages/LoginPage';
import {APIUtils} from '../../utils/APIUtils';
import { SubmitOrderSuccessPage } from '../../Pages/SubmitOrderSuccessPage';
let token;
let itemName: string = "BRUFEN 100MG 150ML SUSP";

test('@smoke Submit Valid Order', async ({ page }) => {
  const loginPage = new LoginPage(page);
  loginPage.goto();
  const homePage = await loginPage.login('355218', 'Zxc@1234567');
  
  await homePage.waitForLoaded();
  const cartPage = await homePage.openCart();
  await cartPage.searchForItem(itemName);
  await cartPage.addItem(itemName);
  await cartPage.setItemQuantity(itemName,10);
  await cartPage.addItem(itemName);
  await cartPage.pressEscape();

  let successPage :SubmitOrderSuccessPage;
  const [submitOrderResponse] = await Promise.all([
  page.waitForResponse(res =>
    res.url().includes('portal/submit-online-order') && res.status() === 200
  ),
  successPage = await cartPage.submitOrder()
]);

  const responseBody = await submitOrderResponse.json();

  successPage.waitForLoaded();
  await expect(successPage.successMessage).toBeVisible();
  expect(await successPage.getOrderNumber()).toBe(responseBody.data.orderReferenceId);
});
