import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventForm } from '../../form/event.form';
import { EventService } from '../../+state/event.service';
import { InvitationService }  from '@blockframes/invitation/+state/invitation.service';
import { Invitation }  from '@blockframes/invitation/+state/invitation.model';
import { scaleIn } from '@blockframes/utils/animations/fade';
import { createAlgoliaUserForm } from '@blockframes/utils/algolia';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'event-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  animations: [scaleIn],
  changeDetection: ChangeDetectionStrategy.Default  // required for changes on "pristine" for the save button
})
export class EventEditComponent {

  @Input() form = new EventForm();
  @Input() invitations: Invitation[] = [];
  invitationForm = createAlgoliaUserForm();
  progress: Observable<number>;

  constructor(
    private service: EventService,
    private invitationService: InvitationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  get meta() {
    return this.form.get('meta');
  }

  save() {
    if (this.form.valid && this.form.dirty) {
      this.service.update(this.form.value);
      this.form.markAsPristine();
    }
  }

  async remove() {
    await this.service.remove(this.form.value.id);
    this.router.navigate(['../..'], { relativeTo: this.route })
  }

  /** Send an invitation to a list of persons, either to existing user or by creating user  */
  async invite() {
    const event = this.form.value;
    const emails = this.invitationForm.value.map(guest => guest.email);
    let count = 0;
    const progress$ = this.invitationService.invite('user', emails).from('org').to('attendEvent', event.id);
    this.invitationForm.clear();
    this.progress = progress$.pipe(
      map(_ => ((++count) / emails.length) * 100),
      finalize(() => delete this.progress)
    );
  }
}
