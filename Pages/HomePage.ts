import { Locator, Page } from '@playwright/test';
import { CartPage } from './CartPage';

export class HomePage {
  // Define property types
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchResults: Locator;
  readonly noResultsMessage: Locator;
  readonly orderNowButton: Locator;
  readonly bellIcon: Locator;
  readonly cartIcon: Locator;
  readonly startsWithCheckbox: Locator;
  readonly containsCheckbox: Locator;
  readonly newOrderModuleIcon: Locator;
  readonly expiryModuleIcon: Locator;
  readonly promotionsModuleIcon: Locator;
  readonly paymentsModuleIcon: Locator;
  readonly newPriceModuleIcon: Locator;
  readonly taxesModuleIcon: Locator;
  readonly cardItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('البحث عن أدوية لإضافتها إلى السلة');
    this.searchResults = page.locator('.search-results, .results-list, .results-item');
    this.noResultsMessage = page.locator('text=لا توجد نتائج');
    this.orderNowButton = page.locator('button:has-text("Order Now"), button:has-text("اطلب الآن"), .order-now');
    this.bellIcon = page.locator('button[aria-label="Notifications"], .icon-bell, button:has-text("Notifications")');
    this.cartIcon = page.locator('.cart-container');
    this.startsWithCheckbox = page.locator('label:has-text("starts with") input[type="checkbox"], input[type="checkbox"][name="startsWith"]');
    this.containsCheckbox = page.locator('label:has-text("contains") input[type="checkbox"], input[type="checkbox"][name="contains"]');
    this.newOrderModuleIcon = page.locator('button[aria-label="New Order"], .module-new-order');
    this.expiryModuleIcon = page.locator('button[aria-label="Expiry"], .module-expiry');
    this.promotionsModuleIcon = page.locator('button[aria-label="Promotions"], .module-promotions');
    this.paymentsModuleIcon = page.locator('button[aria-label="Payments"], .module-payments');
    this.newPriceModuleIcon = page.locator('button[aria-label="New Price"], .module-new-price');
    this.taxesModuleIcon = page.locator('button[aria-label="Taxes"], .module-taxes');
    this.cardItems = page.locator('.order-item-card');
  }

  async search(keyword: string): Promise<void> {
    await this.searchInput.pressSequentially(keyword);
  }

  async typeSearchLetter(letter: string): Promise<void> {
    await this.searchInput.press(letter); // Changed from .type to .press as .type is deprecated in newer Playwright
  }

  async waitForLoaded(): Promise<void> {
    await this.searchInput.waitFor({ state: 'visible' });
  }

  async isSearchInputVisible(): Promise<boolean> {
    return await this.searchInput.isVisible();
  }

  async getSearchResults(): Promise<string[]> {
    return await this.searchResults.allTextContents();
  }

  async hasNoResults(): Promise<boolean> {
    return await this.noResultsMessage.isVisible();
  }

  async openOrderNow(): Promise<void> {
    await this.orderNowButton.click();
  }

  async openNotifications(): Promise<void> {
    await this.bellIcon.click();
  }

  async openCart(): Promise<CartPage> {
    await this.cartIcon.click();
    return new CartPage(this.page);
  }

  async getCartItemCount(): Promise<number> {
    return await this.cardItems.count();
  }
  async pressEscape(): Promise<void> {
    await this.page.keyboard.press('Escape');
  }

  async setSearchMode(mode: 'starts with' | 'contains'): Promise<void> {
    const normalized = mode.toLowerCase();
    if (normalized === 'starts with') {
      if (!(await this.startsWithCheckbox.isChecked())) {
        await this.startsWithCheckbox.click();
      }
    } else if (normalized === 'contains') {
      if (!(await this.containsCheckbox.isChecked())) {
        await this.containsCheckbox.click();
      }
    } else {
      throw new Error('Unknown search mode: ' + mode);
    }
  }

  async openNewOrderModule(): Promise<void> {
    await this.newOrderModuleIcon.click();
  }

  async openExpiryModule(): Promise<void> {
    await this.expiryModuleIcon.click();
  }

  async openPromotionsModule(): Promise<void> {
    await this.promotionsModuleIcon.click();
  }

  async openPaymentsModule(): Promise<void> {
    await this.paymentsModuleIcon.click();
  }

  async openNewPriceModule(): Promise<void> {
    await this.newPriceModuleIcon.click();
  }

  async openTaxesModule(): Promise<void> {
    await this.taxesModuleIcon.click();
  }
}