import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@blockframes/auth';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo: 'layout',
    pathMatch:'full'
  },
  {
    path: 'auth',
    loadChildren: '@blockframes/auth#AuthModule'
  },
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'explorer', pathMatch: 'full' },
      { path: 'explorer', loadChildren: 'libs/movie/src/lib/movie.module#MovieModule' }, // loadChildren should lead to the Movie Module
      {
        path: 'organization',
        loadChildren: '@blockframes/organization#OrganizationModule'
      },
      {
        path: 'account',
        loadChildren: '@blockframes/account#AccountModule'
      },
      { path: ':id', loadChildren: './financing/financing.module#FinancingModule' } // should lead to the specific App
    ]
  }
  // {path: '**', component: ErrorComponent}, //  should lead to the 404 Component
];

@NgModule({
  imports: [
    RouterModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
