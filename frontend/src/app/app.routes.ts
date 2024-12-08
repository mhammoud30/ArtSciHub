import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './core/services/auth.service';


export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/public/public.routes').then((m) => m.PUBLIC_ROUTES),
  },
  {
    path: 'portal',
    loadChildren: () =>
      import('./features/portal/portal.routes').then((m) => m.PORTAL_ROUTES),
    canActivate: [() => inject(AuthService).isUser()],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
    canActivate: [() => inject(AuthService).isAdmin()],
  },
];
