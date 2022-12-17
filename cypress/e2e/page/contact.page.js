import routesData from "../data/routes";
class Contact {
  //#region Selectors

  get contactNavBtn() {
    return "#top-contact";
  }

  get socialMediaLinks() {
    return "div.css-103gdes a";
  }

  get firstNameField() {
    return "form #firstName";
  }

  get lastNameField() {
    return "form #lastName";
  }

  get emailField() {
    return "form #email";
  }

  get subjectField() {
    return "form #subject";
  }

  get messageField() {
    return "form #message";
  }
  get sendBtn() {
    return "form button";
  }
  get errMsg() {
    return "div[aria-live='polite']";
  }
  get successMsgTitle() {
    return "#toast-1-title";
  }
  get successMsgDesc() {
    return "#toast-1-description";
  }
  //#endregion

  //#region Methods
  goToContactPage() {
    cy.get(this.contactNavBtn).should("be.visible").focus().click();
    cy.url().should("contain", routesData.contact);
  }
  sendMsg(data) {
    cy.get(this.firstNameField).type(data.firstName);
    cy.get(this.lastNameField).type(data.lastName);
    data.email ? cy.get(this.emailField).type(data.email) : null;
    cy.get(this.subjectField).type(data.subject);
    cy.get(this.messageField).type(data.message);
    cy.get(this.sendBtn).should("be.visible").focus().click();
  }
  //#endregion
}
module.exports = new Contact();
