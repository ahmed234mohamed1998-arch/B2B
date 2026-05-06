const { CartPage } = require("./CartPage");

class HomePage {
  constructor(page) {
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
  }

  async search(keyword) {
    await this.searchInput.pressSequentially(keyword);
  }

  async typeSearchLetter(letter) {
    await this.searchInput.type(letter);
  }
  async waitForLoaded() {
    await this.searchInput.waitFor({ state: 'visible' });
  }
  async isSearchInputVisible(){
    return await this.searchInput.isVisible();
  }
  async getSearchResults() {
    return this.searchResults.allTextContents();
  }

  async hasNoResults() {
    return await this.noResultsMessage.isVisible();
  }

  async openOrderNow() {
    await this.orderNowButton.click();
  }

  async openNotifications() {
    await this.bellIcon.click();
  }

  async openCart() {
    await this.cartIcon.click();
    return new CartPage(this.page);

  }

  async setSearchMode(mode) {
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

  async openNewOrderModule() {
    await this.newOrderModuleIcon.click();
  }

  async openExpiryModule() {
    await this.expiryModuleIcon.click();
  }

  async openPromotionsModule() {
    await this.promotionsModuleIcon.click();
  }

  async openPaymentsModule() {
    await this.paymentsModuleIcon.click();
  }

  async openNewPriceModule() {
    await this.newPriceModuleIcon.click();
  }

  async openTaxesModule() {
    await this.taxesModuleIcon.click();
  }
}

module.exports = { HomePage };