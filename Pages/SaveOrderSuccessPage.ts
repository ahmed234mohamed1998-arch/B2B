import { Page, Locator, expect } from '@playwright/test';

export class SaveOrderSuccessPage {
    readonly page: Page;
    readonly successMessage: Locator;
    readonly userProfileCard: Locator;   
    readonly orderNumber: Locator;
    constructor(page: Page) {
        this.page = page;
        this.successMessage = page.getByText("تم حفظ طلبيتك لإعادة استخدامها أو تعديلها مرة أخرى ");
        this.userProfileCard = page.locator(".user-profile-card");
        this.orderNumber = page.locator(".order-number");
    }
    async waitForLoaded() {
        await this.successMessage.waitFor({ state: 'visible' });
    }
    async isSuccessMessageVisible() {
        return await this.successMessage.isVisible();
    }
    async getOrderNumber() {
        const text = await this.orderNumber.textContent();
        return text ? text.trim() : null;
    }
}