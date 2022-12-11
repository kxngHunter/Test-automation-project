class Authentication {
  //#region Selectors

  get signInOrRegisterBtn() {
    return "#signInOrRegister";
  }
  get authTabs() {
    return "ul.auth0-lock-tabs li";
  }
  get emailField() {
    return "input[id='1-email']";
  }
  get passwordField() {
    return "input[id='1-password']";
  }
  get loginBtn() {
    return "button[id='1-submit']";
  }

  get pageHeaderTitle() {
    return "#logo h2.chakra-heading";
  }

  get logOutBtn() {
    return "#top-sign-out";
  }

  get errMsg() {
    return ".auth0-global-message-error>span>span";
  }

  //#endregion

  //#region Methods
  login(email, password) {
    cy.get(this.signInOrRegisterBtn).should("be.visible").click();
    cy.get(this.authTabs)
      .first()
      .should("have.class", "auth0-lock-tabs-current");
    cy.get(this.emailField).type(email);
    cy.get(this.passwordField).type(password);
    cy.get(this.loginBtn).click();
  }
  register(email, password) {
    cy.get(this.signInOrRegisterBtn).should("be.visible").click();
    cy.get(this.authTabs).sec;
    cy.get(this.authTabs)
      .eq(1)
      .contains("Sign Up")
      .should("be.visible")
      .click();
    cy.get(this.authTabs).eq(1).should("have.class", "auth0-lock-tabs-current");
    cy.get(this.emailField).type(email);
    cy.get(this.passwordField).type(password);
    cy.get(this.loginBtn).click();
  }

  logout() {
    cy.get(this.logOutBtn).click();
  }
  //#endregion
}
module.exports = new Authentication();
