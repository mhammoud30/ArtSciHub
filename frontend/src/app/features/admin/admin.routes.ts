import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/admin-layout/admin-layout.component')
        .then(m => m.AdminLayoutComponent),
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('./components/users/users.component')
            .then(m => m.UsersComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      }
    ]
  }
];
