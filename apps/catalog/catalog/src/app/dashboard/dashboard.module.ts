import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { LayoutComponent } from './layout/layout.component';
import { MovieCollectionGuard } from '@blockframes/movie';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [MovieCollectionGuard],    // todo(#1476) move to a more precise place (overview or/and deals maybe)
    canDeactivate: [MovieCollectionGuard],  // todo(#1476) move to a more precise place (overview or/and deals maybe)
    children: [
      // Home (dashboard if film, welcome if not)
      {
        path: 'home'
      },
      // List of notifications (Activity feed)
      {
        path: 'activity'
      },
      // Import bulk of movies
      {
        path: 'import'
      },
      // Result of a search on the main searchbar
      {
        path: 'search-result'
      },
      // List of titles
      {
        path: 'titles',
        children: [{
          // List of titles
          path: 'list'
        }, {
          // One movie
          path: ':movieId',
          children: [{
            path: 'sales'
          }, {
            path: 'details'
          }, {
            path: 'avails'
          }]
        }]
      },
      // List of titles
      {
        path: 'deals',
        children: [{
          // List of deals
          path: 'list'
        }, {
          // One deal: different state of a deal (offer, counter-offer, payment)
          path: ':dealId',
        }]
      },
      {
        path: 'faq'
      },
      {
        path: 'about',
        loadChildren: () => import('./pages/about-page/about.module').then(m => m.AboutModule)
      },
      {
        path: 'who-are-we',
        loadChildren: () => import('./pages/team-page/team.module').then(m => m.TeamModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./pages/contact-page/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'terms',
        loadChildren: () => import('./pages/privacy-page/privacy.module').then(m => m.PrivacyModule)
      },
    ]
  },
  {
    path: 'movie-tunnel/:movieId',
    loadChildren: () => import('./movie-tunnel/movie-tunnel.module').then(m => m.MovieTunnelModule)
  }
];

@NgModule({
  imports: [LayoutModule, RouterModule.forChild(routes)],
  declarations: []
})
export class DashboardModule {}
