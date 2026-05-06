const {SubmitOrderSuccessPage} = require('./SubmitOrderSuccessPage');

class CartPage {
    constructor(page) {
        this.page = page;
        this.searchInput = page.getByPlaceholder('البحث عن أدوية لإضافتها إلى السلة');
        this.getItem = (itemName)=> page.locator('.result-item',{ hasText: itemName });
        this.getItemQuantityInput = (itemName) => this.getItem(itemName).locator('.quantity-input');
        this.submitOrderButton = page.locator('button:has-text("تنفيذ الطلبية"), button:has-text("Submit Order")');
        this.saveOrderButton = page.locator('.submit-btn:has-text("حفظ الطلبية"), .submit-btn:has-text("Save Order")');
    }
    async pageLoaded() {
        await this.searchInput.waitFor({ state: 'visible' });
    }
    async searchForItem(itemName) {
        await this.searchInput.pressSequentially(itemName);
    }
    async addItem(itemName) {
        await this.getItem(itemName).nth(0).click();
    }
    async setItemQuantity(itemName,quantity){
        const quantityInput = await this.getItemQuantityInput(itemName);
        await quantityInput.fill(quantity.toString());
    }
    async pressScape(){
        await this.page.keyboard.press('Escape');
    };
    async submitOrder(){
        await this.submitOrderButton.click();
        return new SubmitOrderSuccessPage(this.page);
    }
    
    async saveOrder(){
        await this.submitOrderButton.click();
        return new SubmitOrderSuccessPage(this.page);
    }
}
module.exports = {CartPage};