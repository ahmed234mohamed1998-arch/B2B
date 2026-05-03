class LoginPage {
  constructor(page) {
    this.page = page;
    this.pharmacyCodeField = page.locator("[name$='username']");
    this.passwordField = page.locator("[name$='password']");
    this.loginButton = page.locator("button[type='submit']");
  }

  async goto() {
    await this.page.goto("https://pharmacyapp-qa.ibnsina-pharma.com/login");
  }

  async login(pharmacyCode, password) {
    await this.pharmacyCodeField.fill(pharmacyCode);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
module.exports = {LoginPage};
