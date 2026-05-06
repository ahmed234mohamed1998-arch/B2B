// @ts-check
import { test, expect, request } from '@playwright/test';
const {LoginPage} = require('../Pages/LoginPage');
const {APIUtils} = require('./utils/APIUtils');
let token;
let itemName="BRUFEN 100MG 150ML SUSP";

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
  await cartPage.pressScape();
  const successPage = await cartPage.submitOrder();
  successPage.waitForLoaded();
  await expect(successPage.successMessage).toBeVisible();
});
