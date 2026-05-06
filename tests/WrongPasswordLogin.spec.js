// @ts-check
import { test, expect } from '@playwright/test';
const {LoginPage} = require('../Pages/LoginPage');


test('@smoke get started link', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  const homePage = await loginPage.login('355218', 'Zxc@123456');
  
});
