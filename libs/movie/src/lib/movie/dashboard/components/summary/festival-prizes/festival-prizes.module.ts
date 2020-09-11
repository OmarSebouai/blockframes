import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieSummaryFestivalPrizesComponent } from './festival-prizes.component';
import { MissingControlModule } from '@blockframes/ui/missing-control/missing-control.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MovieSummaryFestivalPrizesComponent],
  imports: [
    CommonModule,
    RouterModule,
    MissingControlModule
  ],
  exports: [MovieSummaryFestivalPrizesComponent]
})
export class MovieSummaryFestivalPrizesModule { }