// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by test-id attribute.
     * @example cy.getTestID('a', 'download')
    */
   getTestID(sel: string, testID?: string): any;
  }
}
