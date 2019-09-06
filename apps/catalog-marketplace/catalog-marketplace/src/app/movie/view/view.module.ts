// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

// Component
import { MovieViewComponent } from './view.component';

// Custom Modules
import { MovieDisplayAvailabilitiesModule } from '@blockframes/movie/movie/components/display-availabilities/display-availabilities.module';
import { MovieDisplayProductionModule } from '@blockframes/movie/movie/components/display-production/display-production.module';
import { MovieDisplayPrincipalInfoModule } from '@blockframes/movie/movie/components/display-principal-info/display-principal-info.module';
import { MovieDisplaySynopsisModule } from '@blockframes/movie/movie/components/display-synopsis/display-synopsis.module';
import { MovieDisplayFilmDetailsModule } from '@blockframes/movie/movie/components/display-film-details/display-film-details.module';
import { MovieDisplayPrizesModule } from '@blockframes/movie/movie/components/display-prizes/display-prizes.module';
import { MovieDisplayAssetsModule } from '@blockframes/movie/movie/components/display-assets/display-assets.module';
import { MovieDisplayKeywordsModule } from '@blockframes/movie/movie/components/display-keywords/display-keywords.module';
import { MovieDisplayVersionInfoModule } from '@blockframes/movie/movie/components/display-version-info/display-version-info.module';

// Material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [MovieViewComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    // Custom Modules
    MovieDisplayAvailabilitiesModule,
    MovieDisplayProductionModule,
    MovieDisplayPrincipalInfoModule,
    MovieDisplaySynopsisModule,
    MovieDisplayFilmDetailsModule,
    MovieDisplayPrizesModule,
    MovieDisplayAssetsModule,
    MovieDisplayKeywordsModule,
    MovieDisplayVersionInfoModule,
    //Material
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', component: MovieViewComponent }
    ])
  ],
})
export class MovieViewModule {}
