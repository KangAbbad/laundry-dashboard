import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './core/guard/auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: 'auth/login',
          pathMatch: 'full',
        },
        {
          path: 'auth',
          component: AuthLayoutComponent,
          loadChildren: () =>
            import('./pages/auth/auth.module').then(m => m.AuthModule),
        },
        {
          path: 'dashboard',
          canLoad: [AuthGuard],
          canActivate: [AuthGuard],
          component: DashboardLayoutComponent,
          children: [
            {
              path: '',
              loadChildren: () =>
                import('./pages/homepage/homepage.module').then(
                  m => m.HomepageModule
                ),
            },
            {
              path: 'transactions',
              loadChildren: () =>
                import('./pages/transactions/transactions.module').then(
                  m => m.TransactionsModule
                ),
            },
            {
              path: 'admins',
              loadChildren: () =>
                import('./pages/admins/admins.module').then(
                  m => m.AdminsModule
                ),
            },
          ],
        },
        { path: 'error-page', component: ErrorPageComponent },
        { path: '**', redirectTo: 'error-page' },
      ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
