import Auth from "../page/auth.page";
import Cart from "../page/cart.page";
import Home from "../page/home.page";
import { users } from "../data/users";
const validUser = users["valid"];
describe("HomePage", () => {
  beforeEach(() => {
    cy.visit("/");
    Auth.login(validUser.email, validUser.password);
  });
  it("Verify that the homepage title and description is displayed", () => {
    const description =
      "Shop for wide range of womens and mens clothing for the latest fashion trends you can totally do your thing in, with 100s of new styles landing every day! All that is free!";
    cy.get(Home.headingTitle)
      .first()
      .should("be.visible")
      .and("include.text", "Shop Now,");
    cy.get(Home.headingTitle)
      .eq(1)
      .should("be.visible")
      .and("include.text", "Quality Items!");
    cy.get(Home.headingDescription)
      .should("be.visible")
      .and("include.text", `${description}`);
  });

  it("Verify that the homepage contain a video", () => {
    cy.get(Home.videoIframe).should("be.visible");
    cy.get(Home.videoIframe)
      .should("have.attr", "src")
      .and("equal", "https://www.youtube.com/embed/JSda4u5jFFk");
  });

  it("Verify that the sort, search and filter options are displayed", () => {
    cy.get(Home.selectSortDropDown).should("be.visible");
    cy.get(Home.selectCategoryDropDown).should("be.visible");
    cy.get(Home.searchField).should("be.visible");
  });

  it("Verify that the homepage contain a list of products", () => {
    cy.get(Cart.product(0)).scrollIntoView();
    cy.wait(1600);
    cy.get(Cart.product(0)).should("be.visible");
    cy.get(Cart.product(0))
      .parent()
      .children()
      .then(($products) => {
        expect($products.length).to.be.greaterThan(1);
      });
  });

  it("Verify that all products have a name, price and category", () => {
    cy.get(Cart.product(0))
      .parent()
      .children()
      .then(($products) => {
        const products = Cart.products($products.length);
        for (const product of products) {
          expect(product.name).to.exist;
          expect(product.price).to.exist;
          expect(product.category).to.exist;
        }
      });
  });
});
