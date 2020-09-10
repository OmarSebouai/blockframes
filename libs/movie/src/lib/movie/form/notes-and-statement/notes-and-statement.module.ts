import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

// Blockframes UI
import { TunnelPageModule } from '@blockframes/ui/tunnel';
import { HasStatusModule } from '@blockframes/movie/pipes/has-status.pipe'
import { UploadModule } from '@blockframes/media/components/upload/upload.module';
import { FormListModule } from '@blockframes/ui/form/list/form-list.module';

import { MovieFormNotesAndStatementsComponent } from './notes-and-statement.component';

@NgModule({
  declarations: [MovieFormNotesAndStatementsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // Other Modules
    TunnelPageModule,
    FlexLayoutModule,
    FlexLayoutModule,
    HasStatusModule,
    UploadModule,
    FormListModule,

    // Material
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,

    // Routes
    RouterModule.forChild([{ path: '', component: MovieFormNotesAndStatementsComponent }]),
  ],
})
export class MovieFormNotesAndStatementsModule { }
