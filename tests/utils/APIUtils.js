const { expect } = require("allure-playwright");
const { log } = require("node:console");

class APIUtils {

    constructor(apiContext,loginPayload) {
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;
    }

    async getToken(){
        const loginResponse = await this.apiContext.post('https://newportal-qa.ibnsina-pharma.com/api/Identity/v1/mobile/Login', {
            data: this.loginPayload
        });
        expect(loginResponse.status()).toBe(200);
        const responseBody = await loginResponse.json();
        const token = responseBody.data.token;
        log("Token: " + token);
        return token;
    }

}
module.exports = {APIUtils};