﻿import EventEditPage from './EventEditPage';

export default class EventPage {
  constructor() {
    //cy.get('festival-event-list');
    cy.get('cal-week');
  }

  waitNewUrl() {
    return new Cypress.Promise((resolve, reject) => {
      cy.on('url:changed', (url) => {
        resolve(url);
      })
    })
  }

  /**
   * createEvent : Creates a screening event & saves the details.
   * Note: Only events that have movies uploaded are available for viewing
   * 
   * @param eventTitle : Screening Event Title (Listed on Calendar)
   * @param eventDate  : Date of screening
   * @param screeningName : Title screened (what is shown)
   * @param isPublic  : true for public event, false for private
   */
  createEvent(eventTitle: string, eventDate: Date, 
              screeningName: string, isPublic: boolean = false) {
    cy.log(`createEvent : {${eventTitle}}`);
    const event: EventEditPage = this.createDetailedEvent(eventDate);
    event.addEventTitle(eventTitle);
    if (isPublic) {
      event.uncheckPrivate();
    }

    event.selectMovie(screeningName);

    event.saveEvent();
    cy.get('[svgicon="arrow_back"]').click();
  }

  createDetailedEvent(date: Date) {
    const day = date.getDay();
    cy.get('div [class=cal-day-columns]').children().eq(day).find('mwl-calendar-week-view-hour-segment').first().click();
    cy.get('button[test-id=more-details]').click();
    return new EventEditPage();
  }

}
