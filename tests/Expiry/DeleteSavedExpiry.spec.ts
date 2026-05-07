import {test,expect,request} from '@playwright/test';
import {APIUtils} from '../../utils/APIUtils';
import { randomUUID } from 'crypto';
import { LoginPage } from '../../Pages/LoginPage';

const saveExpiryPayload = {
    ExpiryItems: [
        {
            ProductCode: "551903",
            Quantity: 1,
            ExpiryDate: null,
            localLineNumber: 0,
            PharmacyPrice: 7,
            Name: "MEPABRUFEN"
        }
    ],
    IsSubmit: false,
    RequestGUID: randomUUID()
};
let submittedExpiryRequestId: string;

test.beforeAll(async()=>{
    const apiContext = await request.newContext({ignoreHTTPSErrors: true});
    const apiUtils = new APIUtils(apiContext, { username: "355219", password: "Zxc@123456" });
    submittedExpiryRequestId = await apiUtils.submitExpiryRequest(saveExpiryPayload);

});

test('@smoke Delete Saved Expiry Request',async({page})=>{
    await page.goto("https://pharmacyapp-qa.ibnsina-pharma.com/");
    const loginPage = new LoginPage(page);
    const homePage = await loginPage.login('355219', 'Zxc@123456');
    await page.locator('.action-card').filter({ hasText: 'منتهي الصلاحية' }).click();

    await page.locator('.sub-menu').getByText('الطلبات السابقة').click();
    await expect(page.locator('.order-number',{hasText: submittedExpiryRequestId})).toBeVisible();

    const expiryItemCard = page.locator('.expiry-item-card').filter({ hasText: submittedExpiryRequestId });
    await expiryItemCard.locator('.mdc-button__label').click();
    
    await expect(page.locator('.item-name').first()
).toBeVisible();

    await page.locator('.sub-menu').getByText('الطلبات السابقة').click();
    await page.getByRole('button', { name: 'حذف الطلب' }).click();
    await expect(page.locator('.order-number',{hasText: submittedExpiryRequestId})).not.toBeVisible();


});