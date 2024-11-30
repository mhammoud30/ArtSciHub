import { Routes } from '@angular/router';

export const PORTAL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/portal-layout/portal-layout.component')
        .then(m => m.PortalLayoutComponent),
    children: [
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component')
            .then(m => m.BrandsComponent)
      }
    ]
  }
];
