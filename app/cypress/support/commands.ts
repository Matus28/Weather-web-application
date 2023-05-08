/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(username: string, password: string): Chainable<any>;
    signup(
      username: string,
      password: string,
      confirmPass: string
    ): Chainable<any>;
  }
}

Cypress.config("defaultCommandTimeout", 7000);

Cypress.Commands.add("login", (username: string, password: string) => {
  cy.visit("http://localhost:3000/login");
  cy.get('input[name="email"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.findByText("Submit").click();
});

Cypress.Commands.add(
  "signup",
  (username: string, password: string, confirmPass: string) => {
    cy.visit("http://localhost:3000/signup");
    cy.get('input[name="email"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirm-password"]').type(confirmPass);
    cy.findByText("Submit").click();
  }
);
