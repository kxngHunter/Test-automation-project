import routesData from "../data/routes";
class Cart {
  //#region Selectors

  get cartNavBtn() {
    return "#top-cart";
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
  get cartTotal() {
    return "span.snipcart-summary-fees__amount.snipcart-summary-fees__amount--highlight";
  }
  get checkoutBtn() {
    return "button[class='snipcart-button-primary snipcart-base-button is-icon-right']";
  }

  //#endregion

  //#region Methods
  addToCart(itemName) {
    let addToCartBtn = `button[data-item-name='${itemName}']`;
    cy.get(addToCartBtn).scrollIntoView();
    cy.wait(2000);
    cy.get(addToCartBtn).should("be.visible");
    cy.get(addToCartBtn).focus().click();
    cy.wait(2000);
    const element = cy.$$(this.cartPopupTitle).length;
    if (element > 0) {
      cy.get(this.cartPopupTitle)
        .should("be.visible")
        .and("include.text", "Cart summary");
    } else {
      cy.url().should("contain", routesData.cart);
    }
  }
  openCart() {
    cy.get(this.cartNavBtn).should("be.visible").trigger("click");
    cy.wait(2000);
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

  checkout() {
    cy.get(this.checkoutBtn).scrollIntoView();
    cy.wait(2000);
    cy.get(this.checkoutBtn).should("be.visible");
    cy.get(this.checkoutBtn).focus().trigger("click");
    cy.wait(2000);
  }
  //#endregion
}
module.exports = new Cart();
