import Auth from "../page/auth.page";
import Cart from "../page/cart.page";
import ProductDetail from "../page/detail.page";
import { users } from "../data/users";
const validUser = users["valid"];
let products = [];
const productIndex = 0;
describe("Product Details", () => {
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

  it("Verify that a user can click on a product to go to its details page", () => {
    const product = products[productIndex];
    ProductDetail.viewProduct(product.name);
    cy.get(ProductDetail.returnBtn).should("be.visible");
    cy.get(`${ProductDetail.returnBtn} h2`)
      .should("be.visible")
      .and("include.text", "Back to products");
  });

  it("Verify that the details of the product are displayed and correct", () => {
    const product = products[productIndex];
    ProductDetail.viewProduct(product.name);
    cy.get("h2").contains(`${product.name}`).should("exist");
    cy.get("p").contains(`${product.description}`).should("exist");
    cy.get("p")
      .contains(`$${Number(product.price)}`)
      .should("exist");
  });

  it("Verify that the image slider is displayed with at least one image", () => {
    const product = products[productIndex];
    ProductDetail.viewProduct(product.name);
    cy.get(ProductDetail.imageSlider).should("be.visible");
    cy.get(ProductDetail.sliderImgs).should("have.length.above", 0);
  });

  it("Verify that if there are related products, that they are in the same category of the current product ", () => {
    const product = products[productIndex];
    const productsWithSameCategory = ProductDetail.getProductsWithSameCategory(
      product,
      products
    );
    ProductDetail.viewProduct(product.name);
    if (productsWithSameCategory && productsWithSameCategory.length > 0) {
      cy.get(ProductDetail.relatedProducts).should("be.visible");
      cy.get(ProductDetail.relatedProducts).should("have.length.above", 0);
      cy.get(`${ProductDetail.relatedProducts} span`).each(
        ($el, index, $list) => {
          expect($el).to.have.text(product.category);
        }
      );
    } else {
      cy.get(ProductDetail.relatedProducts).should("not.exist");
    }
  });

  it("Verify that a user can click on a related product to go to its detail page", () => {
    const product = products[productIndex];
    const productsWithSameCategory = ProductDetail.getProductsWithSameCategory(
      product,
      products
    );
    ProductDetail.viewProduct(product.name);
    if (productsWithSameCategory && productsWithSameCategory.length > 0) {
      cy.get(`${ProductDetail.relatedProducts} img`)
        .first()
        .should("be.visible");
      cy.get(`${ProductDetail.relatedProducts} img`).first().click();
      cy.wait(1600);
      cy.get("h2")
        .contains(`${productsWithSameCategory[0].name}`)
        .should("exist");
    }
  });
});
