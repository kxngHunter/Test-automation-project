class Checkout {
  //#region Selectors

  get checkoutSectionTitles() {
    return "h1.snipcart__font--subtitle";
  }
  get fullNameField() {
    return "input[name='name']";
  }
  get emailField() {
    return "input[name='email']";
  }
  get streetAddressField() {
    return "input[name='address1']";
  }
  get suiteField() {
    return "input[name='address2']";
  }
  get cityField() {
    return "input[name='city']";
  }
  get countryField() {
    return "[id^='country']";
  }
  get provinceField() {
    return "[id^='province']";
  }
  get postalCodeField() {
    return "input[id^='postalCode']";
  }
  get continueBtn() {
    return "button[type='submit']";
  }
  get billingErrorMsg() {
    return ".snipcart-field-error";
  }
  get orderSummaryDropDown() {
    return "div.snipcart-modal__header-summary svg";
  }
  get orderSummaryItems() {
    return ".snipcart-cart-summary-items-list.snipcart-scrollbar.snipcart-cart-summary__items li";
  }
  get orderSummaryTotal() {
    return ".snipcart-summary-fees__amount.snipcart-summary-fees__amount--highlight.snipcart__font--large";
  }
  get orderConfirmationTitle() {
    return "div[class='snipcart__box--title'] div h1[class='snipcart__font--subtitle']";
  }
  get paymentIframe() {
    return ".snipcart-payment-card-form iframe";
  }
  get cardNumberField() {
    return "#card-number";
  }
  get cardExpField() {
    return "#expiry-date";
  }
  get cardCVVField() {
    return "#cvv";
  }

  //#endregion

  //#region Methods
  completeBillingInfo(user) {
    cy.get(this.fullNameField).type(`${user.firstName} ${user.lastName}`);
    user.email ? cy.get(this.emailField).type(user.email) : null;
    cy.get(this.streetAddressField).type(user.address);
    cy.get(this.suiteField).type(user.suite);
    cy.get(this.cityField).type(user.city);
    const countryElement = cy.$$(`input${this.countryField}`).length;
    if (countryElement > 0) {
      cy.get(this.countryField).type(`${user.country}{enter}`);
    } else {
      cy.get(this.countryField).select(user.countryCode);
    }
    cy.wait(1100);
    const provinceElement = cy.$$(`input${this.provinceField}`).length;
    if (provinceElement > 0) {
      cy.get(this.provinceField).type(`${user.province}{enter}`);
    } else {
      cy.get(this.provinceField).select(user.provinceCode);
    }
    cy.get(this.postalCodeField).type(user.postalCode);
    cy.get(this.continueBtn).click({ force: true });
  }
  completePaymentInfo(card) {
    cy.iframe(this.paymentIframe).find(this.cardNumberField).type(card.number);
    cy.iframe(this.paymentIframe).find(this.cardExpField).type(card.exp);
    cy.iframe(this.paymentIframe).find(this.cardCVVField).type(card.cvv);
    cy.get(this.continueBtn).click({ force: true });
  }
  //#endregion
}
module.exports = new Checkout();
