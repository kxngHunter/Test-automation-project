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

  //#endregion

  //#region Methods

  //#endregion
}
module.exports = new Home();
