import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticSelectComponent } from './static-select.component';
import { ToLabelModule } from '@blockframes/utils/pipes/to-label.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    ToLabelModule,
    MatFormFieldModule
  ],
  declarations: [StaticSelectComponent],
  exports: [StaticSelectComponent]
})
export class StaticSelectModule { }
