import Auth from "../page/auth.page";
import Cart from "../page/cart.page";
import Favourite from "../page/favourite.page";
import { users } from "../data/users";
const validUser = users["valid"];
let products = [];
const productIndex = 0;
describe("Favorites", () => {
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
  it("Verify that a user can add a single product to favourites", () => {
    const product = products[productIndex];
    Favourite.addToFavourites(Cart.product(0));
    cy.get(Favourite.toastTitle)
      .should("be.visible")
      .and("include.text", `${product.name} added to favorites`);
    cy.get(Favourite.favouriteNavBtnCount).should("include.text", "1");
  });
  it("Verify that a user can add multiple products to favourites", () => {
    const productSubSet = products.slice(0, 3);
    for (const [index, product] of productSubSet.entries()) {
      Favourite.addToFavourites(Cart.product(index));
      cy.get(Favourite.toastTitle)
        .should("be.visible")
        .and("include.text", `${product.name} added to favorites`);
      cy.get(Favourite.favouriteNavBtnCount).should("include.text", index + 1);
    }
  });
  it("Verify that a user can remove a single product from favourites", () => {
    const product = products[productIndex];
    Favourite.addToFavourites(Cart.product(0));
    Favourite.removeFromFavourites(Cart.product(0));
    cy.get(Favourite.toastTitle)
      .should("be.visible")
      .and("include.text", `${product.name} removed from favorites`);
    cy.get(Favourite.favouriteNavBtnCount).should("include.text", "0");
  });
  it("Verify that a user can remove multiple products from favourites", () => {
    const productSubSet = products.slice(0, 3);
    for (const [index, product] of productSubSet.entries()) {
      Favourite.addToFavourites(Cart.product(index));
    }
    for (const [index, product] of productSubSet.entries()) {
      Favourite.removeFromFavourites(Cart.product(index));
      cy.get(Favourite.toastTitle)
        .should("be.visible")
        .and("include.text", `${product.name} removed from favorites`);
      cy.get(Favourite.favouriteNavBtnCount).should(
        "include.text",
        `${productSubSet.length - (index + 1)}`
      );
    }
    cy.get(Favourite.favouriteNavBtnCount).should("include.text", "0");
  });
  it("Verify that a user can view their favourites", () => {
    const product = products[productIndex];
    Favourite.addToFavourites(Cart.product(0));
    Favourite.goToFavourites();
    cy.get("p").contains(product.name).should("be.visible");
  });
  it("Verify that a user can cannot add a existing favourite product to favourites", () => {
    Favourite.addToFavourites(Cart.product(0));
    cy.get(`${Cart.product(0)} ${Favourite.favouriteBtn}`).should("not.exist");
  });
});
