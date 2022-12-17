import Auth from "../page/auth.page";
import Cart from "../page/cart.page";
import Checkout from "../page/checkout.page";
import routesData from "../data/routes";
import { users, usersInfo } from "../data/users";
const card = {
  number: "4242 4242 4242 4242",
  exp: "1225",
  cvv: "123",
};
const validUser = users["valid"];
let products = [];
const productIndex = 0;
describe("Checkout", () => {
  beforeEach(() => {
    cy.visit("/");
    Auth.login(validUser.email, validUser.password);
    if (!(products && products.length > 0)) {
      cy.get(Cart.product(0))
        .parent()
        .children()
        .then(($products) => {
          products = Cart.products($products.length);
        });
    }
  });
  it("Verify that a user can navigate to the checkout page", () => {
    const product = products[productIndex];
    Cart.addToCart(product.name);
    Cart.checkout();
    cy.get(Checkout.checkoutSectionTitles).should("include.text", "Billing");
    cy.get(Checkout.checkoutSectionTitles).should("include.text", "Payment");
    cy.url().should("contain", routesData.checkout);
  });

  it("Verify that the order summary is correct", () => {
    const product = products[productIndex];
    Cart.addToCart(product.name);
    Cart.checkout();
    cy.get(Checkout.orderSummaryDropDown).last().should("be.visible").click();
    cy.get(Checkout.orderSummaryItems).should("be.visible");
    cy.get(Checkout.orderSummaryItems)
      .first()
      .children("span")
      .first()
      .should("include.text", product.name);
    cy.get(Checkout.orderSummaryItems)
      .first()
      .children("span")
      .last()
      .should("include.text", Number(product.price).toFixed(2));
    cy.get(Checkout.orderSummaryTotal).should(
      "include.text",
      Number(product.price).toFixed(2)
    );
  });
  for (const userInfo of usersInfo) {
    it(userInfo.testTitle, () => {
      const product = products[productIndex];
      Cart.addToCart(product.name);
      Cart.checkout();
      Checkout.completeBillingInfo(userInfo);
      if (userInfo.valid) {
        cy.get("button").contains("Edit").should("be.visible");
        cy.get(Checkout.paymentIframe).should("be.visible");
      } else {
        cy.get(Checkout.billingErrorMsg).should("be.visible");
        cy.get(Checkout.paymentIframe).should("not.exist");
      }
    });
  }
  it("Verify that a user can confirm an order ", () => {
    const userInfo = usersInfo.find((data) => data.valid);
    const product = products[productIndex];
    Cart.addToCart(product.name);
    Cart.checkout();
    Checkout.completeBillingInfo(userInfo);
    Checkout.completePaymentInfo(card);
    cy.get(Checkout.orderConfirmationTitle).should(
      "include.text",
      "Thank you for your order"
    );
    cy.url().should("contain", routesData.order);
  });
});
