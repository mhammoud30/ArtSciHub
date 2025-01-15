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
          import('./components/social-media-posts/components/create/create.component')
              .then(m => m.CreateComponent)
      },
      {
        path: 'social-media-posts/list',
        loadComponent: () =>
          import('./components/social-media-posts/components/list/list.component')
            .then(m => m.ListComponent)
      },
      {
        path: 'social-media-posts/dashboard',
        loadComponent: () =>
          import('./components/social-media-posts/components/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'social-media-posts/view/:id',
        loadComponent: () =>
          import('./components/social-media-posts/components/view/view.component')
            .then(m => m.ViewComponent)
      },
      {
        path: 'social-media-posts/analyze',
        loadComponent: () =>
          import('./components/social-media-posts/components/analyze/analyze.component')
            .then(m => m.AnalyzeComponent)
      },
      {
        path: 'plaform-guidelines-scores',
        loadComponent: () =>
          import('./components/platform-guidelines-score/platform-guidelines-score.component')
            .then(m => m.PlatformGuidelinesScoreComponent)
      },

    ]
  }
];
