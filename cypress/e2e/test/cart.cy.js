import Auth from "../page/auth.page";
import Cart from "../page/cart.page";
import { users } from "../data/users";
const validUser = users["valid"];
let products = [];
const productIndex = 0;
describe("Cart", () => {
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
  it("Verify that a user can remove a single product from cart", () => {
    const product = products[productIndex];
    Cart.addToCart(product.name);
    cy.get(Cart.cartItemsName)
      .parent()
      .children(Cart.removedCartItem)
      .should("be.visible")
      .click();
    cy.get(Cart.cartItemsName).should("not.exist");
  });

  it("Verify that a user can remove multiple products from cart", () => {
    const productSubSet = products.slice(0, 3);
    for (const [index, product] of productSubSet.entries()) {
      Cart.addToCart(product.name);
      if (productSubSet.length !== index + 1) {
        Cart.closeCart();
      }
    }
    cy.get(Cart.cartItemsName).each(($elem, index, $products) => {
      cy.get($elem)
        .parent()
        .children(Cart.removedCartItem)
        .should("be.visible")
        .click();
      cy.get(Cart.cartItemsName).should("have.length", $products.length--);
    });
    cy.get(Cart.cartItemsName).should("not.exist");
  });

  it("Verify that a user can open cart from the navigation bar", () => {
    const product = products[productIndex];
    Cart.addToCart(product.name);
    Cart.closeCart();
    Cart.openCart();
    cy.get("h3").contains("Cart summary").should("be.visible");
  });

  it("Verify that the cart total for a single product is correct", () => {
    const product = products[productIndex];
    Cart.addToCart(product.name);
    cy.get(Cart.cartTotal)
      .should("be.visible")
      .and("have.text", `$${Number(product.price).toFixed(2)}`);
  });

  it("Verify that the cart total for multiple products is correct", () => {
    const productSubSet = products.slice(0, 3);
    let total = 0;
    for (const [index, product] of productSubSet.entries()) {
      total += Number(product.price);
      Cart.addToCart(product.name);
      if (productSubSet.length !== index + 1) {
        Cart.closeCart();
      }
    }
    cy.get(Cart.cartTotal).scrollIntoView();
    cy.wait(1600);
    cy.get(Cart.cartTotal)
      .should("be.visible")
      .and("have.text", `$${total.toFixed(2)}`);
  });
});
