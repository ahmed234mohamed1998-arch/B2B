import { Locator, Page } from '@playwright/test';
import { SubmitOrderSuccessPage } from './SubmitOrderSuccessPage';
import { SaveOrderSuccessPage } from './SaveOrderSuccessPage';

export class CartPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly submitOrderButton: Locator;
  readonly saveOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('البحث عن أدوية لإضافتها إلى السلة');
    this.submitOrderButton = page.locator('button:has-text("تنفيذ الطلبية"), button:has-text("Submit Order")');
    this.saveOrderButton = page.locator('.submit-btn:has-text("حفظ الطلبية"), .submit-btn:has-text("Save Order")');
  }

  // Helper methods to replace the arrow functions for dynamic locators
  private getItem(itemName: string): Locator {
    return this.page.locator('.result-item', { hasText: itemName });
  }

  private getItemQuantityInput(itemName: string): Locator {
    return this.getItem(itemName).locator('.quantity-input');
  }

  async pageLoaded(): Promise<void> {
    await this.searchInput.waitFor({ state: 'visible' });
  }

  async searchForItem(itemName: string): Promise<void> {
    await this.searchInput.pressSequentially(itemName);
  }

  async addItem(itemName: string): Promise<void> {
    // nth(0) ensures we click the first match if multiple exist
    await this.getItem(itemName).nth(0).click();
  }

  async setItemQuantity(itemName: string, quantity: number | string): Promise<void> {
    const quantityInput = this.getItemQuantityInput(itemName);
    await quantityInput.fill(quantity.toString());
  }

  async pressEscape(): Promise<void> {
    await this.page.keyboard.press('Escape');
  }

  async submitOrder(): Promise<SubmitOrderSuccessPage> {
    await this.submitOrderButton.click();
    return new SubmitOrderSuccessPage(this.page);
  }

  async saveOrder(): Promise<SaveOrderSuccessPage> {
    await this.saveOrderButton.click();
    return new SaveOrderSuccessPage(this.page);
  }
}