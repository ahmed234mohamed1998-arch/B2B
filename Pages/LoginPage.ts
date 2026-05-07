import { Locator, Page } from '@playwright/test';
import { HomePage } from './HomePage';

export class LoginPage {
  // Define property types
  readonly page: Page;
  readonly pharmacyCodeField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pharmacyCodeField = page.locator("[name$='username']");
    this.passwordField = page.locator("[name$='password']");
    this.loginButton = page.locator("button[type='submit']");
  }

  async goto(): Promise<void> {
    await this.page.goto("https://pharmacyapp-qa.ibnsina-pharma.com/login");
  }

  async login(pharmacyCode: string, password: string): Promise<HomePage> {
    await this.pharmacyCodeField.fill(pharmacyCode);
    await this.passwordField.fill(password);
    await this.loginButton.click();

    return new HomePage(this.page);
  }
}