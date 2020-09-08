// Angular
import { Component, Input, ChangeDetectionStrategy, Directive } from '@angular/core';

// Blockframes
import { MovieQuery } from '@blockframes/movie/+state';

@Component({
  selector: 'movie-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent {
  @Input() navLinks: { path: string, label: string }[];

  movie$ = this.query.selectActive();

  constructor(private query: MovieQuery) { }

  public isEnoughPictures() {
    return Object.values(this.query.getActive().promotional.still_photo).length > 4
  }
}

@Directive({
  selector: 'movie-header, [movieHeader]',
  host: { class: 'movie-header' }
})
// tslint:disable-next-line: directive-class-suffix
export class MovieHeader { }
