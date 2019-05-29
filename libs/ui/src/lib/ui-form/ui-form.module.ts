import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { ChipsAutocompleteComponent } from './chips-autocomplete/chips-autocomplete.component';
import { EmailComponent } from './inputs/email/email.component';
import { PasswordComponent } from './inputs/password/password.component';
import { PasswordConfirmComponent } from './form-groups/password-confirm/password-confirm.component';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule
  ],
  declarations: [
    ChipsAutocompleteComponent,
    EmailComponent,
    PasswordComponent,
    PasswordConfirmComponent
  ],
  exports: [
    ChipsAutocompleteComponent,
    EmailComponent,
    PasswordComponent,
    PasswordConfirmComponent
  ],
})
export class UiFormModule { }
