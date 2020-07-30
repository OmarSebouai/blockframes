import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MovieFormShellComponent } from '../shell/shell.component';

@Component({
  selector: 'movie-form-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieFormReviewscComponent {
  form = this.shell.form;

  constructor(private shell: MovieFormShellComponent) {}

  get prizes() {
    return this.festival.get('prizes');
  }

  get festival() {
    return this.form.get('festivalPrizes');
  }

  get reviews() {
    return this.form.get('movieReview');
  }

}
