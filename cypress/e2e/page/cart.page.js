class Cart {
  //#region Selectors

  get cartIcon() {
    return ".shopping_cart_link";
  }

  get cartItemsName() {
    return ".snipcart-item-line__title";
  }

  get cartQuantity() {
    return ".snipcart-item-quantity__quantity span";
  }

  get removedCartItem() {
    return "button[title='Remove item']";
  }

  get cartPopupCloseBtn() {
    return ".snipcart-cart__secondary-header button";
  }

  get cartPopupTitle() {
    return ".snipcart-cart__secondary-header h1";
  }

  get cartReturnBtn() {
    return "button.snipcart-modal__close";
  }

  //#endregion

  //#region Methods
  addToCart(itemName) {
    let addToCartBtn = `[data-item-name='${itemName}']`;
    cy.get(addToCartBtn).scrollIntoView();
    cy.wait(1600);
    cy.get(addToCartBtn).should("be.visible");
    cy.get(addToCartBtn).click();
  }

  closeCart() {
    const element = cy.$$(this.cartPopupCloseBtn).length;
    if (element > 0) {
      cy.get(this.cartPopupCloseBtn).should("be.visible").click();
    } else {
      cy.get(this.cartReturnBtn).should("be.visible").click();
    }
  }

  product(index) {
    return `#product-${index}`;
  }

  products(count) {
    const products = [];
    for (let index = 0; index < count; index++) {
      const name = cy
        .$$(`${this.product(index)} p`)
        .first()
        .text();
      const category = cy
        .$$(`${this.product(index)} span`)
        .first()
        .text();
      const price = cy
        .$$(`${this.product(index)} p`)
        .eq(1)
        .text();
      const description = cy
        .$$(`${this.product(index)} button`)
        .attr("data-item-description");
      const product = {
        name: name,
        description: description,
        category: category,
        price: price.replace("$", ""),
      };
      products.push(product);
    }
    return products;
  }

  productQuantity(index) {
    return `${this.product(index)} input`;
  }
  //#endregion
}
module.exports = new Cart();
