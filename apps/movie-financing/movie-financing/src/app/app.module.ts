// Angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// Akita
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './layout/layout.component';
// Librairies
import { ToolbarModule } from '@blockframes/ui';
import { MovieModule } from '@blockframes/movie';
import { AuthModule } from '@blockframes/auth';
// Material
import { MatIconModule, MatListModule, MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    MovieModule,
    RouterModule,
    AuthModule,
    ToolbarModule,
    // Material
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    // Akita
    environment.production ? [] : [AkitaNgDevtools.forRoot(), AkitaNgRouterStoreModule.forRoot()]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
