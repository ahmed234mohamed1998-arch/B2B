const { log } = require("node:console");

class APIUtils {

    constructor(apiContext,loginPayload) {
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;
    }

}
module.exports = {APIUtils};