// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Akita
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { firebase, persistenceSettings } from '@env';

// Components
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';

// Angular Fire
import { AngularFireModule } from '@angular/fire';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirePerformanceModule } from '@angular/fire/performance';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import 'firebase/storage';

// Libraries
import { ToolbarModule } from '@blockframes/ui';
import { KeyManagerModule } from '@blockframes/ethers';
import { EmailVerifyModule } from '@blockframes/auth';

// Widgets
import { AuthWidgetModule } from '@blockframes/auth';
import { NotificationWidgetModule } from '@blockframes/notification';
import { WalletWidgetModule } from '@blockframes/ethers';
import { OrganizationWidgetModule } from '@blockframes/organization';

// Material
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

// Sentry
import { SentryModule } from '@blockframes/utils';
import { sentryDsn } from '@env';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,

    // Material
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatRippleModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatBadgeModule,

    // Libraries
    ToolbarModule,
    KeyManagerModule,
    EmailVerifyModule,

    // Widget
    OrganizationWidgetModule,
    NotificationWidgetModule,
    WalletWidgetModule,
    AuthWidgetModule,

    sentryDsn ? SentryModule : [],

    // Firebase
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule.enablePersistence(persistenceSettings),
    AngularFireFunctionsModule,
    AngularFirePerformanceModule,
    AngularFireAuthModule,
    AngularFireStorageModule,

    // Akita
    AkitaNgRouterStoreModule,

    // Router
    RouterModule.forRoot([{
      path: '',
      loadChildren: () => import('./delivery.module').then(m => m.DeliveryModule)
    }], {
      initialNavigation: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      paramsInheritanceStrategy: 'always'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
