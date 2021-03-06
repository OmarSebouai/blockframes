// Angular 
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';

// Blockframes
import { MovieQuery } from '@blockframes/movie/+state';
import { EventService, Event } from '@blockframes/event/+state';
import { InvitationService } from '@blockframes/invitation/+state';
import { OrganizationService } from '@blockframes/organization/+state';

// RxJs
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'movie-screening',
  templateUrl: 'upcoming-screenings.component.html',
  styleUrls: ['./upcoming-screenings.component.scss'],
  host: {
    class: 'dark-contrast-theme'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpcomingScreeningsComponent {

  public sessionCtrl = new FormControl('first');

  public movie$ = this.query.selectActive();

  public screenings$ = this.eventService.filterScreeningsByMovieId(this.query.getActive().id).pipe(
    map(screenings => screenings.sort(this.sortByDate)));

  public org = this.organizationService.findOrgByMovieId(this.query.getActive().id);

  public invitationWasSent = false;

  constructor(
    private query: MovieQuery,
    private eventService: EventService,
    private invitationService: InvitationService,
    private organizationService: OrganizationService,
    private cdr: ChangeDetectorRef) { }

  askForInvitation(events: Event[]) {
    const eventId = this.sessionCtrl.value === 'first' ? events[0].id : events[1].id;
    this.org.pipe(take(1)).subscribe(org => {
      this.invitationService.request('org', org[0].id).from('user').to('attendEvent', eventId)
      this.invitationWasSent = true;
      this.cdr.markForCheck();
    })
  }

  private sortByDate(a: Event, b: Event): number {
    if (a.start.getTime() < b.start.getTime()) return -1
    if (a.start.getTime() > b.start.getTime()) return 1
    return 0
  }
} 