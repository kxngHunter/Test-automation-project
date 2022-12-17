class Home {
  //#region Selectors

  get videoIframe() {
    return "iframe[title='Automate Your Quality Assurance Testing']";
  }

  get headingTitle() {
    return "h2.chakra-heading span";
  }

  get headingDescription() {
    return "p.chakra-text.css-q9k0mw";
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
  get productNames() {
    return "div[id^='product'] p:only-child";
  }
  get productCategories() {
    return "div[id^='product'] div span";
  }
  //#endregion

  //#region Methods
  selectSort(sort) {
    cy.get(this.selectSortDropDown).scrollIntoView();
    cy.wait(1200);
    cy.get(this.selectSortDropDown).select(sort);
    cy.wait(1200);
  }
  selectCategory(category) {
    cy.get(this.selectCategoryDropDown).scrollIntoView();
    cy.wait(1200);
    cy.get(this.selectCategoryDropDown).select(category);
    cy.wait(1200);
  }
  //#endregion
}
module.exports = new Home();
