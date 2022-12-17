import Auth from "../page/auth.page";
import Home from "../page/home.page";
import Cart from "../page/cart.page";
import { users } from "../data/users";
const validUser = users["valid"];
let products = [];
let productIndex = 0;
describe("Search", () => {
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
  it("Verify that the search works for the exact name of the product", () => {
    const search = products[productIndex].name;
    Home.search(search);
    cy.get(Home.productNames).should("be.visible");
    cy.get(Home.productNames).should("include.text", search);
  });

  it("Verify that the search works for a word in the name of the product", () => {
    const product = products.find(
      (data) => data.name && data.name.split(" ")[1]
    );
    const search = product.name.split(" ")[1];
    Home.search(search);
    cy.get(Home.productNames).should("be.visible");
    cy.get(Home.productNames).should("include.text", product.name);
  });

  it("Verify that no products are displayed if the search term matches no names of any product", () => {
    const search = "sfsdfmsdfmsfmos";
    Home.search(search);
    cy.get(Home.productNames).should("not.exist");
  });

  it("Verify that a user can reset search with reset button", () => {
    const search = "sfsdfmsdfmsfmos";
    Home.search(search);
    cy.get(Home.productNames).should("not.exist");
    Home.resetFilters();
    cy.get(Home.productNames)
      .should("be.visible")
      .and("have.length", products.length);
  });

  it("Verify that the search option is not case-sensitive", () => {
    const search = products[productIndex].name;
    Home.search(search.toUpperCase());
    cy.get(Home.productNames).should("be.visible");
    cy.get(Home.productNames).should("include.text", search);
    Home.resetFilters();
    Home.search(search.toLowerCase());
    cy.get(Home.productNames).should("be.visible");
    cy.get(Home.productNames).should("include.text", search);
  });
});
