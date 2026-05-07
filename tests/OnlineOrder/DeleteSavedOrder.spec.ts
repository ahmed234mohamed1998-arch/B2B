import { test, expect,request } from "@playwright/test";
import { APIUtils } from "../../utils/APIUtils";
import { HomePage } from "../../Pages/HomePage";
import { LoginPage } from "../../Pages/LoginPage";

const loginPayload = {
    username: "355219",
    password: "Zxc@123456"
};
const orderPayload = {
  onlineOrderItems: [
    {
      ProductCode: "615942",
      quantity: 4
    }
  ],
  RequestGUID: crypto.randomUUID(),
  IsSubmit: false
};
let orderReferenceId: string;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    orderReferenceId = await apiUtils.submitOrder(orderPayload);
});

test("@smoke Delete Saved Order", async ({ page, request }) => {
    await page.goto("https://pharmacyapp-qa.ibnsina-pharma.com/");
    const loginPage: LoginPage = new LoginPage(page);
    const homePage: HomePage = await loginPage.login('355219', 'Zxc@123456');
    await homePage.isSearchInputVisible();
    await homePage.pressEscape();
    await page.locator('mat-card').filter({ hasText: 'طلبياتي' }).click();
    await page.locator('.order-info',{hasText: orderReferenceId}).locator('.delete-btn').click();
    await page.getByRole('button', { name: 'مسح' }).click();
    await expect(page.getByText(' تم حذف الطلبية بنجاح ')).toBeVisible();
    await expect(page.locator('.order-info',{hasText: orderReferenceId})).toHaveCount(0);

});
