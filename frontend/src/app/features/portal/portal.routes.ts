import { Routes } from '@angular/router';

export const PORTAL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/portal-layout/portal-layout.component')
        .then(m => m.PortalLayoutComponent),
    children: [
      {
        path: 'brands/view-brands',
        loadComponent: () =>
          import('./components/brands/list/list.component')
            .then(m => m.ListComponent)
      },
      {
        path: 'brands/create-brand',
        loadComponent: () =>
          import('./components/brands/create/create.component')
            .then(m => m.CreateComponent)
      },
      {
        path: 'social-media-posts/create',
        loadComponent: () =>
          import('./components/social-media-posts/create/create.component')
              .then(m => m.CreateComponent)
      },
      {
        path: 'social-media-posts/view',
        loadComponent: () =>
          import('./components/social-media-posts/list/list.component')
            .then(m => m.ListComponent)
      },

    ]
  }
];
