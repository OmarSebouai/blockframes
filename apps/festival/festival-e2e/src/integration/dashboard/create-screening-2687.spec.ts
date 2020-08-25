/// <reference types="cypress" />

// Pages
import {
  FestivalMarketplaceHomePage,
  FestivalOrganizationListPage,
  FestivalMarketplaceOrganizationTitlePage,
  FestivalScreeningPage,
  FestivalMarketplaceNotificationsPage,
  FestivalMarketplaceCalendarPage,
  FestivalMarketplaceEventPage
} from '../../support/pages/marketplace/index';
import {
  FestivalDashboardHomePage,
  FestivalInvitationsPage,
  EventPage,
  EventEditPage
} from '../../support/pages/dashboard/index';
import { LandingPage } from '../../support/pages/landing';
// Hooks
import { clearDataAndPrepareTest, signIn } from '@blockframes/e2e/utils/functions';
import { NOW, TOMORROW, PRIVATE_EVENTNAME_1, PRIVATE_EVENTNAME_2, PRIVATE_EVENTNAME_3,ORG_NAME, PUBLIC_EVENTNAME } from '../../fixtures/data';
import { MOVIES } from '@blockframes/e2e/utils/movies';
import newUsers from '../../fixtures/new-user.json'
import { User } from '@blockframes/e2e/utils/type';
import { TestUser } from '@blockframes/firebase-utils';

let tomorrow = TOMORROW;
const MOVIE_TITLE = MOVIES[3].title.international;

describe('User create a screening', () => {
  let users: TestUser[];
  let USER_1: TestUser;
  let USER_2: TestUser;

  before(() => {
    cy.task('getTestUsers', 10).then(testUserArray => {
      users = testUserArray;
      USER_1 = users.pop()
      USER_2 = users.pop()
    })
  })
  beforeEach(() => {
    clearDataAndPrepareTest('/');
    tomorrow = new Date(NOW);
    const p1 = new LandingPage();
    p1.clickSignup();      
  });

  it.only('User creates a private screening, that taking place tomorrow', () => {
    signIn(USER_1);
    const p1 = new FestivalDashboardHomePage();
    const p2: EventPage = p1.goToCalendar();
    const p3: EventEditPage = p2.createDetailedEvent(NOW);
    p3.addEventTitle(PRIVATE_EVENTNAME_1);
    p3.selectMovie(MOVIE_TITLE);
    p3.saveEvent();
  });

  it('User creates a public screening, that taking place tomorrow', () => {
    signIn(USER_1);
    const p1 = new FestivalDashboardHomePage();
    const p2: EventPage = p1.goToCalendar();
    const p3: EventEditPage = p2.createDetailedEvent(NOW);
    p3.addEventTitle(PUBLIC_EVENTNAME);
    p3.uncheckPrivate();
    p3.selectMovie(MOVIE_TITLE);
    p3.saveEvent();
  });

  it('User creates a private screening, that taking place tomorrow', () => {
    signIn(USER_1);
    const p1 = new FestivalDashboardHomePage();
    const p2: EventPage = p1.goToCalendar();
    const p3: EventEditPage = p2.createDetailedEvent(tomorrow);
    p3.addEventTitle(PRIVATE_EVENTNAME_2);
    p3.selectMovie(MOVIE_TITLE);
    p3.saveEvent();
  });

  it('User creates a private screening, that taking place tomorrow', () => {
    signIn(USER_1);
    const p1 = new FestivalDashboardHomePage();
    const p2: EventPage = p1.goToCalendar();
    const p3: EventEditPage = p2.createDetailedEvent(tomorrow);
    p3.addEventTitle(PRIVATE_EVENTNAME_3);
    p3.selectMovie(MOVIE_TITLE);
    p3.saveEvent();
  });

  it('Verify the screening page and created screenings', () => {
    signIn(USER_2);
    const p1 = new FestivalMarketplaceHomePage();
    p1.clickOnMenu();
    const p2: FestivalOrganizationListPage = p1.selectSalesAgents();
    const p3: FestivalMarketplaceOrganizationTitlePage = p2.clickOnOrganization(ORG_NAME);
    const p4: FestivalScreeningPage = p3.clickOnScreeningSchedule();
    p4.assertScreeningsExists(PRIVATE_EVENTNAME_1);
    p4.assertScreeningsExists(PRIVATE_EVENTNAME_2);
    p4.assertScreeningsExists(PRIVATE_EVENTNAME_3);
    p4.assertScreeningsExists(PUBLIC_EVENTNAME);
    // TODO: #2689 verify the eventName in each event view page
    const p5: FestivalMarketplaceEventPage = p4.clickSpecificEvent(PUBLIC_EVENTNAME);
    p5.assertEventNameExist(PUBLIC_EVENTNAME);
    const p6: FestivalScreeningPage = p5.clickBackToEventList();

    const p7: FestivalMarketplaceEventPage = p6.clickSpecificEvent(PRIVATE_EVENTNAME_1);
    p7.assertEventNameExist(PRIVATE_EVENTNAME_1);
    const p8: FestivalScreeningPage = p7.clickBackToEventList();

    const p9: FestivalMarketplaceEventPage = p8.clickSpecificEvent(PRIVATE_EVENTNAME_2);
    p9.assertEventNameExist(PRIVATE_EVENTNAME_2);
    const p10: FestivalScreeningPage = p9.clickBackToEventList();

    const p11: FestivalMarketplaceEventPage = p10.clickSpecificEvent(PRIVATE_EVENTNAME_3);
    p11.assertEventNameExist(PRIVATE_EVENTNAME_3);
    const p12: FestivalScreeningPage = p11.clickBackToEventList();
  });

  it("Request invitation's screening", () => {
    signIn(USER_2);
    const p1 = new FestivalMarketplaceHomePage();
    p1.clickOnMenu();
    const p2: FestivalOrganizationListPage = p1.selectSalesAgents();
    const p3: FestivalMarketplaceOrganizationTitlePage = p2.clickOnOrganization(ORG_NAME);
    const p4: FestivalScreeningPage = p3.clickOnScreeningSchedule();
    p4.clickAskForInvitation();
  });

  it('Accept screening request', () => {
    signIn(USER_1);
    const p1 = new FestivalDashboardHomePage();
    const p2: FestivalInvitationsPage = p1.clickOnInvitations();
    p2.acceptInvitationScreening();
  });

  it('Verify that request is accepted', () => {
    signIn(USER_2);
    const p1 = new FestivalMarketplaceHomePage();
    const p2: FestivalMarketplaceNotificationsPage = p1.goToNotifications();
    // Wait notifications
    cy.wait(8000);
    p2.verifyNotification(ORG_NAME, true);
  });

  // #2695
  it('User add public screening to his calendar', () => {
    signIn(USER_2);
    const p1 = new FestivalMarketplaceHomePage();
    p1.clickOnMenu();
    const p2: FestivalOrganizationListPage = p1.selectSalesAgents();
    const p3: FestivalMarketplaceOrganizationTitlePage = p2.clickOnOrganization(ORG_NAME);
    const p4: FestivalScreeningPage = p3.clickOnScreeningSchedule();
    p4.clickAddToCalendar();
    p4.clickOnMenu();
    const p5: FestivalMarketplaceCalendarPage = p4.selectCalendar();
    const p6: FestivalMarketplaceEventPage = p5.clickOnEvent(MOVIE_TITLE);
    cy.wait(5000);
    p6.assertScreeningExist(MOVIE_TITLE);
  });
});
