/// <reference types="cypress" />

// Utils
import {
  NOW,
  USER_1,
  USER_2,
  USER_3,
  PRIVATE_EVENTNAME,
  PARTICIPANT_1_NAME,
  PARTICIPANT_2_NAME,
} from '../../fixtures/data'
import { clearDataAndPrepareTest, signIn } from '@blockframes/e2e/utils/functions';
import { MOVIES } from '@blockframes/e2e/utils/movies';

// Pages
import { FestivalMarketplaceHomePage, FestivalMarketplaceEventPage, FestivalMarketplaceScreeningPage } from '../../support/pages/marketplace/index';
import { FestivalDashboardHomePage, EventPage, EventEditPage, FestivalInvitationsPage } from '../../support/pages/dashboard/index';

const MOVIE_TITLE = MOVIES[3].title.international;
let screeningUrl: string;

describe('User invites other users to his private screening', () => {
  beforeEach(() => {
    clearDataAndPrepareTest();
  });

  it('User creates a private screening and invites John Bryant and Sarah Gregory to the screening', () => {
    signIn(USER_1);
    const p1 = new FestivalDashboardHomePage();
    const p2: EventPage = p1.goToCalendar()
    const p3: EventEditPage = p2.createDetailedEventToday(NOW);
    p3.addEventTitle(PRIVATE_EVENTNAME);
    p3.checkAllDay();
    p3.selectMovie(MOVIE_TITLE);
    p3.inviteUser([USER_2.email, USER_3.email]);
    // We need to wait to fetch the invited user
    p3.copyGuests();
    cy.wait(30000);
    p3.saveEvent();
    const p4 = p3.goToDashboard();
    p4.logout();
  });

  it(`${PARTICIPANT_1_NAME} logs in and accepts his invitations and logs out`, () => {
    signIn(USER_2);
    const p1 = new FestivalMarketplaceHomePage();
    const p2: FestivalInvitationsPage = p1.goToInvitations();
    cy.wait(2000)
    p2.acceptInvitationScreening();
    // Wait for post request to finish
    cy.wait(2000);

    //////
    const p3: FestivalMarketplaceEventPage = p2.clickMore();
    const p4: FestivalMarketplaceScreeningPage = p3.clickJoinScreening();

    // Save the current url for the next test
    cy.url().then(url => screeningUrl = url);

    p4.clickPlay();

  });

  it(`${PARTICIPANT_2_NAME} logs in and refuse her invitations and logs out`, () => {
    signIn(USER_3);
    const p1 = new FestivalMarketplaceHomePage();
    const p2 = p1.goToInvitations();
    cy.wait(2000);
    p2.refuseInvitationScreening();
    // Wait for post request to finish
    cy.wait(2000);
  });

  it('Event create logs in and verifies the accepted invitations', () => {
    cy.visit('/auth/welcome');
    signIn(USER_1);
    const p1 = new FestivalDashboardHomePage();
    const p2 = p1.goToNotifications()
    p2.verifyNotification(PARTICIPANT_1_NAME, true);
    p2.verifyNotification(PARTICIPANT_2_NAME, false);
  });

  it(`${PARTICIPANT_1_NAME} logs in and accepts his invitations and logs out`, () => {
    signIn(USER_2);
    const p1 = new FestivalMarketplaceHomePage();
    const p2 = p1.goToInvitations();
    cy.wait(2000)
    p2.acceptInvitationScreening();
    // Wait for post request to finish
    cy.wait(2000);
  });
});
