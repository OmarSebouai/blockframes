import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TunnelPageModule } from '@blockframes/ui/tunnel/page/tunnel-page.module';
import { CreditsComponent } from './credits.component';
import { MovieFormProductionYearModule } from '@blockframes/movie/form/main/production-year/production-year.module';
import { MovieFormProductionCompaniesModule } from '@blockframes/movie/form/main/production-companies/production-companies.module';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
    declarations: [CreditsComponent],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      TunnelPageModule,
      // Form Module
      MovieFormProductionYearModule,
      MovieFormProductionCompaniesModule,
      // Material
      MatCardModule,
      MatDividerModule,
      // Route
      RouterModule.forChild([{ path: '', component: CreditsComponent }])
    ]
  })
  export class CreditsModule { }