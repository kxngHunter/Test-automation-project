class Favourite {
  //#region Selectors

  get favouriteNavBtn() {
    return "#top-favorite";
  }

  get favouriteNavBtnCount() {
    return "#top-favorite p";
  }
  get toastTitle() {
    return "div[id^='toast']";
  }
  get favouriteBtn() {
    return "svg#add-to-favorite";
  }

  //#endregion

  //#region Methods
  addToFavourites(product) {
    let addToFavouritesBtn = `${product} svg#add-to-favorite`;
    cy.get(addToFavouritesBtn).scrollIntoView();
    cy.wait(2000);
    cy.get(addToFavouritesBtn).should("be.visible");
    cy.get(addToFavouritesBtn).click();
    // cy.wait(2000);
  }
  removeFromFavourites(product) {
    let addToFavouritesBtn = `${product} svg#remove-from-favorite`;
    cy.get(addToFavouritesBtn).scrollIntoView();
    cy.wait(2000);
    cy.get(addToFavouritesBtn).should("be.visible");
    cy.get(addToFavouritesBtn).click();
    // cy.wait(2000);
  }
  goToFavourites() {
    cy.get(this.favouriteNavBtn).scrollIntoView();
    cy.wait(2000);
    cy.get(this.favouriteNavBtn).focus().click();
    cy.wait(2000);
  }

  //#endregion
}
module.exports = new Favourite();
