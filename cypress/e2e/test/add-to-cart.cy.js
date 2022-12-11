import Auth from "../page/auth.page";
import Cart from "../page/cart.page";
import routesData from "../data/routes";
import { users } from "../data/users";
const validUser = users["valid"];
let products = [];
const productIndex = 0;
describe("Add To Cart", () => {
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
  it("Verify that a user can add a single product to cart", () => {
    const product = products[productIndex];
    Cart.addToCart(product.name);
    const element = cy.$$(Cart.cartPopupTitle).length;
    if (element > 0) {
      cy.get(Cart.cartPopupTitle)
        .should("be.visible")
        .and("include.text", "Cart summary");
    } else {
      cy.url().should("contain", routesData.cart);
    }
    cy.get(Cart.cartItemsName)
      .should("have.length", 1)
      .and("include.text", product.name);
    cy.get(Cart.cartItemsName)
      .parents()
      .eq(1)
      .contains(Cart.cartQuantity, /[1-9]/)
      .should("include.text", 1);
  });
  it("Verify that a user can select the quantity of a product to add to cart", () => {
    const product = products[productIndex];
    const quantity = 3;
    cy.get(Cart.productQuantity(productIndex)).type(`{backspace}${quantity}`);
    cy.get(Cart.productQuantity(productIndex))
      .invoke("val")
      .should("eq", quantity.toString());
    Cart.addToCart(product.name);
    const element = cy.$$(Cart.cartPopupTitle).length;
    if (element > 0) {
      cy.get(Cart.cartPopupTitle)
        .should("be.visible")
        .and("include.text", "Cart summary");
    } else {
      cy.url().should("contain", routesData.cart);
    }
    cy.get(Cart.cartItemsName)
      .should("have.length", 1)
      .and("include.text", product.name);
    cy.get(Cart.cartItemsName)
      .parents()
      .eq(1)
      .contains(Cart.cartQuantity, /[1-9]/)
      .should("include.text", quantity);
  });
  it("Verify that if a user add the same product to cart twice, the quantity updates", () => {
    const product = products[productIndex];
    const repetition = 2;
    for (let index = 0; index < repetition; index++) {
      Cart.addToCart(product.name);
      if (repetition !== index + 1) {
        Cart.closeCart();
      }
    }
    cy.get(Cart.cartItemsName)
      .should("have.length", 1)
      .and("include.text", product.name);
    cy.get(Cart.cartItemsName)
      .parents()
      .eq(1)
      .contains(Cart.cartQuantity, /[1-9]/)
      .should("include.text", 2);
  });
  it("Verify that a user can add multiple products to cart", () => {
    const productSubSet = products.slice(0, 3);
    for (const [index, product] of productSubSet.entries()) {
      Cart.addToCart(product.name);
      cy.get(Cart.cartItemsName).should("have.length", index + 1);
      cy.get(Cart.cartItemsName).should("include.text", product.name);

      if (productSubSet.length !== index + 1) {
        Cart.closeCart();
      }
    }
  });
  it("Verify that a user can add a product to cart from the product details page", () => {
    const product = products[productIndex];
    cy.get("p")
      .contains(product.name)
      .parents()
      .eq(3)
      .children()
      .first()
      .children()
      .first()
      .children("img")
      .click();
    Cart.addToCart(product.name);
    const element = cy.$$(Cart.cartPopupTitle).length;
    if (element > 0) {
      cy.get(Cart.cartPopupTitle)
        .should("be.visible")
        .and("include.text", "Cart summary");
    } else {
      cy.url().should("contain", routesData.cart);
    }
    cy.get(Cart.cartItemsName)
      .should("have.length", 1)
      .and("include.text", product.name);
    cy.get(Cart.cartItemsName)
      .parents()
      .eq(1)
      .contains(Cart.cartQuantity, /[1-9]/)
      .should("include.text", 1);
  });
});
