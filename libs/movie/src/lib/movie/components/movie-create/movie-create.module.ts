import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AssetsThemeModule } from '@blockframes/ui';

// Component
import { MovieCreateComponent } from './movie-create.component';

// Material
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    AssetsThemeModule,

    //Material
    MatButtonModule
  ],
  declarations: [MovieCreateComponent],
  exports: [MovieCreateComponent]
})
export class MovieCreateModule {}
