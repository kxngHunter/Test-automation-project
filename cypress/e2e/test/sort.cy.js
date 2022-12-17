import Auth from "../page/auth.page";
import Home from "../page/home.page";
import Cart from "../page/cart.page";
import { users } from "../data/users";
const validUser = users["valid"];
let products = [];
let productIndex = 0;
const sort = {
  "A to Z": "aToZ",
  "Z to A": "zToA",
  "Low to High": "lowToHigh",
  "High to Low": "highToLow",
};
describe("Filter and sort", () => {
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
  it("Verify that a user can sort product list from A-Z", () => {
    Home.selectSort(sort["A to Z"]);

    // Sort data list based on name, from A to Z
    let sortedProducts = products.sort((a, b) => (a.name > b.name ? 1 : -1));

    cy.get(Home.productNames).each(($elem, index) => {
      expect($elem.text()).equal(sortedProducts[index].name);
    });
  });

  it("Verify that a user can sort product list from Z-A", () => {
    Home.selectSort(sort["Z to A"]);

    // Sort data list based on name, from Z to A
    let sortedProducts = products.sort((a, b) => (a.name > b.name ? -1 : 1));

    cy.get(Home.productNames).each(($elem, index) => {
      expect($elem.text()).equal(sortedProducts[index].name);
    });
  });

  it("Verify that a user can sort product list from low-high", () => {
    Home.selectSort(sort["Low to High"]);

    // Sort data list based on price, from low to high
    let sortedProducts = products.sort((a, b) =>
      Number(a.price) > Number(b.price) ? 1 : -1
    );

    cy.get(Home.productCategories)
      .parent()
      .children("p")
      .each(($elem, index) => {
        expect($elem.text()).equal(`$${sortedProducts[index].price}`);
      });
  });

  it("Verify that a user can sort product list from high-low", () => {
    Home.selectSort(sort["High to Low"]);

    // Sort data list based on price, from high to low
    let sortedProducts = products.sort((a, b) =>
      Number(a.price) > Number(b.price) ? -1 : 1
    );

    cy.get(Home.productCategories)
      .parent()
      .children("p")
      .each(($elem, index) => {
        expect($elem.text()).equal(`$${sortedProducts[index].price}`);
      });
  });
  it("Verify that a user can filter by category", () => {
    const category = products[productIndex].category;
    Home.selectCategory(category);
    cy.get(Home.productCategories).each(($elem, index) => {
      expect($elem.text()).equal(category);
    });
  });
});
