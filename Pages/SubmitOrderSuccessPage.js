class SubmitOrderSuccessPage {
    constructor(page) {
        this.page = page;
        this.successMessage = page.getByText("تم استقبال طلبيتك وسيتم تحضيره في أقرب وقت");
        this.userProfileCard = page.locator(".user-profile-card");
    }
    async waitForLoaded() {
        await this.successMessage.waitFor({ state: 'visible' });
    }
    async isSuccessMessageVisible() {
        return await this.successMessage.isVisible();
    }
}
module.exports = {SubmitOrderSuccessPage};