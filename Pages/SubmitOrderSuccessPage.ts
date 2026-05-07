import { Page, Locator, expect } from '@playwright/test';

export class SubmitOrderSuccessPage {
    readonly page: Page;
    readonly successMessage: Locator;
    readonly userProfileCard: Locator;   
    readonly orderNumber: Locator;
    constructor(page: Page) {
        this.page = page;
        this.successMessage = page.getByText("تم استقبال طلبيتك وسيتم تحضيره في أقرب وقت");
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