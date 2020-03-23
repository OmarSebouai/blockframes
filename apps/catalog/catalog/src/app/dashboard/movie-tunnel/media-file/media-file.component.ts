import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ImgRef } from "@blockframes/utils/image-uploader";
import { MovieQuery } from '@blockframes/movie/movie/+state/movie.query';
import { MovieTunnelComponent } from '../movie-tunnel.component';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'catalog-movie-tunnel-media-file',
  templateUrl: './media-file.component.html',
  styleUrls: ['./media-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaFileComponent {
  form = this.tunnel.form;

  constructor(
    private tunnel: MovieTunnelComponent,
    private movieQuery: MovieQuery,
    private title: Title) {
    this.title.setTitle('Files & links - Title information - Archipel Content')
  }

  public movie = this.movieQuery.getActive();
  public presentationPath = `movie/${this.movie.id}/PresentationDeck`;
  public scenarioPath = `movie${this.movie.id}/Scenario`;

  get promotionalElements() {
    return this.form.get('promotionalElements');
  }

  // get the ImgRef generated from firestorage and update url of media for each path
  importPDF(imgRef: ImgRef, path: 'scenario' | 'presentation_deck') {
    this.form.get('promotionalElements').get(path).get('media').patchValue(imgRef);
  }
}
