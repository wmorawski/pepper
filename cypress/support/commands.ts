// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject = any> {
    clickOutside(): Chainable<any>;
  }
}

Cypress.Commands.add('clickOutside', () => cy.get('body').click(0, 0));
