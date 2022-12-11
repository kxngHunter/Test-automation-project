import Auth from "../page/auth.page";
import routesData from "../data/routes";
import { users } from "../data/users";
import { faker } from "@faker-js/faker";
describe("Registration", () => {
  const email = faker.internet.email();
  const password = faker.internet.password(8, false, /^[a-zA-Z1-9]/);
  beforeEach(() => {
    cy.visit("/");
  });
  it("Verify that a user can sign up with a valid email and password", () => {
    Auth.register(email, password);
    cy.url().should("contain", routesData.home);
    cy.get(Auth.pageHeaderTitle).should("contain", "Automation Camp Store");
    Auth.logout();
  });
  it("Verify that a user cannot re-sign up with the same email", () => {
    Auth.register(email, password);
    cy.get(Auth.errMsg)
      .should("be.visible")
      .and(
        "contain",
        "We're sorry, something went wrong when attempting to sign up."
      );
  });
});
describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  for (const user in users) {
    if (Object.hasOwnProperty.call(users, user)) {
      const loginInfo = users[user];
      it(loginInfo.testTitle, () => {
        Auth.login(loginInfo.email, loginInfo.password);
        switch (user) {
          case "valid":
            cy.url().should("contain", routesData.home);
            cy.get(Auth.pageHeaderTitle).should(
              "contain",
              "Automation Camp Store"
            );
            Auth.logout();

            break;
          case "invalidPassword":
            cy.get(Auth.errMsg)
              .should("be.visible")
              .and("contain", loginInfo.errorMsg);
            break;
          case "invalidCredentials":
            cy.get(Auth.errMsg)
              .should("be.visible")
              .and("contain", loginInfo.errorMsg);
            break;
          default:
            break;
        }
      });
    }
  }
});
