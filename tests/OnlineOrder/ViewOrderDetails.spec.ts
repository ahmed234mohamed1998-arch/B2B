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
  IsSubmit: true
};
let orderReferenceId: string;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    orderReferenceId = await apiUtils.submitOrder(orderPayload);
});

test("@smoke View Order Details", async ({ page, request }) => {
    await page.goto("https://pharmacyapp-qa.ibnsina-pharma.com/");
    const loginPage: LoginPage = new LoginPage(page);
    const homePage: HomePage = await loginPage.login('355219', 'Zxc@123456');
    await homePage.isSearchInputVisible();
    await homePage.pressEscape();
    await page.locator('mat-card').filter({ hasText: 'طلبياتي' }).click();
    expect(await page.locator('.order-number').filter({ hasText: orderReferenceId }).first().textContent()).toContain(orderReferenceId);
});
