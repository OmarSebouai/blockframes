import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Invitation } from '@blockframes/invitation/+state';
import { EventService, Event } from '@blockframes/event/+state';
import { Observable } from 'rxjs';

@Component({
  selector: '[invitation] invitation-message',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {

  public orgName: string;

  private _invitation: Observable<Event>
  @Input()
  get invitation() { return (this._invitation as any) }
  set invitation(invitation: Invitation) {
    
    /* If docId is empty */
    this._invitation = this.eventService.syncDoc({ id: invitation.docId });
    if (invitation.fromOrg) {
      this.orgName = invitation.fromOrg.denomination.public || invitation.fromOrg.denomination.full
    } else {
      this.orgName = (invitation.fromUser.firstName && invitation.fromUser.lastName)
        ? `${invitation.fromUser.firstName} ${invitation.fromUser.lastName}` : invitation.fromUser.email
    }
  }

  constructor(private eventService: EventService) { }
}