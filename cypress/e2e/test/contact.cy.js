import Auth from "../page/auth.page";
import Contact from "../page/contact.page";
import { users, contactFormData } from "../data/users";
const validUser = users["valid"];
const socialMediaLinks = [
  "mailto:info@qualityworkscg.com",
  "https://www.linkedin.com/company/qualityworks-consulting-group-llc",
  "https://twitter.com/qualityworkscg",
];
describe("Contact", () => {
  beforeEach(() => {
    cy.visit("/");
    Auth.login(validUser.email, validUser.password);
    Contact.goToContactPage();
  });
  it("Verify that the social media links are correct", () => {
    cy.get(Contact.socialMediaLinks).each(($elem, index, $links) => {
      cy.get($elem)
        .should("have.attr", "href")
        .and("equal", socialMediaLinks[index]);
    });
  });
  it("Verify that social media links open in new tab", () => {
    cy.get(Contact.socialMediaLinks).each(($elem, index, $links) => {
      cy.get($elem).should("have.attr", "target").and("equal", "_blank");
    });
  });
  for (const data of contactFormData) {
    it(data.testTitle, () => {
      Contact.sendMsg(data);
      if (data.valid) {
        cy.get(Contact.successMsgTitle)
          .should("be.visible")
          .and("include.text", "Message Sent!");
        cy.get(Contact.successMsgDesc)
          .should("be.visible")
          .and("include.text", "Your message has been sent!");
      } else {
        cy.get(Contact.errMsg).should("be.visible");
      }
    });
  }
});
