class ProductDetail {
  //#region Selectors

  get returnBtn() {
    return ".chakra-stack.css-dpkrn2";
  }

  get selectSortDropDown() {
    return "#sort";
  }

  get selectCategoryDropDown() {
    return "#category";
  }

  get searchField() {
    return "#search";
  }
  get imageSlider() {
    return ".carousel-root";
  }
  get sliderImgs() {
    return ".carousel-root .slider li";
  }
  get relatedProducts() {
    return ".css-12qzrsi>div";
  }

  //#endregion

  //#region Methods
  viewProduct(productName) {
    cy.get("p").contains(productName).scrollIntoView();
    cy.wait(1600);
    cy.get("p").contains(productName).should("be.visible");
    cy.get("p")
      .contains(productName)
      .parents()
      .eq(3)
      .children()
      .first()
      .children()
      .first()
      .children("img")
      .click();
    cy.wait(1600);
  }
  getProductsWithSameCategory(product, products) {
    const productsWithSameCategory = products.filter(
      (element) =>
        element.category === product.category && element.name !== product.name
    );
    return productsWithSameCategory;
  }
  //#endregion
}
module.exports = new ProductDetail();
