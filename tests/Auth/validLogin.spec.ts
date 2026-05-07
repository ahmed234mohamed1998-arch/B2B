import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { HomePage } from '../Pages/HomePage'; // Ensure you import the HomePage type

test('@smoke get started link', async ({ page }) => {
  const loginPage: LoginPage = new LoginPage(page);
  
  await loginPage.goto();

  const homePage: HomePage = await loginPage.login('355218', 'Zxc@1234567');
  
  await homePage.waitForLoaded();
  
  expect(await homePage.isSearchInputVisible()).toBeTruthy(); 
});