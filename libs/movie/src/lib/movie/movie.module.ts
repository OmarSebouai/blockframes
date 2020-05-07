// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { firebase } from '@env';
import { TranslateSlugModule } from '@blockframes/utils/pipes/translate-slug.module';

// Angular Fire
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import 'firebase/storage';

// Material
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

// Libraries
import { UploadModule } from '@blockframes/ui/upload/upload.module';
import { PasswordConfirmModule } from '@blockframes/ui/form/password-confirm/password-confirm.module';
import { MovieCardModule } from '@blockframes/movie/components/card/card.module';

// Components
import { AngularFireModule } from '@angular/fire';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MovieFormModule } from './form/form.module';

import { MovieImdbSearchModule } from './components/movie-imdb-search/movie-imdb-search.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateSlugModule,
    // Angular Fire
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    // Material
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatListModule,
    MatDividerModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTabsModule,
    MatGridListModule,
    MatExpansionModule,
    NgxMatSelectSearchModule,
    MatProgressSpinnerModule,
    // Librairies
    UploadModule,
    PasswordConfirmModule,
    MovieFormModule,
    MovieCardModule,
    MovieImdbSearchModule
  ],
})
export class MovieModule { }
