/// <reference types="cypress" />
import { StartTunnelPage, TitlesListPage, TunnelMainPage } from '../../support/pages/dashboard';
import { User } from '../../support/utils/type';
import { USERS } from '../../support/utils/users';
import { LoginViewPage, WelcomeViewPage } from '../../support/pages/auth';
import { HomePage } from '../../support/pages/marketplace';

// TEST

// Select user: cytest@blockframes.com
const LOGIN_CREDENTIALS: Partial<User> = USERS[0];

beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/auth');
  cy.viewport('ipad-2', 'landscape');
});

describe('issue#1494: movie tunnel page 1', () => {
  // https://github.com/blockframes/blockframes/issues/1494

  it('Login into an existing account, navigate on titles list page, go to movie tunnel page 1, go on movie tunnel page 2', () => {
    // The user connects,
    const p1: WelcomeViewPage = new WelcomeViewPage();
    const p2: LoginViewPage = p1.clickCallToAction();
    p2.switchMode();
    p2.fillSignin(LOGIN_CREDENTIALS);
    const p3: HomePage = p2.clickSignIn();

    // CAN'T BE DONE:
    //   Lands on homepage = dashboard page,
    //   Clicks on the add button,
    // INSTEAD:
    //   Navigate to movie-tunnel-1
    const p4: TitlesListPage = TitlesListPage.navigateToPage();
    const p5: StartTunnelPage = p4.clickAdd();
    const p6: TunnelMainPage = p5.clickBegin();
    // verifier l'atterissage.
  });
});
