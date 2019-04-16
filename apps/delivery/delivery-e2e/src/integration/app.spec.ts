/// <reference types="cypress" />
import { getTitle, LandingPage } from '../support/app.po';

let currentID = 0;

const randomID = (): string => `${new Date().toISOString()}-${currentID++}`;
const MATERIALS = [
  {
    value: 'First Material Value',
    description: 'First Material Description',
    category: 'Category #1'
  },
  {
    value: 'Second Material Value',
    description: 'Second Material Description',
    category: 'Category #2'
  }
];
const NO_CATEGORY_MATERIAL = {
  value: 'Third Material Value',
  description: 'Third Material Description'
};
const ORG_NAME_1 = 'Organization #1';
const TEMPLATE_NAME_1 = 'Template #2';

const EMAIL = 'delivery-test-e2e@cascade8.com';
const PASSWORD = 'blockframes4tw';

function generateRandomEmail(): string {
  return `cypress${Math.floor(Math.random() * 10000) + 1}@test.com`;
}

beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/auth');
  cy.viewport('macbook-15');
});

describe('Hello Delivery', () => {
  it('should display h1 with "Sign in" in it', () => {
    getTitle().contains('Sign in');
  });
});

describe('I m a user and i can save a delivery as template', () => {
  it('should login, create delivery from scratch, save it as a new template, then delete this template', () => {
    // Connexion
    let p: any = new LandingPage();
    p.fillSigninEmail(EMAIL);
    p.fillSigninPassword(PASSWORD);
    p = p.login();
    // Go to app
    p.displayMovieMenu();
    p.clickOpenIn();
    p = p.selectApp();
    // Create new delivery from scratch
    p = p.clickAddDelivery();
    p = p.clickCreateNewDelivery();
    // Add materials
    MATERIALS.forEach(material => {
      p.clickAdd();
      p.fillValue(material.value);
      p.fillDescription(material.description);
      p.fillCategory(material.category);
      p.clickAddMaterial();
    });
    p.clickAddCategory();
    p.fillValue(NO_CATEGORY_MATERIAL.value);
    p.fillDescription(NO_CATEGORY_MATERIAL.description);
    p.clickAddMaterial();
    // Save delivery as new template
    p = p.clickSaveAsTemplate();
    p.clickSelect();
    p.pickOrganization(ORG_NAME_1);
    p.fillName(TEMPLATE_NAME_1);
    p = p.clickSave();
    p = p.selectDeliveries();
    // Check if delivery exists
    p.assertDeliveryExists();
    p = p.clickDelivery();
    // Check if all materials exists
    p.assertMaterialsExist(MATERIALS.length + 1);
    // Delete delivery
    p = p.deleteDelivery();
    p.assertDeliveryIsDeleted();
    // Check if template exists
    p = p.selectTemplate();
    p.openExpansionPanel(ORG_NAME_1);
    p.assertTemplateExists(TEMPLATE_NAME_1);
    p.displayTemplateMenu(TEMPLATE_NAME_1);
    p = p.clickEdit();
    cy.reload(); /// Have to reload to make the materials visible ///
    p.assertMaterialsExist(MATERIALS.length + 1);
    p = p.selectTemplate();
    p.openExpansionPanel(ORG_NAME_1);
    p.displayTemplateMenu(TEMPLATE_NAME_1);
    p.deleteTemplate();
    // TODO: Find a way to assert that template is deleted
    // => Expansion Panel still buggy
  });
});

describe('I\'m a paranoid user, I would like to create an account and verify that I own a contract on the blockchain', () => {
  it('should type values in signup form', () => {
    // Connexion
    let p: any = new LandingPage();
    p.fillSignupEmail(generateRandomEmail());
    p.fillSignupPassword(PASSWORD);
    p = p.signup();

    // Go to profile page
    p.openUserMenu();
    p = p.clickProfile();

    // Assert id
    p.assertIdIsAddress();
  })
});